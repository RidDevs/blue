import { Link } from "react-router-dom";
import "../index.css";

export default function BuyerHome() {
  return (
    <div className="home-container">
      <div className="hero-section hero-fullscreen">
        <h1 className="hero-title">🛒 Welcome, Buyer!</h1>
        <p className="hero-subtitle">Discover and purchase verified blue carbon credits</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-icon">🛒</div>
          <h3>Browse Marketplace</h3>
          <p>Explore available carbon credits from verified projects</p>
          <Link to="/marketplace" className="card-button">Browse Credits</Link>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📋</div>
          <h3>My Purchases</h3>
          <p>View your carbon credit portfolio and certificates</p>
          <Link to="/my-purchases" className="card-button">View Portfolio</Link>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">🔍</div>
          <h3>Project Verification</h3>
          <p>Research project details and verification status</p>
          <Link to="/verification" className="card-button">Verify Projects</Link>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📊</div>
          <h3>Impact Reports</h3>
          <p>Track your carbon offset contributions</p>
          <Link to="/impact-reports" className="card-button">View Impact</Link>
        </div>
      </div>

      <div className="featured-projects">
        <h2>Featured Projects</h2>
        <div className="project-grid">
          <div className="project-card">
            <div className="project-image">🌊</div>
            <h4>Coastal Mangrove Restoration</h4>
            <p>1,250 credits available</p>
            <span className="project-price">$25/credit</span>
          </div>
          <div className="project-card">
            <div className="project-image">🐟</div>
            <h4>Seagrass Conservation</h4>
            <p>800 credits available</p>
            <span className="project-price">$30/credit</span>
          </div>
          <div className="project-card">
            <div className="project-image">🦪</div>
            <h4>Oyster Reef Restoration</h4>
            <p>600 credits available</p>
            <span className="project-price">$35/credit</span>
          </div>
        </div>
      </div>
    </div>
  );
}
