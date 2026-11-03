import React, { useEffect, useState } from "react";
import "../Styles/Workout.css";
import { useNavigate } from "react-router-dom";
import LoadingGif from "../assets/LoadingNutoria.gif";

function Workout() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(false);
  const [completeLoading, setCompleteLoading] = useState(false);
  const [showCompleteConfirm, setShowCompleteConfirm] = useState(false);
  const [updateId, setUpdateId] = useState("");

  const navigate = useNavigate();

  const id = localStorage.getItem("id");
 

  useEffect(() => {

    async function Loader() {
      await getHealthPlan();
      await returnedToHome()
    }
    Loader()
  }, []);

   async function returnedToHome() {

     const login = localStorage.getItem("homePage");
    if (login !== "true") {
      navigate("/", { replace: true });
      

      return;
    }
    

    
  }


  async function getHealthPlan() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://nutriora-backend.onrender.com/healthPlan/clientWorkout/${id}`,
      );

      const data = await response.json();

      if (!response.ok) {
        setHealth(null);
        return;
      }

      setHealth(data.data);
      
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function completeHealthPlan() {
    try {
      setCompleteLoading(true);

      const sendData = {
        status: "Completed",
      };

      const response = await fetch(
        `https://nutriora-backend.onrender.com/healthPlan/updateWorkout/${health._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sendData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
        return;
      }

      getHealthPlan();
    } catch (error) {
      console.log(error);
    } finally {
      setCompleteLoading(false);
      setUpdateId(null);
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

        <h3>Loading health plan...</h3>
      </div>
    );
  }

  if (!health) {
    return (
      <div className="no-health-plan">
        <button
          className="health-back-btn"
          onClick={() => navigate("/clientHome")}
        >
          <i className="bi bi-arrow-left"></i>
          Back
        </button>
        <i className="bi bi-heart-pulse"></i>
        <h3>No Health Plan Available</h3>
        <p>Your nutritionist has not assigned a health plan yet.</p>
      </div>
    );
  }

  return (
    <>
      {showCompleteConfirm && (
        <div className="health-confirm-overlay">
          <div className="health-confirm-box">
            <div className="health-confirm-icon">
              <i className="bi bi-check-circle"></i>
            </div>

            <h3>Complete Health Plan?</h3>

            <p>
              Are you sure you have completed this health plan? Once confirmed,
              your plan status will be updated.
            </p>

            <div className="health-confirm-actions">
              <button
                className="health-cancel-btn"
                onClick={() => setShowCompleteConfirm(false)}
                disabled={completeLoading}
              >
                Cancel
              </button>

              <button
                className="health-confirm-btn"
                onClick={async () => {
                  await completeHealthPlan(updateId);
                  setShowCompleteConfirm(false);
                }}
                disabled={completeLoading}
              >
                {completeLoading ? "Updating..." : "Yes, Complete"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="client-health-container">
        <button
          className="health-back-btn"
          onClick={() => navigate("/clientHome")}
        >
          <i className="bi bi-arrow-left"></i>
          Back
        </button>

        {/* Header */}
        <div className="client-health-header">
          <div>
            <span>YOUR WELLNESS JOURNEY</span>
            <h2>Health Plan</h2>
            <p>Follow your personalized health recommendations.</p>
          </div>

          <span className={`health-status ${health.status.toLowerCase()}`}>
            {health.status}
          </span>
        </div>

        {/* Overview */}
        <div className="health-overview-card">
          <h3>
            <i className="bi bi-clipboard2-pulse"></i>
            Health Overview
          </h3>

          <p>{health.overview}</p>
        </div>

        {/* Fruits and Vegetables */}
        <div className="health-food-grid">
          <div className="health-detail-card">
            <h3>
              <i className="bi bi-apple"></i>
              Recommended Fruits
            </h3>

            {health.fruits.map((fruit, index) => (
              <p key={index}>
                <i className="bi bi-check-circle-fill"></i>
                {fruit}
              </p>
            ))}
          </div>

          <div className="health-detail-card">
            <h3>
              <i className="bi bi-flower1"></i>
              Recommended Vegetables
            </h3>

            {health.vegetables.map((vegetable, index) => (
              <p key={index}>
                <i className="bi bi-check-circle-fill"></i>
                {vegetable}
              </p>
            ))}
          </div>
        </div>

        {/* Guidelines */}
        <div className="health-detail-card health-guidelines">
          <h3>
            <i className="bi bi-journal-check"></i>
            Health Guidelines
          </h3>

          {health.guidelines.map((guideline, index) => (
            <p key={index}>
              <i className="bi bi-check2-circle"></i>
              {guideline}
            </p>
          ))}
        </div>

        {/* Exercises */}
        <div className="health-exercise-section">
          <h3>
            <i className="bi bi-activity"></i>
            Exercise Plan
          </h3>

          {health.exercises.map((day, index) => (
            <div className="health-exercise-card" key={index}>
              <h4>
                Day {day.day} - {day.title}
              </h4>

              {day.workouts.map((workout, workoutIndex) => (
                <div className="health-workout" key={workoutIndex}>
                  <div>
                    <h5>{workout.name}</h5>

                    <span>
                      {workout.sets} Sets · {workout.reps} Reps
                    </span>
                  </div>

                  {workout.duration && (
                    <span className="workout-duration">
                      <i className="bi bi-clock"></i>
                      {workout.duration}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Complete Button */}
        <div className="health-complete-section">
          {health.status === "Completed" ? (
            <p className="health-completed-message">
              <i className="bi bi-check-circle-fill"></i>
              You have completed this health plan!
            </p>
          ) : (
            <button
              className="health-complete-btn"
              onClick={() => {
                (setShowCompleteConfirm(true), setUpdateId(health._id));
              }}
              disabled={completeLoading || health.status === "Paused"}
            >
              {completeLoading ? "Updating..." : "Mark as Complete"}
              <i className="bi bi-check-circle"></i>
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Workout;
