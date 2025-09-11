import React, { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import 'leaflet-draw'
import * as turf from '@turf/turf'
import * as deeplab from '@tensorflow-models/deeplab'
import '@tensorflow/tfjs'

// Fix Leaflet icons
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
L.Icon.Default.mergeOptions({ iconUrl, shadowUrl: iconShadow })

export default function App() {
  // Map refs
  const mapRef = useRef(null)
  const mapDivRef = useRef(null)
  const drawnItemsRef = useRef(null)

  // Camera refs
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const imgRef = useRef(null)
  const overlayCanvasRef = useRef(null)

  // States
  const [gpsCoords, setGpsCoords] = useState(null)
  const [capturedImg, setCapturedImg] = useState(null)
  const [claimedValue, setClaimedValue] = useState('')
  const [claimedUnit, setClaimedUnit] = useState('m2')
  const [lastMeasuredM2, setLastMeasuredM2] = useState(null)

  // AI model states
  const [model, setModel] = useState(null)
  const [aiStatus, setAiStatus] = useState('Model not loaded')
  const [aiResult, setAiResult] = useState(null)

  // --- Initialize map ---
  useEffect(() => {
    if (mapRef.current) return
    const TILE_TEMPLATE =
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'

    const map = L.map(mapDivRef.current, { zoomControl: true }).setView([20, 0], 2)

    L.tileLayer(TILE_TEMPLATE, {
      maxZoom: 19,
      attribution: 'Tiles © Esri'
    }).addTo(map)

    const drawnItems = new L.FeatureGroup().addTo(map)
    drawnItemsRef.current = drawnItems

    const drawControl = new L.Control.Draw({
      edit: { featureGroup: drawnItems },
      draw: { polygon: true, rectangle: true, circle: true, marker: false, polyline: false }
    })
    map.addControl(drawControl)

    map.on(L.Draw.Event.CREATED, e => {
      const layer = e.layer
      drawnItems.addLayer(layer)
      computeAndCompareArea(layer)
    })

    mapRef.current = { map }
  }, [])

  // --- Camera functions ---
  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      videoRef.current.srcObject = stream
    } catch (err) {
      alert('Camera access denied: ' + err.message)
    }
  }

  function capturePhoto() {
    if (!videoRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    ctx.drawImage(videoRef.current, 0, 0)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const lat = pos.coords.latitude
          const lon = pos.coords.longitude
          setGpsCoords({ lat, lon })

          ctx.fillStyle = 'red'
          ctx.font = '24px Arial'
          ctx.fillText(`Lat: ${lat.toFixed(6)}, Lon: ${lon.toFixed(6)}`, 20, 40)

          const imgData = canvas.toDataURL('image/png')
          setCapturedImg(imgData)

          const { map } = mapRef.current
          map.setView([lat, lon], 18)
          L.marker([lat, lon]).addTo(map).bindPopup('Photo GPS point').openPopup()
        },
        err => {
          alert('Could not get location: ' + err.message)
          const imgData = canvas.toDataURL('image/png')
          setCapturedImg(imgData)
        }
      )
    }
  }

  // --- Map & Area Helpers ---
  function computeAndCompareArea(layer) {
    const geojson = layer.toGeoJSON()
    let area = 0
    if (geojson.geometry.type === 'Polygon') {
      area = turf.area(geojson)
    } else if (layer instanceof L.Circle) {
      const r = layer.getRadius()
      area = Math.PI * r * r
    }
    setLastMeasuredM2(area)
  }

  function formatArea(m2) {
    if (m2 == null) return '-'
    if (m2 >= 1e6) return (m2 / 1e6).toFixed(4) + ' km²'
    if (m2 >= 10000) return (m2 / 10000).toFixed(2) + ' ha'
    return Math.round(m2) + ' m²'
  }

  function computeComparison() {
    const val = Number(claimedValue)
    if (!val || val <= 0 || !lastMeasuredM2) return null
    const claimedM2 = claimedUnit === 'km2' ? val * 1e6 : val
    const diff = Math.abs(lastMeasuredM2 - claimedM2)
    const pct = (diff / claimedM2) * 100
    let verdict = ''
    if (pct <= 5) verdict = `✅ Match (within 5%)`
    else if (pct <= 20) verdict = `⚠️ Close (${pct.toFixed(1)}% diff)`
    else verdict = `❌ Mismatch (${pct.toFixed(1)}% diff)`
    return { verdict }
  }

  const comparison = computeComparison()

  // --- AI Functions ---
  async function loadModel() {
    setAiStatus('Loading model...')
    const dl = await deeplab.load({ base: 'pascal', quantizationBytes: 2 })
    setModel(dl)
    setAiStatus('✅ Model loaded!')
  }

  async function analyzeImage() {
    if (!model || !imgRef.current) return
    setAiStatus('Analyzing...')

    const segmentation = await model.segment(imgRef.current)

    const data = segmentation.data || segmentation.segmentationMap
    if (!data) {
      setAiResult('❌ Could not analyze image (no segmentation data)')
      setAiStatus('Error')
      return
    }

    const plantId = 21 // VOC "plant" class
    let plantPixels = 0

    for (let i = 0; i < data.length; i++) {
      if (data[i] === plantId) plantPixels++
    }

    const total = data.length
    const pct = (plantPixels / total) * 100

    // Draw vegetation mask overlay
    const canvas = overlayCanvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = segmentation.width
    canvas.height = segmentation.height
    const imageData = ctx.createImageData(canvas.width, canvas.height)

    for (let i = 0; i < data.length; i++) {
      const idx = i * 4
      if (data[i] === plantId) {
        imageData.data[idx] = 0 // R
        imageData.data[idx + 1] = 255 // G
        imageData.data[idx + 2] = 0 // B
        imageData.data[idx + 3] = 120 // alpha
      } else {
        imageData.data[idx + 3] = 0
      }
    }
    ctx.putImageData(imageData, 0, 0)

    if (pct > 5) {
      setAiResult(`✅ Green area detected (${pct.toFixed(1)}% vegetation)`)
    } else {
      setAiResult(`❌ No significant greenery (${pct.toFixed(1)}%)`)
    }
    setAiStatus('Done')
  }

  // --- UI ---
  return (
    <div className="app-root" style={{ padding: '10px' }}>
      <header>
        <h1>📷 Satellite + Camera + AI Green Verifier</h1>
      </header>

      <main className="main-grid" style={{ display: 'flex', gap: '20px' }}>
        {/* Left Panel */}
        <section style={{ flex: 1 }}>
          <h3>Camera Capture</h3>
          <video ref={videoRef} autoPlay playsInline style={{ width: '100%', border: '1px solid #ccc' }} />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          <div className="buttons">
            <button onClick={startCamera}>Start Camera</button>
            <button onClick={capturePhoto}>Capture Photo</button>
          </div>

          {capturedImg && (
            <div style={{ position: 'relative' }}>
              <h4>Captured Image with Location:</h4>
              <img ref={imgRef} src={capturedImg} alt="Captured" style={{ width: '100%' }} />
              <canvas
                ref={overlayCanvasRef}
                style={{ position: 'absolute', top: '40px', left: 0, width: '100%', pointerEvents: 'none' }}
              />
            </div>
          )}

          <h3 style={{ marginTop: '20px' }}>Claimed Area</h3>
          <div>
            <input
              type="number"
              value={claimedValue}
              onChange={e => setClaimedValue(e.target.value)}
              placeholder="Numeric value"
            />
            <select value={claimedUnit} onChange={e => setClaimedUnit(e.target.value)}>
              <option value="m2">m²</option>
              <option value="km2">km²</option>
            </select>
          </div>

          <div style={{ marginTop: '10px' }}>
            <div>
              <strong>Measured:</strong> {formatArea(lastMeasuredM2)}
            </div>
            <div>
              <strong>Claimed:</strong>{' '}
              {claimedValue ? (claimedUnit === 'km2' ? `${claimedValue} km²` : `${claimedValue} m²`) : '-'}
            </div>
            {comparison && <div className="verdict">{comparison.verdict}</div>}
          </div>

          {/* AI Section */}
          <h3 style={{ marginTop: '20px' }}>AI Vegetation Check</h3>
          <button onClick={loadModel} disabled={!!model}>
            {model ? 'Model Ready' : 'Load Model'}
          </button>
          <button onClick={analyzeImage} disabled={!model || !capturedImg} style={{ marginLeft: '10px' }}>
            Analyze Captured Image
          </button>

          <div style={{ marginTop: '10px', fontWeight: 'bold' }}>{aiStatus}</div>
          {aiResult && <div style={{ marginTop: '10px' }}>{aiResult}</div>}
        </section>

        {/* Right Panel (Map) */}
        <section style={{ flex: 1 }}>
          <h3>Map</h3>
          <div ref={mapDivRef} style={{ height: '600px', width: '100%' }} />
        </section>
      </main>
    </div>
  )
}
