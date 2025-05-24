import React, { useState } from "react";
import "./AdminDashboard.css";
import { useAuth } from "../Auth/AuthContext";

const dummyUsers = [
  { id: 1, name: "Alice", email: "alice@email.com", status: "active" },
  { id: 2, name: "Bob", email: "bob@email.com", status: "blocked" },
  { id: 3, name: "Charlie", email: "charlie@email.com", status: "active" },
];

const dummyAnalytics = {
  users: 120,
  jobs: 45,
  blocked: 5,
  reports: 3,
  activePercent: 95,
  blockedPercent: 5,
};

const AdminDashboard = () => {
  const { user, login } = useAuth();
  const [users, setUsers] = useState(dummyUsers);
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@email.com",
    photo: null,
  });

  const handleBlock = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === "active" ? "blocked" : "active" } : u
      )
    );
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Profile photo upload
  const photoInputRef = React.useRef();
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prev) => ({
        ...prev,
        photo: URL.createObjectURL(file),
        photoFile: file,
      }));
    }
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    login({
      ...user,
      ...profile,
      photo: profile.photo,
      name: profile.name,
      email: profile.email,
      role: "admin", // Ensure role is set to admin
      fullName: profile.name, // Update fullName as well
    });
    alert("Profile updated!");
  };

  return (
    <div className="admin-dashboard-wrapper">
      <aside className="admin-profile-section">
        <form className="admin-profile-form" onSubmit={handleProfileSave}>
          <h3>Profile Management</h3>
          <div className="profile-photo-section">
            <label htmlFor="admin-profile-photo" className="profile-photo-label">
              {profile.photo ? (
                <img
                  src={profile.photo}
                  alt="Profile"
                  className="profile-photo"
                  onClick={() => photoInputRef.current.click()}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <span
                  className="profile-photo-placeholder"
                  onClick={() => photoInputRef.current.click()}
                  style={{ cursor: "pointer" }}
                >
                  Add Photo
                </span>
              )}
            </label>
            <input
              id="admin-profile-photo"
              type="file"
              accept="image/*"
              ref={photoInputRef}
              style={{ display: "none" }}
              onChange={handlePhotoChange}
            />
          </div>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={profile.name}
            onChange={handleProfileChange}
            className="profile-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={profile.email}
            onChange={handleProfileChange}
            className="profile-input"
          />
          <button className="upload-btn" type="submit" style={{ marginTop: "10px" }}>
            Save / Update Profile
          </button>
        </form>
      </aside>

      <main className="admin-main">
        {/* Analytics Section */}
        <section className="admin-analytics-section">
          <h2>System Analytics</h2>
          <div className="analytics-row">
            <div className="analytics-circle">
              <span className="circle-label">Users</span>
              <span className="circle-value">{dummyAnalytics.users}</span>
            </div>
            <div className="analytics-circle">
              <span className="circle-label">Jobs</span>
              <span className="circle-value">{dummyAnalytics.jobs}</span>
            </div>
            <div className="analytics-circle">
              <span className="circle-label">Blocked</span>
              <span className="circle-value">{dummyAnalytics.blocked}</span>
            </div>
            <div className="analytics-circle">
              <span className="circle-label">Reports</span>
              <span className="circle-value">{dummyAnalytics.reports}</span>
            </div>
          </div>
          <div className="analytics-bar">
            <div className="bar-label">Active Users</div>
            <div className="bar-bg">
              <div
                className="bar-fill"
                style={{ width: `${dummyAnalytics.activePercent}%` }}
              >
                {dummyAnalytics.activePercent}%
              </div>
            </div>
            <div className="bar-label">Blocked Users</div>
            <div className="bar-bg">
              <div
                className="bar-fill blocked"
                style={{ width: `${dummyAnalytics.blockedPercent}%` }}
              >
                {dummyAnalytics.blockedPercent}%
              </div>
            </div>
          </div>
        </section>

        {/* User Management */}
        <section className="admin-users-section">
          <h3>User Management</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`status-badge ${u.status}`}>{u.status}</span>
                  </td>
                  <td>
                    <button
                      className={`btn ${u.status === "active" ? "block-btn" : "approve-btn"}`}
                      onClick={() => handleBlock(u.id)}
                    >
                      {u.status === "active" ? "Block" : "Approve"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Content Moderation */}
        <section className="admin-content-section">
          <h3>Content Moderation</h3>
          <ul>
            <li>Reported Post #1 <button className="btn review-btn">Review</button></li>
            <li>Reported Post #2 <button className="btn review-btn">Review</button></li>
            <li>Reported Comment #3 <button className="btn review-btn">Review</button></li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;