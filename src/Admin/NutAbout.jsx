import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../AdminStyles/NutAbt.css";

function NutAbout() {
  const navigate = useNavigate();
  const [message,setMessage]=useState("")
const pass = "cringe"

  async function Send() {
    try{
      if(message===pass){
        navigate("/Surprise")
      }


    }
    catch(err){
      console.log(err.message);
      
    }
    
  }

  return (
    <>
    <div className="about-page">

      <button className="about-back-btn" onClick={() => navigate("/nutritionist")}>
        <i className="bi bi-arrow-left"></i>
        <span>Go Back</span>
      </button>

      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-label">ABOUT NUTRIORA</span>

          <h1>
            A healthier life
            <br />
            starts with <span>better choices.</span>
          </h1>

          <p>
            We believe that healthy living should be simple, enjoyable and
            sustainable. Nutriora helps you understand your body and build
            better habits through personalized nutrition guidance.
          </p>
          {/* 
          <button
            className="about-hero-btn"
            onClick={() => navigate("/register")}
          >
            Get Started
            <i className="bi bi-arrow-right"></i>
          </button> */}
        </div>

        <div className="about-hero-decoration">
          <i className="bi bi-leaf"></i>
        </div>
      </section>

      {/* Introduction */}
      <section className="about-intro">
        <div className="about-intro-left">
          <span className="about-label">01 — WHO WE ARE</span>

          <h2>
            More than nutrition.
            <br />
            <span>A lifestyle transformation.</span>
          </h2>
        </div>

        <div className="about-intro-right">
          <p>
            Nutriora is a nutrition and wellness platform designed to make
            healthy living easier to understand and follow. We believe every
            individual has different nutritional needs, lifestyle habits and
            personal goals.
          </p>

          <p>
            Our approach focuses on personalized guidance, balanced food choices
            and consistent lifestyle improvements instead of unrealistic
            restrictions. Because real wellness is not about temporary changes.
            It is about building habits that last.
          </p>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="about-purpose">
        <div className="about-purpose-card mission-card">
          <div className="about-purpose-icon">
            <i className="bi bi-bullseye"></i>
          </div>

          <span>02 — OUR MISSION</span>

          <h2>Making healthy living achievable.</h2>

          <p>
            Our mission is to make personalized nutrition guidance accessible
            and understandable, helping people develop healthier eating habits
            and make confident lifestyle choices.
          </p>
        </div>

        <div className="about-purpose-card vision-card">
          <div className="about-purpose-icon">
            <i className="bi bi-eye"></i>
          </div>

          <span>03 — OUR VISION</span>

          <h2>A world that chooses wellness.</h2>

          <p>
            Our vision is to encourage a healthier generation where balanced
            nutrition, mindful eating and sustainable habits become part of
            everyday life.
          </p>
        </div>
      </section>

      {/* Why Nutriora */}
      <section className="about-why">
        <div className="about-why-heading">
          <span className="about-label">04 — WHY NUTRIORA</span>

          <h2>
            Your journey.
            <br />
            <span>Your pace. Your progress.</span>
          </h2>

          <p>
            Small improvements can create meaningful changes when you stay
            consistent.
          </p>
        </div>

        <div className="about-feature-grid">
          <div className="about-feature-card">
            <div className="about-feature-icon">
              <i className="bi bi-person-heart"></i>
            </div>

            <h3>Personalized Approach</h3>

            <p>
              Nutrition guidance designed around individual needs, food
              preferences and lifestyle goals.
            </p>
          </div>

          <div className="about-feature-card">
            <div className="about-feature-icon">
              <i className="bi bi-apple"></i>
            </div>

            <h3>Balanced Nutrition</h3>

            <p>
              Encouraging balanced meals and mindful food choices without
              unnecessary restrictions.
            </p>
          </div>

          <div className="about-feature-card">
            <div className="about-feature-icon">
              <i className="bi bi-graph-up-arrow"></i>
            </div>

            <h3>Progress Tracking</h3>

            <p>
              Follow your wellness journey and understand your progress through
              consistent tracking.
            </p>
          </div>

          <div className="about-feature-card">
            <div className="about-feature-icon">
              <i className="bi bi-chat-heart"></i>
            </div>

            <h3>Continuous Support</h3>

            <p>
              Stay connected with nutrition guidance and support throughout your
              journey.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="about-philosophy">
        <span>05 — OUR PHILOSOPHY</span>

        <h2>
          Don't chase perfection.
          <br />
          <span>Build a healthier you.</span>
        </h2>

        <p>
          Healthy living is not about following every trend or changing
          everything overnight. It is about understanding your body, respecting
          your journey and making better choices one day at a time.
        </p>

        <div className="about-heart">
          <i className="bi bi-heart-pulse"></i>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <span>YOUR WELLNESS JOURNEY STARTS HERE</span>

        <h2>
          Ready to make
          <br />a healthier change?
        </h2>

        <p>
          Take the first step towards understanding your nutrition and building
          better habits.
        </p>

        {/* <button
          className="about-cta-btn"
          onClick={() => navigate("/register")}
        >
          Start Your Journey
          <i className="bi bi-arrow-right"></i>
        </button> */}
      </section>
    </div>

    <div className="message-input-box">
  <input
    type="text"
    placeholder="Type your message..."
    value={message}
    onChange={(e) => setMessage(e.target.value)}
  />

  <button onClick={()=>Send()}>
    <i className="bi bi-send-fill"></i>
  </button>
</div>
    </>
  );
}

export default NutAbout;
