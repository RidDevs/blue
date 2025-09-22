import React, { useState, useEffect, useRef } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import * as deeplab from "@tensorflow-models/deeplab";
import "@tensorflow/tfjs";
import "../index.css";

export default function ProjectVerification() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [verificationStep, setVerificationStep] = useState(1);
  const [verificationNotes, setVerificationNotes] = useState("");
  const [creditsToGenerate, setCreditsToGenerate] = useState("");

  // AI refs
  const capturedImgRef = useRef(null);
  const satImgRef = useRef(null);
  const uploadedImgRefs = useRef([]);
  const capturedOverlayRef = useRef(null);
  const satOverlayRef = useRef(null);
  const uploadedOverlayRefs = useRef([]);

  const [aiModel, setAiModel] = useState(null);
  const [aiStatus, setAiStatus] = useState("Model not loaded");
  const [aiResult, setAiResult] = useState([]);

  // --- Fetch projects ---
  useEffect(() => {
    const fetchProjects = async () => {
      const snapshot = await getDocs(collection(db, "projects"));
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setProjects(data);
    };
    fetchProjects();
  }, []);

  // --- Verification Actions ---
  const handleVerificationAction = async (action) => {
    if (!selectedProject) return alert("No project selected!");
    const projectRef = doc(db, "projects", selectedProject.id);

    const newHistoryEntry = {
      step: `Step ${verificationStep}`,
      reviewer: "Admin User",
      date: new Date().toISOString().split("T")[0],
      status: action,
      notes: verificationNotes,
    };

    const newStatus =
      action === "approved"
        ? "verified"
        : action === "rejected"
        ? "rejected"
        : "under_review";

    try {
      await updateDoc(projectRef, {
        status: newStatus,
        verificationHistory: [
          ...(selectedProject.verificationHistory || []),
          newHistoryEntry,
        ],
      });

      setProjects((prev) =>
        prev.map((p) =>
          p.id === selectedProject.id
            ? { ...p, status: newStatus, verificationHistory: [...(p.verificationHistory || []), newHistoryEntry] }
            : p
        )
      );

      setSelectedProject((prev) => ({
        ...prev,
        status: newStatus,
        verificationHistory: [...(prev.verificationHistory || []), newHistoryEntry],
      }));

      setVerificationNotes("");
      setVerificationStep((prev) => prev + 1);
      alert(`Project ${action} successfully!`);
    } catch (err) {
      console.error("Firestore update failed:", err);
      alert("Failed to update project. Check console for details.");
    }
  };

  // --- Generate Credits ---
  const handleGenerateCredits = async () => {
    if (!selectedProject || selectedProject.status !== "verified") {
      alert("Credits can only be generated for a verified project.");
      return;
    }

    const credits = parseFloat(creditsToGenerate);
    if (isNaN(credits) || credits <= 0) {
      alert("Please enter a valid number of credits to generate.");
      return;
    }

    const projectRef = doc(db, "projects", selectedProject.id);
    try {
      console.log(`Simulating blockchain transaction for ${credits} credits...`);
      const txId = `tx_${new Date().getTime()}`;

      await updateDoc(projectRef, {
        creditsGenerated: (selectedProject.creditsGenerated || 0) + credits,
        blockchainTx: txId,
      });

      setProjects(prev =>
        prev.map(p =>
          p.id === selectedProject.id
            ? { ...p, creditsGenerated: (p.creditsGenerated || 0) + credits, blockchainTx: txId }
            : p
        )
      );
      setSelectedProject(prev => ({
        ...prev,
        creditsGenerated: (prev.creditsGenerated || 0) + credits,
        blockchainTx: txId,
      }));

      setCreditsToGenerate("");
      alert(`${credits} carbon credits successfully generated!`);
    } catch (err) {
      console.error("Failed to generate credits:", err);
      alert("Failed to generate credits. Check console for details.");
    }
  };

  // --- Status Helpers ---
  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "status-badge pending";
      case "under_review": return "status-badge active";
      case "verified": return "status-badge verified";
      case "rejected": return "status-badge rejected";
      default: return "status-badge no-reports";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending": return "Pending Review";
      case "under_review": return "Under Review";
      case "verified": return "Verified";
      case "rejected": return "Rejected";
      default: return "Unknown";
    }
  };

  // --- Load ADE20K Model ---
  async function loadAiModel() {
    setAiStatus("Loading model...");
    try {
      const model = await deeplab.load({ base: "ade20k", quantizationBytes: 2 });
      setAiModel(model);
      setAiStatus("✅ Model loaded (ADE20K)!");
    } catch (error) {
      console.error("Failed to load model:", error);
      setAiStatus("❌ Failed to load model");
    }
  }

  // --- ExG function ---
  function calculateExGOnly(imgEl) {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = imgEl.naturalWidth || imgEl.width;
      canvas.height = imgEl.naturalHeight || imgEl.height;
      ctx.drawImage(imgEl, 0, 0);

      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let greenPixels = 0;
      const totalPixels = canvas.width * canvas.height;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        const exg = 2 * g - r - b;
        if (exg > 20) greenPixels++;
      }

      const percentage = ((greenPixels / totalPixels) * 100).toFixed(1);
      return { percentage: parseFloat(percentage), greenPixels, totalPixels };
    } catch (error) {
      console.error("ExG calculation failed:", error);
      return { percentage: 0, greenPixels: 0, totalPixels: 0 };
    }
  }

  // --- AI Analysis (ADE20K + fallback) ---
  async function analyzeImage(source, imgEl, overlayRef, index) {
    if (!imgEl) {
      updateAiResult(index, `❌ ${source}: Image not found`);
      return;
    }

    if (!aiModel) {
      return analyzeExGOnly(source, imgEl, index);
    }

    setAiStatus(`Analyzing ${source}...`);
    try {
      const segmentation = await aiModel.segment(imgEl);
      const data = segmentation.data || segmentation.segmentationMap;

      // ADE20K vegetation class IDs
      const vegetationIds = [21, 22, 47, 66, 120];
      let plantPixels = 0;
      for (let i = 0; i < data.length; i++) {
        if (vegetationIds.includes(data[i])) plantPixels++;
      }

      const pctDeepLab = (plantPixels / data.length) * 100;

      // Draw overlay
      const canvas = overlayRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = segmentation.width;
      canvas.height = segmentation.height;
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      for (let i = 0; i < data.length; i++) {
        const idx = i * 4;
        if (vegetationIds.includes(data[i])) {
          imageData.data[idx] = 0;
          imageData.data[idx + 1] = 255;
          imageData.data[idx + 2] = 0;
          imageData.data[idx + 3] = 120;
        } else {
          imageData.data[idx + 3] = 0;
        }
      }
      ctx.putImageData(imageData, 0, 0);

      if (pctDeepLab > 1) {
        updateAiResult(index, `✅ ${source}: Vegetation detected (${pctDeepLab.toFixed(1)}% via ADE20K)`);
      } else {
        return analyzeExGOnly(source, imgEl, index);
      }

      setAiStatus("✅ Done");
    } catch (error) {
      console.error("AI analysis failed, falling back to ExG:", error);
      return analyzeExGOnly(source, imgEl, index);
    }
  }

  // --- ExG Only (fallback UI) ---
  async function analyzeExGOnly(source, imgEl, index) {
    try {
      if (!imgEl.complete) {
        await new Promise((resolve, reject) => {
          imgEl.onload = resolve;
          imgEl.onerror = reject;
          setTimeout(reject, 5000);
        });
      }
      const results = calculateExGOnly(imgEl);
      const status =
        results.percentage > 15
          ? "High vegetation coverage"
          : results.percentage > 5
          ? "Moderate vegetation coverage"
          : "Low vegetation coverage";

      const icon =
        results.percentage > 15 ? "🌿" : results.percentage > 5 ? "🌱" : "🟫";

      const resultText = `${icon} ${source}: ${results.percentage}% green coverage (${results.greenPixels.toLocaleString()}/${results.totalPixels.toLocaleString()} pixels) - ${status}`;
      updateAiResult(index, resultText);
      setAiStatus("✅ ExG analysis complete");
    } catch (error) {
      console.error(`ExG analysis failed for ${source}:`, error);
      updateAiResult(index, `❌ ${source}: ExG analysis failed`);
      setAiStatus("❌ ExG analysis failed");
    }
  }

  function updateAiResult(index, text) {
    setAiResult(prev => {
      const res = [...prev];
      res[index] = text;
      return res;
    });
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">🌱 Project Verification Dashboard</h1>
        <p className="page-subtitle">
          Review submitted blue carbon projects and update verification status
        </p>
      </div>

      <div className="verification-layout">
        {/* Sidebar */}
        <div className="projects-sidebar">
          <h3>Projects ({projects.length})</h3>
          <div className="projects-list">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`project-tile ${selectedProject?.id === project.id ? "selected" : ""}`}
                onClick={() => {
                  setSelectedProject(project);
                  setVerificationStep(1);
                  setVerificationNotes("");
                  setAiResult([]);
                  uploadedImgRefs.current = [];
                  uploadedOverlayRefs.current = [];
                }}
              >
                <div className="tile-header">
                  <h4>{project.projectName || project.name}</h4>
                  <span className={getStatusColor(project.status)}>
                    {getStatusText(project.status)}
                  </span>
                </div>
                <div className="tile-info">
                  <p><strong>Type:</strong> {project.projectType || project.type}</p>
                  <p><strong>Location:</strong> {project.location}</p>
                  <p><strong>Area:</strong> {project.area || "-"} ha</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Details */}
        {selectedProject ? (
          <div className="project-details-panel">
            <div className="project-overview">
              <h2>{selectedProject.projectName || "-"}</h2>
              <span className={getStatusColor(selectedProject.status)}>
                {getStatusText(selectedProject.status)}
              </span>

              {/* Overview Grid */}
              <div className="overview-grid">
                <div className="overview-item"><label>Type</label>{selectedProject.projectType || "-"}</div>
                <div className="overview-item"><label>Location</label>{selectedProject.location || "-"}</div>
                <div className="overview-item"><label>Area</label>{selectedProject.area || "-"} ha</div>
                <div className="overview-item"><label>Expected Credits</label>{selectedProject.expectedCredits || "-"} tons CO₂</div>
                <div className="overview-item"><label>Timeline</label>{selectedProject.timeline || "-"}</div>
                <div className="overview-item"><label>Methodology</label>{selectedProject.methodology || "-"}</div>
                <div className="overview-item"><label>Coordinates</label>{selectedProject.coordinates || "-"}</div>
                <div className="overview-item"><label>Generated Credits</label>{selectedProject.creditsGenerated || "-"} tons CO₂</div>
                <div className="overview-item"><label>Blockchain Tx ID</label><span className="tx-id">{selectedProject.blockchainTx || "-"}</span></div>
              </div>

              {/* Description */}
              <div className="project-description">
                <label>Description</label>
                <p>{selectedProject.description || "-"}</p>
              </div>

              {/* Images */}
              {selectedProject.capturedPhoto && (
                <div className="verifier-image-block">
                  <label>Captured Photo</label>
                  <img ref={capturedImgRef} src={selectedProject.capturedPhoto} alt="Captured" className="project-image" crossOrigin="anonymous" />
                  <canvas ref={capturedOverlayRef} className="overlay-canvas" />
                  <div className="analysis-buttons">
                    <button onClick={() => analyzeImage("Captured Photo", capturedImgRef.current, capturedOverlayRef, 0)}>🤖 AI Analysis</button>
                    <button onClick={() => analyzeExGOnly("Captured Photo", capturedImgRef.current, 0)}>🌿 ExG Only</button>
                  </div>
                </div>
              )}

              {selectedProject.satImage && (
                <div className="verifier-image-block">
                  <label>Satellite Image</label>
                  <img ref={satImgRef} src={selectedProject.satImage} alt="Satellite" className="project-image" crossOrigin="anonymous" />
                  <canvas ref={satOverlayRef} className="overlay-canvas" />
                  <div className="analysis-buttons">
                    <button onClick={() => analyzeImage("Satellite Image", satImgRef.current, satOverlayRef, 1)}>🤖 AI Analysis</button>
                    <button onClick={() => analyzeExGOnly("Satellite Image", satImgRef.current, 1)}>🛰️ ExG Only</button>
                  </div>
                </div>
              )}

              {selectedProject.documents?.length > 0 && selectedProject.documents.map((doc, i) => (
                <div className="verifier-image-block" key={i}>
                  <label>Uploaded Image {i + 1}</label>
                  <img ref={el => uploadedImgRefs.current[i] = el} src={doc} alt={`Doc ${i}`} className="project-image" crossOrigin="anonymous" />
                  <canvas ref={el => uploadedOverlayRefs.current[i] = el} className="overlay-canvas" />
                  <div className="analysis-buttons">
                    <button onClick={() => analyzeImage(`Uploaded Image ${i+1}`, uploadedImgRefs.current[i], uploadedOverlayRefs.current[i], i+2)}>🤖 AI Analysis</button>
                    <button onClick={() => analyzeExGOnly(`Uploaded Image ${i+1}`, uploadedImgRefs.current[i], i+2)}>📸 ExG Only</button>
                  </div>
                </div>
              ))}

              {/* AI Panel */}
              <div className="ai-panel">
                <div className="ai-controls">
                  <button onClick={loadAiModel} disabled={!!aiModel}>
                    {aiModel ? "✅ Model Ready" : "Load AI Model"}
                  </button>
                </div>
                <div className="ai-status">{aiStatus}</div>
                <div className="ai-results">
                  {aiResult.map((res, i) => <div key={i} className="result-item">{res}</div>)}
                </div>
              </div>
            </div>

            {/* Verification Actions */}
            <div className="verification-actions">
              <textarea value={verificationNotes} onChange={e => setVerificationNotes(e.target.value)} placeholder="Add verification notes..." rows="4" />
              <button onClick={() => handleVerificationAction("approved")}>✅ Approve</button>
              <button onClick={() => handleVerificationAction("under_review")}>📝 Request Revision</button>
              <button onClick={() => handleVerificationAction("rejected")}>❌ Reject</button>
              <hr style={{ margin: "1rem 0" }} />
              <div className="credit-generation-controls">
                <input type="number" placeholder="Enter credits to generate..." value={creditsToGenerate} onChange={e => setCreditsToGenerate(e.target.value)} min="0" />
                <button onClick={handleGenerateCredits} disabled={!selectedProject || selectedProject.status !== "verified"}>🪙 Generate Credits</button>
              </div>
            </div>

            {/* History */}
            {selectedProject.verificationHistory?.length > 0 && (
              <div className="verification-history">
                <h4>📜 Verification History</h4>
                {selectedProject.verificationHistory.map((entry, idx) => (
                  <div key={idx} className="history-item">
                    <strong>{entry.step}:</strong> {entry.status} by {entry.reviewer} on {entry.date} {entry.notes && `- Notes: ${entry.notes}`}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="no-selection">
            <h3>👈 Select a project to view details</h3>
          </div>
        )}
      </div>
    </div>
  );
}
