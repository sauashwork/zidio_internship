import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import "./Jobs.css";

function Jobs() {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(4);
    const [filter, setFilter] = useState("");
    const [jobs, setJobs] = useState([]);
    const [postedDate, setPostedDate] = useState("");
    const [status, setStatus] = useState("");
    const [ctc, setCtc] = useState("");
    const [experience, setExperience] = useState("");
    const [qualification, setQualification] = useState("");
    const [location, setLocation] = useState("");
    const [country, setCountry] = useState("");

    const [resume, setResume] = useState("");
    const [newResume, setNewResume] = useState(null);
    const [showApplyForm, setShowApplyForm] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    const [application, setApplication] = useState({
        studentId: "",
        jobId: "",
        name: "",
        email: "",
        phone: "",
        permanentAddress: "",
        currentAddress: "",
        qualification: "",
        experience: "",
        skills: "",
        coverLetter: "",
        resume: "",
    });

    const [jobCategory, setJobCategory] = useState("");
    const [jobId, setJobId] = useState("");

    const fetchJobs = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/jobs");
            if (!response.ok) throw Error(response.status);
            const data = await response.json();
            console.log(data);
            setJobs(data);

        } catch (err) {
            console.log(err);
        }

    };

    useEffect(() => {

        fetchJobs();
    }, []);

    // Filtering logic (includes all filters)
    const matchesJobCategory =
        jobCategory === "" ||
        jobs.jobCategory === jobCategory; // assuming job.category matches the dropdown values

    const filteredJobs = jobs.filter(job => {
        // Text search filter
        const matchesText =
            job.company.toLowerCase().includes(filter.toLowerCase()) ||
            job.location.toLowerCase().includes(filter.toLowerCase()) ||
            job.type.toLowerCase().includes(filter.toLowerCase());

        // CTC filter
        const matchesCtc = ctc === "" || (job.details && job.details.some(d => d.toLowerCase().includes(ctc.toLowerCase())));

        // Experience filter
        const matchesExperience = experience === "" || (job.details && job.details.some(d => d.toLowerCase().includes(experience.toLowerCase())));

        // Qualification filter
        const matchesQualification = qualification === "" || (job.details && job.details.some(d => d.toLowerCase().includes(qualification.toLowerCase())));

        // State/location filter
        const matchesLocation = location === "" || job.location.toLowerCase().includes(location.toLowerCase());

        // Country filter
        const matchesCountry = country === "" || job.location.toLowerCase().includes(country.toLowerCase());

        // Job Category filter (applies to both jobs and internships)
        const matchesJobCategory =
            jobCategory === "" ||
            (job.jobCategory && job.jobCategory === jobCategory);

        return (
            matchesText &&
            matchesCtc &&
            matchesExperience &&
            matchesQualification &&
            matchesLocation &&
            matchesCountry &&
            matchesJobCategory
        );
    });

    // Split jobs and internships
    const jobsList = filteredJobs.filter(j => j.type === "job");
    const internshipsList = filteredJobs.filter(j => j.type === "internship");

    // Bookmark toggle
    const toggleBookmark = id => {
        setJobs(jobs =>
            jobs.map(j =>
                j.id === id ? { ...j, bookmarked: !j.bookmarked } : j
            )
        );
    };


    const handleBookmark = async (job) => {
        console.log("bookmarked job: ", job);
        const jobId = job.id;
        const studentId = JSON.parse(localStorage.getItem("zidio_profile")).id;

        console.log("job id: ", jobId);
        console.log("student id: ", studentId);

        //find it it exists 
        try {
            const response = await fetch(`http://localhost:8080/api/bookmarks/${jobId}/${studentId}`);
            if (!response.ok) {
                throw Error("Not yet Bookmarked...");
            }
            const data = await response.json();
            console.log("already bookmarked: ", data);
            //delete book mark...
            const deleteOptions = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'applications.json'
                },
                body: JSON.stringify(data)
            }

            try {
                const response = await fetch(`http://localhost:8080/api/bookmarks/${jobId}/${studentId}`, deleteOptions);
                if (!response.ok) throw Error(response.status);
                alert("successfully deleted...");
            } catch (err) {
                console.log(err);
            }

        } catch (err) {
            //not bookmarked...
            // console.log(err);
            //wee have to post this for bookmark..

            const newBookMark = {
                jobId,
                studentId
            };

            const postOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newBookMark)
            };

            try {
                const response = await fetch(`http://localhost:8080/api/bookmarks`, postOptions);
                if (!response.ok) throw Error(response.status);
                alert("bookmarked...");
            } catch (err) {
                console.log(err);
            }
        }
    }


    const user = JSON.parse(localStorage.getItem("zidio_profile") || "{}");
    const isStudent = user.role === "Student";

    const handleApplyClick = (job) => {
        if (!isStudent) {
            alert("Only students can apply for jobs.");
            return;
        }
        setSelectedJob(job);
        setShowApplyForm(true);
    };

    const handleResumeChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewResume(file);
        }
    };

    const handleAppChange = (e) => {
        setApplication({ ...application, [e.target.name]: e.target.value });
    };

    const handleApplySubmit = async (e) => {
        e.preventDefault();
        console.log("application: ", application);
        application.studentId = studentId;
        application.jobId = selectedJob.id;
        console.log("modified application: ", application);
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(application)
        };

        try {
            const response = await fetch("http://localhost:8080/api/student_applied_jobs", postOptions);
            if (!response.ok) throw Error(response.status);
            const appliedData = await response.json();
            console.log("applied details: ", appliedData);
            alert("applied successfully...");
            setShowApplyForm(false);
        } catch (err) {
            console.log(err);
            alert("already applied with this email...");
        }

    };

    const studentProfile = JSON.parse(localStorage.getItem("zidio_profile"));
    const studentId = studentProfile.id;
    // console.log(studentId);

    return (
        <div className="jobs-main">
            {/* Home button absolutely positioned outside the main content */}
            <button
                className="home-btn-fixed"
                onClick={() => navigate("/")}
            >
                ← Home
            </button>
            <div className="jobs-filters">
                <label>
                    CTC:
                    <input type="text" value={ctc} onChange={e => setCtc(e.target.value)} placeholder="e.g. 10-15 LPA" />
                </label>
                <label>
                    Experience:
                    <input type="text" value={experience} onChange={e => setExperience(e.target.value)} placeholder="e.g. 1+ years" />
                </label>
                <label>
                    Qualification:
                    <input type="text" value={qualification} onChange={e => setQualification(e.target.value)} placeholder="e.g. BTech" />
                </label>
                <label>
                    State:
                    <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Hyderabad" />
                </label>
                <label>
                    Country:
                    <input type="text" value={country} onChange={e => setCountry(e.target.value)} placeholder="e.g. India" />
                </label>
                <label>
                    Job Category:
                    <select
                        name="jobCategory"
                        value={jobCategory}
                        onChange={(e) => setJobCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
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
                <div className="search-row">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search jobs or internships..."
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                    />
                    <button className="search-btn">Type to Search</button>
                </div>
            </div>
            <div className="jobs-content">
                <div className="jobs-notifications">
                    <h4>Notifications</h4>
                    <ul>
                        <li></li>
                    </ul>
                </div>
                <div className="jobs-cards-section">
                    <div className="jobs-cards-row side-by-side">
                        <div className="jobs-cards-block jobs-block">
                            <h3>Jobs</h3>
                            <div className="jobs-cards-grid">
                                {jobsList.slice(0, visible).map(job => (
                                    <div className="job-card" key={job.id}>
                                        <div className="job-card-header">
                                            <img src={job.logo} alt="company logo" />
                                        </div>
                                        <div className="job-card-body">
                                            <h4>{job.company}</h4>
                                            <p>{job.location}</p>
                                            {/* Show job category here */}
                                            {job.jobCategory && (
                                                <p className="job-category" style={{ fontWeight: "bold", color: "#2a5d9f" }}>
                                                    Category: {job.jobCategory}
                                                </p>
                                            )}
                                            <ul>
                                                {job.details.map((d, i) => (
                                                    <li key={i}>{d}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="job-card-footer">
                                            <button
                                                className="apply-btn"
                                                disabled={!isStudent}
                                                onClick={() => handleApplyClick(job)}
                                            >
                                                Apply
                                            </button>
                                            <button
                                                className={`bookmark-btn${job.bookmarked ? " bookmarked" : ""}`}
                                                onClick={() => handleBookmark(job)}
                                                title="Bookmark"
                                            >
                                                {job.bookmarked ? "★" : "☆"}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {visible < jobsList.length && (
                                <div
                                    className="expand-btn"
                                    onClick={() => setVisible(v => v + 4)}
                                >
                                    🔽
                                </div>
                            )}
                        </div>
                        <div className="jobs-cards-block internships-block">
                            <h3>Internships</h3>
                            <div className="jobs-cards-grid">
                                {internshipsList.slice(0, visible).map(job => (
                                    <div className="job-card" key={job.id}>
                                        <div className="job-card-header">
                                            <img src={job.logo} alt="company logo" />
                                        </div>
                                        <div className="job-card-body">
                                            <h4>{job.company}</h4>
                                            <p>{job.location}</p>
                                            {/* Show job category here */}
                                            {job.jobCategory && (
                                                <p className="job-category" style={{ fontWeight: "bold", color: "#2a5d9f" }}>
                                                    Category: {job.jobCategory}
                                                </p>
                                            )}
                                            <ul>
                                                {job.details.map((d, i) => (
                                                    <li key={i}>{d}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="job-card-footer">
                                            <button
                                                className="apply-btn"
                                                disabled={!isStudent}
                                                onClick={() => handleApplyClick(job)}
                                            >
                                                Apply
                                            </button>
                                            <button
                                                className={`bookmark-btn${job.bookmarked ? " bookmarked" : ""}`}
                                                onClick={() => handleBookmark(job)}
                                                title="Bookmark"
                                            >
                                                {job.bookmarked ? "★" : "☆"}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {visible < internshipsList.length && (
                                <div
                                    className="expand-btn"
                                    onClick={() => setVisible(v => v + 4)}
                                >
                                    🔽
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {showApplyForm && (
                <div className="modal-overlay">
                    <form className="application-form horizontal-form" onSubmit={(e) => handleApplySubmit(e)}>
                        <h2>Job Application</h2>
                        <div className="form-grid">
                            <div className="form-col">
                                <div className="form-row">
                                    <label>Student ID</label>
                                    <input name="student ID" value={studentId} readOnly onChange={handleAppChange}></input>
                                </div>
                                <div className="form-row">
                                    <label>Job ID</label>
                                    <input name="Job ID" value={selectedJob.id} readOnly onChange={handleAppChange}></input>
                                </div>
                                <div className="form-row">
                                    <label>Name</label>
                                    <input name="name" value={application.name} onChange={handleAppChange} required />
                                </div>
                                <div className="form-row">
                                    <label>Email</label>
                                    <input name="email" type="email" value={application.email} onChange={handleAppChange} required />
                                </div>
                                <div className="form-row">
                                    <label>Phone</label>
                                    <input name="phone" value={application.phone} onChange={handleAppChange} required />
                                </div>
                                <div className="form-row">
                                    <label>Permanent Address</label>
                                    <input name="permanentAddress" value={application.permanentAddress} onChange={handleAppChange} required />
                                </div>
                                <div className="form-row">
                                    <label>Current Address</label>
                                    <input name="currentAddress" value={application.currentAddress} onChange={handleAppChange} required />
                                </div>
                            </div>
                            <div className="form-col">
                                <div className="form-row">
                                    <label>Qualification</label>
                                    <input name="qualification" value={application.qualification} onChange={handleAppChange} placeholder="e.g. BTech, MTech" />
                                </div>
                                <div className="form-row">
                                    <label>Experience</label>
                                    <input name="experience" value={application.experience} onChange={handleAppChange} placeholder="e.g. 2 years" />
                                </div>
                                <div className="form-row">
                                    <label>Skills</label>
                                    <input name="skills" value={application.skills} onChange={handleAppChange} placeholder="e.g. React, Node.js" />
                                </div>
                                <div className="form-row">
                                    <label>Cover Letter</label>
                                    <textarea name="coverLetter" value={application.coverLetter} onChange={handleAppChange} rows={3} placeholder="Write a short cover letter..." />
                                </div>
                                <div className="form-row">
                                    <label>Resume</label>
                                    <input name="resume" value={application.resume} onChange={handleAppChange} placeholder="Drive Link for Resume with Corrcet Access" />
                                </div>
                            </div>
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="submit-btn" >Submit Application</button>
                            <button type="button" className="cancel-btn" onClick={() => setShowApplyForm(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );

}


export default Jobs;