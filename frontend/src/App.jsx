import { Routes, Route, useLocation } from "react-router-dom";
import NavbarWrapper from "./components/NavbarWrapper.jsx";
import DefaultLanding from "./pages/DefaultLanding.jsx";
import DefaultDashboard from "./pages/DefaultDashboard.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import FarmerHome from "./pages/FarmerHome.jsx";
import BuyerHome from "./pages/BuyerHome.jsx";
import AdminHome from "./pages/AdminHome.jsx";
import Profile from "./pages/Profile.jsx";
import ProfileDisplay from "./pages/ProfileDisplay.jsx";
import AddProject from "./pages/AddProject.jsx";
import MRVDashboardfarmer from "./pages/MRVDashboardfarmer.jsx";
import MRVDashboardBuyer from "./pages/MRVDashboardbuyer.jsx";
import Marketplace from "./pages/Marketplace.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import About from "./pages/About.jsx";
import ProjectVerification from "./pages/ProjectVerification.jsx";
import UserManagement from "./pages/UserManagement.jsx";
import Transactions from "./pages/Transactions.jsx";
import Reports from "./pages/Reports.jsx";

function AppContent() {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/" ||
    location.pathname === "/dashboard" ||
    location.pathname === "/about" ||
    location.pathname === "/contact";

  return (
    <>
      {!hideNavbar && <NavbarWrapper />}
      <Routes>
        <Route path="/blue" element={<DefaultLanding />} />
        <Route path="/dashboard" element={<DefaultDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/farmer" element={<FarmerHome />} />
        <Route path="/buyer" element={<BuyerHome />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/profile" element={<ProfileDisplay />} />
        <Route path="/profile-form" element={<Profile />} />
        <Route path="/profile-display" element={<ProfileDisplay />} />
        <Route path="/add-project" element={<AddProject />} />
        <Route path="/mrv-dashboard-farmer" element={<MRVDashboardfarmer />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/mrv-dashboard-buyer" element={<MRVDashboardBuyer />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<About />} />
        <Route path="/project-verification" element={<ProjectVerification />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </>
  );
}

export default function App() {
  return <AppContent />;
}
