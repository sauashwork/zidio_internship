import React, { useState, useRef } from "react";
import { useAuth } from "../Auth/AuthContext";
import "./StudentDashboard.css";

const jobData = [
  { id: 1, title: "Frontend Developer Intern", type: "Internship", company: "TechCorp", location: "Remote" },
  { id: 2, title: "Backend Developer", type: "Job", company: "CodeHouse", location: "New York" },
  { id: 3, title: "UI/UX Designer Intern", type: "Internship", company: "DesignPro", location: "San Francisco" },
  { id: 4, title: "Data Scientist", type: "Job", company: "DataWiz", location: "Chicago" },
  { id: 5, title: "Mobile App Developer", type: "Job", company: "Appify", location: "Austin" },
  { id: 6, title: "QA Tester Intern", type: "Internship", company: "BugTrack", location: "Remote" },
  { id: 7, title: "DevOps Engineer", type: "Job", company: "CloudOps", location: "Seattle" },
  { id: 8, title: "Marketing Intern", type: "Internship", company: "MarketMinds", location: "Boston" },
  { id: 9, title: "Full Stack Developer", type: "Job", company: "StackBuild", location: "Denver" },
  { id: 10, title: "Product Manager", type: "Job", company: "Prodigy", location: "San Diego" },
  { id: 11, title: "Content Writer Intern", type: "Internship", company: "WriteRight", location: "Remote" },
  { id: 12, title: "Cybersecurity Analyst", type: "Job", company: "SecureNet", location: "Dallas" },
  { id: 13, title: "Graphic Designer Intern", type: "Internship", company: "PixelPerfect", location: "Miami" },
  { id: 14, title: "Business Analyst", type: "Job", company: "BizInsight", location: "Atlanta" },
  { id: 15, title: "HR Intern", type: "Internship", company: "PeopleFirst", location: "Remote" },
  { id: 16, title: "Machine Learning Engineer", type: "Job", company: "AIMinds", location: "Palo Alto" },
  { id: 17, title: "Network Engineer", type: "Job", company: "NetConnect", location: "Houston" },
  { id: 18, title: "Sales Intern", type: "Internship", company: "SellWell", location: "Chicago" },
  { id: 19, title: "Technical Support", type: "Job", company: "HelpDesk", location: "Phoenix" },
  { id: 20, title: "Operations Intern", type: "Internship", company: "OpsGen", location: "Philadelphia" },
];

const filters = ["All", "Job", "Internship"];

const applications = [
  { id: 1, job: "Frontend Developer Intern", status: "Applied" },
  { id: 2, job: "Backend Developer", status: "Interview Scheduled" },
  { id: 3, job: "QA Tester Intern", status: "Rejected" },
];

