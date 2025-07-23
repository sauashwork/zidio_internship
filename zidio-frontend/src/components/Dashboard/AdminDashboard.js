import { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
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

    const [users, setUsers] = useState([]);
    const [usersWithStatus, setUsersWithStatus]=useState([]);
    const [userVisible, setUserVisible] = useState(4);

    const [reports, setReports] = useState([
        { id: 1, content: "Inappropriate post by Alice", status: "pending" },
        { id: 2, content: "Spam application by Bob", status: "resolved" },
    ]);

    const [siteSettings, setSiteSettings] = useState({
        maintenance: false,
        registration: true,
    });

    const [notifications, setNotifications] = useState([]);

    const navigate = useNavigate();

    const [analytics, setAnalytics] = useState({
        users: "",
        recruiters: "",
        jobs: "",
        internships: "",
        applications: "",
    });

    useEffect(() => {
        const stored = localStorage.getItem("zidio_admin_profile");
        if (stored) {
            const user = JSON.parse(stored);
            setProfile(user);
            setProfileInput(user);
        }

        const storedBio = localStorage.getItem("zidio_admin_bio");
        if (storedBio) setBio(storedBio);

        const fetchAnalytics = async () => {
            try {
                const [res1, res2, res3, res4, res5] = await Promise.all([
                    fetch("http://localhost:8080/api/auth"),
                    fetch("http://localhost:8080/api/recruiters"),
                    fetch("http://localhost:8080/api/jobs/jobCount"),
                    fetch("http://localhost:8080/api/jobs/internshipCount"),
                    fetch("http://localhost:8080/api/student_applied_jobs/appliedCount")
                ]);

                if (!res1.ok || !res2.ok || !res3.ok || !res4.ok || !res5.ok) {
                    throw new Error("One or more API calls failed.");
                }

                const [data1, data2, data3, data4, data5] = await Promise.all([
                    res1.json(),
                    res2.json(),
                    res3.json(),
                    res4.json(),
                    res5.json()
                ]);

                const newAnalytics = {
                    users: data1.length ?? data1,          
                    recruiters: data2.length ?? data2,
                    jobs: data3,
                    internships: data4,
                    applications: data5.length ?? data5,
                };

                setAnalytics(newAnalytics);
            } catch (err) {
                console.error("Error fetching analytics:", err);
            }
        };

        const fetchUsers=async()=>{
            try{
                const response=await fetch("http://localhost:8080/api/auth/users");
                if(!response.ok) throw Error(response.status);
                const data=await response.json();
                console.log(data);
                setUsers(data);
                const usersWithStatus=data.map((user)=>({
                    ...user, status: "active"
                }));
                setUsersWithStatus(usersWithStatus);
            } catch(err){
                console.log(err);
            }
        };

        fetchAnalytics();
        fetchUsers();
    }, []);


    useEffect(() => {
        localStorage.setItem("zidio_admin_profile", JSON.stringify(profile));
    }, [profile]);

    useEffect(() => {
        localStorage.setItem("zidio_admin_bio", bio);
    }, [bio]);

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
        const stored = localStorage.getItem("zidio_admin_profile");
        let user = stored ? JSON.parse(stored) : {};
        const updatedUser = {
            ...user,
            fullName: profileInput.fullName,
            role: profileInput.role,
            img: profileInput.img,
        };
        setProfile(updatedUser);
        localStorage.setItem("zidio_admin_profile", JSON.stringify(updatedUser));
        setEditMode(false);
    };

    const toggleUserStatus = (id) => {
        setUsers(users =>
            users.map(u =>
                u.id === id
                    ? { ...u, status: u.status === "active" ? "blocked" : "active" }
                    : u
            )
        );
    };

    const resolveReport = (id) => {
        setReports(reports =>
            reports.map(r =>
                r.id === id ? { ...r, status: "resolved" } : r
            )
        );
    };

    const toggleSetting = (key) => {
        setSiteSettings(settings => ({
            ...settings,
            [key]: !settings[key],
        }));
    };

    return (
        <div className="studentDash adminDash">
            <div className="studDown adminLeft">
                <button className="home-btn" onClick={() => navigate("/")}>← Home</button>
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
                            {/* <button className="edit-btn" onClick={() => {
                                setProfileInput(profile);
                                setEditMode(true);
                            }}>Edit</button> */}
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
                            <h3>Welcome back Admin</h3>
                            <p>Manage users, content, analytics and site settings here.</p>
                        </div>
                        <div className="post-jobs" />
                    </div>
                    <div className="bannerDown">
                        <img src="/assets/work-img.png" alt="banner"></img>
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
                                    {usersWithStatus.filter(u => u.role === "Student").slice(0, userVisible).map(user => (
                                        <tr key={user.id}>
                                            <td>{user.fullName}</td>
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
                                    {usersWithStatus.filter(u => u.role === "Recruiter").slice(0, userVisible).map(user => (
                                        <tr key={user.id}>
                                            <td>{user.fullName}</td>
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
                                <span>Users</span>
                            </div>
                            <div>
                                <span className="analyticsNum">{analytics.users-analytics.recruiters-1}</span>
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