import React, { useEffect, useState } from "react";
import "./StudentDashboard.css";
import {useNavigate} from "react-router-dom";

const courseColors = ["red", "green", "blue"];

const courses = [
    { id: 1, title: "HTML", desc: "Anchor Tags", img: "/assets/work-img.png" },
    { id: 2, title: "CSS", desc: "Selectors", img: "/assets/work-img.png" },
    { id: 3, title: "JS", desc: "Functions", img: "/assets/work-img.png" },
    { id: 4, title: "React", desc: "Hooks", img: "/assets/work-img.png" },
    { id: 5, title: "Node", desc: "Express", img: "/assets/work-img.png" },
    { id: 6, title: "MongoDB", desc: "Aggregation", img: "/assets/work-img.png" },
];

function StudentDashboard() {
    const [uploads, setUploads] = useState([]);
    const [savedVisible, setSavedVisible] = useState(4);
    const [appliedVisible, setAppliedVisible] = useState(4);
    const [courseVisible, setCourseVisible] = useState(3);
    const [profile, setProfile] = useState({
        fullName: "Full Name",
        role: "Student",
        img: "/assets/work-img.png",
    });
    const [editMode, setEditMode] = useState(false);
    const [profileInput, setProfileInput] = useState(profile);
    const navigate=useNavigate();
    
    useEffect(() => {
        const stored = localStorage.getItem("zidio_profile");
        if (stored) {
            const user = JSON.parse(stored);
            setProfile(user);
            setProfileInput(user); // keep profileInput in sync
        }
    }, []);

    // useEffect(() => {
    //     localStorage.setItem("zidio_profile", JSON.stringify(profile));
    // }, [profile]);

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
        // Get the current user object from localStorage
        const stored = localStorage.getItem("zidio_profile");
        let user = stored ? JSON.parse(stored) : {};
        // Merge updated fields (preserve all other fields, like email)
        const updatedUser = {
            ...user,
            fullName: profileInput.fullName,
            role: profileInput.role,
            img: profileInput.img,
        };
        setProfile(updatedUser);
        localStorage.setItem("zidio_profile", JSON.stringify(updatedUser));
        setEditMode(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("zidio_profile");
        navigate("/");
    };

    const savedJobs = Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        company: "Google",
        location: "Hyderabad, India",
        details: ["1+ years", "Hyderabad", "10-15 LPA", "BA/BTech"],
        logo: "/assets/work-img.png", 
    }));

    const appliedJobs = Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        company: "Google",
        location: "Hyderabad, India",
        details: ["1+ years", "Hyderabad", "10-15 LPA", "BA/BTech"],
        logo: "/assets/work-img.png",
    }));

    const handleResumeUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploads([
                { date: new Date().toISOString().split("T")[0], file: file.name },
                ...uploads,
            ]);
        }
    };

    return (
        <div className="studentDash">
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
                            <p>You've applied <span>20+ jobs today</span> keep it up!</p>
                        </div>
                        <div className="finding-jobs">
                            <input type="text" placeholder="Jobs, Internships, Keywords..."></input>
                            <button>→ Search</button>
                        </div>
                    </div>
                    <div className="bannerDown">
                        <img src="/assets/work-img.png" alt="banner image"></img>
                    </div>
                </div>

                <div className="sa-jobs">
                    <div className="saved-jobs">
                        <h4>Saved Jobs</h4>
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
                                        <button>Apply</button>
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
                        <h4>Applied Jobs</h4>
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
                                        <button>Apply</button>
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
                <div className="course">
                    <h4>Courses</h4>
                    <div className="courseCards">
                        {courses.slice(0, courseVisible).map((course, idx) => (
                            <div
                                className="card"
                                key={course.id}
                                style={{ background: courseColors[idx % 3] }}
                            >
                                <div className="cardUp">
                                    <img src={course.img} alt="courses logo" />
                                </div>
                                <div className="cardDown">
                                    <h5>{course.title}</h5>
                                    <p>{course.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {courseVisible < courses.length && (
                        <div
                            style={{ textAlign: "center", cursor: "pointer", marginTop: 8, color: "#333" }}
                            onClick={() => setCourseVisible(v => v + 3)}
                        >
                            Load more...
                        </div>
                    )}
                </div>
            </div>
            <div className="studDown">
                <button
        className="home-btn"
        onClick={() => navigate("/")}
    >← Home</button>
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
                <div className="resume">
                    <h4>Resume</h4>
                    <input type="file" accept=".pdf, .doc, .docx" onChange={handleResumeUpload} placeholder="Resume Upload" />
                </div>
                <div className="notifications">
                    <h4>Notifications</h4>
                    <div>4pm - java test (Wednesday)</div>
                    <div>4pm - java test (Wednesday)</div>
                    <div>4pm - java test (Wednesday)</div>
                </div>
            </div>
        </div>
    );
}

export default StudentDashboard;