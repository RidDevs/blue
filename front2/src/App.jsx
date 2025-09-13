import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NavbarWrapper from "./components/NavbarWrapper.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import FarmerHome from "./pages/FarmerHome.jsx";
import BuyerHome from "./pages/BuyerHome.jsx";
import AdminHome from "./pages/AdminHome.jsx";
import Profile from "./pages/Profile.jsx";
import AddProject from "./pages/AddProject.jsx";
import MRVDashboard from "./pages/MRVDashboard.jsx";
import Marketplace from "./pages/Marketplace.jsx";

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/';

  return (
    <>
      {!hideNavbar && <NavbarWrapper />}
      <Routes>
        {/* Default page - Login */}
        <Route path="/" element={<Login />} />

        {/* Login page */}
        <Route path="/login" element={<Login />} />
        
        {/* SignUp page */}
        <Route path="/signup" element={<SignUp />} />

        {/* Role-specific home pages */}
        <Route path="/farmer" element={<FarmerHome />} />
        <Route path="/buyer" element={<BuyerHome />} />
        <Route path="/admin" element={<AdminHome />} />
        
        {/* Profile page */}
        <Route path="/profile" element={<Profile />} />
        
        {/* Farmer-specific pages */}
        <Route path="/add-project" element={<AddProject />} />
        <Route path="/mrv-dashboard" element={<MRVDashboard />} />
        <Route path="/marketplace" element={<Marketplace />} />
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
