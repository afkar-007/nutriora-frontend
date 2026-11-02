import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingGif from "../assets/loadingNutoria.gif";
import '../Styles/ClientLifeStyle.css'

function ClientLifestyle() {
  const navigate = useNavigate();

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLifestyleDetails();
  }, []);

  async function fetchLifestyleDetails() {
    try {
      setLoading(true);
      setError("");

      const id = localStorage.getItem("id");
      const token = localStorage.getItem("token");

      if (!id) {
        setError("User session not found. Please login again.");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/details/LifeStyleFetch/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to fetch lifestyle details.",
        );
      }

      setDetails(result.data || null);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const sleepLabels = {
    "less-than-5": "Less than 5 hours",
    "5-6": "5–6 hours",
    "7-8": "7–8 hours",
    "more-than-8": "More than 8 hours",
  };

  const waterLabels = {
    "less-than-1": "Less than 1 L",
    "1-2": "1–2 L",
    "2-3": "2–3 L",
    "more-than-3": "More than 3 L",
  };

  const showValue = (value) => {
    if (value === undefined || value === null || value === "") {
      return "Not provided";
    }

    return value;
  };

  const showArray = (value) => {
    if (!Array.isArray(value) || value.length === 0) {
      return [];
    }

    return value;
  };

 if (loading) {
     return (
       <div className="client-profile-status">
         <img
           src={LoadingGif}
           alt="Loading..."
           className="profile-loading-gif"
         />
 
            <h3>Loading your lifestyle profile</h3>
        <p>Preparing your wellness information...</p>
       </div>
     );
   }


  if (error) {
    return (
      <div className="lifestyle-profile-status">
        <i className="bi bi-exclamation-circle lifestyle-status-icon"></i>
        <h3>Unable to load your profile</h3>
        <p>{error}</p>

        <button
          className="lifestyle-back-home"
          onClick={fetchLifestyleDetails}
        >
          <i className="bi bi-arrow-clockwise"></i>
          Try Again
        </button>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="lifestyle-profile-status">
        <i className="bi bi-clipboard2-heart lifestyle-status-icon"></i>
        <h3>No lifestyle details found</h3>
        <p>Complete your Lifestyle & Health form to view your information.</p>

        <button
          className="lifestyle-back-home"
          onClick={() => navigate("/clientHome")}
        >
          <i className="bi bi-arrow-left"></i>
          Back to Home
        </button>
      </div>
    );
  }

  const exerciseTypes = showArray(details.exerciseType);
  const medicalConditions = showArray(details.medicalConditions);

  return (
    <div className="lifestyle-profile">
      <button
        className="lifestyle-back-home"
        onClick={() => navigate("/client/profile")}
      >
        <i className="bi bi-arrow-left"></i>
        Back to Home
      </button>

      <div className="lifestyle-profile-heading">
        <div className="lifestyle-heading-icon">
          <i className="bi bi-heart-pulse"></i>
        </div>

        <div>
          <span className="lifestyle-eyebrow">YOUR WELLNESS PROFILE</span>
          <h1>Lifestyle & Health</h1>
          <p>
            Your daily habits, activity levels and health background in one
            place.
          </p>
        </div>
      </div>

      {/* Sleep and hydration */}
      <section className="lifestyle-section">
        <div className="lifestyle-section-heading">
          <i className="bi bi-moon-stars"></i>
          <div>
            <h2>Sleep & Hydration</h2>
            <p>Your sleep routine and daily water intake</p>
          </div>
        </div>

        <div className="lifestyle-info-grid">
          <div className="lifestyle-info-card">
            <span className="lifestyle-info-icon">
              <i className="bi bi-moon"></i>
            </span>
            <div>
              <p>Sleep Duration</p>
              <h3>
                {sleepLabels[details.sleepHours] ||
                  showValue(details.sleepHours)}
              </h3>
            </div>
          </div>

          <div className="lifestyle-info-card">
            <span className="lifestyle-info-icon">
              <i className="bi bi-stars"></i>
            </span>
            <div>
              <p>Sleep Quality</p>
              <h3>{showValue(details.sleepQuality)}</h3>
            </div>
          </div>

          <div className="lifestyle-info-card">
            <span className="lifestyle-info-icon">
              <i className="bi bi-droplet"></i>
            </span>
            <div>
              <p>Daily Water Intake</p>
              <h3>
                {waterLabels[details.waterIntake] ||
                  showValue(details.waterIntake)}
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Exercise and activity */}
      <section className="lifestyle-section">
        <div className="lifestyle-section-heading">
          <i className="bi bi-activity"></i>
          <div>
            <h2>Physical Activity</h2>
            <p>Your exercise routine and everyday movement</p>
          </div>
        </div>

        <div className="lifestyle-info-grid">
          <div className="lifestyle-info-card">
            <span className="lifestyle-info-icon">
              <i className="bi bi-calendar-check"></i>
            </span>
            <div>
              <p>Exercise Frequency</p>
              <h3>{showValue(details.exerciseFrequency)}</h3>
            </div>
          </div>

          <div className="lifestyle-info-card">
            <span className="lifestyle-info-icon">
              <i className="bi bi-person-walking"></i>
            </span>
            <div>
              <p>Activity Level</p>
              <h3>{showValue(details.activityLevel)}</h3>
            </div>
          </div>
        </div>

        <div className="lifestyle-detail-card">
          <h3>Preferred Exercise Types</h3>

          {exerciseTypes.length > 0 ? (
            <div className="lifestyle-chip-list">
              {exerciseTypes.map((exercise, index) => (
                <span className="lifestyle-chip" key={`${exercise}-${index}`}>
                  <i className="bi bi-check-circle"></i>
                  {exercise}
                </span>
              ))}
            </div>
          ) : (
            <p className="lifestyle-empty-text">
              No exercise types provided.
            </p>
          )}
        </div>
      </section>

      {/* Stress and health */}
      <section className="lifestyle-section">
        <div className="lifestyle-section-heading">
          <i className="bi bi-heart-pulse"></i>
          <div>
            <h2>Health Background</h2>
            <p>Health conditions and other wellness information</p>
          </div>
        </div>

        <div className="lifestyle-info-grid">
          <div className="lifestyle-info-card">
            <span className="lifestyle-info-icon">
              <i class="bi bi-activity"></i>
            </span>
            <div>
              <p>Stress Level</p>
              <h3>{showValue(details.stressLevel)}</h3>
            </div>
          </div>

          <div className="lifestyle-info-card">
            <span className="lifestyle-info-icon">
              <i className="bi bi-capsule"></i>
            </span>
            <div>
              <p>Medications / Supplements</p>
              <h3>{showValue(details.medications)}</h3>
            </div>
          </div>

          <div className="lifestyle-info-card">
            <span className="lifestyle-info-icon">
              <i className="bi bi-bandaid"></i>
            </span>
            <div>
              <p>Digestive Issues</p>
              <h3>{showValue(details.digestiveIssues)}</h3>
            </div>
          </div>

          <div className="lifestyle-info-card">
            <span className="lifestyle-info-icon">
              <i className="bi bi-shield-check"></i>
            </span>
            <div>
              <p>Smoking / Alcohol</p>
              <h3>{showValue(details.smokingAlcohol)}</h3>
            </div>
          </div>
        </div>

        <div className="lifestyle-detail-card">
          <h3>Medical Conditions</h3>

          {medicalConditions.length > 0 ? (
            <div className="lifestyle-chip-list">
              {medicalConditions.map((condition, index) => (
                <span
                  className="lifestyle-chip lifestyle-medical-chip"
                  key={`${condition}-${index}`}
                >
                  <i className="bi bi-heart-pulse"></i>
                  {condition}
                </span>
              ))}
            </div>
          ) : (
            <p className="lifestyle-empty-text">
              No medical conditions provided.
            </p>
          )}
        </div>
      </section>

      {/* Additional notes */}
      <section className="lifestyle-section">
        <div className="lifestyle-section-heading">
          <i className="bi bi-journal-text"></i>
          <div>
            <h2>Additional Notes</h2>
            <p>Other information you shared with your nutritionist</p>
          </div>
        </div>

        <div className="lifestyle-notes-card">
          <p>
            {showValue(details.additionalNotes) === "Not provided"
              ? "No additional notes added."
              : details.additionalNotes}
          </p>
        </div>
      </section>
    </div>
  );
}

export default ClientLifestyle;