import DefaultNavbar from "./DefaultNavbar";

export default function DefaultDashboard() {
  return (
    <div className="default-dashboard">
      <DefaultNavbar />
      
      {/* Dashboard Header */}
      <section className="dashboard-header">
        <div className="dashboard-container">
          <h1 className="dashboard-title">BlueCarbon Platform Overview</h1>
          <p className="dashboard-subtitle">
            Explore carbon credit trading opportunities and environmental impact data
          </p>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="dashboard-stats">
        <div className="dashboard-container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🌱</div>
              <div className="stat-content">
                <h3 className="stat-number">5</h3>
                <p className="stat-label">Active Projects</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">💰</div>
              <div className="stat-content">
                <h3 className="stat-number">Rs 120000</h3>
                <p className="stat-label">Credits Traded</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🌍</div>
              <div className="stat-content">
                <h3 className="stat-number">85 T</h3>
                <p className="stat-label">CO2 Tons Offset</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-content">
                <h3 className="stat-number">20</h3>
                <p className="stat-label">Registered Users</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="market-overview">
        <div className="dashboard-container">
          <h2 className="section-title">Market Overview</h2>
          <div className="market-grid">
            <div className="market-card">
              <h3>Recent Projects</h3>
              <div className="project-list">
                <div className="project-item">
                  <span className="project-name">Sustainable Rice Farming</span>
                  <span className="project-credits">5 Credits</span>
                </div>
                <div className="project-item">
                  <span className="project-name">Forest Conservation</span>
                  <span className="project-credits">18 Credits</span>
                </div>
                <div className="project-item">
                  <span className="project-name">Solar Energy Initiative</span>
                  <span className="project-credits">6 Credits</span>
                </div>
              </div>
            </div>
            
            <div className="market-card">
              <h3>Price Trends</h3>
              <div className="price-info">
                <div className="price-item">
                  <span className="price-label">Current Price</span>
                  <span className="price-value">$15.50/Credit</span>
                </div>
                <div className="price-item">
                  <span className="price-label">24h Change</span>
                  <span className="price-value positive">0%</span>
                </div>
                <div className="price-item">
                  <span className="price-label">Volume</span>
                  <span className="price-value">1,250 Credits</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="dashboard-cta">
        <div className="dashboard-container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Join our platform to start trading carbon credits or list your sustainable projects</p>
            <div className="cta-buttons">
              <a href="/signup" className="cta-btn primary">Sign Up Now</a>
              <a href="/login" className="cta-btn secondary">Sign In</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
