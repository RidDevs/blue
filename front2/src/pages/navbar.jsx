import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  
  // Check if user is logged in (on dashboard pages)
  const isLoggedIn = location.pathname.includes('/farmer') || 
                     location.pathname.includes('/buyer') || 
                     location.pathname.includes('/admin') ||
                     location.pathname === '/mrv-dashboard' ||
                     location.pathname === '/marketplace' ||
                     location.pathname === '/add-project';

  // Determine home route based on stored user role
  const getHomeRoute = () => {
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'farmer') return '/farmer';
    if (userRole === 'buyer') return '/buyer';
    if (userRole === 'admin') return '/admin';
    return '/login'; // Default to login if no role stored
  };

  const handleLogout = () => {
    // Clear any stored user data
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    // Navigate to login page
    window.location.href = '/login';
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        
        {/* Left side - Logo */}
        <div className="navbar-logo">
          <div className="logo-icon">
            <div className="logo-gradient"></div>
            <span className="logo-symbol">🌊</span>
          </div>
          <h1 className="logo-text">Carbonlens</h1>
        </div>

        {/* Right side - Navigation and Buttons */}
        <div className="navbar-right">
          <div className="navbar-nav">
            <Link to={getHomeRoute()} className="nav-link">
              <span className="nav-icon">🏠</span>
              Home
            </Link>
            <Link to="/mrv-dashboard" className="nav-link">
              <span className="nav-icon">📊</span>
              MRV Dashboard
            </Link>
            <Link to="/marketplace" className="nav-link">
              <span className="nav-icon">🛒</span>
              Market Place
            </Link>
            <Link to="/add-project" className="nav-link">
              <span className="nav-icon">➕</span>
              Add Project
            </Link>
          </div>
          
          {/* Conditional Auth Buttons */}
          <div className="navbar-buttons">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="btn-signin">
                  Sign In
                </Link>
                <Link to="/signup" className="btn-signup">
                  Sign Up
                </Link>
              </>
            ) : (
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
