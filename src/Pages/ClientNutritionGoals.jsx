
import { useEffect, useState } from "react";
import LoadingGif from "../assets/loadingNutoria.gif";
import "../Styles/ClientNutritionGoals.css";
import { useNavigate } from "react-router-dom";
function ClientNutritionGoals() {

  const navigate = useNavigate()
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNutritionGoals();
  }, []);

  async function fetchNutritionGoals() {
    try {
      setLoading(true);
      setError("");

      const id = localStorage.getItem("id");
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
       <div className="client-profile-status">
         <img
           src={LoadingGif}
           alt="Loading..."
           className="profile-loading-gif"
         />
 
          <h3>Loading nutrition goals</h3>
        <p>Preparing your wellness journey...</p>
       </div>
     );
   }

 

  if (error) {
    return (
      <div className="nutrition-profile-status">
        <i className="bi bi-exclamation-circle"></i>
        <h3>Unable to load nutrition goals</h3>
        <p>{error}</p>
        <button onClick={fetchNutritionGoals}>Try Again</button>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="nutrition-profile-status">
        <button
        type="button"
        className="nutrition-back-home"
        onClick={() => navigate("/client/profile")}
      >
        <i className="bi bi-arrow-left"></i>
        <span>Back</span>
      </button>
        <i className="bi bi-bullseye"></i>
        <h3>No nutrition goals found</h3>
        <p>
          Complete your nutrition goals form to see your goals here.
        </p>
      </div>
    );
  }

  const challenges = Array.isArray(details.challenges)
    ? details.challenges
    : [];

  return (
    <section className="nutrition-profile">
      <button
        type="button"
        className="nutrition-back-home"
        onClick={() => navigate("/client/profile")}
      >
        <i className="bi bi-arrow-left"></i>
        <span>Back</span>
      </button>

      <div className="nutrition-profile-heading">
        <div>
          <span className="nutrition-eyebrow">
            YOUR WELLNESS PROFILE
          </span>
          <h2>Nutrition Goals</h2>
          <p>Your goals, motivation and the habits you want to improve.</p>
        </div>

        <div className="nutrition-heading-icon">
          <i className="bi bi-bullseye"></i>
        </div>
      </div>

      <div className="nutrition-primary-goal">
        <div className="nutrition-goal-icon">
          <i className="bi bi-stars"></i>
        </div>

        <div>
          <span className="nutrition-field-label">PRIMARY GOAL</span>
          <h3>
            {goalLabels[details.primaryGoal] ||
              details.primaryGoal ||
              "Not provided"}
          </h3>
          <p>One step at a time towards a healthier you.</p>
        </div>
      </div>

      <div className="nutrition-info-grid">
        <div className="nutrition-info-card">
          <div className="nutrition-info-icon">
            <i className="bi bi-calendar-check"></i>
          </div>
          <span className="nutrition-field-label">
            PREFERRED TIMELINE
          </span>
          <h3>{details.timeline || "Not provided"}</h3>
        </div>

        <div className="nutrition-info-card">
          <div className="nutrition-info-icon">
            <i className="bi bi-heart"></i>
          </div>
          <span className="nutrition-field-label">MOTIVATION</span>
          <p className="nutrition-motivation">
            {details.motivation || "No motivation added yet."}
          </p>
        </div>
      </div>

      <div className="nutrition-challenges-section">
        <div className="nutrition-section-heading">
          <div>
            <h3>Your Challenges</h3>
            <p>Habits and obstacles you want to work on.</p>
          </div>

          <span className="nutrition-challenge-count">
            {challenges.length} selected
          </span>
        </div>

        {challenges.length > 0 ? (
          <div className="nutrition-challenges-list">
            {challenges.map((challenge, index) => (
              <div className="nutrition-challenge-item" key={challenge}>
                <i
                  className={`bi ${
                    challengeIcons[index % challengeIcons.length]
                  }`}
                ></i>
                <span>{challenge}</span>
                <i className="bi bi-check-circle-fill challenge-check"></i>
              </div>
            ))}
          </div>
        ) : (
          <p className="nutrition-no-challenges">
            No challenges selected.
          </p>
        )}
      </div>
    </section>
  );
}

export default ClientNutritionGoals;
