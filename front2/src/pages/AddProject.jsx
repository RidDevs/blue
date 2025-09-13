import { useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";

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
    documents: null
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save project data
    const existingProjects = JSON.parse(localStorage.getItem('userProjects') || '[]');
    const newProject = {
      ...projectData,
      id: Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    existingProjects.push(newProject);
    localStorage.setItem('userProjects', JSON.stringify(existingProjects));
    alert('Project submitted successfully!');
    // Reset form
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
      documents: null
    });
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

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Submit Project
          </button>
          <Link to="/farmer" className="btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
