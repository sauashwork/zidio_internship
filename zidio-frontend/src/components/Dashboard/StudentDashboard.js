import { useEffect, useState } from "react";
import "./StudentDashboard.css";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
    const [savedVisible, setSavedVisible] = useState(4);
    const [appliedVisible, setAppliedVisible] = useState(4);
    const [courseVisible, setCourseVisible] = useState(6);
    const [profile, setProfile] = useState({
        fullName: "Full Name",
        role: "Student",
        img: "/assets/work-img.png",
        email: "Email"
    });
    const [editMode, setEditMode] = useState(false);
    const [profileInput, setProfileInput] = useState(profile);
    const navigate = useNavigate();
    const courseColors = ["red", "green", "blue"];
    const [courses, setCourses] = useState([]);
    const [notifications, setNotifications]=useState([]);
    const [savedJobs, setSavedJobs] = useState([]);
    const [appliedJobs, setAppliedJobs] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem("zidio_profile");
        if (stored) {
            const user = JSON.parse(stored);
            setProfile(user);
            setProfileInput(user);
        }
        const fetchAppliedJobs = async () => {
            try {
                const savedProfile = JSON.parse(localStorage.getItem("zidio_profile"));
                const studentId = savedProfile.id;
                const response = await fetch(`http://localhost:8080/api/student_applied_jobs/${studentId}`);
                if (!response.ok) throw Error(response.status);
                const data = await response.json();
                const appliedJobs = await Promise.all(data.map(async (appliedJob) => {
                    const jobTableId = appliedJob.jobId;
                    try {
                        const jobResponse = await fetch(`http://localhost:8080/api/jobs/${jobTableId}`);
                        if (!jobResponse.ok) throw Error(jobResponse.status);
                        const jobData = await jobResponse.json();
                        return jobData;
                    } catch (err) {
                        console.log(err);
                    }

                }))
                setAppliedJobs(appliedJobs);
            } catch (err) {
                console.log(err);
            }
        };
        const fetchSavedJobs = async () => {
            const studentProfile = JSON.parse(localStorage.getItem("zidio_profile"));
            const studentId = studentProfile.id;
            try {
                const response = await fetch(`http://localhost:8080/api/bookmarks/${studentId}`);
                if (!response.ok) throw Error(response.status);
                const data = await response.json();
                setSavedJobs(data);
            } catch (err) {
                console.log(err);
            }
        };
        const fetchCourses=async()=>{
            try{
                const response=await fetch("http://localhost:8080/api/courses");
                if(!response.ok) throw Error(response.status);
                const data=await response.json();
                setCourses(data);
            } catch(err){
                console.log(err);
            }
        };
        const fetchNotifications=async()=>{
            const studentProfile=JSON.parse(localStorage.getItem("zidio_profile"));
            const studentId=studentProfile.id;
            try{
                const response=await fetch(`http://localhost:8080/api/selected_applicants/allSelections/${studentId}`);
                if(!response.ok) throw Error(response.status);
                const data=await response.json();
                try{
                    const jobs=await Promise.all(data.map( async (selectedApplication)=>{
                        const jobId=selectedApplication.jobId;
                        try{
                            const response=await fetch(`http://localhost:8080/api/jobs/${jobId}`);
                            if(!response.ok) throw Error(response.status);
                            const data=await response.json();
                            return data;
                        } catch(err) {
                            console.log(err);
                        }
                    }));
                    setNotifications(jobs);
                } catch(err){
                    console.log(err);
                }
            } catch(err) {
                console.log(err);
            }
        };
        fetchAppliedJobs();
        fetchSavedJobs();
        fetchCourses();
        fetchNotifications();
    }, []);

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
        const stored = localStorage.getItem("zidio_profile");
        let user = stored ? JSON.parse(stored) : {};
        const updatedUser = {
            ...user,
            fullName: profileInput.fullName,
            role: profileInput.role,
            img: profileInput.img,
            email: profileInput.email
        };
        setProfile(updatedUser);
        localStorage.setItem("zidio_profile", JSON.stringify(updatedUser));
        setEditMode(false);
    };
    const handleFilterJobClick=()=>{
        //todo...
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
                            <h3>Hello Job Seeker</h3>
                            <p>You've applied and saved <span>{appliedJobs.length+savedJobs.length} jobs</span> keep it up!</p>
                        </div>
                        <div className="finding-jobs">
                            <button onClick={() => navigate("/jobs")}>→ Find Jobs</button>
                            <button onClick={(e)=>handleFilterJobClick(e)}>→ Filter Job </button>
                        </div>
                    </div>
                    <div className="bannerDown">
                        <img src="/assets/work-img.png" alt="banner"></img>
                    </div>
                </div>

                <div className="sa-jobs">
                    <div className="saved-jobs">
                        <h4>Saved Jobs</h4>
                        <div className="saved-cards">
                            {savedJobs.slice(0, savedVisible).map((job, index) => (
                                <div className="card" key={index}>
                                    <div className="c1">
                                        <div>
                                            <img src={job.logo || "/assets/work-img.png"} alt="company logo" />
                                        </div>
                                        <div>
                                            <h4>{job.company}</h4>
                                            <p>{job.location}</p>
                                        </div>
                                    </div>
                                    <div className="c2">
                                        <ul>
                                            {Array.isArray(job.details) && job.details.map((d, i) => (
                                                <li key={`${job.id}-${i}`}>{d}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="c3">
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
                            {appliedJobs.slice(0, appliedVisible).map((job, index) => (
                                <div className="card" key={index}>
                                    <div className="c1">
                                        <div>
                                            <img src={job.logo || "/assets/work-img.png"} alt="company logo" />
                                        </div>
                                        <div>
                                            <h4>{job.company}</h4>
                                            <p>{job.location}</p>
                                        </div>
                                    </div>
                                    <div className="c2">
                                        <ul>
                                            {Array.isArray(job.details) && job.details.map((d, i) => (
                                                <li key={`${job.id}-${i}`}>{d}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="c3">
                                        <button>Applied</button>
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
                            onClick={() => setCourseVisible(v => v + 6)}
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
                                value={profileInput.email}
                                onChange={e => setProfileInput({ ...profileInput, email: e.target.value })}
                                className="profile-input"
                                placeholder="email"
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
                            <p>{profile.email}</p>
                        </div>
                    )}
                </div>
                <div className="notifications">
                    <h4>Notifications</h4>
                    {notifications.map((notification, index)=>(
                        <div key={index}>
                            <b>Selected: </b>{notification.company} - {notification.location} - {notification.jobCategory}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default StudentDashboard;