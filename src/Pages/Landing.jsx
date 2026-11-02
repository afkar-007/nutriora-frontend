import { Link, useNavigate } from "react-router-dom";
import "../styles/Landing.css";
import { useEffect } from "react";

function Landing() {
  const navigate = useNavigate();

  //  useEffect(()=>{

  //    const ClientHomeGateWay= localStorage.getItem("ClientHome")

  //   if(ClientHomeGateWay !=="true"){
  //     const gateway = localStorage.getItem("userLoggedIn")
  //     if(gateway==="true"){
  //       navigate('/personalDetails')
  //     }
  //   }
  //     else{
  //       navigate('/clientHome')
  //     }

  //   },[])

  // useEffect(() => {}, []);

  // useEffect(() => {
  //   const adminGateway = localStorage.getItem("AdminLogin");
  //   const gateway = localStorage.getItem("userLoggedIn");
  //   const ClientHomeGateWay = localStorage.getItem("homePage");
  //   const homePageGateWay = localStorage.getItem("homePage");

  //   // if (homePageGateWay !== "true") {
  //   //   navigate("/", { replace: true });
  //   //   console.log(" not went");
  //   // } else {
     
  //       if (gateway === "true") {
  //         if (ClientHomeGateWay === "true") {
  //           navigate("/clientHome", { replace: true });
  //         } else {
  //           navigate("/personalDetails", { replace: true });
  //         }
  //       }
  //       else{
  //         if (adminGateway === "true") {
  //       navigate("/nutritionist");

  //       }
  //     // }
  //   }
  // }, [navigate]);

  useEffect(() => {
  const adminGateway = localStorage.getItem("AdminLogin");
  const userGateway = localStorage.getItem("userLoggedIn");
  const clientHomeGateway = localStorage.getItem("ClientHome");

  // Client login
  if (userGateway === "true") {
    if (clientHomeGateway === "true") {
      navigate("/clientHome", { replace: true });
    } else {
      navigate("/personalDetails", { replace: true });
    }
    return;
  }

  // Nutritionist login
  // if (adminGateway === "true") {
  //   navigate("/nutritionist", { replace: true });
  //   return;
  // }

  // Not logged in
  navigate("/", { replace: true });

}, [navigate]);



  return (
    <main className="landing-page">
      {/* NAVBAR */}
      <header className="landing-header">
        <nav className="landing-nav">
          <Link to="/" className="landing-logo">
            <span className="landing-logo-icon">N</span>
            Nutriora
          </Link>

          <div className="landing-nav-links">
            <a href="#about">Our approach</a>
            <a href="#services">Services</a>
            <a href="#benefits">Benefits</a>
          </div>

          <div className="landing-nav-actions">
            <Link to="/login" className="nav-login">
              Log in
            </Link>

            <Link to="/register" className="nav-register">
              Get started
              <i className="bi bi-arrow-up-right"></i>
            </Link>
          </div>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="landing-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            YOUR HEALTH, YOUR WAY
          </div>

          <h1>
            Feel better.
            <br />
            Eat <span>better.</span>
            <br />
            Live fully.
          </h1>

          <p className="hero-description">
            Nutrition isn't about restrictions. It's about discovering what
            makes you feel your best. Find your balance with personalized
            guidance from nutrition professionals.
          </p>

          <div className="hero-actions">
            <Link to="/register" className="hero-primary-btn">
              Start your journey
              <i className="bi bi-arrow-right"></i>
            </Link>

            <a href="#about" className="hero-secondary-btn">
              <span className="hero-play-icon">
                <i className="bi bi-arrow-down"></i>
              </span>
              Discover our approach
            </a>
          </div>

          <div className="hero-trust">
            <div className="hero-trust-icon">
              <i className="bi bi-heart-pulse"></i>
            </div>

            <div>
              <strong>Wellness that fits your life</strong>
              <p>Small changes. Lasting habits.</p>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image">
            <div className="hero-image-overlay"></div>

            <div className="hero-image-caption">
              <span className="caption-line"></span>
              <div>
                <span>THE ART OF WELLNESS</span>
                <p>A more mindful way to nourish.</p>
              </div>
            </div>
          </div>

          <div className="floating-card floating-card-top">
            <span className="floating-card-icon">
              <i className="bi bi-leaf"></i>
            </span>
            <div>
              <strong>Made for you</strong>
              <p>Your unique nutrition journey</p>
            </div>
          </div>

          <div className="floating-card floating-card-bottom">
            <div className="floating-stat-icon">
              <i className="bi bi-stars"></i>
            </div>
            <div>
              <strong>Progress over perfection</strong>
              <p>Build habits that stay with you.</p>
            </div>
          </div>

          <div className="hero-decoration"></div>
        </div>
      </section>

      {/* VALUES STRIP */}
      <section className="landing-values">
        <div>
          <i className="bi bi-flower1"></i>
          <span>Mindful nutrition</span>
        </div>

        <span className="values-divider"></span>

        <div>
          <i className="bi bi-person-heart"></i>
          <span>Personalized guidance</span>
        </div>

        <span className="values-divider"></span>

        <div>
          <i className="bi bi-heart"></i>
          <span>Sustainable habits</span>
        </div>

        <span className="values-divider"></span>

        <div>
          <i className="bi bi-brightness-high"></i>
          <span>Everyday wellbeing</span>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="landing-about" id="about">
        <div className="section-heading">
          <span className="section-eyebrow">A DIFFERENT APPROACH</span>

          <h2>
            Healthy living should feel
            <br />
            <span>like living.</span>
          </h2>

          <p>
            Forget the all-or-nothing mindset. We believe the best nutrition
            plan is one that works with your body, your routine, and your real
            life.
          </p>
        </div>

        <div className="about-grid">
          <article className="about-card">
            <span className="about-card-number">01</span>
            <div className="about-card-icon">
              <i className="bi bi-person-check"></i>
            </div>
            <h3>Understand you</h3>
            <p>
              Your goals, food preferences, lifestyle and needs shape your
              personalized approach.
            </p>
          </article>

          <article className="about-card">
            <span className="about-card-number">02</span>
            <div className="about-card-icon">
              <i className="bi bi-calendar2-heart"></i>
            </div>
            <h3>Find your rhythm</h3>
            <p>
              Build realistic routines and nutrition plans that fit naturally
              into your everyday life.
            </p>
          </article>

          <article className="about-card">
            <span className="about-card-number">03</span>
            <div className="about-card-icon">
              <i className="bi bi-graph-up-arrow"></i>
            </div>
            <h3>Grow with confidence</h3>
            <p>
              Track your progress, learn about your habits, and keep moving
              forward at your own pace.
            </p>
          </article>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="landing-services" id="services">
        <div className="services-intro">
          <span className="section-eyebrow">YOUR WELLNESS TOOLKIT</span>

          <h2>
            Everything you need.
            <br />
            <span>Nothing you don't.</span>
          </h2>

          <p>
            Thoughtful tools and expert guidance to help you make nutrition feel
            simpler.
          </p>

          <Link to="/register" className="services-link">
            Explore your possibilities
            <i className="bi bi-arrow-up-right"></i>
          </Link>
        </div>

        <div className="services-list">
          <article className="service-item">
            <div className="service-item-icon">
              <i className="bi bi-chat-square-heart"></i>
            </div>
            <div>
              <h3>Nutrition consultations</h3>
              <p>
                Connect with nutrition professionals for personalized guidance.
              </p>
            </div>
            <i className="bi bi-arrow-up-right service-arrow"></i>
          </article>

          <article className="service-item">
            <div className="service-item-icon">
              <i className="bi bi-journal-check"></i>
            </div>
            <div>
              <h3>Personalized meal plans</h3>
              <p>Explore food plans tailored to your goals and preferences.</p>
            </div>
            <i className="bi bi-arrow-up-right service-arrow"></i>
          </article>

          <article className="service-item">
            <div className="service-item-icon">
              <i className="bi bi-clipboard2-pulse"></i>
            </div>
            <div>
              <h3>Progress tracking</h3>
              <p>
                Keep track of your nutrition journey and celebrate meaningful
                progress.
              </p>
            </div>
            <i className="bi bi-arrow-up-right service-arrow"></i>
          </article>

          <article className="service-item">
            <div className="service-item-icon">
              <i className="bi bi-chat-dots"></i>
            </div>
            <div>
              <h3>Ongoing support</h3>
              <p>
                Stay connected with your nutritionist as you build healthier
                routines.
              </p>
            </div>
            <i className="bi bi-arrow-up-right service-arrow"></i>
          </article>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="landing-benefits" id="benefits">
        <div className="benefits-content">
          <span className="section-eyebrow">SMALL STEPS, REAL CHANGE</span>

          <h2>
            A healthier you,
            <br />
            <span>on your own terms.</span>
          </h2>

          <p>
            No unrealistic promises. No one-size-fits-all plans. Just a
            thoughtful space to learn, grow, and feel more confident about your
            food choices.
          </p>

          <Link to="/register" className="benefits-button">
            Begin with Nutriora
            <i className="bi bi-arrow-right"></i>
          </Link>
        </div>

        <div className="benefits-visual">
          <div className="benefits-circle benefits-circle-one"></div>
          <div className="benefits-circle benefits-circle-two"></div>

          <div className="benefits-center">
            <i className="bi bi-flower2"></i>
            <span>GROW</span>
            <strong>At your own pace.</strong>
          </div>

          <div className="benefits-note">
            <i className="bi bi-check-circle-fill"></i>
            Progress, not perfection.
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="landing-cta">
        <span className="section-eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>

        <h2>
          Make room for
          <br />
          <span>feeling your best.</span>
        </h2>

        <p>
          Start building a healthier relationship with food, one thoughtful step
          at a time.
        </p>

        <Link to="/register" className="cta-button">
          Get started today
          <i className="bi bi-arrow-up-right"></i>
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        <Link to="/" className="landing-logo footer-logo">
          <span className="landing-logo-icon">N</span>
          Nutriora
        </Link>

        <p>Nourish with intention. Live with balance.</p>

        <div className="footer-links">
          <Link to="/login">Log in</Link>
          <Link to="/register">Create account</Link>
          <a href="#about">Our approach</a>
        </div>

        <span className="footer-copyright">
          © {new Date().getFullYear()} Nutriora
        </span>
      </footer>
    </main>
  );
}

export default Landing;
