import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NavbarWrapper from "./components/NavbarWrapper.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import FarmerHome from "./pages/FarmerHome.jsx";
import BuyerHome from "./pages/BuyerHome.jsx";
import AdminHome from "./pages/AdminHome.jsx";
import Profile from "./pages/Profile.jsx";
import ProfileDisplay from "./pages/ProfileDisplay.jsx";
import AddProject from "./pages/AddProject.jsx";
import MRVDashboard from "./pages/MRVDashboardfarmer.jsx";
import MRVDashboardBuyer from "./pages/MRVDashboardbuyer.jsx";
import Marketplace from "./pages/Marketplace.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import About from "./pages/About.jsx";

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
        
        {/* Profile pages */}
        <Route path="/profile" element={<ProfileDisplay />} />
        <Route path="/profile-form" element={<Profile />} />
        <Route path="/profile-display" element={<ProfileDisplay />} />
        
        {/* Farmer-specific pages */}
        <Route path="/add-project" element={<AddProject />} />
        <Route path="/mrv-dashboard" element={<MRVDashboard />} />
        <Route path="/marketplace" element={<Marketplace />} />
        
        {/* Buyer-specific pages */}
        <Route path="/mrv-dashboard-buyer" element={<MRVDashboardBuyer />} />
        
        {/* General pages */}
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<About />} />
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
