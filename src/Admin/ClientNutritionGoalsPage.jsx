import '../AdminStyles/ClientNutritionGoalsPage.css'

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingGif from "../assets/LoadingNutoria.gif";
import { useParams } from 'react-router-dom';


function ClientNutritionGoalsPage() {
    const{id}=useParams()


  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNutritionGoals();
  }, []);

  async function fetchNutritionGoals() {
    try {
      setLoading(true);
      setError("");

      
      const token = localStorage.getItem("token");

      if (!id) {
        setError("Please login to view your nutrition goals.");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/details/NutritionGoalsFetch/${id}`,
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
          result.message || "Failed to fetch nutrition goals."
        );
      }

      setDetails(result.data || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const goalLabels = {
    "weight-loss": "Weight Loss",
    "weight-gain": "Weight Gain",
    "muscle-gain": "Muscle Gain",
    "healthy-eating": "Healthy Eating",
    fitness: "Improve Fitness",
    "better-habits": "Better Habits",
  };

  const challengeIcons = [
    "bi-clock",
    "bi-cup-hot",
    "bi-calendar2",
    "bi-shop",
    "bi-check2-circle",
    "bi-question-circle",
  ];

  if (loading) {
    return (
      <div className="nutrition-profile-status">
        <img
          src={LoadingGif}
          alt="Loading"
          className="profile-loading-gif"
        />
        <h3>Loading Nutrition Goals</h3>
        <p>Preparing your wellness journey...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="nutrition-profile-status">
        <i className="bi bi-exclamation-circle"></i>
        <h3>Unable to Load Nutrition Goals</h3>
        <p>{error}</p>

        <button onClick={fetchNutritionGoals}>
          Try Again
        </button>

        <Link to="/clientHome" className="nutrition-profile-back">
          <i className="bi bi-arrow-left"></i>
          Back to Home
        </Link>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="nutrition-profile-status">
        <i className="bi bi-bullseye"></i>
        <h3>No Nutrition Goals Found</h3>
        <p>
          Complete your nutrition goals form to see your
          wellness goals here.
        </p>

        <Link to={`/nutritionist/clients/${id}`}className="nutrition-profile-back">
          <i className="bi bi-arrow-left"></i>
          Back to Home
        </Link>
      </div>
    );
  }

  const challenges = Array.isArray(details.challenges)
    ? details.challenges
    : [];

  return (
    <div className="nutrition-profile-page">
      <div className="nutrition-profile-header">
        <div>
          <span>YOUR WELLNESS PROFILE</span>
          <h1>Nutrition Goals</h1>
          <p>
            Review your goals and the challenges in your
            wellness journey.
          </p>
        </div>

        <Link to={`/nutritionist/clients/${id}`} className="nutrition-profile-back">
          <i className="bi bi-arrow-left"></i>
          Back to Home
        </Link>
      </div>

      <div className="nutrition-profile-card">
        <div className="nutrition-profile-card-header">
          <div className="nutrition-profile-avatar">
            <i className="bi bi-bullseye"></i>
          </div>

          <div>
            <h2>Your Personal Goals</h2>
            <p>
              Your nutrition preferences and personal motivation.
            </p>
          </div>
        </div>

        <div className="nutrition-profile-divider"></div>

        <div className="nutrition-goals-grid">
          <div className="nutrition-goal-item">
            <div className="nutrition-goal-icon">
              <i className="bi bi-trophy"></i>
            </div>

            <div className="nutrition-goal-content">
              <span>Primary Goal</span>
              <h3>
                {goalLabels[details.primaryGoal] ||
                  details.primaryGoal ||
                  "Not provided"}
              </h3>
            </div>
          </div>

          <div className="nutrition-goal-item">
            <div className="nutrition-goal-icon">
              <i className="bi bi-calendar-check"></i>
            </div>

            <div className="nutrition-goal-content">
              <span>Target Timeline</span>
              <h3>{details.timeline || "Not provided"}</h3>
            </div>
          </div>

          <div className="nutrition-goal-item nutrition-goal-full">
            <div className="nutrition-goal-icon">
              <i className="bi bi-heart"></i>
            </div>

            <div className="nutrition-goal-content">
              <span>Your Motivation</span>
              <h3>{details.motivation || "Not provided"}</h3>
            </div>
          </div>

          <div className="nutrition-goal-item nutrition-goal-full">
            <div className="nutrition-goal-icon">
              <i className="bi bi-flag"></i>
            </div>

            <div className="nutrition-goal-content">
              <span>Challenges</span>

              {challenges.length > 0 ? (
                <div className="nutrition-challenges">
                  {challenges.map((challenge, index) => (
                    <div
                      className="nutrition-challenge-item"
                      key={index}
                    >
                      <i
                        className={`bi ${
                          challengeIcons[
                            index % challengeIcons.length
                          ]
                        }`}
                      ></i>

                      <span>{challenge}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <h3>No challenges added</h3>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientNutritionGoalsPage;
