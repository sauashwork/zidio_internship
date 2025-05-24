import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./Jobs.css";

const jobsData = [
  {
    id: 1,
    type: "Job",
    title: "Frontend Developer",
    company: "Zidio Tech",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
    location: "Remote",
    ctc: "₹10-15 LPA",
    experience: "2-4 years",
    status: "Hiring",
    posted: "2 days ago",
    description: "Work with React, Redux, and modern UI frameworks to build scalable web apps.",
    bookmarked: false,
  },
  {
    id: 2,
    type: "Internship",
    title: "Marketing Intern",
    company: "Brandify",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
    location: "Bangalore",
    ctc: "₹15,000/mo",
    experience: "Fresher",
    status: "Hiring",
    posted: "1 day ago",
    description: "Assist in digital campaigns, content creation, and social media management.",
    bookmarked: false,
  },
  {
    id: 3,
    type: "Job",
    title: "Backend Engineer",
    company: "CloudNest",
    logo: "https://cdn-icons-png.flaticon.com/512/732/732229.png",
    location: "Hyderabad",
    ctc: "₹12-18 LPA",
    experience: "3-6 years",
    status: "Closed",
    posted: "5 days ago",
    description: "Develop scalable APIs and microservices using Node.js and MongoDB.",
    bookmarked: false,
  },
  {
    id: 4,
    type: "Internship",
    title: "UI/UX Design Intern",
    company: "Pixel Labs",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
    location: "Remote",
    ctc: "₹10,000/mo",
    experience: "Fresher",
    status: "Hiring",
    posted: "Today",
    description: "Work on wireframes, user flows, and design systems for web/mobile apps.",
    bookmarked: false,
  },
  {
    id: 5,
    type: "Job",
    title: "Full Stack Developer",
    company: "TechLeap",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968313.png",
    location: "Remote",
    ctc: "₹15-25 LPA",
    experience: "3-5 years",
    status: "Hiring",
    posted: "1 week ago",
    description: "Work on both frontend and backend development using JavaScript, Node.js, and React.",
    bookmarked: false,
  },
  {
    id: 6,
    type: "Job",
    title: "DevOps Engineer",
    company: "CloudScape",
    logo: "https://cdn-icons-png.flaticon.com/512/1051/1051283.png",
    location: "Pune",
    ctc: "₹18-22 LPA",
    experience: "5-7 years",
    status: "Hiring",
    posted: "3 days ago",
    description: "Design and manage scalable cloud infrastructure using AWS, Kubernetes, and Docker.",
    bookmarked: false,
  },
  {
    id: 7,
    type: "Internship",
    title: "Software Development Intern",
    company: "InnoTech",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968698.png",
    location: "Mumbai",
    ctc: "₹12,000/mo",
    experience: "Fresher",
    status: "Hiring",
    posted: "2 days ago",
    description: "Work on full-stack development projects and learn about software lifecycle.",
    bookmarked: false,
  },
  {
    id: 8,
    type: "Job",
    title: "Data Scientist",
    company: "DataFlow",
    logo: "https://cdn-icons-png.flaticon.com/512/3499/3499048.png",
    location: "Bangalore",
    ctc: "₹20-30 LPA",
    experience: "3-6 years",
    status: "Hiring",
    posted: "1 week ago",
    description: "Build data models, perform data analysis, and provide business insights using Python and ML algorithms.",
    bookmarked: false,
  },
  {
    id: 9,
    type: "Internship",
    title: "Graphic Design Intern",
    company: "DesignHub",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968610.png",
    location: "Remote",
    ctc: "₹8,000/mo",
    experience: "Fresher",
    status: "Hiring",
    posted: "3 days ago",
    description: "Assist in creating visual content for digital media platforms and branding.",
    bookmarked: false,
  },
  {
    id: 10,
    type: "Job",
    title: "Product Manager",
    company: "FinTech Solutions",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968326.png",
    location: "Remote",
    ctc: "₹25-35 LPA",
    experience: "5+ years",
    status: "Hiring",
    posted: "1 week ago",
    description: "Oversee product development lifecycle and collaborate with cross-functional teams.",
    bookmarked: false,
  },
  {
    id: 11,
    type: "Job",
    title: "Mobile App Developer",
    company: "AppTech",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968325.png",
    location: "Delhi",
    ctc: "₹10-20 LPA",
    experience: "2-4 years",
    status: "Hiring",
    posted: "4 days ago",
    description: "Develop mobile applications for iOS and Android using React Native.",
    bookmarked: false,
  },
  {
    id: 12,
    type: "Internship",
    title: "SEO Intern",
    company: "GrowthMax",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968380.png",
    location: "Remote",
    ctc: "₹6,000/mo",
    experience: "Fresher",
    status: "Hiring",
    posted: "1 day ago",
    description: "Assist in SEO strategy and content optimization for search engines.",
    bookmarked: false,
  },
  {
    id: 13,
    type: "Job",
    title: "UI/UX Designer",
    company: "DesignPro",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968318.png",
    location: "Chennai",
    ctc: "₹15-20 LPA",
    experience: "3-5 years",
    status: "Hiring",
    posted: "2 weeks ago",
    description: "Create user-centered designs for web and mobile platforms.",
    bookmarked: false,
  },
  {
    id: 14,
    type: "Internship",
    title: "Content Writer Intern",
    company: "WriteUp",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968779.png",
    location: "Remote",
    ctc: "₹5,000/mo",
    experience: "Fresher",
    status: "Hiring",
    posted: "1 week ago",
    description: "Write blog posts, articles, and social media content for various industries.",
    bookmarked: false,
  },
  {
    id: 15,
    type: "Job",
    title: "Data Engineer",
    company: "DataStack",
    logo: "https://cdn-icons-png.flaticon.com/512/3499/3499049.png",
    location: "Bangalore",
    ctc: "₹18-25 LPA",
    experience: "4-6 years",
    status: "Hiring",
    posted: "5 days ago",
    description: "Design and implement data pipelines, ETL processes, and work with big data tools.",
    bookmarked: false,
  },
  {
    id: 16,
    type: "Job",
    title: "System Administrator",
    company: "TechGuard",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968714.png",
    location: "Hyderabad",
    ctc: "₹12-15 LPA",
    experience: "2-4 years",
    status: "Hiring",
    posted: "2 days ago",
    description: "Manage servers, networks, and troubleshoot system-related issues.",
    bookmarked: false,
  },
  {
    id: 17,
    type: "Internship",
    title: "HR Intern",
    company: "PeopleFirst",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968722.png",
    location: "Remote",
    ctc: "₹7,000/mo",
    experience: "Fresher",
    status: "Hiring",
    posted: "2 weeks ago",
    description: "Assist in recruitment, employee engagement, and HR-related tasks.",
    bookmarked: false,
  },
];


