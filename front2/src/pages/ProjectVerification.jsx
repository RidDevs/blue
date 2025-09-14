import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ProjectVerification() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [verificationStep, setVerificationStep] = useState(1);
  const [verificationNotes, setVerificationNotes] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('pending');

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockProjects = [
      {
        id: 1,
        name: 'Mangrove Restoration - Sundarbans',
        type: 'Mangrove Restoration',
        location: 'Sundarbans, Bangladesh',
        submittedBy: 'Dr. Marina Santos',
        submittedDate: '2024-01-15',
        status: 'pending',
        estimatedCredits: 1500,
        area: '25 hectares',
        documents: ['field_report.pdf', 'satellite_images.zip', 'carbon_assessment.xlsx'],
        description: 'Comprehensive mangrove restoration project in the Sundarbans delta focusing on Rhizophora species restoration.',
        verificationHistory: []
      },
      {
        id: 2,
        name: 'Seagrass Carbon Sequestration',
        type: 'Seagrass Restoration',
        location: 'Great Barrier Reef, Australia',
        submittedBy: 'James Chen',
        submittedDate: '2024-01-14',
        status: 'under_review',
        estimatedCredits: 800,
        area: '15 hectares',
        documents: ['research_paper.pdf', 'underwater_photos.zip', 'carbon_measurements.xlsx'],
        description: 'Seagrass restoration project to enhance carbon sequestration in the Great Barrier Reef ecosystem.',
        verificationHistory: [
          {
            step: 'Initial Review',
            reviewer: 'Admin Team',
            date: '2024-01-16',
            status: 'completed',
            notes: 'Initial documentation review completed. All required documents submitted.'
          }
        ]
      },
      {
        id: 3,
        name: 'Coral Reef Protection Initiative',
        type: 'Coral Reef Conservation',
        location: 'Maldives',
        submittedBy: 'Sarah Williams',
        submittedDate: '2024-01-13',
        status: 'verified',
        estimatedCredits: 2000,
        area: '40 hectares',
        documents: ['conservation_plan.pdf', 'monitoring_data.xlsx', 'impact_assessment.pdf'],
        description: 'Coral reef protection and restoration initiative in the Maldives to prevent bleaching and enhance biodiversity.',
        verificationHistory: [
          {
            step: 'Initial Review',
            reviewer: 'Admin Team',
            date: '2024-01-14',
            status: 'completed',
            notes: 'Documentation verified and approved.'
          },
          {
            step: 'Field Verification',
            reviewer: 'Dr. Ocean Expert',
            date: '2024-01-15',
            status: 'completed',
            notes: 'Field verification completed. Project meets all standards.'
          },
          {
            step: 'Final Approval',
            reviewer: 'Verification Committee',
            date: '2024-01-16',
            status: 'completed',
            notes: 'Project approved for carbon credit generation.'
          }
        ]
      }
    ];
    setProjects(mockProjects);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'status-badge pending';
      case 'under_review':
        return 'status-badge active';
      case 'verified':
        return 'status-badge verified';
      case 'rejected':
        return 'status-badge rejected';
      default:
        return 'status-badge no-reports';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending Review';
      case 'under_review':
        return 'Under Review';
      case 'verified':
        return 'Verified';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Unknown';
    }
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setVerificationStep(1);
    setVerificationNotes('');
    setVerificationStatus(project.status);
  };

  const handleVerificationAction = (action) => {
    if (!selectedProject) return;

    const updatedProjects = projects.map(project => {
      if (project.id === selectedProject.id) {
        const newHistoryEntry = {
          step: `Step ${verificationStep}`,
          reviewer: 'Current User',
          date: new Date().toISOString().split('T')[0],
          status: action,
          notes: verificationNotes
        };

        return {
          ...project,
          status: action === 'approved' ? 'verified' : action === 'rejected' ? 'rejected' : 'under_review',
          verificationHistory: [...project.verificationHistory, newHistoryEntry]
        };
      }
      return project;
    });

    setProjects(updatedProjects);
    setSelectedProject(updatedProjects.find(p => p.id === selectedProject.id));
    setVerificationNotes('');
    setVerificationStep(verificationStep + 1);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">🔍 Project Verification</h1>
        <p className="page-subtitle">
          Review and verify submitted blue carbon projects for carbon credit generation
        </p>
      </div>

      <div className="verification-content">
        {/* Projects List */}
        <div className="projects-section">
          <div className="section-header">
            <h3>📋 Submitted Projects</h3>
            <div className="projects-stats">
              <span className="stat-item">
                <strong>{projects.filter(p => p.status === 'pending').length}</strong> Pending
              </span>
              <span className="stat-item">
                <strong>{projects.filter(p => p.status === 'under_review').length}</strong> Under Review
              </span>
              <span className="stat-item">
                <strong>{projects.filter(p => p.status === 'verified').length}</strong> Verified
              </span>
            </div>
          </div>

          <div className="projects-grid">
            {projects.map(project => (
              <div 
                key={project.id} 
                className={`project-card ${selectedProject?.id === project.id ? 'selected' : ''}`}
                onClick={() => handleProjectSelect(project)}
              >
                <div className="project-header">
                  <h4>{project.name}</h4>
                  <span className={getStatusColor(project.status)}>
                    {getStatusText(project.status)}
                  </span>
                </div>
                
                <div className="project-details">
                  <p><strong>Type:</strong> {project.type}</p>
                  <p><strong>Location:</strong> {project.location}</p>
                  <p><strong>Submitted by:</strong> {project.submittedBy}</p>
                  <p><strong>Date:</strong> {project.submittedDate}</p>
                  <p><strong>Estimated Credits:</strong> {project.estimatedCredits} tons CO₂</p>
                  <p><strong>Area:</strong> {project.area}</p>
                </div>

                <div className="project-description">
                  <p>{project.description}</p>
                </div>

                <div className="project-documents">
                  <h5>📎 Documents:</h5>
                  <ul>
                    {project.documents.map((doc, index) => (
                      <li key={index}>{doc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verification Panel */}
        {selectedProject && (
          <div className="verification-panel">
            <div className="panel-header">
              <h3>🔍 Verification Process</h3>
              <span className="project-name">{selectedProject.name}</span>
            </div>

            {/* Verification Steps */}
            <div className="verification-steps">
              <div className="steps-header">
                <h4>Verification Steps</h4>
              </div>
              
              <div className="steps-list">
                <div className={`step-item ${verificationStep >= 1 ? 'active' : ''}`}>
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h5>Document Review</h5>
                    <p>Review submitted documentation and verify completeness</p>
                  </div>
                </div>
                
                <div className={`step-item ${verificationStep >= 2 ? 'active' : ''}`}>
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h5>Technical Assessment</h5>
                    <p>Evaluate technical feasibility and carbon calculations</p>
                  </div>
                </div>
                
                <div className={`step-item ${verificationStep >= 3 ? 'active' : ''}`}>
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h5>Field Verification</h5>
                    <p>Conduct on-site verification and measurements</p>
                  </div>
                </div>
                
                <div className={`step-item ${verificationStep >= 4 ? 'active' : ''}`}>
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h5>Final Approval</h5>
                    <p>Approve or reject the project for carbon credit generation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Actions */}
            <div className="verification-actions">
              <div className="action-section">
                <h4>Verification Notes</h4>
                <textarea
                  value={verificationNotes}
                  onChange={(e) => setVerificationNotes(e.target.value)}
                  placeholder="Add your verification notes and observations..."
                  rows="4"
                />
              </div>

              <div className="action-buttons">
                <button 
                  className="btn-primary"
                  onClick={() => handleVerificationAction('approved')}
                  disabled={verificationStep > 4}
                >
                  ✅ Approve
                </button>
                <button 
                  className="btn-secondary"
                  onClick={() => handleVerificationAction('needs_revision')}
                  disabled={verificationStep > 4}
                >
                  📝 Request Revision
                </button>
                <button 
                  className="btn-danger"
                  onClick={() => handleVerificationAction('rejected')}
                  disabled={verificationStep > 4}
                >
                  ❌ Reject
                </button>
              </div>
            </div>

            {/* Verification History */}
            {selectedProject.verificationHistory.length > 0 && (
              <div className="verification-history">
                <h4>📜 Verification History</h4>
                <div className="history-timeline">
                  {selectedProject.verificationHistory.map((entry, index) => (
                    <div key={index} className="history-item">
                      <div className="history-icon">
                        {entry.status === 'completed' ? '✅' : '⏳'}
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
        )}
      </div>
    </div>
  );
}
