import { Link } from "react-router-dom";
import "../index.css";

export default function BuyerHome() {
  return (
    <div className="home-container">
      <div className="hero-section hero-buyer">
        <div className="hero-background"></div>
        <div className="hero-content">
          <div className="hero-badge">🛒 Buyer Portal</div>
          <h1 className="hero-title">Invest in Nature. Own Verified Carbon Credits.</h1>
          <p className="hero-subtitle">
          Support Blue Carbon projects in India and track your real climate impact with transparency.
          </p>
          <div className="hero-actions">
            <Link to="/marketplace" className="btn-hero-primary">
              Browse Credits
            </Link>
            <Link to="/mrv-dashboard-buyer" className="btn-hero-secondary">
              View Portfolio
            </Link>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-icon">🛒</div>
          <h3>Browse Marketplace</h3>
          <p>Explore available carbon credits from verified projects</p>
          <Link to="/marketplace" className="card-button">Browse Credits</Link>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📊</div>
          <h3>MRV Dashboard</h3>
          <p>Monitor carbon credit marketplace and your portfolio</p>
          <Link to="/mrv-dashboard-buyer" className="card-button">View Dashboard</Link>
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
