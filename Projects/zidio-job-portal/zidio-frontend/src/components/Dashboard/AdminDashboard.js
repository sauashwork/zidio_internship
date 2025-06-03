import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
    // Admin profile
    const initialProfile = (() => {
        const stored = localStorage.getItem("zidio_admin_profile");
        return stored
            ? JSON.parse(stored)
            : {
                fullName: "Full Name",
                role: "Admin",
                img: "/assets/work-img.png",
            };
    })();

    const [profile, setProfile] = useState(initialProfile);
    const [editMode, setEditMode] = useState(false);
    const [profileInput, setProfileInput] = useState(initialProfile);
    const [bio, setBio] = useState("");
    const [bioEdit, setBioEdit] = useState(false);

    // User management
    const [users, setUsers] = useState([
        { id: 1, name: "Alice", role: "Student", status: "active" },
        { id: 2, name: "Bob", role: "Recruiter", status: "blocked" },
        { id: 3, name: "Charlie", role: "Student", status: "active" },
        { id: 4, name: "Diana", role: "Recruiter", status: "active" },
    ]);
    const [userVisible, setUserVisible] = useState(4);

    // Content moderation
    const [reports, setReports] = useState([
        { id: 1, content: "Inappropriate post by Alice", status: "pending" },
        { id: 2, content: "Spam application by Bob", status: "resolved" },
    ]);

    // Analytics
    const [analytics] = useState({
        users: 120,
        recruiters: 15,
        jobs: 40,
        internships: 22,
        applications: 300,
    });

    // Site settings
    const [siteSettings, setSiteSettings] = useState({
        maintenance: false,
        registration: true,
    });

    // Notifications
    const [notifications, setNotifications] = useState([
        "New user registered: Charlie.",
        "Report pending: Inappropriate post by Alice.",
        "System analytics updated.",
    ]);

    const navigate = useNavigate();

    useEffect(() => {
        const stored = localStorage.getItem("zidio_admin_profile");
        if (stored) {
            const user = JSON.parse(stored);
            setProfile(user);
            setProfileInput(user); // keep profileInput in sync
        }
        const storedBio = localStorage.getItem("zidio_admin_bio");
        if (storedBio) setBio(storedBio);
    }, []);

    useEffect(() => {
        localStorage.setItem("zidio_admin_profile", JSON.stringify(profile));
    }, [profile]);

    useEffect(() => {
        localStorage.setItem("zidio_admin_bio", bio);
    }, [bio]);

    // Profile handlers
    const handleProfilePic = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setProfileInput({ ...profileInput, img: ev.target.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveProfile = () => {
        const stored=localStorage.getItem("zidio_admin_profile");
        let user=stored?JSON.parse(stored):{};
        const updatedUser={
            ...user,
            fullName:profileInput.fullName,
            role: profileInput.role,
            img: profileInput.img,
        };
        setProfile(updatedUser);
        localStorage.setItem("zidio_admin_profile", JSON.stringify(updatedUser));
        setEditMode(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("zidio_admin_profile");
        navigate("/");
    };

    // User management handlers
    const toggleUserStatus = (id) => {
        setUsers(users =>
            users.map(u =>
                u.id === id
                    ? { ...u, status: u.status === "active" ? "blocked" : "active" }
                    : u
            )
        );
    };

    // Content moderation handlers
    const resolveReport = (id) => {
        setReports(reports =>
            reports.map(r =>
                r.id === id ? { ...r, status: "resolved" } : r
            )
        );
    };

    // Site settings handlers
    const toggleSetting = (key) => {
        setSiteSettings(settings => ({
            ...settings,
            [key]: !settings[key],
        }));
    };

    return (
        <div className="studentDash adminDash">
            <div className="studDown adminLeft">
                <button className="home-btn" onClick={()=>navigate("/")}>← Home</button>
                <div className="profile">
                    <label htmlFor="profile-pic-upload" style={{ cursor: editMode ? "pointer" : "default" }}>
                        <img
                            src={editMode ? (profileInput.img || "/assets/work-img.png") : (profile.img || "/assets/work-img.png")}
                            alt="profile pic"
                            className="profile-pic"
                        />
                        {editMode && (
                            <input
                                id="profile-pic-upload"
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handleProfilePic}
                            />
                        )}
                    </label>
                    {editMode ? (
                        <>
                            <input
                                type="text"
                                value={profileInput.fullName}
                                onChange={e => setProfileInput({ ...profileInput, fullName: e.target.value })}
                                className="profile-input"
                                placeholder="Full Name"
                            />
                            <input
                                type="text"
                                value={profileInput.role}
                                onChange={e => setProfileInput({ ...profileInput, role: e.target.value })}
                                className="profile-input"
                                placeholder="Role"
                            />
                            <button className="save-btn" onClick={handleSaveProfile}>Save</button>
                        </>
                    ) : (
                        <div className="profile-info-row">
                            <h4>{profile.fullName}</h4>
                            <p>{profile.role}</p>
                            <button className="edit-btn" onClick={() => {
                                setProfileInput(profile);
                                setEditMode(true);
                            }}>Edit</button>
                        </div>
                    )}
                </div>
                <div className="Bio">
                    <h4>Bio</h4>
                    {bioEdit ? (
                        <>
                            <textarea
                                value={bio}
                                onChange={e => setBio(e.target.value)}
                                rows={3}
                                style={{ width: "100%" }}
                            />
                            <button className="save-btn" onClick={() => setBioEdit(false)}>Save</button>
                        </>
                    ) : (
                        <div>
                            <div style={{ minHeight: 40 }}>{bio || "Add your bio..."}</div>
                            <button className="edit-btn" onClick={() => setBioEdit(true)}>Edit</button>
                        </div>
                    )}
                </div>
                <div className="notifications">
                    <h4>Notifications</h4>
                    {notifications.length === 0 ? (
                        <div>No notifications yet.</div>
                    ) : (
                        notifications.slice(0, 5).map((note, idx) => (
                            <div key={idx}>{note}</div>
                        ))
                    )}
                </div>
            </div>
            <div className="studUp adminRight">
                <div className="welcome-message">
                    <div className="message">
                        Welcome To Your Dashboard
                    </div>
                    <div className="today">
                        📆 {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric", weekday: "long" })}
                    </div>
                </div>
                <div className="welcome-banner">
                    <div className="bannerUp">
                        <div className="wel-banner">
                            <h3>Good Morning, Admin</h3>
                            <p>Manage users, content, analytics and site settings here.</p>
                        </div>
                        <div className="post-jobs" />
                    </div>
                    <div className="bannerDown">
                        <img src="/assets/work-img.png" alt="banner image"></img>
                    </div>
                </div>

                <div className="adminSection">
                    <h3>User Management</h3>
                    <div className="userManagementRow">
                        <div className="userCard half-width">
                            <h4>Students</h4>
                            <table className="adminTable">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.filter(u => u.role === "Student").slice(0, userVisible).map(user => (
                                        <tr key={user.id}>
                                            <td>{user.name}</td>
                                            <td>
                                                <span className={user.status === "active" ? "status-active" : "status-blocked"}>
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    className={user.status === "active" ? "block-btn" : "approve-btn"}
                                                    onClick={() => toggleUserStatus(user.id)}
                                                >
                                                    {user.status === "active" ? "Block" : "Approve"}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="userCard half-width">
                            <h4>Recruiters</h4>
                            <table className="adminTable">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.filter(u => u.role === "Recruiter").slice(0, userVisible).map(user => (
                                        <tr key={user.id}>
                                            <td>{user.name}</td>
                                            <td>
                                                <span className={user.status === "active" ? "status-active" : "status-blocked"}>
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    className={user.status === "active" ? "block-btn" : "approve-btn"}
                                                    onClick={() => toggleUserStatus(user.id)}
                                                >
                                                    {user.status === "active" ? "Block" : "Approve"}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {(userVisible < users.filter(u => u.role === "Student").length ||
                      userVisible < users.filter(u => u.role === "Recruiter").length) && (
                        <div
                            style={{ textAlign: "center", cursor: "pointer", marginTop: 8 }}
                            onClick={() => setUserVisible(v => v + 4)}
                        >
                            🔽
                        </div>
                    )}
                </div>

                <div className="adminSection">
                    <h3>Content Moderation</h3>
                    <ul className="reportsList">
                        {reports.map(report => (
                            <li key={report.id} className={report.status === "resolved" ? "resolved" : ""}>
                                <span>{report.content}</span>
                                <span className="report-status">{report.status}</span>
                                {report.status === "pending" && (
                                    <button className="resolve-btn" onClick={() => resolveReport(report.id)}>
                                        Mark as Resolved
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="adminRow">
                    <div className="adminSection analytics half-width">
                        <h3>System Analytics</h3>
                        <div className="analyticsGrid">
                            <div>
                                <span className="analyticsNum">{analytics.users}</span>
                                <span>Students</span>
                            </div>
                            <div>
                                <span className="analyticsNum">{analytics.recruiters}</span>
                                <span>Recruiters</span>
                            </div>
                            <div>
                                <span className="analyticsNum">{analytics.jobs}</span>
                                <span>Jobs</span>
                            </div>
                            <div>
                                <span className="analyticsNum">{analytics.internships}</span>
                                <span>Internships</span>
                            </div>
                            <div>
                                <span className="analyticsNum">{analytics.applications}</span>
                                <span>Applications</span>
                            </div>
                        </div>
                    </div>

                    <div className="adminSection half-width">
                        <h3>Site Settings</h3>
                        <div className="settingsRow">
                            <span>Maintenance Mode</span>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={siteSettings.maintenance}
                                    onChange={() => toggleSetting("maintenance")}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <div className="settingsRow">
                            <span>User Registration</span>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={siteSettings.registration}
                                    onChange={() => toggleSetting("registration")}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <div className="settingsRow">
                            <span>Email Notifications</span>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={siteSettings.emailNotifications || false}
                                    onChange={() => toggleSetting("emailNotifications")}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <div className="settingsRow">
                            <span>Allow File Uploads</span>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={siteSettings.fileUploads || false}
                                    onChange={() => toggleSetting("fileUploads")}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <div className="settingsRow">
                            <span>Enable Chat Support</span>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={siteSettings.chatSupport || false}
                                    onChange={() => toggleSetting("chatSupport")}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;