const unique = (arr, key) => [...new Set(arr.map(item => item[key]))];

const Jobs = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialSearch = params.get("search") || "";

  // Use initialSearch as the initial value
  const [search, setSearch] = useState(initialSearch);
  const [tab, setTab] = useState("All");
  const [filters, setFilters] = useState({
    location: "All",
    type: "All",
    status: "All",
    experience: "All",
  });
  const [jobs, setJobs] = useState(jobsData);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "2 new jobs posted today!", type: "info" },
    { id: 2, message: "Internship applications closing soon!", type: "warning" },
  ]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [highlightedJobId, setHighlightedJobId] = useState(null);
  const jobRefs = useRef({});
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const jobId = params.get("jobId");
    if (jobId && jobRefs.current[jobId]) {
      jobRefs.current[jobId].scrollIntoView({ behavior: "smooth", block: "center" });
      setHighlightedJobId(jobId);
      // Remove highlight after 1 seconds
      setTimeout(() => setHighlightedJobId(null), 1000);
    }
  }, [location.search]);

  useEffect(() => {
    // Reset filters and search when navigating away and back to the page
    if (location.pathname !== prevPath.current) {
      setTab("All");
      setSearch("");
      setFilters({
        location: "All",
        type: "All",
        status: "All",
        experience: "All",
      });
      setVisibleCount(12);
      prevPath.current = location.pathname;
    }
  }, [location]);

  // Sync search state with URL when it changes (for browser navigation)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlSearch = params.get("search") || "";
    setSearch(urlSearch);
  }, [location.search]);

  // Filtering logic
  const filteredJobs = jobs.filter(job => {
    if (tab !== "All" && job.type !== tab) return false;
    if (filters.location !== "All" && job.location !== filters.location) return false;
    if (filters.type !== "All" && job.type !== filters.type) return false;
    if (filters.status !== "All" && job.status !== filters.status) return false;
    if (filters.experience !== "All" && job.experience !== filters.experience) return false;
    if (
      search &&
      !(
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.location.toLowerCase().includes(search.toLowerCase())
      )
    )
      return false;
    return true;
  });

  // Only show up to visibleCount jobs
  const jobsToShow = filteredJobs.slice(0, visibleCount);

  // Bookmark handler
  const toggleBookmark = (id) => {
    setJobs(jobs =>
      jobs.map(job =>
        job.id === id ? { ...job, bookmarked: !job.bookmarked } : job
      )
    );
  };

  // Notification close
  const closeNotification = (id) => {
    setNotifications(notifications => notifications.filter(n => n.id !== id));
  };

  // Filter options
  const locations = ["All", ...unique(jobsData, "location")];
  const types = ["All", "Job", "Internship"];
  const statuses = ["All", ...unique(jobsData, "status")];
  const experiences = ["All", ...unique(jobsData, "experience")];

  return (
    <div className="jobs-page">
      {/* Notification Bar */}
      {notifications.length > 0 && (
        <div className="jobs-notifications">
          {notifications.map(n => (
            <div key={n.id} className={`notification ${n.type}`}>
              <span>{n.message}</span>
              <button onClick={() => closeNotification(n.id)}>✕</button>
            </div>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div className="jobs-tabs">
        {["All", "Job", "Internship"].map(t => (
          <button
            key={t}
            className={tab === t ? "active" : ""}
            onClick={() => setTab(t)}
          >
            {t === "All" ? "All Opportunities" : t + "s"}
          </button>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="jobs-filters">
        <input
          type="text"
          placeholder="Search by title, company, or location"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={filters.location} onChange={e => setFilters(f => ({ ...f, location: e.target.value }))}>
          {locations.map(loc => <option key={loc}>{loc}</option>)}
        </select>
        <select value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}>
          {statuses.map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={filters.experience} onChange={e => setFilters(f => ({ ...f, experience: e.target.value }))}>
          {experiences.map(exp => <option key={exp}>{exp}</option>)}
        </select>
      </div>

      {/* Jobs/Internships List */}
      <div className="jobs-list">
        {jobsToShow.length === 0 && (
          <div className="no-jobs">No opportunities found. Try adjusting your filters.</div>
        )}
        {jobsToShow.map(job => (
          <div
  className={`job-card-main ${job.status === "Closed" ? "closed" : ""} ${highlightedJobId == job.id ? "highlight" : ""}`}
  key={job.id}
  ref={el => (jobRefs.current[job.id] = el)}
>
            {/* Logo half-in/half-out */}
            <div className="job-logo-outer">
              <img src={job.logo} alt={job.company} className="job-logo-img" />
            </div>
            <div className="job-card-content">
              <div className="job-card-header">
                <h3>{job.title}</h3>
                <span className={`status ${job.status.toLowerCase()}`}>{job.status}</span>
              </div>
              <div className="job-meta">
                <span>{job.company}</span>
                <span>• {job.location}</span>
                <span>• {job.experience}</span>
              </div>
              <div className="job-desc">{job.description}</div>
              <div className="job-details">
                <span className="ctc">{job.ctc}</span>
                <span className="posted">{job.posted}</span>
              </div>
              <div className="job-actions">
                <button className="apply-btn" disabled={job.status === "Closed"}>
                  {job.status === "Closed" ? "Closed" : "Apply"}
                </button>
                <button
                  className={`bookmark-btn ${job.bookmarked ? "bookmarked" : ""}`}
                  onClick={() => toggleBookmark(job.id)}
                  aria-label="Bookmark"
                >
                  {job.bookmarked ? "★" : "☆"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {visibleCount < filteredJobs.length && (
        <div style={{ textAlign: "center", margin: "32px 0" }}>
          <button
            className="show-more-btn"
            onClick={() => setVisibleCount(c => c + 12)}
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default Jobs;