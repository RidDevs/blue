import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../index.css";

import { db, auth } from "../firebase"; // your firebase config
import { collection, query, where, getDocs } from "firebase/firestore";

import { ethers } from "ethers";
import { getContractWithSigner } from "../blockchain/contractWithSigner";



export default function MRVDashboard() {
  const [onChainCredits, setOnChainCredits] = useState({});
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

  // --- Fetch projects and credit data from Firestore ---
  useEffect(() => {
  const fetchUserProjects = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const projectsRef = collection(db, "projects");
      const q = query(projectsRef, where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);

      const userProjects = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setProjects(userProjects);

      // 🔹 Fetch on-chain credits for each project
      const contract = await getContractWithSigner();
      const creditsData = {};

      for (let project of userProjects) {
        if (!project.numericId || !project.farmerWalletAddress) continue;
        try {
          const creditsBN = await contract.getCreditsByProject(project.farmerWalletAddress, project.numericId);
          creditsData[project.id] = Number(ethers.utils.formatUnits(creditsBN, 0));
        } catch (err) {
          console.error(`Failed to fetch on-chain credits for project ${project.projectName}:`, err);
        }
      }

      setOnChainCredits(creditsData);

    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  fetchUserProjects();
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

  // --- Functions updated to use Firestore data ---

  // Calculate total credits from fetched projects
 const getTotalCarbonCredits = () => {
  return projects.reduce((total, project) => {
    const firestoreCredits = project.creditsGenerated || 0;
    const blockchainCredits = onChainCredits[project.id] || 0;
    return total + blockchainCredits;
  }, 0);
};


  // Get credits by project from fetched projects
  const getCarbonCreditsByProject = () => {
  const creditsByProject = {};
  projects.forEach(project => {
    const firestoreCredits = project.creditsGenerated || 0;
    const blockchainCredits = onChainCredits[project.id] || 0;
    if (firestoreCredits + blockchainCredits > 0) {
      creditsByProject[project.projectName] = blockchainCredits;
    }
  });
  return creditsByProject;
};

  // Get project status summary
  const getProjectStatusSummary = () => {
    // This is the ideal place to combine Firestore project data with localStorage MRV reports
    const reports = getMRVReports();
    return projects.map(project => {
      const projectReports = reports.filter(report => report.projectId === project.id);
      const lastReport = projectReports[projectReports.length - 1];

      return {
        ...project,
        totalCredits: project.creditsGenerated || 0, // Now using Firestore data
        reportsCount: projectReports.length,
        lastReportDate: lastReport ? lastReport.submittedAt : null,
        verificationStatus: lastReport ? lastReport.verificationStatus : (project.status || 'no-reports'),
      };
    });
  };

  // Mock carbon credit price data (unchanged)
  const getCarbonCreditPriceData = () => {
    return [
      { month: 'Jan', price: 45 },
      { month: 'Feb', price: 48 },
      { month: 'Mar', price: 52 },
      { month: 'Apr', price: 49 },
      { month: 'May', price: 55 },
      { month: 'Jun', price: 58 },
    ];
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">📊 MRV Dashboard</h1>
        <p className="page-subtitle">Monitor, Report, and Verify your blue carbon projects</p>
      </div>

      <div className="mrv-content">
        {/* Dashboard Overview */}
        <div className="dashboard-overview">
          {/* Carbon Credits Container */}
          <div className="mrv-section carbon-credits-section">
            <h3>💰 Generated Carbon Credits</h3>
            <div className="credits-summary">
              <div className="total-credits">
                <h4>Total Credits Generated</h4>
                <span className="credits-number">{getTotalCarbonCredits().toFixed(2)} tCO2</span>
              </div>
              <div className="credits-by-project">
                <h4>Credits by Project</h4>
                {Object.entries(getCarbonCreditsByProject()).map(([projectName, credits]) => (
                  <div key={projectName} className="project-credits">
                    <span className="project-name">{projectName}</span>
                    <span className="credits-amount">{credits.toFixed(3)} tCO2</span>
                  </div>
                ))}
                {Object.keys(getCarbonCreditsByProject()).length === 0 && (
                  <p className="no-credits">No carbon credits generated yet. Submit MRV reports to track credits.</p>
                )}
              </div>
            </div>
          </div>

          {/* Carbon Credit Price Graph */}
          {/* <div className="mrv-section price-graph-section">
            <h3>📈 Carbon Credit Price Trends</h3>
            <div className="price-graph">
              <div className="current-price">
                <span className="price-label">Current Price</span>
                <span className="price-value">₹58.00 per tCO2</span>
                <span className="price-change positive">+5.5% ↗</span>
              </div>
              <div className="price-chart">
                {getCarbonCreditPriceData().map((data, index) => (
                  <div key={data.month} className="price-bar">
                    <div 
                      className="bar" 
                      style={{ height: `${(data.price / 60) * 100}%` }}
                    ></div>
                    <span className="month-label">{data.month}</span>
                    <span className="price-label">₹{data.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div> */}
        </div>

        {/* My Projects Status */}
        <div className="mrv-section projects-status-section">
          <h3>🌱 My Projects Status</h3>
          <div className="projects-status-grid">
            {getProjectStatusSummary().map(project => (
              <div key={project.id} className="project-status-card">
                <div className="project-header">
                  <h4>{project.projectName}</h4>
                  <span className={`status-badge ${project.verificationStatus}`}>
                    {project.verificationStatus === 'no-reports' ? 'No Reports' : project.verificationStatus}
                  </span>
                </div>
                <div className="project-stats">
                  <div className="stat">
                    <span className="stat-label">Total Credits</span>
                    <span className="stat-value">{project.totalCredits.toFixed(2)} tCO2</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Reports Submitted</span>
                    <span className="stat-value">{project.reportsCount}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Last Report</span>
                    <span className="stat-value">
                      {project.lastReportDate 
                        ? new Date(project.lastReportDate).toLocaleDateString()
                        : 'Never'
                      }
                    </span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Project Area</span>
                    <span className="stat-value">{project.area} hectares</span>
                  </div>
                  {project.creditsGenerated > 0 && (
                    <div className="stat">
                      <span className="stat-label">Blockchain Tx</span>
                      <span className="stat-value tx-id">{project.blockchainTx}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {projects.length === 0 && (
              <div className="no-projects-status">
                <p>No projects found. <Link to="/add-project">Add your first project</Link></p>
              </div>
            )}
          </div>
        </div>

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