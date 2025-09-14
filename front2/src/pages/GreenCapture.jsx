import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";
import * as turf from "@turf/turf";
import leafletImage from "leaflet-image";

// Fix Leaflet icons
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
L.Icon.Default.mergeOptions({ iconUrl, shadowUrl: iconShadow });

export default function GreenVerifier() {
  const mapRef = useRef(null);
  const mapDivRef = useRef(null);
  const drawnItemsRef = useRef(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  const [gpsCoords, setGpsCoords] = useState(null);
  const [capturedImg, setCapturedImg] = useState(null);
  const [uploadedImg, setUploadedImg] = useState(null);
  const [satImg, setSatImg] = useState(null);
  const [lastMeasuredM2, setLastMeasuredM2] = useState(null);

  // --- Initialize map ---
  useEffect(() => {
    if (mapRef.current) return;

    const TILE_TEMPLATE =
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

    const map = L.map(mapDivRef.current, { zoomControl: true }).setView(
      [20, 0],
      2
    );

    L.tileLayer(TILE_TEMPLATE, {
      maxZoom: 19,
      attribution: "Tiles © Esri",
    }).addTo(map);

    const drawnItems = new L.FeatureGroup().addTo(map);
    drawnItemsRef.current = drawnItems;

    const drawControl = new L.Control.Draw({
      edit: { featureGroup: drawnItems },
      draw: {
        polygon: true,
        rectangle: true,
        circle: true,
        marker: false,
        polyline: false,
      },
    });
    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, (e) => {
      const layer = e.layer;
      drawnItems.addLayer(layer);
      computeArea(layer);
    });

    mapRef.current = { map };
  }, []);

  // --- Camera functions ---
  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      alert("Camera access denied: " + err.message);
    }
  }

  function capturePhoto() {
    if (!videoRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    ctx.drawImage(videoRef.current, 0, 0);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          setGpsCoords({ lat, lon });

          ctx.fillStyle = "red";
          ctx.font = "24px Arial";
          ctx.fillText(`Lat: ${lat.toFixed(6)}, Lon: ${lon.toFixed(6)}`, 20, 40);

          setCapturedImg(canvas.toDataURL("image/png"));

          const { map } = mapRef.current;
          map.setView([lat, lon], 18);
          L.marker([lat, lon])
            .addTo(map)
            .bindPopup("Photo GPS point")
            .openPopup();
        },
        () => setCapturedImg(canvas.toDataURL("image/png"))
      );
    }
  }

  // --- Upload function ---
  function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setUploadedImg(e.target.result);
    reader.readAsDataURL(file);
  }

  // --- Map capture ---
  function captureMapView() {
    const { map } = mapRef.current;
    leafletImage(map, (err, canvas) => {
      if (err) {
        alert("Map capture failed: " + err.message);
        return;
      }

      const polygonLayers = [];
      drawnItemsRef.current.eachLayer((layer) => {
        if (layer instanceof L.Polygon || layer instanceof L.Rectangle) {
          const latlngs = layer.getLatLngs()[0];
          const coords = latlngs.map((latlng) => map.latLngToContainerPoint(latlng));
          polygonLayers.push(coords);
        }
      });

      if (polygonLayers.length === 0) {
        setSatImg(canvas.toDataURL("image/png"));
        return;
      }

      const maskedCanvas = document.createElement("canvas");
      maskedCanvas.width = canvas.width;
      maskedCanvas.height = canvas.height;
      const ctx = maskedCanvas.getContext("2d");

      ctx.drawImage(canvas, 0, 0);
      ctx.globalCompositeOperation = "destination-in";
      ctx.beginPath();
      polygonLayers.forEach((coords) => {
        ctx.moveTo(coords[0].x, coords[0].y);
        coords.forEach((pt) => ctx.lineTo(pt.x, pt.y));
        ctx.closePath();
      });
      ctx.fill();

      setSatImg(maskedCanvas.toDataURL("image/png"));
    });
  }

  // --- Compute Area ---
  function computeArea(layer) {
    const geojson = layer.toGeoJSON();
    let area = 0;
    if (geojson.geometry.type === "Polygon") {
      area = turf.area(geojson);
    } else if (layer instanceof L.Circle) {
      const r = layer.getRadius();
      area = Math.PI * r * r;
    }
    setLastMeasuredM2(area);
  }

  function formatArea(m2) {
    if (!m2) return "-";
    if (m2 >= 1e6) return (m2 / 1e6).toFixed(4) + " km²";
    if (m2 >= 10000) return (m2 / 10000).toFixed(2) + " ha";
    return Math.round(m2) + " m²";
  }

  return (
    <div className="verifier-root">
      <header>
        <h1>📷 Map & Photo Capture</h1>
      </header>

      <main className="verifier-main">
        <section className="verifier-section">
          <h3>Camera Capture</h3>
          <video ref={videoRef} autoPlay playsInline className="verifier-video" />
          <canvas ref={canvasRef} className="hidden-canvas" />

          <div className="verifier-buttons">
            <button type="button" onClick={startCamera}>
              Start Camera
            </button>
            <button type="button" onClick={capturePhoto}>
              Capture Photo
            </button>
          </div>

          {capturedImg && (
            <div>
              <h4>Captured Image with Location:</h4>
              <img ref={imgRef} src={capturedImg} alt="Captured" className="verifier-img" />
            </div>
          )}

          <h3>Upload Image</h3>
          <input type="file" accept="image/*" onChange={handleUpload} />
          {uploadedImg && <img src={uploadedImg} alt="Uploaded" className="verifier-img" />}

          <h3>Satellite Map Capture</h3>
          <button type="button" onClick={captureMapView}>
            Capture Map View
          </button>
          {satImg && <img src={satImg} alt="Satellite" className="verifier-img" />}

          <h4>Measured Area: {formatArea(lastMeasuredM2)}</h4>
        </section>

        <section className="verifier-map-section">
          <h3>Map</h3>
          <div ref={mapDivRef} className="verifier-map" />
        </section>
      </main>
    </div>
  );
}
