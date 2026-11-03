import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../AdminStyles/NutritionistProfile.css"
import LoadingGif from "../assets/LoadingNutoria.gif";

function NutritionistProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const id = localStorage.getItem("id");

  useEffect(() => {
    // const login = localStorage.getItem("homePageGateWay");

    // if (login !== "true") {
    //   navigate("/", { replace: true });
    //   return;
    // }

    getProfile();
  }, []);

  async function getProfile() {
    try {
      setLoading(true)
      const response = await fetch(
        `https://nutriora-backend.onrender.com/user/getOneUser/${id}`
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
        return;
      }

      setProfile(data.data);
    } catch (error) {
      console.log("Profile Error:", error);
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
    
            
            <p>Loading your profile...</p>
          </div>
        );
      }

  if (!profile) {
    return (
      <div className="nutritionist-empty">
        <i className="bi bi-person-exclamation"></i>
        <h3>Profile Not Found</h3>
        <p>Unable to load your account details.</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  const fullName = profile.name || profile.fullName || "Nutritionist";

  return (
    <div className="nutritionist-profile-page">

      {/* Top Navigation */}
      <div className="nutritionist-profile-top">
        <button
          className="nutritionist-back-btn"
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-arrow-left"></i>
          Back
        </button>

        <span className="profile-page-label">
          ACCOUNT SETTINGS
        </span>
      </div>

      {/* Profile Hero */}
      <div className="nutritionist-profile-hero">

        <div className="profile-hero-content">

          <div className="profile-avatar">
            {fullName.charAt(0).toUpperCase()}
          </div>

          <div className="profile-hero-details">
            <span className="profile-welcome">
              YOUR NUTRIORA PROFILE
            </span>

            <h1>Vishnu priya </h1>

            <p>
              <i className="bi bi-heart-pulse"></i>
              Nutritionist
            </p>

            <div className="profile-account-badge">
              <span></span>
              Active Account
            </div>
          </div>

        </div>

        <div className="profile-hero-decoration">
          <i className="bi bi-leaf"></i>
        </div>

      </div>

      {/* Profile Content */}
      <div className="nutritionist-profile-content">

        <div className="profile-section-heading">
          <div>
            <span>ACCOUNT OVERVIEW</span>
            <h2>Personal Information</h2>
            <p>Manage and view your account details.</p>
          </div>

          <div className="profile-heading-icon">
            <i className="bi bi-person-vcard"></i>
          </div>
        </div>

        {/* Information Cards */}
        <div className="profile-information-grid">

          <div className="profile-info-card">
            <div className="profile-info-icon">
              <i className="bi bi-person"></i>
            </div>

            <div>
              <span>Full Name</span>
              <h3>Vishnu priya </h3>
            </div>
          </div>

          <div className="profile-info-card">
            <div className="profile-info-icon">
              <i className="bi bi-envelope"></i>
            </div>

            <div>
              <span>Email Address</span>
              <h3>{profile.email || "Not provided"}</h3>
            </div>
          </div>

          <div className="profile-info-card">
            <div className="profile-info-icon">
              <i className="bi bi-shield-check"></i>
            </div>

            <div>
              <span>Account Role</span>
              <h3>{profile.role || "Nutritionist"}</h3>
            </div>
          </div>

          <div className="profile-info-card">
            <div className="profile-info-icon">
              <i className="bi bi-hearts"></i>
            </div>

            <div>
              <span>uniqueness</span>
              <h3 className="profile-account-id">
                Best nutritionist in the world 
              </h3>
            </div>
          </div>

        </div>

        {/* Security Information */}
        <div className="profile-security-card">
          <div className="security-card-icon">
            <i className="bi bi-shield-lock"></i>
          </div>

          <div className="security-card-content">
            <h3>Your Account Is Protected</h3>
            <p>
              Your Nutriora account information is securely
              managed. Keep your login credentials private.
            </p>
          </div>

          <i className="bi bi-check-circle-fill security-check"></i>
        </div>

      </div>

    </div>
  );
}

export default NutritionistProfile;