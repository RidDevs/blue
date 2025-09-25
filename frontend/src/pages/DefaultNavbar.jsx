import { Link } from "react-router-dom";
import logo1 from "../assets/logo1.png";

export default function DefaultNavbar() {
  return (
    <nav className="navbar-container navbar-default">
      <div className="navbar-content">
        
        {/* Left side - Logo */}
          <div className="navbar-logo-button">
       <button><a href="./"> <div className="navbar-logo">
          
        </div></a></button></div>

        {/* Right side - Navigation and Buttons */}
        <div className="navbar-right">
          <div className="navbar-nav">
            <Link to="/" className="nav-link">
              <span className="nav-icon">🏠</span>
              Home
            </Link>
            <Link to="/dashboard" className="nav-link">
              <span className="nav-icon">📊</span>
              Dashboard
            </Link>
            <Link to="/about" className="nav-link">
              <span className="nav-icon">ℹ️</span>
              About Us
            </Link>
            <Link to="/contact" className="nav-link">
              <span className="nav-icon">📞</span>
              Contact Us
            </Link>
          </div>
          
          {/* Auth Buttons */}
          <div className="navbar-buttons">
            <Link to="/login" className="btn-signin">
              Sign In
            </Link>
            <Link to="/signup" className="btn-signup">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
