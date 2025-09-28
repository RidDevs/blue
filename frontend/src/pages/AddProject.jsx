import { useState } from "react";
import "../index.css";
import GreenCapture from "./GreenCapture";
import { db, auth, storage } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AddProject() {
  const [projectData, setProjectData] = useState({
    projectName: "",
    projectType: "",
    location: "",
    area: "",
    description: "",
    expectedCredits: "",
    timeline: "",
    methodology: "",
    coordinates: "",
    documents: null,
    capturedPhoto: null,
    satImage: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setProjectData(prev => ({
      ...prev,
      documents: files
    }));
  };

  // 🔹 Receive data from GreenVerifier
  const handleVerifierData = (data) => {
    setProjectData(prev => ({
      ...prev,
      coordinates: data.gpsCoords
        ? `${data.gpsCoords.lat}, ${data.gpsCoords.lon}`
        : prev.coordinates,
      capturedPhoto: data.capturedImg || prev.capturedPhoto,
      satImage: data.satImg || prev.satImage,
      area: data.measuredArea
        ? (data.measuredArea / 10000).toFixed(2)
        : prev.area,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;
      if (!user) {
        alert("You must be logged in to submit a project.");
        return;
      }

      // Upload documents
      let documentUrls = [];
      if (projectData.documents) {
        for (let i = 0; i < projectData.documents.length; i++) {
          const file = projectData.documents[i];
          const storageRef = ref(storage, `projects/${user.uid}/${Date.now()}_${file.name}`);
          await uploadBytes(storageRef, file);
          documentUrls.push(await getDownloadURL(storageRef));
        }
      }

      // Upload captured photo
      let capturedPhotoUrl = null;
      if (projectData.capturedPhoto) {
        const blob = await fetch(projectData.capturedPhoto).then(r => r.blob());
        const storageRef = ref(storage, `projects/${user.uid}/photo_${Date.now()}.png`);
        await uploadBytes(storageRef, blob);
        capturedPhotoUrl = await getDownloadURL(storageRef);
      }

      // Upload satellite image
      let satImageUrl = null;
      if (projectData.satImage) {
        const blob = await fetch(projectData.satImage).then(r => r.blob());
        const storageRef = ref(storage, `projects/${user.uid}/satellite_${Date.now()}.png`);
        await uploadBytes(storageRef, blob);
        satImageUrl = await getDownloadURL(storageRef);
      }

      // Save all data to Firestore
      await addDoc(collection(db, "projects"), {
        ...projectData,
        documents: documentUrls,
        capturedPhoto: capturedPhotoUrl,
        satImage: satImageUrl,
        userId: user.uid,
        status: "pending",
        numericId: Date.now(), // ✅ add a numeric project ID for blockchain
        creditsGenerated: 0,   // optional default
        farmerWalletAddress: null, // optional default
        farmerWalletPrivateKey: null, // optional default
        createdAt: serverTimestamp(),
      });

      alert("Project submitted successfully!");
      setProjectData({
        projectName: "",
        projectType: "",
        location: "",
        area: "",
        description: "",
        expectedCredits: "",
        timeline: "",
        methodology: "",
        coordinates: "",
        documents: null,
        capturedPhoto: null,
        satImage: null
      });

    } catch (error) {
      console.error("Error adding project: ", error);
      alert("Failed to submit project. Check console for details.");
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">🌱 Add New Project</h1>
        <p className="page-subtitle">Submit your blue carbon project for verification and credit generation</p>
      </div>

      <form className="project-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Project Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="projectName">Project Name *</label>
              <input
                type="text"
                id="projectName"
                name="projectName"
                value={projectData.projectName}
                onChange={handleInputChange}
                required
                placeholder="Enter project name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="projectType">Project Type *</label>
              <select
                id="projectType"
                name="projectType"
                value={projectData.projectType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select project type</option>
                <option value="mangrove">Mangrove Restoration</option>
                <option value="seagrass">Seagrass Conservation</option>
                <option value="saltmarsh">Salt Marsh Restoration</option>
                <option value="oyster">Oyster Reef Restoration</option>
                <option value="kelp">Kelp Forest Conservation</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="location">Location *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={projectData.location}
                onChange={handleInputChange}
                required
                placeholder="City, State, Country"
              />
            </div>
            <div className="form-group">
              <label htmlFor="area">Project Area (hectares) *</label>
              <input
                type="number"
                id="area"
                name="area"
                value={projectData.area}
                onChange={handleInputChange}
                required
                placeholder="Enter area in hectares"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="coordinates">GPS Coordinates</label>
            <input
              type="text"
              id="coordinates"
              name="coordinates"
              value={projectData.coordinates}
              onChange={handleInputChange}
              placeholder="Latitude, Longitude"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Project Details</h3>
          <div className="form-group">
            <label htmlFor="description">Project Description *</label>
            <textarea
              id="description"
              name="description"
              value={projectData.description}
              onChange={handleInputChange}
              required
              placeholder="Describe your project objectives, methods, and expected environmental impact..."
              rows="4"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expectedCredits">Expected Carbon Credits</label>
              <input
                type="number"
                id="expectedCredits"
                name="expectedCredits"
                value={projectData.expectedCredits}
                onChange={handleInputChange}
                placeholder="Estimated credits per year"
              />
            </div>
            <div className="form-group">
              <label htmlFor="timeline">Project Timeline *</label>
              <select
                id="timeline"
                name="timeline"
                value={projectData.timeline}
                onChange={handleInputChange}
                required
              >
                <option value="">Select timeline</option>
                <option value="1-year">1 Year</option>
                <option value="2-years">2 Years</option>
                <option value="3-years">3 Years</option>
                <option value="5-years">5 Years</option>
                <option value="10-years">10+ Years</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="methodology">Methodology *</label>
            <select
              id="methodology"
              name="methodology"
              value={projectData.methodology}
              onChange={handleInputChange}
              required
            >
              <option value="">Select methodology</option>
              <option value="vcs">Verified Carbon Standard (VCS)</option>
              <option value="gold-standard">Gold Standard</option>
              <option value="plan-vivo">Plan Vivo</option>
              <option value="climate-action">Climate Action Reserve</option>
            </select>
          </div>
        </div>

        <div className="form-section">
          <h3>Supporting Documents</h3>
          <div className="form-group">
            <label htmlFor="documents">Upload Documents</label>
            <input
              type="file"
              id="documents"
              name="documents"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.png"
              onChange={handleFileChange}
              className="file-input"
            />
            <small className="form-help">Upload project plans, environmental assessments, permits, etc.</small>
          </div>
        </div>

        <div className="form-section">
          <h3>Satellite & AI Verification</h3>
          <GreenCapture onDataCapture={handleVerifierData} />
        </div>

        <div className="form-section">
          <button type="submit" className="submit-button">Submit Project</button>
        </div>
      </form>
    </div>
  );
}
