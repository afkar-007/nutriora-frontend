import { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/ClientHome.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingGif from "../assets/loadingNutoria.gif";

function ClientHome() {
  const navigate = useNavigate();
  const [completedGoals, setCompletedGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  

  const[profileData,setProfileData]=useState(null)

  const id = localStorage.getItem("id");

  const dailyGoals = [
    {
      id: 1,
      title: "Drink enough water",
      subtitle: "Stay hydrated throughout the day",
      icon: "bi-droplet",
    },
    {
      id: 2,
      title: "Eat balanced meals",
      subtitle: "Include nutritious foods in your meals",
      icon: "bi-egg-fried",
    },
    {
      id: 3,
      title: "Move your body",
      subtitle: "Make time for physical activity",
      icon: "bi-activity",
    },
  ];

  const toggleGoal = (id) => {
    setCompletedGoals((prev) =>
      prev.includes(id)
        ? prev.filter((goalId) => goalId !== id)
        : [...prev, id],
    );
  };

  const userName = "Afkar";

  useEffect(() => {
    async function loaded() {
     await getUserDetails()
      await returnedToHome()

    }
    loaded()
   
    
  }, []);

  async function getUserDetails() {
    try {
      setLoading(true)
      const response = await fetch(
        `http://localhost:3000/user/getOneUser/${id}`,
      );

      const data = await response.json();

      console.log(data);

      if(response.ok){
        setProfileData(data.data)
        const homePage = localStorage.setItem("homePage", true);
      }
      
    } catch (err) {
      console.log(err.message);
    }
    finally{
      setLoading(false)
    }
  }

  async function returnedToHome() {

     const login = localStorage.getItem("homePage");
    if (login !== "true") {
      navigate("/", { replace: true });
      console.log("not allowed");

      return;
    }
    console.log(login);

    
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


    if (!profileData) {
    return (
      <>
        <Link to="/">
          <i className="bi bi-arrow-left" />
          Back to Home
        </Link>

        <div className="client-profile-status">Something went wrong...</div>
      </>
    );
  }


  return (
    <>
      <main className="client-home">
        <header className="client-topbar">
          <Link to="/clientHome" className="client-brand">
            <span className="client-brand-icon">
              <i className="bi bi-leaf" />
            </span>
            <span>nutriora</span>
          </Link>

          <nav className="client-nav">
            <Link to="/clientHome" className="Overview">
              Overview
            </Link>
            <Link to="/client/profile">My Profile</Link>
            <Link to="/client/nutrition">Diet Chart</Link>
            <Link to="/workout">Workout</Link>
             <Link to="/clientAbout">About</Link>
            {/* <Link to="/client/consultations">Consultations</Link> */}
          </nav>

          <Link to="/client/profile" className="client-avatar">
            {profileData?.name?.charAt(0)}
          </Link>
        </header>

        <section className="client-welcome">
          <div>
            <span className="client-eyebrow">
              <i className="bi bi-sun" /> YOUR WELLNESS SPACE
            </span>
            <h1>
              A healthier you, <span>one day at a time.</span>
            </h1>
            <p>
              Welcome back, {userName}. Small, mindful choices create meaningful
              changes.
            </p>
          </div>

          <div className="welcome-decoration">
            <i className="bi bi-flower1" />
            <span>Progress, not perfection.</span>
          </div>
        </section>

        <section className="client-overview-grid">
          <article className="wellness-card wellness-primary">
            <div className="wellness-card-heading">
              <span className="wellness-icon">
                <i className="bi bi-heart-pulse" />
              </span>
              <span className="wellness-label">YOUR WELLNESS JOURNEY</span>
            </div>

            <h2>Every step counts.</h2>
            <p>
              Your personal wellness journey begins with understanding your body
              and building habits that work for you.
            </p>

            <Link to="/client/profile" className="wellness-link">
              Complete your profile <i className="bi bi-arrow-up-right" />
            </Link>
          </article>

          <article className="wellness-card profile-card">
            <div className="wellness-card-heading">
              <span className="wellness-icon">
                <i className="bi bi-person-check" />
              </span>
              <span className="wellness-label">PROFILE SETUP</span>
            </div>

            <div className="profile-progress">
              <div>
                <strong>Get started</strong>
                <span>Complete your health profile</span>
              </div>
              <i className="bi bi-arrow-up-right" />
            </div>

            <div className="profile-progress-track">
              <div className="profile-progress-fill" />
            </div>

            <Link to="/client/profile" className="wellness-link">
              Add your details <i className="bi bi-arrow-right" />
            </Link>
          </article>
        </section>

        <section className="client-content-grid">
          <article className="client-panel daily-panel">
            <div className="panel-heading">
              <div>
                <span className="client-eyebrow">YOUR DAILY ROUTINE</span>
                <h2>Today's wellness goals</h2>
              </div>

              <span className="goal-count">
                {completedGoals.length}/{dailyGoals.length}
              </span>
            </div>

            <div className="daily-progress-track">
              <div
                className="daily-progress-fill"
                style={{
                  width: `${(completedGoals.length / dailyGoals.length) * 100}%`,
                }}
              />
            </div>

            <div className="daily-goals-list">
              {dailyGoals.map((goal) => (
                <button
                  type="button"
                  key={goal.id}
                  className={`daily-goal ${
                    completedGoals.includes(goal.id) ? "goal-completed" : ""
                  }`}
                  onClick={() => toggleGoal(goal.id)}
                >
                  <span className="daily-goal-icon">
                    <i className={`bi ${goal.icon}`} />
                  </span>

                  <span className="daily-goal-text">
                    <strong>{goal.title}</strong>
                    <small>{goal.subtitle}</small>
                  </span>

                  <span className="goal-checkbox">
                    {completedGoals.includes(goal.id) && (
                      <i className="bi bi-check2" />
                    )}
                  </span>
                </button>
              ))}
            </div>

            <p className="goal-note">
              <i className="bi bi-info-circle" />
              These are sample wellness reminders. Your personalized plan can be
              added when the nutrition module is connected.
            </p>
          </article>

          <div className="client-side-panels">
            <article className="client-panel consultation-panel">
              <span className="client-eyebrow">PERSONAL GUIDANCE</span>
              <span className="consultation-icon">
                <i className="bi bi-calendar2-heart" />
              </span>
              <h2>Your nutrition consultation</h2>
              <p>
                Connect with your nutritionist to discuss your goals and
                personalized nutrition plan.
              </p>
              <Link to="/client/consultations" className="client-action-button">
                Explore consultations <i className="bi bi-arrow-right" />
              </Link>
            </article>

            <article className="client-panel quick-actions-panel">
              <span className="client-eyebrow">QUICK ACCESS</span>
              <h2>Your next step</h2>

              <Link to="/client/profile" className="quick-action">
                <span>
                  <i className="bi bi-person-lines-fill" />
                </span>
                <span>
                  <strong>Health profile</strong>
                  <small>Tell us about yourself</small>
                </span>
                <i className="bi bi-chevron-right" />
              </Link>

              <Link to="/client/nutrition" className="quick-action">
                <span>
                  <i className="bi bi-journal-medical" />
                </span>
                <span>
                  <strong>Nutrition goals</strong>
                  <small>Define your wellness goals</small>
                </span>
                <i className="bi bi-chevron-right" />
              </Link>

              <Link to="/workout" className="quick-action">
                <span>
                  <i className="bi bi-person-arms-up"></i>
                </span>
                <span>
                  <strong>Work-out goals</strong>
                  <small>Define your exercise goals</small>
                </span>
                <i className="bi bi-chevron-right" />
              </Link>
            </article>
          </div>
        </section>

        <footer className="client-footer">
          <span>
            nutriora <i className="bi bi-leaf" />
          </span>
          <p>A little care, a little consistency, a healthier you.</p>
        </footer>
      </main>
    </>
  );
}

export default ClientHome;
