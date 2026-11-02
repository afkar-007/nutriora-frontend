
import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/ClientAbout.css"

function ClientAbout() {
  const navigate = useNavigate();

  return (
    <div className="client-about-page">

      {/* BACK BUTTON */}
      <button
        className="client-about-back"
        onClick={() => navigate("/clientHome")}
      >
        <i className="bi bi-arrow-left"></i>
        Go Back
      </button>

      {/* HERO */}
      <section className="client-about-hero">
        <div className="client-about-hero-content">
          <span className="client-about-label">
            ABOUT NUTRIORA
          </span>

          <h1>
            Your health journey,
            <br />
            <span>our shared priority.</span>
          </h1>

          <p>
            Nutriora helps you understand your health, build healthier
            habits and stay connected with your nutritionist throughout
            your wellness journey.
          </p>

          <button
            onClick={() => navigate("/clientHome")}
            className="client-about-btn"
          >
            Explore Your Dashboard
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>

        <div className="client-about-decoration">
          <div className="client-about-circle">
            <i className="bi bi-heart-pulse"></i>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="client-about-intro">
        <div>
          <span className="client-about-small-label">
            YOUR WELLNESS PARTNER
          </span>

          <h2>
            Health is not a destination.
            <span> It's a journey.</span>
          </h2>
        </div>

        <div>
          <p>
            Every person has different health goals, routines and
            nutritional needs. That's why Nutriora focuses on
            understanding you as an individual.
          </p>

          <p>
            From your personal health profile to your nutrition plans,
            everything is designed to help you follow your wellness
            journey with clarity and confidence.
          </p>
        </div>
      </section>

      {/* WHAT YOU CAN DO */}
      <section className="client-about-features">

        <div className="client-about-section-heading">
          <span>YOUR EXPERIENCE</span>
          <h2>Everything you need in one place.</h2>
          <p>
            Stay informed, follow your plans and track your progress.
          </p>
        </div>

        <div className="client-about-feature-grid">

          <div className="client-about-feature">
            <div className="client-about-feature-icon">
              <i className="bi bi-person-vcard"></i>
            </div>

            <h3>Your Health Profile</h3>

            <p>
              Keep your personal details, body measurements and
              lifestyle information organised in one place.
            </p>
          </div>

          <div className="client-about-feature">
            <div className="client-about-feature-icon">
              <i className="bi bi-clipboard2-heart"></i>
            </div>

            <h3>Personalised Health Plans</h3>

            <p>
              Access your health plans and follow the recommendations
              shared by your nutritionist.
            </p>
          </div>

          <div className="client-about-feature">
            <div className="client-about-feature-icon">
              <i className="bi bi-egg-fried"></i>
            </div>

            <h3>Nutrition Guidance</h3>

            <p>
              Understand your food habits and follow nutrition
              guidance suited to your goals.
            </p>
          </div>

          <div className="client-about-feature">
            <div className="client-about-feature-icon">
              <i className="bi bi-graph-up-arrow"></i>
            </div>

            <h3>Track Your Progress</h3>

            <p>
              Stay aware of your health journey and monitor your
              progress over time.
            </p>
          </div>

          <div className="client-about-feature">
            <div className="client-about-feature-icon">
              <i className="bi bi-person-heart"></i>
            </div>

            <h3>Nutritionist Support</h3>

            <p>
              Stay connected with your nutritionist and get guidance
              throughout your wellness journey.
            </p>
          </div>

          <div className="client-about-feature">
            <div className="client-about-feature-icon">
              <i className="bi bi-calendar2-check"></i>
            </div>

            <h3>Healthy Daily Habits</h3>

            <p>
              Build consistency with better food choices, exercise
              and everyday wellness routines.
            </p>
          </div>

        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="client-about-philosophy">
        <div className="client-about-heart">
          <i className="bi bi-heart-fill"></i>
        </div>

        <h2>
          Small steps today.
          <br />
          <span>Healthier choices tomorrow.</span>
        </h2>

        <p>
          You don't have to change everything overnight. Focus on
          consistency, trust your journey and celebrate every step
          forward.
        </p>
      </section>

      {/* BOTTOM CTA */}
      <section className="client-about-bottom">
        <h2>Your journey starts with you.</h2>

        <p>
          Take a moment to explore your dashboard and keep moving
          towards your health goals.
        </p>

        <button
          onClick={() => navigate("/clientHome")}
        >
          Go to My Dashboard
          <i className="bi bi-arrow-right"></i>
        </button>
      </section>

    </div>
  );
}

export default ClientAbout;