const StudentDashboard = () => {
  const { user, login } = useAuth();

  // Local profile state initialized from user context
  const [profile, setProfile] = useState({
    photo: user?.photo || null,
    fullName: user?.fullName || "",
    linkedIn: user?.linkedIn || "",
    github: user?.github || "",
    contact: user?.contact || "",
    bio: user?.bio || "",
    resume: user?.resume || null,
  });

  const [visibleCount, setVisibleCount] = useState(8);
  const [filter, setFilter] = useState("All");

  const resumeInputRef = useRef();
  const photoInputRef = useRef();

  const filteredJobs =
    filter === "All" ? jobData : jobData.filter((job) => job.type === filter);

  // Handle profile field changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle photo upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prev) => ({
        ...prev,
        photo: URL.createObjectURL(file),
        photoFile: file, // keep file for upload if needed
      }));
    }
  };

  // Handle resume upload
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prev) => ({
        ...prev,
        resume: file,
      }));
    }
  };

  // Save/Update profile and update global user context
  const handleProfileSave = (e) => {
    e.preventDefault();
    // Update global user context
    login({
      ...user,
      ...profile,
      photo: profile.photo,
      fullName: profile.fullName,
      resume: profile.resume,
    });
    alert("Profile updated!");
  };

  return (
    <div className="dashboard-wrapper">
      <aside className="filter-section">
        <h3>Filters</h3>
        {filters.map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </aside>

      <main className="dashboard-main">
        <h2>Student Dashboard</h2>

        {/* Features Section */}
        <section className="features features-grid">
          {/* Profile Management */}
          <form className="feature-card profile-card" onSubmit={handleProfileSave}>
            <h4>Profile Management</h4>
            <div className="profile-photo-section">
              <label htmlFor="profile-photo" className="profile-photo-label">
                {profile.photo ? (
                  <img
                    src={profile.photo}
                    alt="Profile"
                    className="profile-photo"
                    onClick={() => photoInputRef.current.click()}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <span
                    className="profile-photo-placeholder"
                    onClick={() => photoInputRef.current.click()}
                    style={{ cursor: "pointer" }}
                  >
                    Add Photo
                  </span>
                )}
              </label>
              <input
                id="profile-photo"
                type="file"
                accept="image/*"
                ref={photoInputRef}
                style={{ display: "none" }}
                onChange={handlePhotoChange}
              />
            </div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={profile.fullName}
              onChange={handleProfileChange}
              className="profile-input"
            />
            <input
              type="text"
              name="linkedIn"
              placeholder="LinkedIn URL"
              value={profile.linkedIn}
              onChange={handleProfileChange}
              className="profile-input"
            />
            <input
              type="text"
              name="github"
              placeholder="GitHub URL"
              value={profile.github}
              onChange={handleProfileChange}
              className="profile-input"
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact Number"
              value={profile.contact}
              onChange={handleProfileChange}
              className="profile-input"
            />
            <textarea
              name="bio"
              placeholder="Short Bio"
              value={profile.bio}
              onChange={handleProfileChange}
              className="profile-input"
              rows={2}
            />
            {/* Show current resume in profile section */}
            {profile.resume && (
              <div className="resume-info">
                <span>Current Resume: </span>
                <a
                  href={URL.createObjectURL(profile.resume)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {profile.resume.name}
                </a>
              </div>
            )}
            <button type="submit" className="upload-btn" style={{ marginTop: "10px" }}>
              Save / Update Profile
            </button>
          </form>

          {/* Resume Upload */}
          <div className="feature-card resume-card">
            <h4>Resume Upload</h4>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              ref={resumeInputRef}
              style={{ display: "none" }}
              onChange={handleResumeUpload}
            />
            <button
              className="upload-btn"
              onClick={() => resumeInputRef.current.click()}
            >
              {profile.resume ? "Replace Resume" : "Upload Resume"}
            </button>
            {profile.resume && (
              <div className="resume-info">
                <span>Current Resume: </span>
                <a
                  href={URL.createObjectURL(profile.resume)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {profile.resume.name}
                </a>
              </div>
            )}
          </div>

          {/* Application Status Tracking */}
          <div className="feature-card status-card">
            <h4>Application Status Tracking</h4>
            <ul className="application-status-list">
              {applications.map((app) => (
                <li key={app.id}>
                  <strong>{app.job}:</strong> <span>{app.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Job Listings */}
        <section className="job-listings">
          <h3>{filter} Listings</h3>
          <div className="job-cards">
            {filteredJobs.slice(0, visibleCount).map((job) => (
              <div key={job.id} className="job-card">
                <h4>{job.title}</h4>
                <p>
                  <strong>Company:</strong> {job.company}
                </p>
                <p>
                  <strong>Location:</strong> {job.location}
                </p>
                <p className="type-tag">{job.type}</p>
              </div>
            ))}
          </div>
          {visibleCount < filteredJobs.length && (
            <div className="show-more-wrapper">
              <button
                className="load-more-btn"
                onClick={() => setVisibleCount(visibleCount + 8)}
              >
                Show More
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default StudentDashboard;