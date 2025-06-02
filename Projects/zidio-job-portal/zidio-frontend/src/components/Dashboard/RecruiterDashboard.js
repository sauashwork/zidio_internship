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
    const [postedJobs, setPostedJobs] = useState([]);
    const [postedInternships, setPostedInternships] = useState([]);
    const [jobSearchResults, setJobSearchResults] = useState(null);
    const [internshipSearchResults, setInternshipSearchResults] = useState(null);
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
        const { name, value } = e.target;
        setJobForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleJobFormSubmit = async (e) => {
        e.preventDefault();
        const newJob = {
            company: jobForm.company,
            location: jobForm.location,
            details: jobForm.details.split(",").map((d) => d.trim()),
            logo: jobForm.logo || "/assets/work-img.png",
            title: jobForm.title,
            type: postType, // "job" or "internship"
            ctc: jobForm.ctc,
            experience: jobForm.experience,
            bookmarked: "false"
        };
        try {
            const res = await fetch("http://localhost:8080/api/jobs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newJob)
            });
            if (res.ok) {
                setNotifications((prev) => [
                    `You posted a new ${postType}: ${jobForm.title}`,
                    ...prev,
                ]);
                setShowPostForm(false);
                fetchPostedJobs(); // Refresh posted jobs from backend
            }
        } catch (err) {
            alert("Failed to post job/internship.");
        }
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

    // Example function to call from your form's onSubmit
    const handlePostJob = async (jobData) => {
        const response = await fetch("http://localhost:8080/api/jobs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(jobData),
        });
        if (response.ok) {
            // Optionally refresh jobs list or show success
        }
    };

    const fetchPostedJobs = async () => {
        const res = await fetch("http://localhost:8080/api/jobs");
        const data = await res.json();
        setPostedJobs(data.filter(j => j.type === "job"));
        setPostedInternships(data.filter(j => j.type === "internship"));
    };

    useEffect(() => {
        fetchPostedJobs();
    }, []);

    useEffect(() => {
        fetch("http://localhost:8080/api/jobs")
            .then(res => res.json())
            .then(data => {
                const jobsWithBookmark = data.map(job => ({
                    ...job,
                    bookmarked: job.bookmarked === "true" || job.bookmarked === true
                }));
                setPostedJobs(jobsWithBookmark);
            });
    }, []);

    // Example: Fetch jobs posted by the current recruiter
    const recruiterId = profile.id; // Assuming profile.id is the recruiter ID
    useEffect(() => {
        fetch(`http://localhost:8080/api/jobs?recruiterId=${recruiterId}`)
            .then(res => res.json())
            .then(setPostedJobs);
    }, [recruiterId]);

    const [showSearchForm, setShowSearchForm] = useState(false);
    const [searchFilters, setSearchFilters] = useState({
        company: "",
        location: "",
        title: "",
        type: "",
        ctc: "",
        experience: "",
        details: "",
        bookmarked: "",
    });
    const [searchResults, setSearchResults] = useState(null);
    const handleSearchPostedJobClick = () => {
        setShowSearchForm(true);
        setSearchResults(null);
        setSearchFilters({
            company: "",
            location: "",
            title: "",
            type: "",
            ctc: "",
            experience: "",
            details: "",
            bookmarked: "",
        });
    };
    const handleSearchFilterChange=(e)=>{
        const {name, value, type, checked}=e.target;
        setSearchFilters((prev)=>({
            ...prev,
            [name]:type==="checkbox"?checked:value,
        }));
    };
    const handleSearchFormSubmit=(e)=>{
        e.preventDefault();
        const {
            company, location, title, type, ctc, experience, details, bookmarked
        } = searchFilters;

        // Filter jobs and internships separately
        const filterFn = job => {
            if (company && !job.company.toLowerCase().includes(company.toLowerCase())) return false;
            if (location && !job.location.toLowerCase().includes(location.toLowerCase())) return false;
            if (title && !job.title.toLowerCase().includes(title.toLowerCase())) return false;
            if (type && job.type !== type) return false;
            if (ctc && job.ctc && !job.ctc.toLowerCase().includes(ctc.toLowerCase())) return false;
            if (experience && job.experience && !job.experience.toLowerCase().includes(experience.toLowerCase())) return false;
            if (details) {
                const searchDetails = details.split(",").map(d => d.trim().toLowerCase()).filter(Boolean);
                if (!searchDetails.some(sd => (job.details || []).some(jd => jd.toLowerCase().includes(sd)))) return false;
            }
            if (bookmarked && String(job.bookmarked) !== "true") return false;
            return true;
        };

        setJobSearchResults(postedJobs.filter(j => j.type === "job" && filterFn(j)));
        setInternshipSearchResults(postedInternships.filter(j => j.type === "internship" && filterFn(j)));
        setShowSearchForm(false);
    };

    // Add this derived value before your return statement:
    const totalPostedCount = postedJobs.length + postedInternships.length;

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
                            <p>
                                You've posted <span>{totalPostedCount} jobs/internships</span> so far. Keep it up!
                            </p>
                        </div>
                        <div className="post-jobs">
                            <button onClick={handlePostJobClick}>➕ Post a Job?</button>
                            <button onClick={handleSearchPostedJobClick}>→ Search Jobs?</button>
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
                                {jobForm.logo ? "Logo URL entered" : "Paste company logo URL"}
                            </span>
                            <input
                                type="text"
                                name="logo"
                                placeholder="Paste company logo URL"
                                value={jobForm.logo}
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
                            {(jobSearchResults !== null ? jobSearchResults : postedJobs.slice(0, savedVisible)).map((job, idx) => (
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
                        {savedVisible < postedJobs.length && (
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
                            {(internshipSearchResults !== null ? internshipSearchResults : postedInternships.slice(0, appliedVisible)).map((job, idx) => (
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
                        {appliedVisible < postedInternships.length && (
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

            {showSearchForm && (
                <div className="post-job-form-modal">
                    <form className="post-job-form" onSubmit={handleSearchFormSubmit}>
                        <h3>Search Posted Jobs/Internships</h3>
                        <input
                            type="text"
                            name="company"
                            placeholder="Company"
                            value={searchFilters.company}
                            onChange={handleSearchFilterChange}
                        />
                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            value={searchFilters.location}
                            onChange={handleSearchFilterChange}
                        />
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={searchFilters.title}
                            onChange={handleSearchFilterChange}
                        />
                        <select
                            name="type"
                            value={searchFilters.type}
                            onChange={handleSearchFilterChange}
                            style={{
                                width: "100%",
                                padding: "8px",
                                margin: "8px 0",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                                fontSize: "15px"
                            }}
                        >
                            <option value="">Any Type</option>
                            <option value="job">Job</option>
                            <option value="internship">Internship</option>
                        </select>
                        <input
                            type="text"
                            name="ctc"
                            placeholder="CTC"
                            value={searchFilters.ctc}
                            onChange={handleSearchFilterChange}
                        />
                        <input
                            type="text"
                            name="experience"
                            placeholder="Experience"
                            value={searchFilters.experience}
                            onChange={handleSearchFilterChange}
                        />
                        <input
                            type="text"
                            name="details"
                            placeholder="Details (comma separated)"
                            value={searchFilters.details}
                            onChange={handleSearchFilterChange}
                        />
                        <label style={{ display: "block", marginTop: 8 }}>
                            <input
                                type="checkbox"
                                name="bookmarked"
                                checked={searchFilters.bookmarked}
                                onChange={handleSearchFilterChange}
                            />{" "}
                            Bookmarked Only?
                        </label>
                        <div style={{ marginTop: 8 }}>
                            <button type="submit" className="save-btn">Search</button>
                            <button
                                type="button"
                                className="edit-btn"
                                style={{ marginLeft: 8 }}
                                onClick={() => setShowSearchForm(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="edit-btn"
                                style={{ marginLeft: 8 }}
                                onClick={() => {
                                    setSearchFilters({
                                        company: "",
                                        location: "",
                                        title: "",
                                        type: "",
                                        ctc: "",
                                        experience: "",
                                        details: "",
                                        bookmarked: "",
                                    });
                                    setJobSearchResults(null);
                                    setInternshipSearchResults(null);
                                }}
                            >
                                Clear Filters
                            </button>
                        </div>
                    </form>
                </div>
            )}

        </div>
    );
}

export default RecruiterDashboard;