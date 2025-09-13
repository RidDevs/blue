import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../index.css";

export default function MRVDashboard() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mrvData, setMrvData] = useState({
    carbonSequestered: "",
    biomassGrowth: "",
    areaMonitored: "",
    monitoringDate: "",
    methodology: "",
    verificationStatus: "pending",
    notes: ""
  });

  useEffect(() => {
    // Load user projects
    const userProjects = JSON.parse(localStorage.getItem('userProjects') || '[]');
    setProjects(userProjects);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMrvData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitReport = (e) => {
    e.preventDefault();
    if (!selectedProject) {
      alert('Please select a project first');
      return;
    }

    // Save MRV report
    const existingReports = JSON.parse(localStorage.getItem('mrvReports') || '[]');
    const newReport = {
      ...mrvData,
      id: Date.now(),
      projectId: selectedProject.id,
      projectName: selectedProject.projectName,
      submittedAt: new Date().toISOString()
    };
    existingReports.push(newReport);
    localStorage.setItem('mrvReports', JSON.stringify(existingReports));
    
    alert('MRV Report submitted successfully!');
    // Reset form
    setMrvData({
      carbonSequestered: "",
      biomassGrowth: "",
      areaMonitored: "",
      monitoringDate: "",
      methodology: "",
      verificationStatus: "pending",
      notes: ""
    });
    setSelectedProject(null);
  };

  const getMRVReports = () => {
    return JSON.parse(localStorage.getItem('mrvReports') || '[]');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">📊 MRV Dashboard</h1>
        <p className="page-subtitle">Monitor, Report, and Verify your blue carbon projects</p>
      </div>

      <div className="mrv-content">
        {/* Project Selection */}
        <div className="mrv-section">
          <h3>Select Project for Monitoring</h3>
          <div className="project-grid">
            {projects.length > 0 ? (
              projects.map(project => (
                <div 
                  key={project.id} 
                  className={`project-card ${selectedProject?.id === project.id ? 'selected' : ''}`}
                  onClick={() => setSelectedProject(project)}
                >
                  <h4>{project.projectName}</h4>
                  <p><strong>Type:</strong> {project.projectType}</p>
                  <p><strong>Location:</strong> {project.location}</p>
                  <p><strong>Area:</strong> {project.area} hectares</p>
                  <span className={`status-badge ${project.status}`}>
                    {project.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="no-projects">
                <p>No projects found. <Link to="/add-project">Add your first project</Link></p>
              </div>
            )}
          </div>
        </div>

        {/* MRV Report Form */}
        {selectedProject && (
          <div className="mrv-section">
            <h3>Submit MRV Report for: {selectedProject.projectName}</h3>
            <form className="mrv-form" onSubmit={handleSubmitReport}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="carbonSequestered">Carbon Sequestered (tCO2) *</label>
                  <input
                    type="number"
                    id="carbonSequestered"
                    name="carbonSequestered"
                    value={mrvData.carbonSequestered}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter carbon sequestered"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="biomassGrowth">Biomass Growth (%) *</label>
                  <input
                    type="number"
                    id="biomassGrowth"
                    name="biomassGrowth"
                    value={mrvData.biomassGrowth}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter biomass growth percentage"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="areaMonitored">Area Monitored (hectares) *</label>
                  <input
                    type="number"
                    id="areaMonitored"
                    name="areaMonitored"
                    value={mrvData.areaMonitored}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter monitored area"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="monitoringDate">Monitoring Date *</label>
                  <input
                    type="date"
                    id="monitoringDate"
                    name="monitoringDate"
                    value={mrvData.monitoringDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="methodology">Verification Methodology *</label>
                <select
                  id="methodology"
                  name="methodology"
                  value={mrvData.methodology}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select methodology</option>
                  <option value="remote-sensing">Remote Sensing</option>
                  <option value="field-sampling">Field Sampling</option>
                  <option value="drone-survey">Drone Survey</option>
                  <option value="satellite-imagery">Satellite Imagery</option>
                  <option value="combined">Combined Methods</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="notes">Additional Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={mrvData.notes}
                  onChange={handleInputChange}
                  placeholder="Add any additional observations or notes..."
                  rows="3"
                />
              </div>

              <button type="submit" className="btn-primary">
                Submit MRV Report
              </button>
            </form>
          </div>
        )}

        {/* Recent Reports */}
        <div className="mrv-section">
          <h3>Recent MRV Reports</h3>
          <div className="reports-list">
            {getMRVReports().slice(-5).map(report => (
              <div key={report.id} className="report-item">
                <div className="report-header">
                  <h4>{report.projectName}</h4>
                  <span className={`status-badge ${report.verificationStatus}`}>
                    {report.verificationStatus}
                  </span>
                </div>
                <div className="report-details">
                  <p><strong>Carbon Sequestered:</strong> {report.carbonSequestered} tCO2</p>
                  <p><strong>Monitoring Date:</strong> {new Date(report.monitoringDate).toLocaleDateString()}</p>
                  <p><strong>Methodology:</strong> {report.methodology}</p>
                </div>
              </div>
            ))}
            {getMRVReports().length === 0 && (
              <p className="no-reports">No MRV reports submitted yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
