import './App.css';
import NavbarComponent from './components/NavbarComponent/Navbar';
import Home from "./components/Pages/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./components/Auth/Login";
import Signup from './components/Auth/Signup';
import ForgotPassword from './components/Auth/ForgotPassword';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import RecruiterDashboard from './components/Dashboard/RecruiterDashboard';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import { AuthProvider, useAuth } from './components/Auth/AuthContext';
import Jobs from './components/Jobs/Jobs';

function App() {
  return (
    <div className='app'>
      <AuthProvider>
        <Router>
          <NavbarComponent/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword/>}/>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/dashboard" element={<DashboardRedirect />} />
            <Route path="/jobs" element={<Jobs/>}/>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

function DashboardRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.role === "admin") return <Navigate to="/admin-dashboard" />;
  if (user.role === "recruiter") return <Navigate to="/recruiter-dashboard" />;
  return <Navigate to="/student-dashboard" />;
}

export default App;
