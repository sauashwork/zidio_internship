import React, { useEffect, useState } from "react";
import "./RecruiterDashboard.css";
import { useNavigate } from "react-router-dom";

function RecruiterDashboard() {
    const [savedVisible, setSavedVisible] = useState(4);
    const [appliedVisible, setAppliedVisible] = useState(4);
    const [profile, setProfile] = useState({
        fullName: "Full Name",
        role: "Recruiter",
        img: "/assets/work-img.png",
    });
    const [editMode, setEditMode] = useState(false);
    const [profileInput, setProfileInput] = useState(profile);
    const [showPostForm, setShowPostForm] = useState(false);
    const [postType, setPostType] = useState("job");
    const [jobForm, setJobForm] = useState({
        company: "",
        location: "",
        details: "",
        logo: "",
        title: "",
        ctc: "",
        experience: "",
    });
    const [savedJobs, setSavedJobs] = useState(() =>
        JSON.parse(localStorage.getItem("zidio_jobs")) || []
    );
    const [appliedJobs, setAppliedJobs] = useState(() =>
        JSON.parse(localStorage.getItem("zidio_internships")) || []
    );
    const [viewApplicationsFor, setViewApplicationsFor] = useState(null);
    const [applications, setApplications] = useState({});
    const [bio, setBio] = useState("");
    const [bioEdit, setBioEdit] = useState(false);
    const [notifications, setNotifications] = useState([
        "Your job post for 'Frontend Developer' received 3 new applications.",
        "Internship 'Marketing Intern' deadline is tomorrow.",
        "You have 2 unread messages from applicants.",
    ]);
    const navigate = useNavigate();

    useEffect(() => {
        const stored = localStorage.getItem("zidio_profile");
        if (stored) setProfile(JSON.parse(stored));
        const storedBio = localStorage.getItem("zidio_bio");
        if (storedBio) setBio(storedBio);
        const storedApps = localStorage.getItem("zidio_applications");
        if (storedApps) setApplications(JSON.parse(storedApps));
    }, []);

    useEffect(() => {
        localStorage.setItem("zidio_profile", JSON.stringify(profile));
    }, [profile]);

    useEffect(() => {
        localStorage.setItem("zidio_bio", bio);
    }, [bio]);

    useEffect(() => {
        localStorage.setItem("zidio_jobs", JSON.stringify(savedJobs));
    }, [savedJobs]);

    useEffect(() => {
        localStorage.setItem("zidio_internships", JSON.stringify(appliedJobs));
    }, [appliedJobs]);

    useEffect(() => {
        localStorage.setItem("zidio_applications", JSON.stringify(applications));
    }, [applications]);

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
        setProfile(profileInput);
        setEditMode(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("zidio_profile");
        navigate("/");
    };

    // Post a Job/Internship logic
    const handlePostJobClick = () => {
        setShowPostForm(true);
        setJobForm({
            company: "",
            location: "",
            details: "",
            logo: "",
            title: "",
        });
        setPostType("job");
    };

    const handleJobFormChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "logo" && files && files[0]) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setJobForm((prev) => ({ ...prev, logo: ev.target.result }));
            };
            reader.readAsDataURL(files[0]);
        } else {
            setJobForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleJobFormSubmit = (e) => {
        e.preventDefault();
        const newJob = {
            id: Date.now(),
            company: jobForm.company,
            location: jobForm.location,
            details: jobForm.details.split(",").map((d) => d.trim()),
            logo: jobForm.logo || "/assets/work-img.png",
            title: jobForm.title,
        };
        if (postType === "job") {
            setSavedJobs((prev) => [newJob, ...prev]);
            setNotifications((prev) => [
                `You posted a new job: ${jobForm.title}`,
                ...prev,
            ]);
        } else {
            setAppliedJobs((prev) => [newJob, ...prev]);
            setNotifications((prev) => [
                `You posted a new internship: ${jobForm.title}`,
                ...prev,
            ]);
        }
        setShowPostForm(false);
    };

    // View Applications logic (mocked for demo)
    const handleViewApplications = (jobId) => {
        setViewApplicationsFor(jobId);
    };

    const handleCloseApplications = () => {
        setViewApplicationsFor(null);
    };

    // Mock: Add a few applications for demo
    useEffect(() => {
        if (!applications || Object.keys(applications).length === 0) {
            setApplications({
                // jobId: [array of applicants]
                // Example:
                // 123456: [{name: "Alice", email: "alice@email.com", resume: "link"}, ...]
            });
        }
    }, []);

    // For demo: add a button to simulate an application (not for production)
    // In real app, applications would come from candidates

    return (
        <div className="studentDash">

            <div className="studDown">
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
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
            <div className="studUp">
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
                            <h3>Good Morning</h3>
                            <p>You've posted <span>{savedJobs.length + appliedJobs.length} jobs/internships</span> today. Keep it up!</p>
                        </div>
                        <div className="post-jobs">
                            <button onClick={handlePostJobClick}>➕ Post a Job?</button>
                        </div>
                    </div>
                    <div className="bannerDown">
                        <img src="/assets/work-img.png" alt="banner image"></img>
                    </div>
                </div>

                {showPostForm && (
                    <div className="post-job-form-modal">
                        <form className="post-job-form" onSubmit={handleJobFormSubmit}>
                            <h3>Post a {postType === "job" ? "Job" : "Internship"}</h3>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        name="postType"
                                        value="job"
                                        checked={postType === "job"}
                                        onChange={() => setPostType("job")}
                                    /> Job
                                </label>
                                <label style={{ marginLeft: 16 }}>
                                    <input
                                        type="radio"
                                        name="postType"
                                        value="internship"
                                        checked={postType === "internship"}
                                        onChange={() => setPostType("internship")}
                                    /> Internship
                                </label>
                            </div>
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={jobForm.title}
                                onChange={handleJobFormChange}
                                required
                            />
                            <input
                                type="text"
                                name="company"
                                placeholder="Company"
                                value={jobForm.company}
                                onChange={handleJobFormChange}
                                required
                            />
                            <input
                                type="text"
                                name="location"
                                placeholder="Location"
                                value={jobForm.location}
                                onChange={handleJobFormChange}
                                required
                            />
                            <input
                                type="text"
                                name="CTC"
                                placeholder="CTC"
                                value={jobForm.ctc}
                                onChange={handleJobFormChange}
                                required
                            />
                            <input
                                type="text"
                                name="experience"
                                placeholder="Experience (in years)"
                                value={jobForm.experience}
                                onChange={handleJobFormChange}
                                required
                            />
                            <input
                                type="text"
                                name="details"
                                placeholder="Details (comma separated)"
                                value={jobForm.details}
                                onChange={handleJobFormChange}
                                required
                            />
                            <span style={{ fontSize: "13px", color: "#888", marginTop: 2, marginBottom: 8, display: "block" }}>
                                {jobForm.logo ? "Logo selected" : "Company logo"}
                            </span>
                            <input
                                type="file"
                                name="logo"
                                placeholder="Company logo"
                                accept="image/*"
                                onChange={handleJobFormChange}
                            />
                            <div style={{ marginTop: 8 }}>
                                <button type="submit" className="save-btn">Post</button>
                                <button type="button" className="edit-btn" style={{ marginLeft: 8 }} onClick={() => setShowPostForm(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="sa-jobs">
                    <div className="saved-jobs">
                        <h4>Posted Jobs</h4>
                        <div className="saved-cards">
                            {savedJobs.slice(0, savedVisible).map((job, idx) => (
                                <div className="card" key={job.id}>
                                    <div className="c1">
                                        <div>
                                            <img src={job.logo} alt="company logo" />
                                        </div>
                                        <div>
                                            <h4>{job.company}</h4>
                                            <p>{job.location}</p>
                                            <p style={{ fontWeight: "bold" }}>{job.title}</p>
                                        </div>
                                    </div>
                                    <div className="c2">
                                        <ul>
                                            {job.details.map((d, i) => (
                                                <li key={i}>{d}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="c3">
                                        <img src={job.logo} alt="company logo" />
                                        <button onClick={() => handleViewApplications(job.id)}>View Applications</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {savedVisible < savedJobs.length && (
                            <div
                                style={{ textAlign: "center", cursor: "pointer", marginTop: 8 }}
                                onClick={() => setSavedVisible(v => v + 4)}
                            >
                                🔽
                            </div>
                        )}
                    </div>
                    <div className="applied-jobs">
                        <h4>Posted Internships</h4>
                        <div className="applied-cards">
                            {appliedJobs.slice(0, appliedVisible).map((job, idx) => (
                                <div className="card" key={job.id}>
                                    <div className="c1">
                                        <div>
                                            <img src={job.logo} alt="company logo" />
                                        </div>
                                        <div>
                                            <h4>{job.company}</h4>
                                            <p>{job.location}</p>
                                            <p style={{ fontWeight: "bold" }}>{job.title}</p>
                                        </div>
                                    </div>
                                    <div className="c2">
                                        <ul>
                                            {job.details.map((d, i) => (
                                                <li key={i}>{d}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="c3">
                                        <img src={job.logo} alt="company logo" />
                                        <button onClick={() => handleViewApplications(job.id)}>View Applications</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {appliedVisible < appliedJobs.length && (
                            <div
                                style={{ textAlign: "center", cursor: "pointer", marginTop: 8 }}
                                onClick={() => setAppliedVisible(v => v + 4)}
                            >
                                🔽
                            </div>
                        )}
                    </div>
                </div>
                <div className="find-students">
                    {/* You can implement student search/filter here if needed */}
                </div>
            </div>

            {/* Applications Modal */}
            {viewApplicationsFor && (
                <div className="applications-modal">
                    <div className="applications-content">
                        <h3>Applications for this post</h3>
                        {(applications[viewApplicationsFor] && applications[viewApplicationsFor].length > 0) ? (
                            <ul>
                                {applications[viewApplicationsFor].map((app, idx) => (
                                    <li key={idx}>
                                        <strong>{app.name}</strong> - {app.email}
                                        {app.resume && (
                                            <a href={app.resume} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 8 }}>Resume</a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div>No applications yet.</div>
                        )}
                        <button className="edit-btn" onClick={handleCloseApplications} style={{ marginTop: 12 }}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RecruiterDashboard;