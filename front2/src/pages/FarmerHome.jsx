import { Link } from "react-router-dom";
import "../index.css";

export default function FarmerHome() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">🌾 Welcome, Farmer!</h1>
        <p className="hero-subtitle">Manage your blue carbon projects and track environmental impact</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-icon">🌱</div>
          <h3>My Projects</h3>
          <p>View and manage your carbon sequestration projects</p>
          <Link to="/add-project" className="card-button">Add New Project</Link>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📊</div>
          <h3>MRV Dashboard</h3>
          <p>Monitor, Report, and Verify your carbon credits</p>
          <Link to="/mrv-dashboard" className="card-button">View Dashboard</Link>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">💰</div>
          <h3>Marketplace</h3>
          <p>Sell your verified carbon credits</p>
          <Link to="/marketplace" className="card-button">Go to Market</Link>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📈</div>
          <h3>Analytics</h3>
          <p>Track your environmental and financial impact</p>
          <Link to="/analytics" className="card-button">View Analytics</Link>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-icon">✅</span>
            <span>Project "Mangrove Restoration" verified</span>
            <span className="activity-time">2 hours ago</span>
          </div>
          <div className="activity-item">
            <span className="activity-icon">💰</span>
            <span>Sold 150 carbon credits</span>
            <span className="activity-time">1 day ago</span>
          </div>
          <div className="activity-item">
            <span className="activity-icon">📊</span>
            <span>Monthly MRV report submitted</span>
            <span className="activity-time">3 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
