import DefaultNavbar from "./DefaultNavbar";

export default function DefaultLanding() {
  return (
    <div className="default-landing">
      <DefaultNavbar />

      {/* Hero Section */}
      <section className="default-hero">
        <div className="default-hero-content">
          {/* Left side hero text */}
          <div className="default-hero-text">
            <h1 className="default-hero-title">
              Welcome to CarbonLens
            </h1>
            <p className="default-hero-subtitle">
              Revolutionizing carbon credit trading through blockchain technology
              and sustainable agriculture
            </p>
            <div className="default-hero-actions">
              <a href="/login" className="default-btn-primary">
                Get Started
              </a>
              <a href="/about" className="default-btn-secondary">
                Learn More
              </a>
            </div>
          </div>

          {/* Right side spline model */}
         <div className="right-side">
  <div className="floating-emojis">
    <span className="emoji e1">🌱</span>
    <span className="emoji e2">🌍</span>
    <span className="emoji e3">☁️</span>
    <span className="emoji e4">🌳</span>
    <span className="emoji e5">🍃</span>
  </div>
</div>

        </div>
      </section>

      {/* Features Section */}
      <section className="default-features">
        <div className="default-container">
          <h2 className="default-section-title">Why Choose CarbonLens?</h2>
          <div className="default-features-grid">
            <div className="default-feature-card">
              <div className="default-feature-icon">🌾</div>
              <h3>For Farmers</h3>
              <p>
                Monetize your sustainable farming practices and earn carbon
                credits
              </p>
            </div>
            <div className="default-feature-card">
              <div className="default-feature-icon">💼</div>
              <h3>For Buyers</h3>
              <p>
                Invest in verified carbon credits and support environmental
                sustainability
              </p>
            </div>
            <div className="default-feature-card">
              <div className="default-feature-icon">🔒</div>
              <h3>Secure & Transparent</h3>
              <p>
                Blockchain-powered verification ensures trust and transparency
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="default-cta">
        <div className="default-container">
          <h2>Ready to Make a Difference?</h2>
          <p>
            Join thousands of farmers and buyers creating a sustainable future
          </p>
          <div className="default-cta-buttons">
            <a href="/signup" className="default-btn-primary">
              Sign Up Now
            </a>
            <a href="/contact" className="default-btn-secondary">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="default-footer">
        <div className="default-container">
          <div className="default-footer-content">
            <div className="default-footer-section">
              <h4>BlueCarbon</h4>
              <p>Sustainable carbon credit trading platform</p>
            </div>
            <div className="default-footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <a href="/about">About Us</a>
                </li>
                <li>
                  <a href="/contact">Contact</a>
                </li>
                <li>
                  <a href="/dashboard">Dashboard</a>
                </li>
              </ul>
            </div>
            <div className="default-footer-section">
              <h4>Get Started</h4>
              <ul>
                <li>
                  <a href="/login">Sign In</a>
                </li>
                <li>
                  <a href="/signup">Sign Up</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="default-footer-bottom">
            <p>&copy; 2025 CarbonLens- team Cryptocoral. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
