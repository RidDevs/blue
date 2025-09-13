import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./pages/navbar.jsx";
import Home from "./pages/home.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/' || location.pathname === '/signup';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        {/* Default page - Login */}
        <Route path="/" element={<Login />} />
        
        {/* Home page */}
        <Route path="/home" element={<Home />} />

        {/* Login page */}
        <Route path="/login" element={<Login />} />
        
        {/* SignUp page */}
        <Route path="/signup" element={<SignUp />} />

        {/* Dashboards after login */}
        <Route path="/farmer" element={<h1>Farmer Dashboard</h1>} />
        <Route path="/buyer" element={<h1>Buyer Dashboard</h1>} />
        <Route path="/admin" element={<h1>Admin Dashboard</h1>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
