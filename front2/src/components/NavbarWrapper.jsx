import { useEffect, useState } from "react";
import NavbarFarmer from "../pages/navbarfarmer.jsx";
import NavbarBuyer from "../pages/navbarbuyer.jsx";
import NavbarAdmin from "../pages/navbaradmin.jsx";

export default function NavbarWrapper() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Get user role from localStorage
    const role = localStorage.getItem('userRole');
    setUserRole(role);

    // Listen for storage changes to update navbar when role changes
    const handleStorageChange = () => {
      const newRole = localStorage.getItem('userRole');
      setUserRole(newRole);
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events when localStorage is updated in the same tab
    window.addEventListener('userRoleChanged', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userRoleChanged', handleStorageChange);
    };
  }, []);

  // Render appropriate navbar based on user role
  switch (userRole) {
    case 'farmer':
      return <NavbarFarmer />;
    case 'buyer':
      return <NavbarBuyer />;
    case 'admin':
      return <NavbarAdmin />;
    default:
      return <NavbarFarmer />; // Default fallback
  }
}
