import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  
  // Check if user is logged in (check localStorage for userRole)
  const isLoggedIn = localStorage.getItem('userRole') !== null;

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
    <nav className="navbar-container navbar-farmer">
      <div className="navbar-content">
        
        {/* Left side - Logo */}
        <div className="navbar-logo">
          
        </div>

        {/* Right side - Navigation and Buttons */}
        <div className="navbar-right">
          <div className="navbar-nav">
            <Link to={getHomeRoute()} className="nav-link">
              <span className="nav-icon">🏠︎</span>
              Home
            </Link>
            <Link to="/mrv-dashboard-farmer" className="nav-link">
              <span className="nav-icon">📊</span>
              MRV Dashboard
            </Link>
            <Link to="/marketplace" className="nav-link">
              <span className="nav-icon">💰</span>
              Market Place
            </Link>
            <Link to="/add-project" className="nav-link">
              <span className="nav-icon">➕</span>
              Add Project
            </Link>
            <Link to="/profile" className="nav-link">
              <span className="nav-icon">👤</span>
              Profile
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
