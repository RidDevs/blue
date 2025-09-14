import { Link } from "react-router-dom";
import "../index.css";

export default function AdminHome() {
  return (
    <div className="home-container">
      <div className="hero-section hero-admin">
        <div className="hero-background">
          <iframe src='https://my.spline.design/claritystream-PcRCaul9f1sVG5MAA8AqRzW3/' frameborder='0' width='100%' height='100%'></iframe>
        </div>
        <div className="hero-content">
          
          <div className="hero-actions">
            <Link to="/project-verification" className="btn-hero-primary">
              Review Projects
            </Link>
            <Link to="/platform-analytics" className="btn-hero-secondary">
              View Analytics
            </Link>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-icon">👥</div>
          <h3>User Management</h3>
          <p>Manage farmers, buyers, and platform users</p>
          <Link to="/user-management" className="card-button">Manage Users</Link>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">✅</div>
          <h3>Project Verification</h3>
          <p>Review and approve carbon credit projects</p>
          <Link to="/project-verification" className="card-button">Review Projects</Link>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📊</div>
          <h3>Platform Analytics</h3>
          <p>Monitor platform performance and transactions</p>
          <Link to="/platform-analytics" className="card-button">View Analytics</Link>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">⚙️</div>
          <h3>System Settings</h3>
          <p>Configure platform settings and parameters</p>
          <Link to="/system-settings" className="card-button">Settings</Link>
        </div>
      </div>

      <div className="admin-stats">
        <h2>Platform Overview</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">1,247</div>
            <div className="stat-label">Active Projects</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">856</div>
            <div className="stat-label">Registered Farmers</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">342</div>
            <div className="stat-label">Active Buyers</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">125,430</div>
            <div className="stat-label">Credits Traded</div>
          </div>
        </div>
      </div>

      <div className="pending-actions">
        <h2>Pending Actions</h2>
        <div className="action-list">
          <div className="action-item urgent">
            <span className="action-icon">⚠️</span>
            <span>5 projects awaiting verification</span>
            <Link to="/project-verification" className="action-link">Review</Link>
          </div>
          <div className="action-item">
            <span className="action-icon">👤</span>
            <span>3 new user registrations to approve</span>
            <Link to="/user-management" className="action-link">Approve</Link>
          </div>
          <div className="action-item">
            <span className="action-icon">📋</span>
            <span>Monthly compliance report due</span>
            <Link to="/reports" className="action-link">Generate</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
