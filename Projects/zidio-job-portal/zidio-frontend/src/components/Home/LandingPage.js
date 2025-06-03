import './LandingPage.css'
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function LandingPage() {

    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [signupData, setSignupData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
    });
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const location = useLocation();

    // Restore user from localStorage on mount and on route change
    useEffect(() => {
        const stored = localStorage.getItem("zidio_profile");
        setUser(stored ? JSON.parse(stored) : null);
    }, [location]);

    const handleUserIconClick = () => {
        setDropdownOpen((prev) => !prev);
    };

    const handleLogout = () => {
        setUser(null);
        setDropdownOpen(false);
        localStorage.removeItem("zidio_profile"); // <-- This line ensures user is removed from storage
    };

    const getDropdownItems = () => {
        if (!user) {
            return [];
        }
        switch (user.role) {
            case 'Student':
                return [
                    { label: 'Dashboard', link: '/dashboard/student' },
                ];
            case 'Recruiter':
                return [
                    { label: 'Dashboard', link: 'dashboard/recruiter' },
                ];
            case 'Admin':
                return [
                    { label: 'Dashboard', link: 'dashboard/admin' },
                ];
            default:
                return [];
        }
    };

    const handleSignupChange = (e) => {
        const { name, value } = e.target;
        setSignupData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        if (signupData.password !== signupData.confirmPassword) {
            alert("Password do not match!");
            return;
        }
        try {
            const response = await fetch("http://localhost:8080/api/auth/signup", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: signupData.fullName,
                    email: signupData.email,
                    password: signupData.password,
                    role: signupData.role
                })
            });
            if (response.ok) {
                alert("Signup successful!");
                setShowSignup(false);
                setSignupData({ fullName: '', email: '', password: '', confirmPassword: '', role: '' });
            } else {
                alert("Signup failed!");
            }
        } catch (err) {
            alert("error connecting to server!");
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: loginData.email,
                    password: loginData.password
                })
            });
            if (response.ok) {
                const data = await response.json();
                // Save all relevant fields
                const userObj = { 
                    fullName: data.fullName, 
                    role: data.role, 
                    email: data.email // this is good!
                };
                setUser(userObj);
                localStorage.setItem("zidio_profile", JSON.stringify(userObj));
                setShowLogin(false);
                setLoginData({ email: '', password: '' });
                alert("Login successful!");
            } else {
                alert("Login failed!");
            }
        } catch (err) {
            alert("Error connecting to server!");
        }
    };

    const handleLoginClick = () => {
        setShowLogin(true);
        setShowSignup(false);
    };

    const handleSignupClick = () => {
        setShowSignup(true);
        setShowLogin(false);
    };

    const handleClose = () => {
        setShowLogin(false);
        setShowSignup(false);
    };

    // Add this helper function
    const requireLogin = (e) => {
        if (!user) {
            e.preventDefault();
            alert("Please login first!");
            return false;
        }
        return true;
    };

    //user says
    const [testimonials, setTestimonials]=useState([]);
    useEffect(()=>{
        fetch("http://localhost:8080/api/userSays")
        .then(res=>res.json())
        .then(data=>setTestimonials(data))
        .catch(()=>setTestimonials([]));
    },[]);

    return (
        <div className='landingPage'>
            <header>
                <nav className='navbar'>
                    <div className='brandName'>Zidio Development</div>
                    <div>
                        <ul className='navItems'>
                            <li>
                                <Link
                                    to="/"
                                    style={user ? {} : { pointerEvents: 'auto', opacity: 0.6, cursor: 'not-allowed' }}
                                    onClick={e => !requireLogin(e) && false}
                                >Home</Link>
                            </li>
                            <li>
                                <a
                                    href='#trust'
                                    onClick={e => !requireLogin(e) && false}
                                    style={!user ? { pointerEvents: 'auto', opacity: 0.6, cursor: 'not-allowed' } : {}}
                                >About Us</a>
                            </li>
                            <li>
                                <Link
                                    to="/jobs"
                                    id='jobs-link'
                                    onClick={e => !requireLogin(e) && false}
                                    style={!user ? { pointerEvents: 'auto', opacity: 0.6, cursor: 'not-allowed' } : {}}
                                >Jobs</Link>
                            </li>
                            <li>
                                <a
                                    href='#newsletter'
                                    onClick={e => !requireLogin(e) && false}
                                    style={!user ? { pointerEvents: 'auto', opacity: 0.6, cursor: 'not-allowed' } : {}}
                                >Contact</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        {user ? (
                            <div className='user-info' onClick={handleUserIconClick}>
                                <img src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png' alt='user icon'></img>
                                <span>{user.fullName}</span>
                                <span>▼</span>
                                {dropdownOpen && (
                                    <div className='user-dropdown'>
                                        {getDropdownItems().map((item, idx) => (
                                            <Link key={idx} to={item.link} className='dropdown-item'>{item.label}</Link>
                                        ))}
                                        <div className='dropdown-divider'></div>
                                        <button className='dropdown-item logout-btn' onClick={handleLogout}>Logout</button>
                                    </div>

                                )}
                            </div>
                        ) : (
                            <ul className='authButtons'>
                                <li onClick={handleLoginClick} className='auth-btn'>Login</li>
                                <li onClick={handleSignupClick} className='auth-btn'>Signup</li>
                            </ul>
                        )}
                    </div>
                </nav>
            </header>
            <main>
                <div className='heroSection'>
                    <div className='welcomeMessage'>
                        <h1>Find your <span>dream job</span> with us</h1>
                        <p>Good life begins with a good company. Start explore thousands of jobs in one place.</p>
                        <div className='searchFields'>
                            <input type='text' placeholder='Job Title' disabled={!user} />
                            <input type='text' placeholder='Job Type' disabled={!user} />
                            <button
                                onClick={e => {
                                    if (!user) {
                                        e.preventDefault();
                                        alert("Please login first!");
                                    }
                                }}
                                disabled={!user}
                                style={!user ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
                            >→ Search</button>
                        </div>
                    </div>
                    <div className='welcomeImage'>
                        <div className='sampleJob'>
                            <div className='upsideJobInfo'>
                                <div>
                                    <img src='https://clipartcraft.com/images/google-logo-transparent-2.png' alt='google logo'></img>
                                </div>
                                <div>
                                    <h4>Software Engineeer</h4>
                                    <h5>India</h5>
                                </div>
                            </div>
                            <div className='downsideJobInfo'>
                                <p>1 day ago</p>
                                <p>100+ applicants</p>
                            </div>
                        </div>
                        <div className='heroImage'>
                            <img src='https://99eedu.com/wp-content/uploads/2022/10/JavaScript_Advance-1.png' alt='welcome image'></img>
                        </div>
                        <div className='sampleShowOff'>
                            <p>10K+ students placed</p>
                        </div>
                    </div>
                </div>
                <div className='trust' id='trust'>
                    <div className='upsideTrust'>
                        Truested By <span>1000+</span> Companies
                    </div>
                    <div className='downsideTrust'>
                        <div className='logo-track'>
                            <img src='https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' alt='Microsoft' />
                            <img src='https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' alt='Google' />
                            <img src='https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' alt='Netflix' />
                            <img src='https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' alt='Microsoft' />
                            <img src='https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' alt='Google' />
                            <img src='https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' alt='Netflix' />
                            <img src='https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' alt='Microsoft' />
                            <img src='https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' alt='Google' />
                            <img src='https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' alt='Netflix' />
                            <img src='https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' alt='Microsoft' />
                            <img src='https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' alt='Google' />
                            <img src='https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' alt='Netflix' />
                            <img src='https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' alt='Microsoft' />
                            <img src='https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' alt='Google' />
                            <img src='https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' alt='Netflix' />
                        </div>
                    </div>
                </div>
                <div className='browseJobCategory'>
                    <div className='browseUp'>
                        <h4>Browse <span>Job</span> Category</h4>
                        <p>Explore diverse job opportunities tailored to your skills. Start your career journey today!</p>
                    </div>
                    <div className='browseDown'>
                        <div className='categoryCards'>
                            <div className='card'>
                                <img src='https://png.pngtree.com/png-clipart/20200226/original/pngtree-financial-consulting-logo-vector-template-png-image_5314396.jpg' alt='finance logo'></img>
                                <h5>Finance</h5>
                                <p>Manage financial records and transactions</p>
                                <p id='special'>700+ new job posted</p>
                            </div>
                            <div className='card'>
                                <img src='https://png.pngtree.com/png-clipart/20200226/original/pngtree-financial-consulting-logo-vector-template-png-image_5314396.jpg' alt='finance logo'></img>
                                <h5>Finance</h5>
                                <p>Manage financial records and transactions</p>
                                <p id='special'>700+ new job posted</p>
                            </div>
                            <div className='card'>
                                <img src='https://png.pngtree.com/png-clipart/20200226/original/pngtree-financial-consulting-logo-vector-template-png-image_5314396.jpg' alt='finance logo'></img>
                                <h5>Finance</h5>
                                <p>Manage financial records and transactions</p>
                                <p id='special'>700+ new job posted</p>
                            </div>
                            <div className='card'>
                                <img src='https://png.pngtree.com/png-clipart/20200226/original/pngtree-financial-consulting-logo-vector-template-png-image_5314396.jpg' alt='finance logo'></img>
                                <h5>Finance</h5>
                                <p>Manage financial records and transactions</p>
                                <p id='special'>700+ new job posted</p>
                            </div>
                            <div className='card'>
                                <img src='https://png.pngtree.com/png-clipart/20200226/original/pngtree-financial-consulting-logo-vector-template-png-image_5314396.jpg' alt='finance logo'></img>
                                <h5>Finance</h5>
                                <p>Manage financial records and transactions</p>
                                <p id='special'>700+ new job posted</p>
                            </div>
                            <div className='card'>
                                <img src='https://png.pngtree.com/png-clipart/20200226/original/pngtree-financial-consulting-logo-vector-template-png-image_5314396.jpg' alt='finance logo'></img>
                                <h5>Finance</h5>
                                <p>Manage financial records and transactions</p>
                                <p id='special'>700+ new job posted</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='howItWorks'>
                    <div className='worksUp'>
                        <h5>How it <span>Works</span></h5>
                        <p>Effortlessly navigate through the process and land your dream job.</p>
                    </div>
                    <div className='worksDown'>
                        <div className='workImage'>
                            <div className='completeProfile'>
                                <img src='./assets/work-img.png' alt='women working'></img>
                                <h4>Complete Your Profile</h4>
                                <p>90% Completed</p>
                            </div>
                            <div>
                                <img src='./assets/work-img.png' alt='women working'></img>
                            </div>
                        </div>
                        <div className='workSteps'>
                            <div className='step'>
                                <div>
                                    <img src='https://static.vecteezy.com/system/resources/previews/033/999/389/non_2x/resume-icon-personal-data-check-icon-icon-for-web-design-isolated-on-white-background-vector.jpg' alt='resume icon'></img>
                                </div>
                                <div>
                                    <h4>Build Your Resume</h4>
                                    <p>create a standout resume with your skills.</p>
                                </div>
                            </div>
                            <div className='step'>
                                <div>
                                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ju9zYbEm96_SVhwwbxfPXazTt2o-wQ8aFA&s' alt='apply icon'></img>
                                </div>
                                <div>
                                    <h4>Apply for Job</h4>
                                    <p>Find and apply for jobs that match your skills.</p>
                                </div>
                            </div>
                            <div className='step'>
                                <div>
                                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2Kby3IHk-RAi49QYYynqz2cmclQDJeEelww&s' alt='hired icon'></img>
                                </div>
                                <div>
                                    <h4>Get Hired</h4>
                                    <p>Connect with employers and start your new job.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='userSays'>
                    <div className='userUp'>
                        <h2>What <span>User</span> says about us?</h2>
                    </div>
                    <div className='userDown'>
                        {testimonials.length === 0 ? (
                            <div>No testimonials yet.</div>
                        ) : (
                            testimonials.map((t, idx) => (
                                <div className='userCard' key={t.id || idx}>
                                    <div className='cardUp'>
                                        <img src={t.photo || './assets/work-img.png'} alt='user card' />
                                        <div>
                                            <h3>{t.name}</h3>
                                            <p>{"⭐".repeat(t.rating || 5)}</p>
                                        </div>
                                    </div>
                                    <div className='cardDown'>
                                        <p>{t.message}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className='newsletter' id='newsletter'>
                    <div className='newsUp'>
                        <h4>Never Wants to Miss Any <span>Job News?</span></h4>
                    </div>
                    <div className='newsDown'>
                        <div>
                            <input type='email' placeholder='Your@email.com' disabled={!user} />
                        </div>
                        <div>
                            <button
                                onClick={e => {
                                    if (!user) {
                                        e.preventDefault();
                                        alert("Please login first!");
                                    }
                                }}
                                disabled={!user}
                                style={!user ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
                            >Subscribe</button>
                        </div>
                    </div>
                </div>
            </main>
            <footer>
                <div className='footerUp'>
                    <div >
                        <h3>Zidio Development</h3>
                        <p>Job portal with user profiles, skill updates, certifications, work experience and </p>
                        <div className='socialMedia'>
                            <div>
                                <img src='https://cdn-icons-png.flaticon.com/512/4922/4922972.png' alt='instagram' onClick={e => !requireLogin(e) && false}
                                    style={!user ? { pointerEvents: 'auto', opacity: 0.6, cursor: 'not-allowed' } : {}}></img>
                                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYIf4qwAVMeAZHL7QYa9s4aOEEiPVYha2HTQ&s' alt='twitter' onClick={e => !requireLogin(e) && false}
                                    style={!user ? { pointerEvents: 'auto', opacity: 0.6, cursor: 'not-allowed' } : {}}></img>
                                <img src='https://img.icons8.com/ios_filled/512/telegram.png' alt='telegram' onClick={e => !requireLogin(e) && false}
                                    style={!user ? { pointerEvents: 'auto', opacity: 0.6, cursor: 'not-allowed' } : {}}></img>
                            </div>
                        </div>
                    </div>
                    <div className='roles-footer'>
                        <h3>Student</h3>
                        <p
                            onClick={e => !requireLogin(e) && false}
                            style={!user ? { pointerEvents: 'auto', opacity: 0.6, cursor: 'not-allowed' } : {}}
                        >Search Jobs</p>
                        <p onClick={e => !requireLogin(e) && false}
                            style={!user ? { pointerEvents: 'auto', opacity: 0.6, cursor: 'not-allowed' } : {}}>Saved Jobs</p>
                        <p onClick={e => !requireLogin(e) && false}
                            style={!user ? { pointerEvents: 'auto', opacity: 0.6, cursor: 'not-allowed' } : {}}>Applied Jobs</p>
                        <p onClick={e => !requireLogin(e) && false}
                            style={!user ? { pointerEvents: 'auto', opacity: 0.6, cursor: 'not-allowed' } : {}}>Profile Management</p>
                        <p onClick={e => !requireLogin(e) && false}
                            style={!user ? { pointerEvents: 'auto', opacity: 0.6, cursor: 'not-allowed' } : {}}>Courses</p>
                    </div>
                    <div className='roles-footer'>
                        <h3>Recruiter</h3>
                        <p onClick={e => !requireLogin(e) && false}
                            style={!user ? { pointerEvents: 'auto', opacity: 0.6, cursor: 'not-allowed' } : {}}>Post a Job</p>
                        <p onClick={e => !requireLogin(e) && false}
                            style={!user ? { pointerEvents: 'auto', opacity: 0.6, cursor: 'not-allowed' } : {}}>Post an Internship</p>
                        <p onClick={e => !requireLogin(e) && false}
                            style={!user ? { pointerEvents: 'auto', opacity: 0.6, cursor: 'not-allowed' } : {}}>Profile Management</p>
                        <p onClick={e => !requireLogin(e) && false}
                            style={!user ? { pointerEvents: 'auto', opacity: 0.6, cursor: 'not-allowed' } : {}}>Manage Jobs</p>
                        <p onClick={e => !requireLogin(e) && false}
                            style={!user ? { pointerEvents: 'auto', opacity: 0.6, cursor: 'not-allowed' } : {}}>Manage Internships</p>
                    </div>
                    <div className='roles-footer'>
                        <h3>Admin</h3>
                        <p onClick={e => !requireLogin(e) && false}
                            style={!user ? { pointerEvents: 'auto', opacity: 0.6, cursor: 'not-allowed' } : {}}>Profile Management</p>
                        <p onClick={e => !requireLogin(e) && false}
                            style={!user ? { pointerEvents: 'auto', opacity: 0.6, cursor: 'not-allowed' } : {}}>User Management</p>
                        <p onClick={e => !requireLogin(e) && false}
                            style={!user ? { pointerEvents: 'auto', opacity: 0.6, cursor: 'not-allowed' } : {}}>Content Moderation</p>
                        <p onClick={e => !requireLogin(e) && false}
                            style={!user ? { pointerEvents: 'auto', opacity: 0.6, cursor: 'not-allowed' } : {}}>System Analytics</p>
                        <p onClick={e => !requireLogin(e) && false}
                            style={!user ? { pointerEvents: 'auto', opacity: 0.6, cursor: 'not-allowed' } : {}}>System Settings</p>
                    </div>
                </div>
                <div className='footerDown'>
                    <p>Designed by Guguloth Ashok | Saumya Raj</p>
                </div>
            </footer>

            {/* Login Model */}
            {showLogin && (
                <div className='loginFormOverlay'>
                    <div className='loginFormSplit'>
                        <div className='loginUp'>
                            <button className='backHomeBtn' onClick={handleClose}>← Home</button>
                            <h2>Login</h2>
                            <form onSubmit={handleLoginSubmit}>
                                <input type='email' placeholder='📧 Your email' name='email' value={loginData.email} onChange={handleLoginChange} required />
                                <input type='password' placeholder='🔒 Password' name='password' value={loginData.password} onChange={handleLoginChange} required />
                                <button type="submit">Login</button>
                            </form>
                            <div className="modalLinks">
                                <span>Don't have an account? <span className="modalLink" onClick={handleSignupClick}>Signup</span></span>
                                <span className="modalLink">Forget Password?</span>
                            </div>
                        </div>
                        <div className='loginDown'>
                            <h3>Zidio Development</h3>
                            <p>Find the job made for you</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Signup Model */}
            {showSignup && (
                <div className='signupFormOverlay'>
                    <div className='signupFormSplit'>
                        <div className='signupUp'>
                            <h3>Zidio Development</h3>
                            <p>Find the job made for you</p>
                        </div>
                        <div className='signupDown'>
                            <button className='backHomeBtn' onClick={handleClose}>← Home</button>
                            <h2>Create Account</h2>
                            <form onSubmit={handleSignupSubmit}>
                                <input type='text' placeholder='Your name' name='fullName' value={signupData.fullName} onChange={handleSignupChange} required />
                                <input type='email' placeholder='📧 Your email' name='email' value={signupData.email} onChange={handleSignupChange} required />
                                <input type='password' placeholder='🔒 Password' name='password' value={signupData.password} onChange={handleSignupChange} required />
                                <input type='password' placeholder='🔒 Confirm Password' name='confirmPassword' value={signupData.confirmPassword} onChange={handleSignupChange} required />
                                <p>You are?</p>
                                <div className="radio-group">
                                    <label>
                                        <input type='radio' name='role' value='Student' checked={signupData.role === 'Student'} onChange={handleSignupChange} required />
                                        <span>Student</span>
                                    </label>
                                    <label>
                                        <input type='radio' name='role' value='Recruiter' checked={signupData.role === 'Recruiter'} onChange={handleSignupChange} required />
                                        <span>Recruiter</span>
                                    </label>
                                    <label>
                                        <input type='radio' name='role' value='Admin' checked={signupData.role === 'Admin'} onChange={handleSignupChange} required />
                                        <span>Admin</span>
                                    </label>
                                </div>
                                <button type="submit">Signup</button>
                            </form>
                            <div className="modalLinks">
                                <span>have an account? <span className="modalLink" onClick={handleLoginClick}>Login</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default LandingPage;