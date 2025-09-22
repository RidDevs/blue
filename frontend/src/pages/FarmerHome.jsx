import { Link } from "react-router-dom"; 
import "../index.css";

export default function FarmerHome() {
  return (
    <div className="home-container">
      <div className="hero-section hero-farmer">
        <div className="hero-background"></div>
        <div className="hero-content">
          <div className="hero-badge">🌾 Farmer Portal</div>
          <h1 className="hero-title">Protecting Blue Carbon Ecosystems</h1>
          <p className="hero-subtitle">
          Monitor, report, and verify  carbon projects with transparent blockchain technology and community-driven impact tracking.
          </p>
          <div className="hero-actions">
            <Link to="/add-project" className="btn-hero-primary">
              Start New Project
            </Link>
            <Link to="/mrv-dashboard" className="btn-hero-secondary">
              View Dashboard
            </Link>
          </div>
        </div>
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

      {/* Footer Section */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} BlueCarbon Farmers. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  );
}
