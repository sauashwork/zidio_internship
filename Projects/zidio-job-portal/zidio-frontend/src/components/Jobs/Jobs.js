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

    useEffect(()=>{
        fetch("http://localhost:8080/api/jobs")
        .then(res=>res.json())
        .then(data=>{
            const jobsWithBookmark=data.map(job=>({
                ...job,
                bookmarked: job.bookmarked==="true" || job.bookmarked===true
            }));
            setJobs(jobsWithBookmark);
        })
        .catch(err=>console.error("Failed to fetch jobs", err));
    }, []);

    // Filtering logic (includes all filters)
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

        return (
            matchesText &&
            matchesCtc &&
            matchesExperience &&
            matchesQualification &&
            matchesLocation &&
            matchesCountry
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
                    State:
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
                    <button className="search-btn">Type to Search</button>
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