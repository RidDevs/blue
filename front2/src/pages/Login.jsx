import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css"; // import CSS file

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
    <div className="login-container">
      <div className="login-card">
        {/* Profile Icon */}
        <div className="profile-icon">👤</div>

        <h2 className="login-title">Login as</h2>

        <input
          type="text"
          placeholder="Name"
          className="login-input"
        />

        <input
          type="email"
          placeholder="Email ID"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Role Selection */}
        <div className="role-buttons">
          <button
            onClick={() => setRole("farmer")}
            className={role === "farmer" ? "active" : ""}
          >
            🌾 Farmer
          </button>
          <button
            onClick={() => setRole("buyer")}
            className={role === "buyer" ? "active" : ""}
          >
            🛒 Buyer
          </button>
          <button
            onClick={() => setRole("admin")}
            className={role === "admin" ? "active" : ""}
          >
            🛡️ Admin
          </button>
        </div>

        <button onClick={handleLogin} className="login-btn">
          LOGIN
        </button>
      </div>
    </div>
  );
}
