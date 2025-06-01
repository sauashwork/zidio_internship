import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import "./Jobs.css";

const JOBS_DATA = Array.from({ length: 32 }).map((_, i) => ({
    id: i,
    type: i % 2 === 0 ? "job" : "internship",
    company: i % 2 === 0 ? "Google" : "Microsoft",
    location: i % 2 === 0 ? "Hyderabad, India" : "Bangalore, India",
    details: [
        i % 2 === 0 ? "1+ years" : "Internship",
        i % 2 === 0 ? "Hyderabad" : "Bangalore",
        i % 2 === 0 ? "10-15 LPA" : "Stipend: 20k",
        "BA/BTech"
    ],
    logo: "/assets/work-img.png",
    bookmarked: false,
}));

function Jobs() {
    const navigate = useNavigate(); // Add this line
    const [visible, setVisible] = useState(4);
    const [filter, setFilter] = useState("");
    const [jobs, setJobs] = useState(JOBS_DATA);
    const [postedDate, setPostedDate] = useState("");
    const [status, setStatus] = useState("");
    const [ctc, setCtc] = useState("");
    const [experience, setExperience] = useState("");
    const [qualification, setQualification] = useState("");
    const [location, setLocation] = useState("");
    const [country, setCountry] = useState("");

    // Filtering logic (simple search by company/location/type)
    const filteredJobs = jobs.filter(
        job =>
            job.company.toLowerCase().includes(filter.toLowerCase()) ||
            job.location.toLowerCase().includes(filter.toLowerCase()) ||
            job.type.toLowerCase().includes(filter.toLowerCase())
    );

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
                    Posted Date:
                    <select value={postedDate} onChange={e => setPostedDate(e.target.value)}>
                        <option value="">Any</option>
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                    </select>
                </label>
                <label>
                    Status:
                    <select value={status} onChange={e => setStatus(e.target.value)}>
                        <option value="">All</option>
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                    </select>
                </label>
                <label>
                    CTC:
                    <input type="text" value={ctc} onChange={e => setCtc(e.target.value)} placeholder="e.g. 10-15 LPA"/>
                </label>
                <label>
                    Experience:
                    <input type="text" value={experience} onChange={e => setExperience(e.target.value)} placeholder="e.g. 1+ years"/>
                </label>
                <label>
                    Qualification:
                    <input type="text" value={qualification} onChange={e => setQualification(e.target.value)} placeholder="e.g. BTech"/>
                </label>
                <label>
                    Location:
                    <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Hyderabad"/>
                </label>
                <label>
                    Country:
                    <input type="text" value={country} onChange={e => setCountry(e.target.value)} placeholder="e.g. India"/>
                </label>
                <div className="search-row">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search jobs or internships..."
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                    />
                    <button className="search-btn">→ Search</button>
                </div>
            </div>
            <div className="jobs-content">
                <div className="jobs-notifications">
                    <h4>Notifications</h4>
                    <ul>
                        <li>New job posted at Google</li>
                        <li>Internship deadline at Microsoft</li>
                        <li>Update your profile for better matches</li>
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
                                            <ul>
                                                {job.details.map((d, i) => (
                                                    <li key={i}>{d}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="job-card-footer">
                                            <button className="apply-btn">Apply</button>
                                            <button
                                                className={`bookmark-btn${job.bookmarked ? " bookmarked" : ""}`}
                                                onClick={() => toggleBookmark(job.id)}
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
                                            <ul>
                                                {job.details.map((d, i) => (
                                                    <li key={i}>{d}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="job-card-footer">
                                            <button className="apply-btn">Apply</button>
                                            <button
                                                className={`bookmark-btn${job.bookmarked ? " bookmarked" : ""}`}
                                                onClick={() => toggleBookmark(job.id)}
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
        </div>
    );
}

export default Jobs;