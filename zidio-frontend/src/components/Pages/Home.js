import React, { useState } from "react";
import "./Home.css";
import { NavLink, useNavigate } from 'react-router-dom'; // <-- add useNavigate
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate(); // <-- add this
  const [searchTerm, setSearchTerm] = useState(""); // <-- add this

  return (
    <div className="home">
      <div className="hero-section">
        <h1>
          Unlock Your <span className="highlight">Career Potential</span> with Zidio
        </h1>
        <p>
          Discover Opportunities, Connect with Employers and Elevate Your Professional Journey
        </p>
        <div className="find-jobs">
          <input
            type="text"
            placeholder="Search Jobs, Internships, or Keywords"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)} // <-- add this
          />
          <button
            onClick={() => {
              if (searchTerm.trim()) {
                navigate(`/jobs?search=${encodeURIComponent(searchTerm.trim())}`);
              } else {
                navigate("/jobs");
              }
            }}
          >
            Search ➡️
          </button>
        </div>
      </div>

      <div className="spacer"></div>

      <div className="why-zidio">
        <h2>Why Choose Zidio?</h2>
        <div className="card-container">
          <div className="card">
            <div className="icon-circle">🔍</div>
            <h3>Tailored Job Matches</h3>
            <p>Get job recommendations that fit your skills, interests, and career goals perfectly.</p>
          </div>
          <div className="card">
            <div className="icon-circle">⚡</div>
            <h3>Streamlined Application</h3>
            <p>Apply to multiple roles with one click and manage your applications effortlessly.</p>
          </div>
          <div className="card">
            <div className="icon-circle">📚</div>
            <h3>Growth Resources</h3>
            <p>Access curated learning materials, tips, and courses to upskill professionally.</p>
          </div>
          <div className="card">
            <div className="icon-circle">💼</div>
            <h3>Connect with Top Employers</h3>
            <p>Engage directly with trusted companies and discover exclusive job openings.</p>
          </div>
        </div>
      </div>

      <div className="zidio-steps">
        <h2>
          Your Zidio Journey in <span className="steps-highlight">Three Simple Steps</span>
        </h2>
        <div className="steps-content">
           <div className="step-details">
            {[
              {
                title: "Create Your Profile",
                desc: "Build a comprehensive profile that showcases your skills, experience, and career goals. The more information you provide, the better we can match you with the right opportunities.",
              },
              {
                title: "Discover Opportunities",
                desc: "Explore a diverse range of job listings curated to match your profile. Filter by industry, location, and job type to find the perfect fit for your next career move.",
              },
              {
                title: "Apply and Thrive",
                desc: "Submit applications seamlessly and stay updated on your job status. Zidio is committed to supporting you throughout your career journey, helping you thrive in your chosen path.",
              },
            ].map((step, idx) => (
              <div className={`step-box${idx === 1 ? " active-step" : ""}`} key={idx}>
                <div className="step-number-circle">{idx + 1}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="job-board">
            <h3>Find Your Match Job Here</h3>
            <div className="job-grid">
              {[
                {
                  title: "Step 1: Master Java & OOP",
                  icon: "📘",
                  desc: "Build a strong foundation in Java, object-oriented programming, and core concepts.",
                },
                {
                  title: "Step 2: Backend with Spring Boot",
                  icon: "🛠️",
                  desc: "Develop RESTful APIs, connect to databases, and manage authentication using Spring Boot.",
                },
                {
                  title: "Step 3: Frontend with React",
                  icon: "⚛️",
                  desc: "Create interactive user interfaces and connect your frontend to backend APIs using React.",
                },
                {
                  title: "Become a Java Full Stack Developer",
                  icon: "🚀",
                  desc: "Integrate your skills, build real-world projects, deploy to the cloud, and launch your career!",
                },
              ].map((step, index) => (
                <div key={index} className={`job-card ${index === 3 ? "active" : ""}`}>
                  <h4>
                    <span style={{ fontSize: "1.3em", marginRight: 8 }}>{step.icon}</span>
                    {step.title}
                  </h4>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

         
        </div>
      </div>

      <div className="job-match-section" id="job-match-section">
        <h2>
          <span className="pink-text">Find Your Match</span> <br />
          Job Here
        </h2>
        <div className="job-card-grid">
          {[
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
          ].map((job) => (
            <div
              className="job-card-main home-job-card"
              key={job.id}
              style={{ backgroundColor: job.bgColor, cursor: "pointer" }}
            >
              <div className="job-logo-outer">
                <img src={job.logo} alt={job.company} className="job-logo-img" />
              </div>
              <div className="job-card-content">
                <div className="job-card-header">
                  <h3>{job.title}</h3>
                  <span className={`status ${job.status === "Hiring" ? "hiring" : "closed"}`}>{job.status}</span>
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
                  <button
                    className="apply-btn"
                    onClick={e => {
                      e.stopPropagation();
                      navigate(`/jobs?jobId=${job.id}`);
                    }}
                  >
                    View
                  </button>
                  <button className="bookmark-btn" aria-label="Bookmark">☆</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="show-more-btn"
          onClick={() => navigate("/jobs")} // <-- update this line
        >
          Show More
        </button>
      </div>

      <div className="testimonial-section" id="testimonial-section">
        <div className="testimonial-image">
          <img
            src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?fit=crop&w=500&q=80"
            alt="User"
          />
        </div>
        <div className="testimonial-content">
          <div className="testimonial-heading">
            <h2>
              What Our Users <br />
              <span>Say About Zidio</span>
            </h2>
            <div className="testimonial-arrows">
              <button>{"←"}</button>
              <button>{"→"}</button>
            </div>
          </div>
          <div className="testimonial-card">
            <h3>Aisha M., HR Professional</h3>
            <p>
              Connecting with top employers has never been easier. Zidio opened
              doors to exclusive opportunities with renowned companies. The social
              approval section is a testament to the platform’s effectiveness, and
              I’m proud to be a part of the Zidio community.
            </p>
          </div>
        </div>
      </div>
      {/* Newsletter Section */}
      <div className="newsletter-section" id="newsletter-section">
        <h2>Stay Connected with Us</h2>
        <p>Subscribe to our newsletter for the latest job updates and career tips!</p>
        <form className="newsletter-form">
          <input type="email" placeholder="Enter your email" required />
          <button type="submit">Subscribe</button>
        </form>
      </div>
      <div className="footer">
        <header className="navbar-container">
          <div className="logo">
            <h1>Zidio Development</h1>
            <p>Find Your Dream Job</p>
          </div>
          <nav className="nav-links">
            <a href="/">Home</a>
            <a href="#job-match-section">Jobs</a>
            <a href="#testimonial-section">Blog</a>
            <a href="#newsletter-section">Newsletter</a>

          </nav>
          <div className="social-icons">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaLinkedin />
          </div>
        </header>
        <footer className="footer-container">
          <p>© 2025 Zidio Development. All rights reserved</p>
          <nav className="footer-links">

            <NavLink to="/terms" activeClassName="active">Terms of Service</NavLink>
            <NavLink to="/policy" activeClassName="active">Policy Service</NavLink>
            <NavLink to="/cookie" activeClassName="active">Cookie Policy</NavLink>
            <NavLink to="/partners" activeClassName="active">Partners</NavLink>
          </nav>
        </footer>
      </div>
    </div>
  );
};

export default Home;
