import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../AdminStyles/HealthCardDetails.css"

function HealthCardDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch client health details
  async function getHealthDetails() {
    try {
      const response = await fetch(
        `https://route66-backend-1-v5us.onrender.com/healthPlan/healthOneGet/${id}`
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
        setHealth(null);
        return;
      }

      setHealth(data.data);

    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getHealthDetails();
  }, [id]);

  // Loading
  if (loading) {
    return (
      <div className="client-health-loading">
        Loading health details...
      </div>
    );
  }

  // No data
  if (!health) {
    return (
      <div className="client-health-empty">
        <i className="bi bi-heart-pulse"></i>
        <h3>No Health Plan Found</h3>
        <p>This client doesn't have a health plan yet.</p>

        <button onClick={() => navigate("/healthCard")}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="client-health-page">

      {/* Header */}

      <div className="client-health-header">

        <div>
          <button
            className="client-health-back"
            onClick={() => navigate(-1)}
          >
            <i className="bi bi-arrow-left"></i>
            Back
          </button>

          <p className="client-health-subtitle">
            CLIENT HEALTH MANAGEMENT
          </p>

          <h2>Health Details</h2>

          <p className="client-health-description">
            Complete health recommendations and exercise schedule.
          </p>
        </div>

        <span className={`client-health-status ${health.status?.toLowerCase()}`}>
          {health.status}
        </span>

      </div>

      {/* Client Information */}

      <div className="client-health-profile">

        <div className="client-health-profile-icon">
          <i className="bi bi-person"></i>
        </div>

        <div>
          <span>CLIENT NAME</span>

          <h3>
            {health.clientId?.name ||
             health.clientId?.fullName ||
             "Client"}
          </h3>

          <p>
            {health.clientId?.email || "Health Plan"}
          </p>
        </div>

      </div>

      {/* Overview */}

      <div className="client-health-section">

        <div className="client-health-section-title">
          <div className="client-health-section-icon">
            <i className="bi bi-clipboard2-pulse"></i>
          </div>

          <div>
            <h3>Health Overview</h3>
            <p>General health recommendations</p>
          </div>
        </div>

        <div className="client-health-overview">
          {health.overview}
        </div>

      </div>

      {/* Nutrition Details */}

      <div className="client-health-section">

        <div className="client-health-section-title">
          <div className="client-health-section-icon">
            <i className="bi bi-apple"></i>
          </div>

          <div>
            <h3>Nutrition Recommendations</h3>
            <p>Recommended food and dietary guidelines</p>
          </div>
        </div>

        <div className="client-health-nutrition-grid">

          {/* Fruits */}

          <div className="client-health-food-card">

            <div className="client-health-food-heading">
              <i className="bi bi-apple"></i>
              <h4>Recommended Fruits</h4>
            </div>

            {health.fruits?.length > 0 ? (
              <div className="client-health-tags">
                {health.fruits.map((fruit, index) => (
                  <span key={index}>{fruit}</span>
                ))}
              </div>
            ) : (
              <p className="client-health-no-data">No fruits added.</p>
            )}

          </div>

          {/* Vegetables */}

          <div className="client-health-food-card">

            <div className="client-health-food-heading vegetable-heading">
              <i className="bi bi-flower1"></i>
              <h4>Recommended Vegetables</h4>
            </div>

            {health.vegetables?.length > 0 ? (
              <div className="client-health-tags vegetable-tags">
                {health.vegetables.map((vegetable, index) => (
                  <span key={index}>{vegetable}</span>
                ))}
              </div>
            ) : (
              <p className="client-health-no-data">No vegetables added.</p>
            )}

          </div>

        </div>

      </div>

      {/* Guidelines */}

      <div className="client-health-section">

        <div className="client-health-section-title">
          <div className="client-health-section-icon">
            <i className="bi bi-journal-check"></i>
          </div>

          <div>
            <h3>Health Guidelines</h3>
            <p>Important instructions for the client</p>
          </div>
        </div>

        <div className="client-health-guidelines">

          {health.guidelines?.length > 0 ? (

            health.guidelines.map((guideline, index) => (

              <div className="client-health-guideline" key={index}>
                <i className="bi bi-check-circle-fill"></i>
                <p>{guideline}</p>
              </div>

            ))

          ) : (

            <p className="client-health-no-data">
              No guidelines added.
            </p>

          )}

        </div>

      </div>

      {/* Exercise Schedule */}

      <div className="client-health-section">

        <div className="client-health-section-title">
          <div className="client-health-section-icon">
            <i className="bi bi-activity"></i>
          </div>

          <div>
            <h3>Exercise Schedule</h3>
            <p>Daily workout plans and activities</p>
          </div>
        </div>

        <div className="client-health-exercises">

          {health.exercises?.length > 0 ? (

            health.exercises.map((day, index) => (

              <div className="client-health-day-card" key={index}>

                <div className="client-health-day-header">

                  <div className="client-health-day-icon">
                    <i className="bi bi-calendar2-week"></i>
                  </div>

                  <div>
                    <h4>Day {day.day}</h4>
                    <p>{day.title}</p>
                  </div>

                </div>

                {/* Workouts */}

                <div className="client-health-workouts">

                  {day.workouts?.length > 0 ? (

                    day.workouts.map((workout, workoutIndex) => (

                      <div
                        className="client-health-workout"
                        key={workoutIndex}
                      >

                        <div className="client-health-workout-name">
                          <i className="bi bi-lightning-charge"></i>
                          <h5>{workout.name}</h5>
                        </div>

                        <div className="client-health-workout-stats">

                          <div>
                            <span>Sets</span>
                            <strong>{workout.sets}</strong>
                          </div>

                          <div>
                            <span>Reps</span>
                            <strong>{workout.reps}</strong>
                          </div>

                          <div>
                            <span>Duration</span>
                            <strong>{workout.duration || "-"}</strong>
                          </div>

                        </div>

                      </div>

                    ))

                  ) : (

                    <p className="client-health-no-data">
                      No workouts added for this day.
                    </p>

                  )}

                </div>

              </div>

            ))

          ) : (

            <p className="client-health-no-data">
              No exercise schedule available.
            </p>

          )}

        </div>

      </div>

    </div>
  );
}

export default HealthCardDetails;