import { Link } from "react-router-dom";
import DefaultNavbar from "./DefaultNavbar";
import "../index.css";

export default function About() {
  return (
    <div className="about-container">
      <DefaultNavbar />
      <div className="about-header">
        <h1 className="about-title">🌊 About Blue Carbon Platform</h1>
        <p className="about-subtitle">Protecting coastal ecosystems through transparent carbon credit trading</p>
      </div>

      {/* Hero Section */}
      <div className="about-hero">
        <div className="hero-content">
          <h2>Revolutionizing Blue Carbon Conservation</h2>
          <p>Our platform connects coastal ecosystem protectors with carbon credit buyers, creating a transparent marketplace that drives real environmental impact while providing sustainable income for coastal communities.</p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="about-section">
        <h3>Our Mission</h3>
        <div className="mission-grid">
          <div className="mission-item">
            <div className="mission-icon">🌱</div>
            <h4>Environmental Protection</h4>
            <p>Safeguard critical coastal ecosystems including mangroves, seagrass beds, and salt marshes that store vast amounts of carbon.</p>
          </div>
          
          <div className="mission-item">
            <div className="mission-icon">🤝</div>
            <h4>Community Empowerment</h4>
            <p>Provide sustainable income opportunities for coastal communities through verified carbon credit projects.</p>
          </div>
          
          <div className="mission-item">
            <div className="mission-icon">🔗</div>
            <h4>Transparent Trading</h4>
            <p>Create a trustworthy marketplace with blockchain-verified transactions and rigorous project monitoring.</p>
          </div>
          
          <div className="mission-item">
            <div className="mission-icon">📊</div>
            <h4>Scientific Rigor</h4>
            <p>Ensure all projects meet international standards through our comprehensive MRV (Monitor, Report, Verify) system.</p>
          </div>
        </div>
      </div>

      {/* What is Blue Carbon */}
      <div className="about-section blue-carbon-section">
        <h3>What is Blue Carbon?</h3>
        <div className="blue-carbon-content">
          <div className="blue-carbon-text">
            <p>Blue carbon refers to the carbon captured and stored by coastal and marine ecosystems. These environments are among the most carbon-rich ecosystems on Earth, storing up to 10 times more carbon per hectare than terrestrial forests.</p>
            
            <div className="ecosystem-types">
              <h4>Key Blue Carbon Ecosystems:</h4>
              <ul>
                <li><strong>Mangroves:</strong> Tropical coastal forests that store carbon in both biomass and sediment</li>
                <li><strong>Seagrass Beds:</strong> Underwater meadows that sequester carbon in their roots and sediment</li>
                <li><strong>Salt Marshes:</strong> Coastal wetlands that capture carbon in plant matter and soil</li>
                <li><strong>Kelp Forests:</strong> Large marine algae that absorb CO2 from seawater</li>
              </ul>
            </div>
          </div>
          
          <div className="carbon-stats">
            <div className="stat-card">
              <div className="stat-number">10x</div>
              <div className="stat-label">More carbon storage than forests</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">50%</div>
              <div className="stat-label">Of ocean carbon sequestration</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">2-4x</div>
              <div className="stat-label">Faster carbon capture rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="about-section">
        <h3>How Our Platform Works</h3>
        <div className="process-steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Project Registration</h4>
              <p>Coastal communities and organizations register their blue carbon conservation projects with detailed documentation.</p>
            </div>
          </div>
          
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Verification Process</h4>
              <p>Our expert team verifies projects using international standards and satellite monitoring technology.</p>
            </div>
          </div>
          
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>MRV Monitoring</h4>
              <p>Continuous monitoring, reporting, and verification ensure project integrity and carbon sequestration accuracy.</p>
            </div>
          </div>
          
          <div className="step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h4>Credit Trading</h4>
              <p>Verified carbon credits are listed on our marketplace for transparent, secure trading with buyers worldwide.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="about-section">
        <h3>Our Team</h3>
        <div className="team-grid">
          <div className="team-member">
            <div className="member-avatar">👨‍💼</div>
            <h4></h4>
            <p className="member-role"></p>
            <p></p>
          </div>
          
          <div className="team-member">
            <div className="member-avatar">👩‍💻</div>
            <h4></h4>
            <p className="member-role"></p>
            <p></p>
          </div>
          
          <div className="team-member">
            <div className="member-avatar">👨‍🔬</div>
            <h4></h4>
            <p className="member-role"></p>
            <p>.</p>
          </div>
          
          <div className="team-member">
            <div className="member-avatar">👩‍🌾</div>
            <h4></h4>
            <p className="member-role"></p>
            <p>.</p>
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="about-section impact-section">
        <h3>Our Impact</h3>
        <div className="impact-stats">
          <div className="impact-stat">
            <div className="impact-number">5</div>
            <div className="impact-label">Active Projects</div>
          </div>
          <div className="impact-stat">
            <div className="impact-number">19</div>
            <div className="impact-label">Carbon Credits Traded</div>
          </div>
          <div className="impact-stat">
            <div className="impact-number">50,0</div>
            <div className="impact-label">Hectares Protected</div>
          </div>
          <div className="impact-stat">
            <div className="impact-number">3</div>
            <div className="impact-label">Communities Supported</div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="about-cta">
        <h3>Join the Blue Carbon Revolution</h3>
        <p>Whether you're a coastal community looking to protect your ecosystem or a business seeking to offset your carbon footprint, we're here to help.</p>
        <div className="cta-buttons">
          <Link to="/signup" className="btn-primary">Get Started</Link>
          <Link to="/contact" className="btn-secondary">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
