import React, { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import "../index.css";

export default function ProjectVerification() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [verificationStep, setVerificationStep] = useState(1);
  const [verificationNotes, setVerificationNotes] = useState("");

  // 🔹 Fetch projects from Firestore
  useEffect(() => {
    const fetchProjects = async () => {
      const snapshot = await getDocs(collection(db, "projects"));
      const data = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setProjects(data);
    };
    fetchProjects();
  }, []);

  // 🔹 Approve / Reject / Request Revision
  const handleVerificationAction = async (action) => {
    console.log("Clicked action:", action, "Selected Project:", selectedProject);

    if (!selectedProject) {
      alert("No project selected!");
      return;
    }

    const projectRef = doc(db, "projects", selectedProject.id);

    const newHistoryEntry = {
      step: `Step ${verificationStep}`,
      reviewer: "Admin User", // Replace with auth.currentUser.email
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

      // Update local state
      setProjects((prev) =>
        prev.map((p) =>
          p.id === selectedProject.id
            ? {
                ...p,
                status: newStatus,
                verificationHistory: [
                  ...(p.verificationHistory || []),
                  newHistoryEntry,
                ],
              }
            : p
        )
      );

      setSelectedProject((prev) => ({
        ...prev,
        status: newStatus,
        verificationHistory: [
          ...(prev.verificationHistory || []),
          newHistoryEntry,
        ],
      }));

      setVerificationNotes("");
      setVerificationStep((prev) => prev + 1);

      alert(`Project ${action} successfully!`);
    } catch (err) {
      console.error("Firestore update failed:", err);
      alert("Failed to update project. Check console for details.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "status-badge pending";
      case "under_review":
        return "status-badge active";
      case "verified":
        return "status-badge verified";
      case "rejected":
        return "status-badge rejected";
      default:
        return "status-badge no-reports";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Pending Review";
      case "under_review":
        return "Under Review";
      case "verified":
        return "Verified";
      case "rejected":
        return "Rejected";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">🌱 Project Verification Dashboard</h1>
        <p className="page-subtitle">
          Review submitted blue carbon projects and update verification status
        </p>
      </div>

      <div className="verification-layout">
        {/* Project Tiles */}
        <div className="projects-sidebar">
          <h3>Projects ({projects.length})</h3>
          <div className="projects-list">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`project-tile ${
                  selectedProject?.id === project.id ? "selected" : ""
                }`}
                onClick={() => {
                  setSelectedProject(project);
                  setVerificationStep(1);
                  setVerificationNotes("");
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

        {/* Selected Project Details */}
        {selectedProject ? (
          <div className="project-details-panel">
            {/* Project Overview */}
            <div className="project-overview">
              <div className="overview-header">
                <h2>{selectedProject.projectName || selectedProject.name}</h2>
                <span className={getStatusColor(selectedProject.status)}>
                  {getStatusText(selectedProject.status)}
                </span>
              </div>

              <div className="overview-grid">
                <div className="overview-item">
                  <label>Project Type</label>
                  <span>{selectedProject.projectType || selectedProject.type}</span>
                </div>
                <div className="overview-item">
                  <label>Location</label>
                  <span>{selectedProject.location}</span>
                </div>
                <div className="overview-item">
                  <label>Area</label>
                  <span>{selectedProject.area || "-"} hectares</span>
                </div>
                <div className="overview-item">
                  <label>Timeline</label>
                  <span>{selectedProject.timeline || "-"}</span>
                </div>
                <div className="overview-item">
                  <label>Methodology</label>
                  <span>{selectedProject.methodology || "-"}</span>
                </div>
                <div className="overview-item">
                  <label>Coordinates</label>
                  <span>{selectedProject.coordinates || "-"}</span>
                </div>
                <div className="overview-item">
                  <label>Expected Credits</label>
                  <span>{selectedProject.expectedCredits || "-"} tons CO₂</span>
                </div>
              </div>

              <div className="project-description">
                <label>Description</label>
                <p>{selectedProject.description}</p>
              </div>

              {selectedProject.documents?.length > 0 && (
                <div className="project-documents">
                  <label>📎 Documents</label>
                  <ul>
                    {selectedProject.documents.map((doc, i) => (
                      <li key={i}>{doc}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="project-images">
                {selectedProject.capturedPhoto && (
                  <div className="image-container">
                    <label>Captured Photo</label>
                    <img
                      src={selectedProject.capturedPhoto}
                      alt="Captured"
                      className="project-image"
                    />
                  </div>
                )}

                {selectedProject.satImage && (
                  <div className="image-container">
                    <label>Satellite Image</label>
                    <img
                      src={selectedProject.satImage}
                      alt="Satellite"
                      className="project-image"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Verification Panel */}
            <div className="verification-panel">
              <div className="panel-header">
                <h3>🔍 Verification Process</h3>
              </div>

              <div className="verification-steps">
                {[1, 2, 3, 4].map((step) => {
                  const titles = ["Document Review", "Technical Assessment", "Field Verification", "Final Approval"];
                  const descs = [
                    "Review submitted documentation and verify completeness",
                    "Evaluate technical feasibility and carbon calculations",
                    "Conduct on-site verification and measurements",
                    "Approve or reject the project for carbon credit generation",
                  ];
                  return (
                    <div
                      key={step}
                      className={`step-item ${verificationStep >= step ? "active" : ""}`}
                    >
                      <div className="step-number">{step}</div>
                      <div className="step-content">
                        <h5>{titles[step - 1]}</h5>
                        <p>{descs[step - 1]}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Verification Actions */}
              <div className="verification-actions">
                <div className="action-section">
                  <h4>Verification Notes</h4>
                  <textarea
                    value={verificationNotes}
                    onChange={(e) => setVerificationNotes(e.target.value)}
                    placeholder="Add your verification notes..."
                    rows="4"
                  />
                </div>

                <div className="action-buttons">
                  <button
                    className="btn-primary"
                    onClick={() => handleVerificationAction("approved")}
                  >
                    ✅ Approve
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => handleVerificationAction("under_review")}
                  >
                    📝 Request Revision
                  </button>
                  <button
                    className="btn-danger"
                    onClick={() => handleVerificationAction("rejected")}
                  >
                    ❌ Reject
                  </button>
                </div>
              </div>

              {/* Verification History */}
              {selectedProject.verificationHistory?.length > 0 && (
                <div className="verification-history">
                  <h4>📜 Verification History</h4>
                  <div className="history-timeline">
                    {selectedProject.verificationHistory.map((entry, index) => (
                      <div key={index} className="history-item">
                        <div className="history-icon">
                          {entry.status === "verified" ? "✅" : entry.status === "rejected" ? "❌" : "⏳"}
                        </div>
                        <div className="history-content">
                          <div className="history-header">
                            <h5>{entry.step}</h5>
                            <span className="history-date">{entry.date}</span>
                          </div>
                          <p><strong>Reviewer:</strong> {entry.reviewer}</p>
                          <p><strong>Status:</strong> {entry.status}</p>
                          {entry.notes && <p><strong>Notes:</strong> {entry.notes}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="no-selection">
            <div className="no-selection-content">
              <h3>Select a project to view details</h3>
              <p>Choose a project from the list to start the verification process</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
