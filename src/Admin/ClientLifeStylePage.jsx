import '../AdminStyles/ClientLifeStylePage.css'


import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingGif from "../assets/LoadingNutoria.gif";


function ClientLifestylePage() {
  const { id } = useParams();

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchLifestyle() {
    try {
      setLoading(true);
      setError("");

     
      const token = localStorage.getItem("token");

      if (!id) {
        setError("Please login to view lifestyle details.");
        return;
      }

      const response = await fetch(
        `https://nutriora-backend.onrender.com/details/LifeStyleFetch/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to fetch lifestyle details."
        );
      }

      setDetails(result.data || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLifestyle();
  }, [id]);

  if (loading) {
    return (
      <div className="lifestyle-profile-status">
        <img
          src={LoadingGif}
          alt="Loading"
          className="profile-loading-gif"
        />
        <h3>Loading Lifestyle Details</h3>
        <p>Preparing your wellness profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lifestyle-profile-status">
        <i className="bi bi-exclamation-circle"></i>
        <h3>Unable to Load Details</h3>
        <p>{error}</p>

        <button onClick={fetchLifestyle}>Try Again</button>

        <Link to="/clientHome" className="lifestyle-profile-back">
          <i className="bi bi-arrow-left"></i>
          Back to Home
        </Link>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="lifestyle-profile-status">
        <i className="bi bi-heart-pulse"></i>
        <h3>No Lifestyle Details Found</h3>
        <p>Complete your lifestyle form to view your details here.</p>

        <Link to={`/nutritionist/clients/${id}`} className="lifestyle-profile-back">
          <i className="bi bi-arrow-left"></i>
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="lifestyle-profile-page">
      <div className="lifestyle-profile-header">
        <div>
          <span>YOUR WELLNESS PROFILE</span>
          <h1>Lifestyle & Health</h1>
          <p>
            Your daily habits, activity levels and health background.
          </p>
        </div>

        <Link to={`/nutritionist/clients/${id}`} className="lifestyle-profile-back">
          <i className="bi bi-arrow-left"></i>
          Back to Home
        </Link>
      </div>

      <div className="lifestyle-profile-card">
        <div className="lifestyle-profile-card-header">
          <div className="lifestyle-profile-avatar">
            <i className="bi bi-heart-pulse"></i>
          </div>

          <div>
            <h2>Your Lifestyle Information</h2>
            <p>Your personal health and daily routine details.</p>
          </div>
        </div>

        <div className="lifestyle-profile-divider"></div>

        <h3 className="lifestyle-section-title">
          <i className="bi bi-moon-stars"></i>
          Sleep & Hydration
        </h3>

        <div className="lifestyle-details-grid">
          <div className="lifestyle-detail-item">
            <span>Sleep Duration</span>
            <h4>{details.sleepHours || "Not provided"}</h4>
          </div>

          <div className="lifestyle-detail-item">
            <span>Sleep Quality</span>
            <h4>{details.sleepQuality || "Not provided"}</h4>
          </div>

          <div className="lifestyle-detail-item">
            <span>Daily Water Intake</span>
            <h4>{details.waterIntake || "Not provided"}</h4>
          </div>
        </div>

        <div className="lifestyle-profile-divider"></div>

        <h3 className="lifestyle-section-title">
          <i className="bi bi-activity"></i>
          Physical Activity
        </h3>

        <div className="lifestyle-details-grid">
          <div className="lifestyle-detail-item">
            <span>Exercise Frequency</span>
            <h4>{details.exerciseFrequency || "Not provided"}</h4>
          </div>

          <div className="lifestyle-detail-item">
            <span>Activity Level</span>
            <h4>{details.activityLevel || "Not provided"}</h4>
          </div>
        </div>

        <div className="lifestyle-tag-section">
          <span className="lifestyle-field-label">Exercise Types</span>

          <div className="lifestyle-tags">
            {Array.isArray(details.exerciseType) &&
            details.exerciseType.length > 0 ? (
              details.exerciseType.map((item, index) => (
                <span className="lifestyle-tag" key={index}>
                  <i className="bi bi-check-circle"></i>
                  {item}
                </span>
              ))
            ) : (
              <p className="lifestyle-empty-text">No exercise types added</p>
            )}
          </div>
        </div>

        <div className="lifestyle-profile-divider"></div>

        <h3 className="lifestyle-section-title">
          <i className="bi bi-clipboard2-pulse"></i>
          Health Background
        </h3>

        <div className="lifestyle-details-grid">
          <div className="lifestyle-detail-item">
            <span>Stress Level</span>
            <h4>{details.stressLevel || "Not provided"}</h4>
          </div>

          <div className="lifestyle-detail-item">
            <span>Digestive Issues</span>
            <h4>{details.digestiveIssues || "Not provided"}</h4>
          </div>

          <div className="lifestyle-detail-item">
            <span>Smoking / Alcohol</span>
            <h4>{details.smokingAlcohol || "Not provided"}</h4>
          </div>

          <div className="lifestyle-detail-item">
            <span>Medications / Supplements</span>
            <h4>{details.medications || "Not provided"}</h4>
          </div>
        </div>

        <div className="lifestyle-tag-section">
          <span className="lifestyle-field-label">
            Medical Conditions
          </span>

          <div className="lifestyle-tags">
            {Array.isArray(details.medicalConditions) &&
            details.medicalConditions.length > 0 ? (
              details.medicalConditions.map((item, index) => (
                <span className="lifestyle-tag" key={index}>
                  <i className="bi bi-heart-pulse"></i>
                  {item}
                </span>
              ))
            ) : (
              <p className="lifestyle-empty-text">
                No medical conditions added
              </p>
            )}
          </div>
        </div>

        <div className="lifestyle-profile-divider"></div>

        <h3 className="lifestyle-section-title">
          <i className="bi bi-journal-text"></i>
          Additional Notes
        </h3>

        <div className="lifestyle-notes">
          <p>
            {details.additionalNotes ||
              "No additional notes provided."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ClientLifestylePage;
