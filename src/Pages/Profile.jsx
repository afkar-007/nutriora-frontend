import { Link } from "react-router-dom";
import "../Styles/Profile.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import GetProfile from "../Services/GetDetails/SerFetchProfile";
import { useEffect } from "react";
import LoadingGif from "../assets/LoadingNutoria.gif";

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const userEmail = localStorage.getItem("UserEmail") || "";
  const [loading, setLoading] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const homePageGateWay = localStorage.getItem("homePage");


  async function Logout(e) {
    e.preventDefault();
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("homePage");
    localStorage.removeItem("AdminLogin")
    
  const login = localStorage.getItem("homePage");
  console.log(login);
  

    
    
    

    navigate("/");
  }

  useEffect(() => {
      const login = localStorage.getItem("homePage");

  if (login !== "true") {
    navigate("/", { replace: true });
    
    
    return;
  }
    
    fetchProfile();
  }, []);

  const profileSections = [
    {
      id: 1,
      title: "Personal Details",
      description: "Your basic information and contact details.",
      icon: "bi-person-vcard",
      path: "/client/personal-details",
      step: "01",
    },
    {
      id: 2,
      title: "Body Measurements",
      description: "Your height, weight and body measurements.",
      icon: "bi-rulers",
      path: "/client/body-measurements",
      step: "02",
    },
    {
      id: 3,
      title: "Nutrition Goals",
      description: "Your health goals, targets and motivation.",
      icon: "bi-bullseye",
      path: "/client/nutrition-goals",
      step: "03",
    },
    {
      id: 4,
      title: "Food Habits & Preferences",
      description: "Your food choices, dietary preferences and challenges.",
      icon: "bi-egg-fried",
      path: "/client/food-habits",
      step: "04",
    },
    {
      id: 5,
      title: "Lifestyle & Health",
      description: "Your daily routine, activity and health background.",
      icon: "bi-heart-pulse",
      path: "/client/lifestyle",
      step: "05",
    },
  ];

  async function fetchProfile() {
    try {
      setLoading(true);

      const response = await GetProfile();

      if (!response.ok) {
        alert(response.message);
        return;
      }

      if (response.ok) {
        console.log(response.data);
        setProfile(response.data);
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="client-profile-status">
        <img
          src={LoadingGif}
          alt="Loading..."
          className="profile-loading-gif"
        />

        <h3>Preparing your profile</h3>
        <p>Your wellness journey is loading...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <>
        <Link to="/clientHome">
          <i className="bi bi-arrow-left" />
          Back to dashboard
        </Link>

        <div className="client-profile-status">Personal details not found.</div>
      </>
    );
  }

  return (
    <>
      {showLogoutConfirm && (
        <div className="logout-overlay">
          <div className="logout-confirm-box">
            <div className="logout-icon">
              <i className="bi bi-box-arrow-right"></i>
            </div>

            <h3>Logout Confirmation</h3>

            <p>Are you sure you want to logout from your account?</p>

            <div className="logout-actions">
              <button
                className="logout-cancel-btn"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>

              <button
                className="logout-confirm-btn"
                onClick={(e) => {
                 Logout(e)
                }}
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="profile-page">
        <header className="profile-topbar">
          <Link to="/clientHome" className="profile-brand">
            <span className="profile-brand-icon">
              <i className="bi bi-leaf" />
            </span>
            nutriora
          </Link>

          <nav className="profile-topbar-nav">
            <Link to="/clientHome">
              <i className="bi bi-arrow-left" />
              Back to dashboard
            </Link>
          </nav>
        </header>

        <section className="profile-hero">
          <div className="profile-hero-content">
            <span className="profile-eyebrow">
              <i className="bi bi-person-check" />
              YOUR PERSONAL SPACE
            </span>

            <h1>
              Your health, <span>your story.</span>
            </h1>

            <p>
              Every detail helps us understand you better. Build your wellness
              profile at your own pace, one step at a time.
            </p>
          </div>

          <div className="profile-hero-decoration">
            <i className="bi bi-flower1" />
            <span>Made for your wellbeing</span>
          </div>
        </section>

        <section className="profile-account-card">
          <div className="profile-account-avatar">
            <i className="bi bi-person" />
          </div>

          <div className="profile-account-info">
            <span className="profile-account-label">YOUR ACCOUNT</span>
            <h2>{profile.name}</h2>
            {userEmail && <p>{userEmail}</p>}
          </div>

          <div className="profile-account-status">
            <span className="profile-status-dot" />
            <span>Wellness journey</span>
          </div>
        </section>

        <section className="profile-sections">
          <div className="profile-section-heading">
            <div>
              <span className="profile-eyebrow">GET TO KNOW YOU</span>
              <h2>Your health profile</h2>
              <p>
                Complete each section separately. Your saved details can be
                updated whenever needed.
              </p>
            </div>

            <div className="profile-step-count">
              <strong>05</strong>
              <span>SECTIONS</span>
            </div>
          </div>

          <div className="profile-section-list">
            {profileSections.map((section) => (
              <article
                className="profile-section-card"
                key={section.id}
                onClick={() => navigate(`${section.path}`)}
              >
                <div className="profile-section-number">{section.step}</div>

                <div className="profile-section-icon">
                  <i className={`bi ${section.icon}`} />
                </div>

                <div className="profile-section-info">
                  <h3>{section.title}</h3>
                  <p>{section.description}</p>
                </div>

                <Link
                  to={section.path}
                  className="profile-section-action"
                  aria-label={`Open ${section.title}`}
                >
                  <span>View details</span>
                  <i className="bi bi-arrow-up-right" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="profile-privacy-note">
          <div className="profile-privacy-icon">
            <i className="bi bi-shield-check" />
          </div>

          <div>
            <h3>Your information matters</h3>
            <p>
              Your health details should be handled securely and used only for
              appropriate wellness and nutrition services.
            </p>
          </div>
        </section>

        <button
          className="client-logout-btn"
          onClick={() => setShowLogoutConfirm(true)}
        >
          <i className="bi bi-box-arrow-right"></i>
          Logout
        </button>

        <footer className="profile-footer">
          <span>
            nutriora <i className="bi bi-leaf" />
          </span>
          <p>A little care, a little consistency, a healthier you.</p>
        </footer>
      </main>
    </>
  );
}

export default Profile;
