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
    satImage: null,
  });

  // 🔹 State for tooltip visibility
  const [showMethodologyInfo, setShowMethodologyInfo] = useState(false);
  const [showMethodologyPopup, setShowMethodologyPopup] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // If methodology is being changed, show its info
    if (name === "methodology") {
      setShowMethodologyInfo(value !== "");
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setProjectData((prev) => ({
      ...prev,
      documents: files,
    }));
  };

  // 🔹 Receive data from GreenVerifier
  const handleVerifierData = (data) => {
    setProjectData((prev) => ({
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
          const storageRef = ref(
            storage,
            `projects/${user.uid}/${Date.now()}_${file.name}`,
          );
          await uploadBytes(storageRef, file);
          documentUrls.push(await getDownloadURL(storageRef));
        }
      }

      // Upload captured photo
      let capturedPhotoUrl = null;
      if (projectData.capturedPhoto) {
        const blob = await fetch(projectData.capturedPhoto).then((r) =>
          r.blob(),
        );
        const storageRef = ref(
          storage,
          `projects/${user.uid}/photo_${Date.now()}.png`,
        );
        await uploadBytes(storageRef, blob);
        capturedPhotoUrl = await getDownloadURL(storageRef);
      }

      // Upload satellite image
      let satImageUrl = null;
      if (projectData.satImage) {
        const blob = await fetch(projectData.satImage).then((r) => r.blob());
        const storageRef = ref(
          storage,
          `projects/${user.uid}/satellite_${Date.now()}.png`,
        );
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
        satImage: null,
      });
      setShowMethodologyInfo(false); // Hide tooltip after submission
      setShowMethodologyPopup(false); // Hide popup after submission
    } catch (error) {
      console.error("Error adding project: ", error);
      alert("Failed to submit project. Check console for details.");
    }
  };

  // 🔹 Methodology info content
  const methodologyInfo = {
    vcs: {
      title: "Verified Carbon Standard (VCS)",
      description:
        "The world's most widely used voluntary carbon offset program. VCS ensures carbon projects are real, measurable, permanent, and additional. It's ideal for large-scale projects with rigorous verification.",
      keyFeatures: [
        "Most widely accepted standard globally",
        "Requires third-party verification",
        "Strong permanence requirements",
        "Suitable for large projects",
      ],
    },
    "gold-standard": {
      title: "Gold Standard",
      description:
        "A premium certification standard developed by WWF and other NGOs. It focuses on sustainable development benefits alongside carbon reduction, making it ideal for projects that benefit local communities.",
      keyFeatures: [
        "Emphasizes sustainable development",
        "Requires community benefits",
        "Highest environmental integrity",
        "Premium market positioning",
      ],
    },
    "plan-vivo": {
      title: "Plan Vivo",
      description:
        "A community-based standard designed for smallholder farmers and local communities. It's particularly suitable for agroforestry and land management projects that involve rural communities.",
      keyFeatures: [
        "Community-focused approach",
        "Designed for smallholders",
        "Supports rural livelihoods",
        "Flexible verification methods",
      ],
    },
    "climate-action": {
      title: "Climate Action Reserve",
      description:
        "A North American standard known for its rigorous protocols and conservative approach to carbon accounting. It's commonly used in the US and Canada with strong regulatory backing.",
      keyFeatures: [
        "North American focus",
        "Conservative carbon accounting",
        "Strong regulatory compliance",
        "Detailed monitoring requirements",
      ],
    },
  };

  // 🔹 Render methodology info as a tooltip that appears next to the dropdown
  const renderMethodologyInfo = () => {
    if (!showMethodologyInfo || !projectData.methodology) return null;

    const info = methodologyInfo[projectData.methodology];
    if (!info) return null;

    return (
      <div className="methodology-tooltip">
        <div className="tooltip-content">
          <h4>{info.title}</h4>
          <p>{info.description}</p>
          <h5>Key Features:</h5>
          <ul>
            {info.keyFeatures.map((feature, index) => (
              <li key={index}>• {feature}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  // 🔹 Render methodology popup
  const renderMethodologyPopup = () => {
    if (!showMethodologyPopup) return null;

    return (
      <div
        className="methodology-popup-overlay"
        onClick={() => setShowMethodologyPopup(false)}
      >
        <div className="methodology-popup" onClick={(e) => e.stopPropagation()}>
          <div className="popup-header">
            <h3>What is Methodology?</h3>
            <button
              className="close-button"
              onClick={() => setShowMethodologyPopup(false)}
            >
              ×
            </button>
          </div>
          <div className="popup-content">
            <p>
              A methodology is a standardized framework or set of rules used to
              measure, monitor, and verify carbon sequestration projects. It
              ensures that carbon credits are real, measurable, permanent, and
              additional.
            </p>
            <p>
              Different methodologies are suited for different types of projects
              and regions, and choosing the right one is crucial for successful
              carbon credit generation.
            </p>
          </div>
          <div className="popup-footer">
            <button
              className="btn-primary"
              onClick={() => setShowMethodologyPopup(false)}
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">🌱 Add New Project</h1>
        <p className="page-subtitle">
          Submit your blue carbon project for verification and credit generation
        </p>
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
                <option value="">Select blue carbon project type</option>
                {/* Mangrove Ecosystems */}
                <optgroup label="Mangrove Ecosystems">
                  <option value="mangrove-restoration">
                    Mangrove Restoration
                  </option>
                  <option value="mangrove-reforestation">
                    Mangrove Reforestation
                  </option>
                  <option value="mangrove-conservation">
                    Mangrove Conservation
                  </option>
                  <option value="mangrove-fire-prevention">
                    Mangrove Fire Prevention
                  </option>
                  <option value="mangrove-agroforestry">
                    Mangrove Agroforestry
                  </option>
                </optgroup>

                {/* Seagrass Ecosystems */}
                <optgroup label="Seagrass Ecosystems">
                  <option value="seagrass-restoration">
                    Seagrass Bed Restoration
                  </option>
                  <option value="seagrass-conservation">
                    Seagrass Conservation
                  </option>
                  <option value="seagrass-transplantation">
                    Seagrass Transplantation
                  </option>
                  <option value="seagrass-disease-management">
                    Seagrass Disease Management
                  </option>
                </optgroup>

                {/* Salt Marsh & Wetlands */}
                <optgroup label="Salt Marsh & Wetlands">
                  <option value="salt-marsh-restoration">
                    Salt Marsh Restoration
                  </option>
                  <option value="coastal-wetland-restoration">
                    Coastal Wetland Restoration
                  </option>
                  <option value="tidal-wetland-conservation">
                    Tidal Wetland Conservation
                  </option>
                  <option value="brackish-marsh-creation">
                    Brackish Marsh Creation
                  </option>
                </optgroup>

                {/* Kelp & Macroalgae */}
                <optgroup label="Kelp & Macroalgae">
                  <option value="kelp-forest-restoration">
                    Kelp Forest Restoration
                  </option>
                  <option value="macroalgae-cultivation">
                    Macroalgae Cultivation
                  </option>
                  <option value="kelp-disease-prevention">
                    Kelp Disease Prevention
                  </option>
                </optgroup>

                {/* Oyster & Shellfish */}
                <optgroup label="Oyster & Shellfish Reefs">
                  <option value="oyster-reef-restoration">
                    Oyster Reef Restoration
                  </option>
                  <option value="shellfish-reef-conservation">
                    Shellfish Reef Conservation
                  </option>
                  <option value="crab-habitat-restoration">
                    Crab Habitat Restoration
                  </option>
                </optgroup>

                {/* Coastal Protection */}
                <optgroup label="Coastal Protection">
                  <option value="coastal-dune-restoration">
                    Coastal Dune Restoration
                  </option>
                  <option value="ecosystem-connectivity">
                    Ecosystem Connectivity
                  </option>
                  <option value="integrated-coastal-management">
                    Integrated Coastal Management
                  </option>
                </optgroup>
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
            <div
              className="methodology-container"
              onMouseEnter={() => setShowMethodologyInfo(true)}
              onMouseLeave={() => setShowMethodologyInfo(false)}
            >
              <select
                id="methodology"
                name="methodology"
                value={projectData.methodology}
                onChange={handleInputChange}
                required
                onFocus={() => setShowMethodologyInfo(true)}
                onBlur={() => {
                  if (!projectData.methodology) {
                    setShowMethodologyInfo(false);
                  }
                }}
              >
                <option value="">Select methodology</option>
                <option value="vcs">Verified Carbon Standard (VCS)</option>
                <option value="gold-standard">Gold Standard</option>
                <option value="plan-vivo">Plan Vivo</option>
                <option value="climate-action">Climate Action Reserve</option>
              </select>

              {/* 🔹 Info icon button next to the label */}
              <button
                type="button"
                className="info-icon-button"
                onClick={() => setShowMethodologyPopup(true)}
              >
                i
              </button>

              {/* 🔹 Render methodology info as a tooltip next to the dropdown */}
              {renderMethodologyInfo()}
            </div>
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
            <small className="form-help">
              Upload project plans, environmental assessments, permits, etc.
            </small>
          </div>
        </div>

        <div className="form-section">
          <h3>Satellite & AI Verification</h3>
          <GreenCapture onDataCapture={handleVerifierData} />
        </div>

        <div className="form-section">
          <button type="submit" className="submit-button">
            Submit Project
          </button>
        </div>
      </form>

      {/* 🔹 Render methodology popup */}
      {renderMethodologyPopup()}
    </div>
  );
}
