import React from "react";
import { useLocation } from "react-router-dom";

const jobsList = [
  // ...your jobs data...
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Jobs = () => {
  const query = useQuery();
  const search = query.get("search")?.toLowerCase() || "";

  // Filter jobs by title, description, or any field you want
  const filteredJobs = jobsList.filter(job =>
    job.title.toLowerCase().includes(search) ||
    job.description.toLowerCase().includes(search) ||
    job.type.toLowerCase().includes(search)
  );

  return (
    <div>
      <h2>Jobs{search && ` for "${search}"`}</h2>
      <div className="job-list">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <div key={job.id} className="job-card">
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              {/* ...other job details... */}
            </div>
          ))
        ) : (
          <p>No jobs found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Jobs;