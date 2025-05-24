import React, { useState, useRef } from "react";
import { useAuth } from "../Auth/AuthContext";
import "./RecruiterDashboard.css";

const initialJobData = [
  // ... (your initial job data)
];

const filters = ["All", "Job", "Internship"];

const RecruiterDashboard = () => {
  const { user, login } = useAuth();

  const [profile, setProfile] = useState({
    photo: user?.photo || null,
    fullName: user?.fullName || "",
    linkedIn: user?.linkedIn || "",
    github: user?.github || "",
    contact: user?.contact || "",
    bio: user?.bio || "",
    resume: user?.resume || null,
  });

  const [jobs, setJobs] = useState(initialJobData);
  const [visibleCount, setVisibleCount] = useState(6);
  const [filter, setFilter] = useState("All");
  const [newJob, setNewJob] = useState({
    title: "",
    type: "Job",
    company: "",
    location: "",
    ctc: "",
    experience: "",
    logo: null,
    logoUrl: "",
    applications: [],
  });
  const [showApplications, setShowApplications] = useState(null);
  const [editingJobId, setEditingJobId] = useState(null); // State to track which job is being edited

  const photoInputRef = useRef();

  const filteredJobs = filter === "All" ? jobs : jobs.filter((job) => job.type === filter);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prev) => ({
        ...prev,
        photo: URL.createObjectURL(file),
        photoFile: file,
      }));
    }
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    login({
      ...user,
      ...profile,
    });
    alert("Profile updated!");
  };

  const handleNewJobChange = (e) => {
    const { name, value } = e.target;
    setNewJob((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewJob((prev) => ({
        ...prev,
        logo: file,
        logoUrl: URL.createObjectURL(file),
      }));
    }
  };

  const handlePostJob = (e) => {
    e.preventDefault();
    const job = {
      ...newJob,
      id: Date.now(),
      applications: [],
    };
    setJobs((prev) => [...prev, job]);
    resetNewJob();
    alert("Job posted successfully!");
  };

  const resetNewJob = () => {
    setNewJob({
      title: "",
      type: "Job",
      company: "",
      location: "",
      ctc: "",
      experience: "",
      logo: null,
      logoUrl: "",
      applications: [],
    });
    setEditingJobId(null); // Reset editing job ID
  };

  const handleEditJob = (id) => {
    const jobToEdit = jobs.find((job) => job.id === id);
    if (jobToEdit) {
      setNewJob(jobToEdit);
      setEditingJobId(id); // Set the job ID being edited
    }
  };

  const handleUpdateJob = (e) => {
    e.preventDefault();
    setJobs((prev) =>
      prev.map((job) => (job.id === editingJobId ? { ...newJob, id: editingJobId } : job))
    );
    resetNewJob();
    alert("Job updated successfully!");
  };

  const handleDeleteJob = (id) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  const toggleApplications = (id) => {
    setShowApplications((prev) => (prev === id ? null : id));
  };

  return (
    <div className="dashboard-container">
      <aside className="filter-sidebar">
        <h3>Filters</h3>
        <div className="filter-buttons">
          {filters.map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? "active-filter" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </aside>

      <main className="main-content">
        <h2 className="dashboard-title">Recruiter Dashboard</h2>

        {/* Profile Section */}
        <section className="profile-section">
          <form className="profile-form" onSubmit={handleProfileSave}>
            <h3>Profile Management</h3>
            <div className="profile-photo-wrapper">
              <label htmlFor="profile-photo" className="photo-label">
                {profile.photo ? (
                  <img
                    src={profile.photo}
                    alt="Profile"
                    className="profile-photo"
                    onClick={() => photoInputRef.current.click()}
                    title="Click to change photo"
                  />
                ) : (
                  <div
                    className="profile-photo-placeholder"
                    onClick={() => photoInputRef.current.click()}
                    title="Add Photo"
                  >
                    +
                  </div>
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
              name="fullName"
              placeholder="Full Name"
              value={profile.fullName}
              onChange={handleProfileChange}
              className="input-field"
              required
            />
            <input
              name="linkedIn"
              placeholder="LinkedIn URL"
              value={profile.linkedIn}
              onChange={handleProfileChange}
              className="input-field"
            />
            <input
              name="github"
              placeholder="GitHub URL"
              value={profile.github}
              onChange={handleProfileChange}
              className="input-field"
            />
            <input
              name="contact"
              placeholder="Contact Number"
              value={profile.contact}
              onChange={handleProfileChange}
              className="input-field"
            />
            <textarea
              name="bio"
              placeholder="Short Bio"
              value={profile.bio}
              onChange={handleProfileChange}
              className="input-field textarea-field"
              rows={3}
            />
            <button type="submit" className="btn btn-primary save-profile-btn">
              Save / Update Profile
            </button>
          </form>

          {/* Job Posting Form */}
          <form className="job-post-form" onSubmit={editingJobId ? handleUpdateJob : handlePostJob}>
            <h3>{editingJobId ? "Edit Job" : "Post New Job / Internship"}</h3>
            <input
              name="title"
              placeholder="Job Title"
              value={newJob.title}
              onChange={handleNewJobChange}
              className="input-field"
              required
            />
            <select
              name="type"
              value={newJob.type}
              onChange={handleNewJobChange}
              className="input-field"
            >
              <option value="Job">Job</option>
              <option value="Internship">Internship</option>
            </select>
            <input
              name="company"
              placeholder="Company Name"
              value={newJob.company}
              onChange={handleNewJobChange}
              className="input-field"
              required
            />
            <input
              name="location"
              placeholder="Location"
              value={newJob.location}
              onChange={handleNewJobChange}
              className="input-field"
              required
            />
            <input
              name="ctc"
              placeholder="CTC (e.g. 6 LPA)"
              value={newJob.ctc}
              onChange={handleNewJobChange}
              className="input-field"
            />
            <input
              name="experience"
              placeholder="Experience (e.g. 1-3 years)"
              value={newJob.experience}
              onChange={handleNewJobChange}
              className="input-field"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="input-field file-input"
            />
            <button type="submit" className="btn btn-primary post-job-btn">
              {editingJobId ? "Update Job" : "Post Job"}
            </button>
          </form>
        </section>

        {/* Job Listings */}
        <section className="job-listings-section">
          <div className="job-listings-card">
            <h3 className="listings-title">
              <span role="img" aria-label="briefcase">💼</span> {filter} Listings
            </h3>
            <div className="job-cards-container">
              {filteredJobs.slice(0, visibleCount).map((job) => (
                <div key={job.id} className="job-card unique-job-card">
                  <div className="job-card-header">
                    {job.logoUrl ? (
                      <img src={job.logoUrl} alt={`${job.company} logo`} className="unique-logo" />
                    ) : (
                      <div className="unique-logo">{job.company[0]}</div>
                    )}
                    <span className={`job-type-tag unique-type ${job.type.toLowerCase()}`}>{job.type}</span>
                  </div>
                  <div className="job-info unique-job-info">
                    <h4 className="job-title">{job.title}</h4>
                    <p className="company-name">{job.company}</p>
                    <p className="job-location"><span role="img" aria-label="location">📍</span> {job.location}</p>
                    <p className="job-ctc"><span role="img" aria-label="money">💰</span> {job.ctc}</p>
                    <p className="job-exp"><span role="img" aria-label="exp">🧑‍💼</span> {job.experience}</p>
                  </div>
                  <div className="job-card-actions unique-actions">
                    <button className="btn view-app-btn unique-btn" onClick={() => toggleApplications(job.id)}>
                      <span role="img" aria-label="apps">👀</span> {showApplications === job.id ? "Hide Applications" : "View Applications"}
                    </button>
                    <button className="btn edit-btn unique-btn" onClick={() => handleEditJob(job.id)}>
                      <span role="img" aria-label="edit">✏️</span>
                    </button>
                    <button className="btn delete-btn unique-btn" onClick={() => handleDeleteJob(job.id)}>
                      <span role="img" aria-label="delete">🗑️</span>
                    </button>
                  </div>

                  {showApplications === job.id && (
                    <div className="overlay" onClick={() => setShowApplications(null)}>
                      <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
                        <h5>
                          <span role="img" aria-label="apps">📄</span> Applications for {job.title}
                        </h5>
                        {job.applications && job.applications.length > 0 ? (
                          <ul>
                            {job.applications.map((app, i) => (
                              <li key={i}>
                                <span role="img" aria-label="user">👤</span> {app.name} -{" "}
                                <a href={`/${app.resume}`} download>
                                  Download Resume
                                </a>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>No applications yet.</p>
                        )}
                        <button className="close-overlay-btn" onClick={() => setShowApplications(null)}>
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {visibleCount < filteredJobs.length && (
              <div className="load-more-wrapper">
                <button
                  className="btn btn-secondary load-more-btn unique-btn"
                  onClick={() => setVisibleCount(visibleCount + 6)}
                >
                  Show More
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default RecruiterDashboard;
