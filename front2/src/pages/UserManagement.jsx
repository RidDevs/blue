import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "farmer",
    organization: "",
    phone: "",
    location: "",
  });

  // 🔹 Fetch users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // 🔹 Add new user
  const handleAddUser = async () => {
    try {
      const userData = {
        name: newUser.name || "Unnamed User",
        email: newUser.email || "no-email@example.com",
        role: newUser.role || "farmer",
        organization: newUser.organization || "N/A",
        phone: newUser.phone || "N/A",
        location: newUser.location || "N/A",
        joinDate: new Date().toISOString().split("T")[0],
        lastActive: new Date().toISOString().split("T")[0],
        status: "pending",
        projects: 0,
        credits: 0,
        avatar:
          newUser.role === "farmer"
            ? "👩‍🌾"
            : newUser.role === "buyer"
            ? "👨‍💼"
            : "👨‍💻",
      };

      const docRef = await addDoc(collection(db, "users"), userData);
      setUsers([...users, { id: docRef.id, ...userData }]);

      setNewUser({
        name: "",
        email: "",
        role: "farmer",
        organization: "",
        phone: "",
        location: "",
      });
      setShowAddUser(false);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // 🔹 Update role
  const handleRoleChange = async (userId, newRole) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { role: newRole });
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  // 🔹 Update status
  const handleStatusChange = async (userId, newStatus) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { status: newStatus });
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, status: newStatus } : user
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // 🔹 Filtering
  const filteredUsers = users.filter((user) => {
    const name = (user.name || "").toLowerCase();
    const email = (user.email || "").toLowerCase();
    const organization = (user.organization || "").toLowerCase();

    const matchesSearch =
      name.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase()) ||
      organization.includes(searchTerm.toLowerCase());

    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="user-management">
      <h2>👥 User Management</h2>

      {/* Search + Filter */}
      <div className="controls">
        <input
          type="text"
          placeholder="🔍 Search by name, email, org..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="all">All Roles</option>
          <option value="farmer">Farmers</option>
          <option value="buyer">Buyers</option>
          <option value="verifier">Verifiers</option>
        </select>
        <button onClick={() => setShowAddUser(true)}>+ Add User</button>
      </div>

      {/* Add User Form */}
      {showAddUser && (
        <div className="add-user-form">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="farmer">Farmer</option>
            <option value="buyer">Buyer</option>
            <option value="verifier">Verifier</option>
          </select>
          <input
            type="text"
            placeholder="Organization"
            value={newUser.organization}
            onChange={(e) =>
              setNewUser({ ...newUser, organization: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Phone"
            value={newUser.phone}
            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
          />
          <input
            type="text"
            placeholder="Location"
            value={newUser.location}
            onChange={(e) =>
              setNewUser({ ...newUser, location: e.target.value })
            }
          />
          <button onClick={handleAddUser}>Save User</button>
        </div>
      )}

      {/* User Cards */}
      <div className="user-list">
        {filteredUsers.length === 0 ? (
          <p>No users found</p>
        ) : (
          filteredUsers.map((user) => (
            <div key={user.id} className="user-card">
              <div className="user-header">
                <span className="avatar">{user.avatar || "👤"}</span>
                <div>
                  <h4>{user.name || "Unnamed User"}</h4>
                  <p className="user-email">{user.email || "No email"}</p>
                </div>
              </div>
              <div className="user-details">
                <p>
                  <strong>📌 Organization:</strong>{" "}
                  {user.organization || "N/A"}
                </p>
                <p>
                  <strong>📍 Location:</strong> {user.location || "N/A"}
                </p>
                <p>
                  <strong>📞 Phone:</strong> {user.phone || "N/A"}
                </p>
                <p>
                  <strong>📅 Joined:</strong> {user.joinDate || "-"}
                </p>
                <p>
                  <strong>⏳ Last Active:</strong> {user.lastActive || "-"}
                </p>
              </div>
              <div className="user-actions">
                <label>
                  Status:
                  <select
                    value={user.status || "pending"}
                    onChange={(e) =>
                      handleStatusChange(user.id, e.target.value)
                    }
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="blocked">Blocked</option>
                  </select>
                </label>
                <label>
                  Role:
                  <select
                    value={user.role || "farmer"}
                    onChange={(e) =>
                      handleRoleChange(user.id, e.target.value)
                    }
                  >
                    <option value="farmer">Farmer</option>
                    <option value="buyer">Buyer</option>
                    <option value="verifier">Verifier</option>
                  </select>
                </label>
              </div>
              <div className="user-stats">
                <p>
                  <strong>📂 Projects:</strong> {user.projects || 0}
                </p>
                <p>
                  <strong>🌱 Credits:</strong> {user.credits || 0}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
