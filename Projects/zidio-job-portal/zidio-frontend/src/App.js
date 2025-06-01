import React from 'react';
import './App.css';
import LandingPage from './components/Home/LandingPage';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import RecruiterDashboard from './components/Dashboard/RecruiterDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Jobs from './components/Jobs/Jobs';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard/student" element={<StudentDashboard />} />
          <Route path="/dashboard/recruiter" element={<RecruiterDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/jobs" element={<Jobs/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
