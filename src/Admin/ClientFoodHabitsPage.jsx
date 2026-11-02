import '../AdminStyles/ClientFoodHabitsPage.css'
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function ClientFoodHabitsPage() {
  const { id } = useParams();

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getFoodHabits() {
    try {
      const response = await fetch(
        `http://localhost:3000/details/foodHabitsFetch/${id}`
      );

      const data = await response.json();

      if (response.ok) {
        setDetails(data.data);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function Loader() {
      await getFoodHabits();
      await adminGateway()
      
    }
    Loader()
    
  }, [id]);

      function adminGateway() {
  const adminGate = localStorage.getItem("AdminLogin");

  if (adminGate !== "true") {
    navigate("/", { replace: true });
    return false;
  }

  return true;
}





  if (loading) {
    return (
      <div className="client-food-loading">
        <div className="client-food-spinner"></div>
        <p>Loading food preferences...</p>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="client-food-empty">
        <i className="bi bi-egg-fried"></i>
        <h2>No Food Habits Found</h2>
        <p>This client has not completed their food preferences yet.</p>

        <Link to={`/nutritionist/clients/${id}`}>
          <i className="bi bi-arrow-left"></i> Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="client-food-page">
      <div className="client-food-header">
        <div>
          <span>CLIENT INFORMATION</span>
          <h1>Food Habits & Preferences</h1>
          <p>Dietary preferences, allergies and eating habits.</p>
        </div>

        <Link to={`/nutritionist/clients/${id}`} className="client-food-back">
          <i className="bi bi-arrow-left"></i> Back
        </Link>
      </div>

      <div className="client-food-card">
        {/* Profile Heading */}

        <div className="client-food-profile">
          <div className="client-food-avatar">
            <i className="bi bi-egg-fried"></i>
          </div>

          <div>
            <h2>Nutrition Profile</h2>
            <p>Food preferences and dietary information</p>
          </div>
        </div>

        <div className="client-food-divider"></div>

        {/* Main Details */}

        <div className="client-food-grid">
          <div className="client-food-field">
            <div className="client-food-icon">
              <i className="bi bi-leaf"></i>
            </div>

            <div>
              <span>Diet Type</span>
              <h3>{details.dietType || "Not provided"}</h3>
            </div>
          </div>

          <div className="client-food-field">
            <div className="client-food-icon">
              <i className="bi bi-calendar2-week"></i>
            </div>

            <div>
              <span>Meals Per Day</span>
              <h3>{details.mealsPerDay || "Not provided"}</h3>
            </div>
          </div>

          <div className="client-food-field client-food-field-full">
            <div className="client-food-icon">
              <i className="bi bi-exclamation-triangle"></i>
            </div>

            <div className="client-food-field-content">
              <span>Food Allergies</span>

              {details.foodAllergies?.length > 0 ? (
                <div className="client-food-tags">
                  {details.foodAllergies.map((allergy, index) => (
                    <span className="client-food-tag" key={index}>
                      {allergy}
                    </span>
                  ))}
                </div>
              ) : (
                <h3>Not provided</h3>
              )}
            </div>
          </div>

          <div className="client-food-field client-food-field-full">
            <div className="client-food-icon">
              <i className="bi bi-heart"></i>
            </div>

            <div className="client-food-field-content">
              <span>Favorite Cuisines</span>

              {details.favoriteCuisines?.length > 0 ? (
                <div className="client-food-tags">
                  {details.favoriteCuisines.map((cuisine, index) => (
                    <span className="client-food-tag" key={index}>
                      {cuisine}
                    </span>
                  ))}
                </div>
              ) : (
                <h3>Not provided</h3>
              )}
            </div>
          </div>

          <div className="client-food-field client-food-field-full">
            <div className="client-food-icon">
              <i className="bi bi-x-circle"></i>
            </div>

            <div>
              <span>Disliked Foods</span>
              <h3>{details.dislikedFoods || "Not provided"}</h3>
            </div>
          </div>

          <div className="client-food-field">
            <div className="client-food-icon">
              <i className="bi bi-clock-history"></i>
            </div>

            <div>
              <span>Eating Habits</span>
              <h3>{details.eatingHabits || "Not provided"}</h3>
            </div>
          </div>

          <div className="client-food-field">
            <div className="client-food-icon">
              <i className="bi bi-cup-hot"></i>
            </div>

            <div>
              <span>Cooking Preference</span>
              <h3>{details.cookingPreference || "Not provided"}</h3>
            </div>
          </div>

          <div className="client-food-field client-food-field-full">
            <div className="client-food-icon">
              <i className="bi bi-journal-text"></i>
            </div>

            <div>
              <span>Additional Notes</span>
              <h3 className="client-food-notes">
                {details.additionalNotes || "No additional notes"}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientFoodHabitsPage;