import React from "react";
import "../AdminStyles/Personal.css";
import black from "../assets/snap.jpeg";
import color from "../assets/color.jpeg";
import video from "../assets/video.mp4";
import { Navigate, useNavigate } from "react-router-dom";

function Personal() {
  const navigate=useNavigate() 
  return (
    <div className="personal-page">
      <button className="personal-back-btn" onClick={() => navigate("/nutritionist")}>
        <i className="bi bi-arrow-left"></i>
        <span>Go Back</span>
        <i className="bi bi-heart-fill back-heart"></i>
      </button>

      {/* Navigation */}
      <nav className="personal-navbar">
        <h2>
          Our Memories<span>.</span>
        </h2>
        <span className="personal-nav-text">A PERSONAL COLLECTION</span>
      </nav>

      {/* Hero Section */}
      <section className="personal-hero">
        <p className="personal-overline">SOME STORIES NEVER END</p>

        <h1>
          More than just
          <br />
          <span>memories.</span>
        </h1>

        <p className="personal-hero-description">
          Some people enter our lives and make ordinary moments extraordinary.
          This is a little collection of those beautiful moments.
        </p>

        <div className="personal-scroll">
          <span>SCROLL TO EXPLORE</span>
          <i className="bi bi-arrow-down"></i>
        </div>
      </section>

      {/* Photo Section */}
      <section className="personal-photos">
        <div className="personal-section-heading">
          <span>01 — THE PEOPLE</span>
          <h2>Two souls. Countless memories.</h2>
        </div>

        <div className="personal-photo-grid">
          <div className="personal-photo-card">
            <div className="personal-image-wrapper">
              <img src={black} alt="My photograph" />
            </div>

            <div className="personal-photo-caption">
              <h3>Me.</h3>
              <p>One half of this beautiful story.</p>
            </div>
          </div>

          <div className="personal-photo-card">
            <div className="personal-image-wrapper">
              <img src={color} alt="My friend's photograph" />
            </div>

            <div className="personal-photo-caption">
              <h3>My Favourite Person.</h3>
              <p>The other half of this beautiful story.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Friendship Section */}
      <section className="personal-story friendship-story">
        <span className="personal-story-number">02 — FRIENDSHIP</span>

        <h2>
          Not just friends.
          <br />
          <span>A lifetime of memories.</span>
        </h2>

        <p>
          Friendship is not about how long you have known someone. It is about
          how comfortable you feel being yourself around them. It is about
          endless conversations, silly arguments, unforgettable laughter and
          standing beside each other even when life gets difficult.
        </p>

        <p>
          Some memories may fade with time, but the people who made those
          moments special will always have a place in our hearts. No matter
          where life takes us, true friendship remains something priceless.
        </p>

        <div className="personal-quote">
          "Good friends make the good times better and the hard times easier."
        </div>
      </section>

      {/* Love Section */}
      <section className="personal-story love-story">
        <span className="personal-story-number">03 — Happy</span>

        <h2>
          A little thing called
          <br />
          <span>Happy.</span>
        </h2>

        <p>
          Love is not always about perfect moments or beautiful words. Sometimes
          it is simply caring, understanding, respecting and choosing someone
          even on ordinary days.
        </p>

        <p>
          It is found in the smallest gestures, in the conversations that never
          feel boring, and in the comfort of knowing that someone genuinely
          matters. The most beautiful connections are those that make us feel
          accepted for who we are.
        </p>

        <div className="personal-quote">
          "The best things in life are not things. They are the people we share
          them with."
        </div>
      </section>

      {/* Final Section */}
      <section className="personal-ending">
        <span>04 — FOREVER IN MEMORY</span>

        <h2>
          Some moments.
          <br />
          <span>Some people.</span>
          <br />
          Forever.
        </h2>

        <p>
          This is not just a collection of photographs. It is a collection of
          feelings, memories and moments that deserve to be remembered.
        </p>

        <div className="personal-ending-icon">
          <i className="bi bi-heart"></i>
        </div>

        <h3>Made with memories.</h3>
      </section>

      Final Memories Video
      <section className="personal-video-section">
        <span>05 — OUR LITTLE MEMORIES</span>

        <h2>
          Moments worth
          <br />
          <span>watching again.</span>
        </h2>

        <div className="personal-video-wrapper">
          <video controls playsInline preload="metadata">
            <source src={video} type="video/mp4" />
            Your browser does not support video playback.
          </video>
        </div>

        <p>Some memories are too special to be forgotten.</p>
      </section>

      
      <footer className="personal-footer">
        <p>OUR MEMORIES © 2026</p>
        <p>A LITTLE CORNER OF HAPPINESS.</p>
      </footer>
    </div>
  );
}

export default Personal;
