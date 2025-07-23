import { useEffect, useState } from "react";
import "./RecruiterDashboard.css";
import { useNavigate } from "react-router-dom";

function RecruiterDashboard() {

    const [savedVisible, setSavedVisible] = useState(4);
    const [appliedVisible, setAppliedVisible] = useState(4);
    const initialProfile = (() => {
        const stored = localStorage.getItem("zidio_profile");
        return stored
            ? JSON.parse(stored)
            : {
                fullName: "Full Name",
                role: "Recruiter",
                img: "/assets/work-img.png",
                address: "",
                company: "",
                email: "",
                phone: ""
            };
    })();
    const [profile, setProfile] = useState(initialProfile);
    const [profileInput, setProfileInput] = useState(initialProfile);
    const [editMode, setEditMode] = useState(false);
    const [showPostForm, setShowPostForm] = useState(false);
    const [postType, setPostType] = useState("job");
    const [savedJobs, setSavedJobs] = useState([]);
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [viewApplicationsFor, setViewApplicationsFor] = useState(null);
    const [applications, setApplications] = useState({});
    const [bio, setBio] = useState("");
    const [notifications, setNotifications] = useState([]);
    const [postedJobs, setPostedJobs] = useState([]);
    const [postedInternships, setPostedInternships] = useState([]);
    const [jobSearchResults, setJobSearchResults] = useState(null);
    const [internshipSearchResults, setInternshipSearchResults] = useState(null);
    const recruiterIdRec = profile.id;
    const [searchResults, setSearchResults] = useState(null);
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
    const [jobForm, setJobForm] = useState({
        company: "",
        location: "",
        details: "",
        logo: "",
        title: "",
        ctc: "",
        experience: "",
        recruiterIdRec: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        const stored = localStorage.getItem("zidio_profile");
        if (stored) {
            const user = JSON.parse(stored);
            if (user.id) {
                fetch(`http://localhost:8080/api/recruiters/${user.id}`)
                    .then(res => res.json())
                    .then(data => {
                        setProfile(prev => ({ ...prev, ...data }));
                        setProfileInput(prev => ({ ...prev, ...data }));
                        localStorage.setItem("zidio_profile", JSON.stringify({ ...user, ...data }));
                    })
                    .catch(() => { });
            }
        }
        const storedBio = localStorage.getItem("zidio_bio");
        if (storedBio) setBio(storedBio);
        const storedApps = localStorage.getItem("zidio_applications");
        if (storedApps) setApplications(JSON.parse(storedApps));

        const fetchProfile = async () => {
            const response = await fetch(`http://localhost:8080/api/recruiters/by-user/${recruiterIdRec}`);

            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                const updatedProfile = await response.json();
                setProfile({
                    id: updatedProfile.userId,
                    userId: updatedProfile.id,
                    fullName: updatedProfile.fullName || "",
                    email: updatedProfile.email || "",
                    company: updatedProfile.companyDetails || "",
                    address: updatedProfile.address || "",
                    phone: updatedProfile.phoneNumber || "",
                    img: updatedProfile.img || "/assets/work-img.png",
                    role: updatedProfile.role || "Recruiter"
                });
            } else {
                console.error('Invalid response format');
            }
        };
        fetchProfile();

    }, []);

    useEffect(() => {
        fetchPostedJobs();
    }, []);

    useEffect(() => {
        fetch(`http://localhost:8080/api/jobs/recruiter/${recruiterIdRec}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return [];
                }
            })
            .then(setPostedJobs);
    }, [recruiterIdRec]);

    useEffect(() => {
        localStorage.setItem("zidio_profile", JSON.stringify(profile));
    }, [profile]);

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

    const handleSaveProfile = async (e) => {
        setEditMode(false);
        const stored = localStorage.getItem("zidio_profile");
        console.log(stored);
        const recruiter = stored ? JSON.parse(stored) : {};
        const id = recruiter.id;
        console.log(recruiter, "Recruiter Table ID:", id);
        try {
            const res = await fetch(`http://localhost:8080/api/recruiters/by-user/${id}`);
            if (!res.ok) throw new Error(`Error checking recruiter: ${res.status}`);
            const data = await res.json();
            console.log("Existing Recruiter Data:", data);
            const tableId = data.id;

            const payload = {
                fullName: profileInput.fullName,
                email: profileInput.email,
                companyDetails: profileInput.company,
                address: profileInput.address,
                phoneNumber: profileInput.phone,
                img: profileInput.img,
            };
            console.log("payload: ", payload);
            const cleanedPayload = Object.fromEntries(
                Object.entries(payload).filter(([_, value]) => value !== null && value !== "")
            );
            console.log("cleanedPayload: ", cleanedPayload);
            const updateOptions = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cleanedPayload)
            };
            try {
                const resultResponse = await fetch(`http://localhost:8080/api/recruiters/${tableId}`, updateOptions);
                if (!resultResponse.ok) throw new Error(resultResponse);
                alert("sucess");
                setEditMode(false);

                const updatedProfile = await resultResponse.json();
                console.log("updatedProfile: ", updatedProfile);
                setProfileInput({
                    id: updatedProfile.userId,
                    userId: updatedProfile.id,
                    fullName: updatedProfile.fullName || "",
                    email: updatedProfile.email || "",
                    company: updatedProfile.company || "",
                    address: updatedProfile.address || "",
                    phone: updatedProfile.phone || "",
                    img: updatedProfile.img || "/assets/work-img.png",
                    role: updatedProfile.role || "Recruiter"
                });
                setProfile({
                    id: updatedProfile.userId,
                    userId: updatedProfile.id,
                    fullName: updatedProfile.fullName || "",
                    email: updatedProfile.email || "",
                    company: updatedProfile.companyDetails || "",
                    address: updatedProfile.address || "",
                    phone: updatedProfile.phoneNumber || "",
                    img: updatedProfile.img || "/assets/work-img.png",
                    role: updatedProfile.role || "Recruiter"
                });
                console.log("profile: ", profile);
                console.log("profileInput: ", profileInput);

                localStorage.setItem("zidio_profile", JSON.stringify({ ...recruiter, ...updatedProfile }));
                console.log("Recruiter updated successfully:", updatedProfile);
            } catch (err) {
                console.log(err);
            }
        } catch (err) {
            console.error("Error updating recruiter profile:", err);
            alert("Failed to update recruiter details.");
        }
    };

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
            type: postType,
            ctc: jobForm.ctc,
            experience: jobForm.experience,
            bookmarked: "false",
            jobCategory: jobForm.jobCategory,
            recruiterIdRec,
        };
        console.log("newJob post req: ", newJob);
        console.log("Type of Recruiter id: ", typeof recruiterIdRec);
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
                fetchPostedJobs();
            }
        } catch (err) {
            alert("Failed to post job/internship.");
        }
    };

    const handleViewApplications = async (jobId) => {
        console.log("jobId: ", jobId);
        try {
            const response = await fetch(`http://localhost:8080/api/student_applied_jobs/byJobId/${jobId}`);
            if (!response.ok) throw Error(response.status);
            const data = await response.json();
            setApplications((prev) => ({
                ...prev, [jobId]: data
            }));
            setViewApplicationsFor(jobId);
        } catch (err) {
            console.log(err);
        }
    };

    const handleCloseApplications = () => {
        setViewApplicationsFor(null);
    };

    const fetchPostedJobs = async () => {
        const res = await fetch(`http://localhost:8080/api/jobs/recruiter/${recruiterIdRec}`);
        const data = await res.json();
        setPostedJobs(data.filter(j => j.type === "job" && j.recruiterIdRec === recruiterIdRec));
        setPostedInternships(data.filter(j => j.type === "internship" && j.recruiterIdRec === recruiterIdRec));
    };

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

    const handleSearchFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSearchFilters((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSearchFormSubmit = (e) => {
        e.preventDefault();
        const {
            company, location, title, type, ctc, experience, details, bookmarked, jobCategory
        } = searchFilters;
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
            if (jobCategory && job.jobCategory !== jobCategory) return false;
            return true;
        };
        setJobSearchResults(postedJobs.filter(j => j.type === "job" && filterFn(j)));
        setInternshipSearchResults(postedInternships.filter(j => j.type === "internship" && filterFn(j)));
        setShowSearchForm(false);
    };


    const handleDeleteJob = async (jobId) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                const res = await fetch(`http://localhost:8080/api/jobs/${jobId}`, {
                    method: "DELETE"
                });
                if (res.ok) {
                    setPostedJobs(prev => prev.filter(j => j.id !== jobId));
                    setPostedInternships(prev => prev.filter(j => j.id !== jobId));
                    setJobSearchResults(prev => prev ? prev.filter(j => j.id !== jobId) : prev);
                    setInternshipSearchResults(prev => prev ? prev.filter(j => j.id !== jobId) : prev);
                    alert("Please refresh the page after deleting!");
                } else {
                    alert("Failed to delete, Please try again.");
                }
            } catch (err) {
                alert("Error deleting post.");
            }
        }
    };

    const handleSelectedClick = async (e, studentId, jobId) => {
        e.preventDefault();
        try {
            const dataSend = {
                jobId,
                studentId
            };
            const postOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataSend)
            };
            const response = await fetch(`http://localhost:8080/api/selected_applicants`, postOptions);
            if (!response.ok) throw Error(response.status);
            alert("Selected...");
        } catch (err) {
            console.log(err);
        }
    };

    const handleRejectClick = async (e, studentId, jobId) => {
        e.preventDefault();
        try {
            const deleteOptions = {
                method: 'DELETE'
            };
            const response = await fetch(`http://localhost:8080/api/selected_applicants/${studentId}`, deleteOptions);
            if (!response.ok) throw Error(response.status);
            try {
                const deleteOptions = {
                    method: 'DELETE'
                };
                const response = await fetch(`http://localhost:8080/api/student_applied_jobs/${jobId}/${studentId}`, deleteOptions);
                if (!response.ok) throw Error(response.status);
                alert("Rejected...");
            } catch (err) {
                console.log(err);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="studentDash">
            <div className="studDown">
                <button
                    className="home-btn"
                    onClick={() => navigate("/")}
                >← Home</button>
                <div className="profile">
                    <label htmlFor="profile-pic-upload" style={{ cursor: "default" }}>
                        <img
                            src={profile.img || "/assets/work-img.png"}
                            alt="profile pic"
                            className="profile-pic"
                        />
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
                            <input
                                type="text"
                                value={profileInput.company || ""}
                                onChange={e => setProfileInput({ ...profileInput, company: e.target.value })}
                                className="profile-input"
                                placeholder="Company"
                            />
                            <input
                                type="text"
                                value={profileInput.address || ""}
                                onChange={e => setProfileInput({ ...profileInput, address: e.target.value })}
                                className="profile-input"
                                placeholder="Address"
                            />
                            <input
                                type="email"
                                value={profileInput.email || ""}
                                onChange={e => setProfileInput({ ...profileInput, email: e.target.value })}
                                className="profile-input"
                                placeholder="Email"
                            />
                            <input
                                type="text"
                                value={profileInput.phone || ""}
                                onChange={e => setProfileInput({ ...profileInput, phone: e.target.value })}
                                className="profile-input"
                                placeholder="Phone Number"
                            />
                            <button className="save-btn" onClick={(e) => handleSaveProfile(e)}>Save</button>
                        </>
                    ) : (
                        <div className="profile-info-row">
                            <h4>{profile.fullName}</h4>
                            <p>{profile.role}</p>
                            <p><b>Company:</b> {profile.company}</p>
                            <p><b>Address:</b> {profile.address}</p>
                            <p><b>Email:</b> {profile.email}</p>
                            <p><b>Phone:</b> {profile.phone}</p>
                            <button className="edit-btn" onClick={() => {
                                setProfileInput(profile);
                                setEditMode(true);
                            }}>Edit</button>
                        </div>
                    )}
                </div>
                <div className="notifications">
                    <h4>Notifications</h4>
                    {notifications.length === 0 ? (
                        <div>No notifications yet.</div>
                    ) : (
                        notifications.map((note, idx) => (
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
                            <h3>Hello Recruiter</h3>
                            <p>
                                You've posted <span>{postedInternships.length + postedJobs.length} jobs and internships</span> so far. Keep it up!
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
                            <label style={{ textAlign: "left" }}> Recruiter ID
                                <input
                                    type="text"
                                    value={recruiterIdRec}
                                    name="recruiterIdRec"
                                    readOnly
                                />
                            </label>

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
                            <div>
                                <label>
                                    Job Category:
                                    <select
                                        name="jobCategory"
                                        value={jobForm.jobCategory || ""}
                                        onChange={handleJobFormChange}
                                        required
                                        style={{ padding: "10px" }}
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Software Developer">Software Developer</option>
                                        <option value="IT Project Manager">IT Project Manager</option>
                                        <option value="IT Business Analyst">IT Business Analyst</option>
                                        <option value="Cloud Architect">Cloud Architect</option>
                                        <option value="Network Engineer">Network Engineer</option>
                                        <option value="Security Analysts & Architects">Security Analysts & Architects</option>
                                        <option value="Quality Assurance Analyst">Quality Assurance Analyst</option>
                                        <option value="Business Systems Analyst">Business Systems Analyst</option>
                                        <option value="Database Analyst">Database Analyst</option>
                                        <option value="Data Science Specialist">Data Science Specialist</option>
                                        <option value="DevOps Engineer">DevOps Engineer</option>
                                    </select>
                                </label>
                            </div>
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
                            {(jobSearchResults !== null ? jobSearchResults : postedJobs.filter((job) => job.type === "job")).map((job, idx) => (
                                <div className="card" key={job.id}>
                                    <div className="c1">
                                        <div>
                                            <img src={job.logo} alt="company logo" />
                                        </div>
                                        <div>
                                            <h4>{job.company}</h4>
                                            <p>{job.location}</p>
                                            {/* Show job category here */}
                                            {job.jobCategory && (
                                                <p className="job-category" style={{ fontWeight: "bold", color: "#2a5d9f" }}>
                                                    Category: {job.jobCategory}
                                                </p>
                                            )}
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
                                        <button onClick={() => handleViewApplications(job.id)}>View Applications</button>
                                        <button className="delete-btn" onClick={() => handleDeleteJob(job.id)}>Delete</button>
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
                            {(internshipSearchResults !== null ? internshipSearchResults : postedInternships.filter((job) => job.type === "internship")).map((job, idx) => (
                                <div className="card" key={job.id}>
                                    <div className="c1">
                                        <div>
                                            <img src={job.logo} alt="company logo" />
                                        </div>
                                        <div>
                                            <h4>{job.company}</h4>
                                            <p>{job.location}</p>
                                            {job.jobCategory && (
                                                <p className="job-category" style={{ fontWeight: "bold", color: "#2a5d9f" }}>
                                                    Category: {job.jobCategory}
                                                </p>
                                            )}
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
                                        <button onClick={() => handleViewApplications(job.id)}>View Applications</button>
                                        <button className="delete-btn" onClick={() => handleDeleteJob(job.id)}>Delete</button>
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

            {viewApplicationsFor && (
                <div className="applications-modal">
                    <div className="applications-content">
                        <h3>Applications for this post</h3>
                        {(applications[viewApplicationsFor] && applications[viewApplicationsFor].length > 0) ? (
                            <ul>
                                {applications[viewApplicationsFor].map((app, idx) => (
                                    <li key={idx} className="display-app-cards">

                                        <div className="app-left">
                                            {app.studentId}
                                        </div>
                                        <div className="app-right" id={`student-details-right`}>
                                            <div className="display-name">{app.name}</div>
                                            <div className="display-email-phone">{app.email} - {app.phone}</div>
                                            <div className="display-permanent-current-address">
                                                <div>
                                                    {app.permanentAddress}
                                                </div>
                                                {/* <div>
                                                        {app.currentAddress}
                                                </div> */}
                                            </div>
                                            <div className="display-experience-resume">
                                                {app.experience}+ Experience {app.resume && (
                                                    <a
                                                        href={app.resume}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="resume-link"
                                                    >View Resume</a>
                                                )}
                                            </div>
                                            <div className="display-skills">{app.skills}</div>
                                            <div className="display-cover-letter">{app.coverLetter}</div>
                                            <div className="action-btns">
                                                <div className="selected-btn" onClick={(e) => handleSelectedClick(e, app.studentId, app.jobId)}>Select</div>
                                                <div className="rejected-btn" onClick={(e) => handleRejectClick(e, app.studentId, app.jobId)}>Reject</div>
                                            </div>
                                        </div>
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

                        <select
                            name="jobCategory"
                            value={searchFilters.jobCategory || ""}
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
                            <option value="">Any Category</option>
                            <option value="Software Developer">Software Developer</option>
                            <option value="IT Project Manager">IT Project Manager</option>
                            <option value="IT Business Analyst">IT Business Analyst</option>
                            <option value="Cloud Architect">Cloud Architect</option>
                            <option value="Network Engineer">Network Engineer</option>
                            <option value="Security Analysts & Architects">Security Analysts & Architects</option>
                            <option value="Quality Assurance Analyst">Quality Assurance Analyst</option>
                            <option value="Business Systems Analyst">Business Systems Analyst</option>
                            <option value="Database Analyst">Database Analyst</option>
                            <option value="Data Science Specialist">Data Science Specialist</option>
                            <option value="DevOps Engineer">DevOps Engineer</option>
                        </select>

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