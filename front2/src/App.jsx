import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

// Simple placeholder dashboards (you can style them later)
function FarmerDashboard() {
  return (
    <div className="h-screen flex items-center justify-center bg-green-100">
      <h1 className="text-3xl font-bold">🌾 Farmer Dashboard</h1>
    </div>
  );
}

function BuyerDashboard() {
  return (
    <div className="h-screen flex items-center justify-center bg-blue-100">
      <h1 className="text-3xl font-bold">🛒 Buyer Dashboard</h1>
    </div>
  );
}

function AdminDashboard() {
  return (
    <div className="h-screen flex items-center justify-center bg-red-100">
      <h1 className="text-3xl font-bold">🛡️ Admin Dashboard</h1>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/farmer" element={<FarmerDashboard />} />
        <Route path="/buyer" element={<BuyerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
