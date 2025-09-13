import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!role) {
      alert("Please select a role!");
      return;
    }
    navigate(`/${role}`);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-900 to-green-600">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">
        <h1 className="text-2xl font-extrabold text-center mb-6 text-blue-800">
          🌊 BlueCarbon Registry Login
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full p-3 mb-3 border rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full p-3 mb-6 border rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-between mb-6">
          <button
            onClick={() => setRole("farmer")}
            className={`px-4 py-2 rounded-lg ${
              role === "farmer" ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
          >
            🌾 Farmer
          </button>
          <button
            onClick={() => setRole("buyer")}
            className={`px-4 py-2 rounded-lg ${
              role === "buyer" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            🛒 Buyer
          </button>
          <button
            onClick={() => setRole("admin")}
            className={`px-4 py-2 rounded-lg ${
              role === "admin" ? "bg-red-600 text-white" : "bg-gray-200"
            }`}
          >
            🛡️ Admin
          </button>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-700 hover:bg-blue-900 text-white py-3 rounded-lg font-bold"
        >
          Login
        </button>
      </div>
    </div>
  );
}
