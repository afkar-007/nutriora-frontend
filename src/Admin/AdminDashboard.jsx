import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../AdminStyles/AdminDashboard.css";

import LoadingGif from "../assets/LoadingNutoria.gif";

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  localStorage.removeItem("userLoggedIn")

  const [users, setUsers] = useState([]);

  // localStorage.setItem("AdminLogin", "true");

  // Fetch all users
  async function GetUsers() {
    try {
      setLoading(true);

      const response = await fetch("https://nutriora-backend.onrender.com/user/users");

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      // if(response.ok){
        
      //   setUsers(data.data || []);
      // }

    localStorage.setItem("AdminLogin", "true");
    setUsers(data.data || []);
      
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  function adminGateway() {
  const adminGate = localStorage.getItem("AdminLogin");

  if (adminGate !== "true") {
      localStorage.removeItem("userLoggedIn")
      localStorage.removeItem("AdminLogin")
    navigate("/", { replace: true });
    return false;
  }

  return true;
}

  useEffect(() => {
    async function Loader() {
      
      await adminGateway()
      await GetUsers()
      
      

      
    }
    Loader()
  }, []);

 
function adminGateway() {
  const adminGate = localStorage.getItem("AdminLogin");

  if (adminGate !== "true") {
    navigate("/", { replace: true });
  }
}
  
 

  function handleLogout() {
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("ClientHome");
    localStorage.removeItem("AdminLogin");

    navigate("/");
  }

  if (loading) {
    return (
      <div className="client-profile-status">
        <img
          src={LoadingGif}
          alt="Loading..."
          className="profile-loading-gif"
        />

        <p>Your wellness journey is loading...</p>
      </div>
    );
  }

  const activities = [
    {
      icon: "bi-person-check",
      color: "green",
      title: "New client registered",
      description: "A new client joined Nutriora.",
      time: "10 min ago",
    },
    {
      icon: "bi-clipboard2-check",
      color: "blue",
      title: "Diet plan updated",
      description: "A client's weekly diet plan was updated.",
      time: "35 min ago",
    },
    {
      icon: "bi-calendar-check",
      color: "orange",
      title: "Consultation reminder",
      description: "You have an upcoming client consultation.",
      time: "1 hour ago",
    },
    {
      icon: "bi-graph-up-arrow",
      color: "purple",
      title: "Client progress",
      description: "A client updated their latest measurements.",
      time: "2 hours ago",
    },
  ];

  const quickActions = [
    {
      icon: "bi-person-lines-fill",
      title: "View My Clients",
      description: "Review client profiles and goals",
      link: "/nutritionist/clients",
    },
    {
      icon: "bi-journal-medical",
      title: "Create Diet Plan",
      description: "Build a personalized weekly plan",
      link: "/nutritionist/diet-plans/create",
    },
    // {
    //   icon: "bi-calendar2-week",
    //   title: "Manage Consultations",
    //   description: "View appointments and schedules",
    //   link: "/nutritionist/appointments",
    // },
  ];

  const ActiveUsers = users.filter((sends) => sends.profileCompleted === true);

  return (
    <>
      {showLogoutConfirm && (
        <div className="nutrition-logout-overlay">
          <div className="nutrition-logout-modal">
            <div className="nutrition-logout-icon">
              <i className="bi bi-box-arrow-right"></i>
            </div>

            <h3>Logout Confirmation</h3>

            <p>Are you sure you want to logout from your Nutriora account?</p>

            <div className="nutrition-logout-actions">
              <button
                className="nutrition-cancel-btn"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>

              <button className="nutrition-confirm-btn" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right"></i>
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="nutritionist-dashboard">
        {/* Mobile overlay */}
        <div
          className={`nutritionist-overlay ${
            sidebarOpen ? "nutritionist-overlay-visible" : ""
          }`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* Sidebar */}
        <aside
          className={`nutritionist-sidebar ${
            sidebarOpen ? "nutritionist-sidebar-open" : ""
          }`}
        >
          <Link
            to="/"
            className="nutritionist-brand"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="nutritionist-brand-icon">
              <i className="bi bi-leaf" />
            </div>

            <div>
              <h2>nutriora</h2>
              <p>Nutrition Studio</p>
            </div>
          </Link>

          <div className="nutritionist-menu-label">WORKSPACE</div>

          <nav className="nutritionist-nav">
            <Link
              to="/nutritionist"
              className="nutritionist-nav-link nutritionist-nav-active"
              onClick={() => setSidebarOpen(false)}
            >
              <i className="bi bi-grid-1x2" />
              <span>Overview</span>
            </Link>

            <Link
              to="/nutritionist/clients"
              className="nutritionist-nav-link"
              onClick={() => setSidebarOpen(false)}
            >
              <i className="bi bi-people" />
              <span>My Clients</span>
            </Link>

            <Link
              to="/nutritionist/diet-plans"
              className="nutritionist-nav-link"
              onClick={() => setSidebarOpen(false)}
            >
              <i className="bi bi-clipboard2-pulse" />
              <span>Diet Plans</span>
            </Link>

            <Link
              to="/nutritionist/healthUsers"
              className="nutritionist-nav-link"
              onClick={() => setSidebarOpen(false)}
            >
              <i class="bi bi-people-fill"></i>
              <span>Health Users</span>
            </Link>

            <Link
              to="/healthCard"
              className="nutritionist-nav-link"
              onClick={() => setSidebarOpen(false)}
            >
              <i class="bi bi-activity"></i>
              <span>Health Plans</span>
            </Link>

            {/* <Link
            to="/nutritionist/appointments"
            className="nutritionist-nav-link"
            onClick={() => setSidebarOpen(false)}
          >
            <i className="bi bi-calendar2-week" />
            <span>Consultations</span>
          </Link>

          <Link
            to="/nutritionist/progress"
            className="nutritionist-nav-link"
            onClick={() => setSidebarOpen(false)}
          >
            <i className="bi bi-graph-up-arrow" />
            <span>Progress Tracking</span>
          </Link> */}
          </nav>

          <div className="nutritionist-menu-label nutritionist-tools-label">
            PREFERENCES
          </div>

          <nav className="nutritionist-nav">
            <Link
              to="/NutritionistProfile"
              className="nutritionist-nav-link"
              onClick={() => setSidebarOpen(false)}
            >
              <i className="bi bi-person-circle" />
              <span>My Profile</span>
            </Link>

            <Link
              to="/secret"
              className="nutritionist-nav-link"
              onClick={() => setSidebarOpen(false)}
            >
              <i class="bi bi-lock-fill"></i>
              <span>Secret</span>
            </Link>

            <Link
              to="/Nutritionist/about"
              className="nutritionist-nav-link"
              onClick={() => setSidebarOpen(false)}
            >
              <i class="bi bi-journal-text"></i>
              <span>About</span>
            </Link>
          </nav>

          <div className="nutritionist-sidebar-bottom">
            <div className="nutritionist-support-card">
              <div className="nutritionist-support-icon">
                <i className="bi bi-heart-pulse" />
              </div>

              <h4>Your wellness workspace</h4>
              <p>Small healthy changes make a lasting difference.</p>
            </div>

            <button
              type="button"
              className="nutritionist-logout"
              onClick={() => setShowLogoutConfirm(true)}
            >
              <i className="bi bi-box-arrow-left" />
              <span>Log out</span>
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="nutritionist-main">
          {/* Topbar */}
          <header className="nutritionist-topbar">
            <div className="nutritionist-topbar-left">
              <button
                type="button"
                className="nutritionist-mobile-menu"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle navigation"
              >
                <i className="bi bi-list" />
              </button>

              <div className="nutritionist-breadcrumb">
                Workspace <i className="bi bi-chevron-right" />{" "}
                <strong>Overview</strong>
              </div>
            </div>

            <div className="nutritionist-topbar-right">
              <div className="nutritionist-online-status">
                <span />
                Dashboard
              </div>

              <Link
                to="/NutritionistProfile"
                className="nutritionist-profile-avatar"
                aria-label="My profile"
              >
                <i className="bi bi-person" />
              </Link>
            </div>
          </header>

          <div className="nutritionist-content">
            {/* Welcome banner */}
            <section className="nutritionist-welcome">
              <div className="nutritionist-welcome-content">
                <span className="nutritionist-eyebrow">
                  <i className="bi bi-sun" /> YOUR NUTRITION PRACTICE
                </span>

                <h1>Good Day, Nutritionist.</h1>

                <p>
                  Every healthier choice matters. Here's an overview of your
                  clients, nutrition plans and today's schedule.
                </p>

                <Link
                  to="/nutritionist/clients"
                  className="nutritionist-primary-btn"
                >
                  Explore my clients
                  <i className="bi bi-arrow-up-right" />
                </Link>
              </div>

              <div className="nutritionist-welcome-art">
                <div className="nutritionist-art-ring nutritionist-art-ring-one" />
                <div className="nutritionist-art-ring nutritionist-art-ring-two" />
                <i className="bi bi-flower1 nutritionist-art-flower" />
                <i className="bi bi-leaf nutritionist-art-leaf" />
              </div>
            </section>

            {/* Dashboard stats */}
            <section className="nutritionist-stats-section">
              <div className="nutritionist-section-heading">
                <div>
                  <span className="nutritionist-section-eyebrow">
                    YOUR PRACTICE
                  </span>
                  <h2>At a glance</h2>
                </div>

                <span className="nutritionist-updated">
                  <i className="bi bi-arrow-repeat" /> Overview
                </span>
              </div>

              <div className="nutritionist-stats-grid">
                {/* Total users - fetched from backend */}
                <div className="nutritionist-stat-card">
                  <div className="nutritionist-stat-top">
                    <div className="nutritionist-stat-icon green">
                      <i className="bi bi-people" />
                    </div>

                    <i className="bi bi-three-dots nutritionist-stat-more" />
                  </div>

                  <p className="nutritionist-stat-title">Total Users</p>

                  <h3>{users.length - 1}</h3>

                  <p className="nutritionist-stat-description">
                    Total registered users
                  </p>
                </div>

                {/* Active diet plans */}
                <div className="nutritionist-stat-card">
                  <div className="nutritionist-stat-top">
                    <div className="nutritionist-stat-icon blue">
                      <i className="bi bi-clipboard2-pulse" />
                    </div>

                    <i className="bi bi-three-dots nutritionist-stat-more" />
                  </div>

                  <p className="nutritionist-stat-title">Active Users</p>

                  <h3>{ActiveUsers.length}</h3>

                  <p className="nutritionist-stat-description">
                    Users currently active
                  </p>
                </div>

                {/* Consultations */}
                <div className="nutritionist-stat-card">
                  <div className="nutritionist-stat-top">
                    <div className="nutritionist-stat-icon orange">
                      <i className="bi bi-calendar2-check" />
                    </div>

                    <i className="bi bi-three-dots nutritionist-stat-more" />
                  </div>

                  <p className="nutritionist-stat-title">Consultations</p>

                  <h3>0</h3>

                  <p className="nutritionist-stat-description">
                    Scheduled for today
                  </p>
                </div>

                {/* Pending reviews
              <div className="nutritionist-stat-card">
                <div className="nutritionist-stat-top">
                  <div className="nutritionist-stat-icon purple">
                    <i className="bi bi-hourglass-split" />
                  </div>

                  <i className="bi bi-three-dots nutritionist-stat-more" />
                </div>

                <p className="nutritionist-stat-title">
                  Pending Reviews
                </p>

                <h3>0</h3>

                <p className="nutritionist-stat-description">
                  Clients needing follow-up
                </p>
              </div> */}
              </div>
            </section>

            {/* Activity and quick actions */}
            <section className="nutritionist-dashboard-bottom">
              {/* <div className="nutritionist-panel"> */}
              {/* <div className="nutritionist-panel-heading">
                <div>
                  <h3>Recent activity</h3>
                  <p>Stay up to date with your practice</p>
                </div>

                <span className="nutritionist-activity-count">
                  {activities.length} updates
                </span>
              </div> */}

              {/* <div className="nutritionist-activity-list">
                {activities.map((activity, index) => (
                  <div
                    className="nutritionist-activity-item"
                    key={index}
                  >
                    <div
                      className={`nutritionist-activity-icon ${activity.color}`}
                    >
                      <i className={`bi ${activity.icon}`} />
                    </div>

                    <div className="nutritionist-activity-details">
                      <h4>{activity.title}</h4>
                      <p>{activity.description}</p>
                    </div>

                    <span className="nutritionist-activity-time">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div> */}
              {/* </div> */}

              <div className="nutritionist-panel">
                <div className="nutritionist-panel-heading">
                  <div>
                    <h3>Quick actions</h3>
                    <p>Get things done faster</p>
                  </div>
                </div>

                <div className="nutritionist-quick-actions">
                  {quickActions.map((action) => (
                    <Link
                      to={action.link}
                      className="nutritionist-quick-action"
                      key={action.title}
                    >
                      <div className="nutritionist-quick-icon">
                        <i className={`bi ${action.icon}`} />
                      </div>

                      <div className="nutritionist-quick-text">
                        <h4>{action.title}</h4>
                        <p>{action.description}</p>
                      </div>

                      <i className="bi bi-arrow-up-right nutritionist-quick-arrow" />
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            <footer className="nutritionist-footer">
              <span>© {new Date().getFullYear()} Nutriora</span>
              <span>Supporting healthier lives, every day.</span>
            </footer>
          </div>
        </main>
      </div>
    </>
  );
}

export default AdminDashboard;
