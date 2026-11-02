
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingGif from "../assets/LoadingNutoria.gif";
import "../Styles/ClientFoodHabits.css";

function ClientFoodHabits() {
  const navigate = useNavigate();

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFoodHabits();
  }, []);

  async function fetchFoodHabits() {
    try {
      setLoading(true);
      setError("");

      const id = localStorage.getItem("id");
      const token = localStorage.getItem("token");

      if (!id) {
        setError("Please login to view your food preferences.");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/details/FoodHabitsFetch/${id}`,
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
          result.message || "Failed to fetch food preferences."
        );
      }

      setDetails(result.data || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const dietLabels = {
    vegetarian: "Vegetarian",
    "non-vegetarian": "Non-vegetarian",
    vegan: "Vegan",
    eggetarian: "Eggetarian",
    pescatarian: "Pescatarian",
    "no-restrictions": "No restrictions",
  };

  const allergyIcons = {
    Peanuts: "bi-nut",
    "Tree nuts": "bi-tree",
    "Milk / Dairy": "bi-cup-hot",
    Eggs: "bi-egg",
    Soy: "bi-flower1",
    "Wheat / Gluten": "bi-basket",
    Fish: "bi-water",
    Shellfish: "bi-water",
    Other: "bi-plus-circle",
    "No known allergies": "bi-check-circle",
  };

  if (loading) {
    return (
      <div className="food-profile-status">
        <img
          src={LoadingGif}
          alt="Loading..."
          className="profile-loading-gif"
        />
        <h3>Loading food preferences</h3>
        <p>Preparing your nutrition profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="food-profile-status">
        <i className="bi bi-exclamation-circle"></i>
        <h3>Unable to load food preferences</h3>
        <p>{error}</p>
        <button onClick={fetchFoodHabits}>Try Again</button>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="food-profile-status">
        <i className="bi bi-egg-fried"></i>
        <h3>No food preferences found</h3>
        <p>
          Complete your Food Habits & Preferences form to see your
          information here.
        </p>
      </div>
    );
  }

  const foodAllergies = Array.isArray(details.foodAllergies)
    ? details.foodAllergies
    : [];

  const favoriteCuisines = Array.isArray(details.favoriteCuisines)
    ? details.favoriteCuisines
    : [];

  const preferences = [
    {
      label: "Meals Per Day",
      value: details.mealsPerDay || "Not provided",
      icon: "bi-clock",
    },
    {
      label: "Cooking Preference",
      value: details.cookingPreference || "Not provided",
      icon: "bi-fire",
    },
    {
      label: "Eating Habits",
      value: details.eatingHabits || "Not provided",
      icon: "bi-calendar2-check",
    },
  ];

  return (
    <section className="food-profile">
      <button
        type="button"
        className="food-back-home"
        onClick={() => navigate("/client/profile")}
      >
        <i className="bi bi-arrow-left"></i>
        <span>Back to Home</span>
      </button>

      <div className="food-profile-heading">
        <div>
          <span className="food-profile-eyebrow">
            YOUR WELLNESS PROFILE
          </span>
          <h2>Food Habits & Preferences</h2>
          <p>
            Your dietary choices, food preferences and eating routines.
          </p>
        </div>

        <div className="food-profile-heading-icon">
          <i className="bi bi-egg-fried"></i>
        </div>
      </div>

      {/* Diet Type */}

      <div className="food-diet-card">
        <div className="food-diet-icon">
          <i className="bi bi-leaf"></i>
        </div>

        <div>
          <span className="food-field-label">PREFERRED DIET</span>
          <h3>
            {dietLabels[details.dietType] ||
              details.dietType ||
              "Not provided"}
          </h3>
          <p>Your selected dietary preference.</p>
        </div>
      </div>

      {/* Food Preferences */}

      <div className="food-info-grid">
        {preferences.map((item) => (
          <div className="food-info-card" key={item.label}>
            <div className="food-info-icon">
              <i className={`bi ${item.icon}`}></i>
            </div>

            <span className="food-field-label">{item.label}</span>
            <h3>{item.value}</h3>
          </div>
        ))}
      </div>

      {/* Allergies */}

      <div className="food-section">
        <div className="food-section-heading">
          <div>
            <h3>Food Allergies</h3>
            <p>Allergies you've reported in your profile.</p>
          </div>

          <span className="food-count">
            {foodAllergies.length} selected
          </span>
        </div>

        {foodAllergies.length > 0 ? (
          <div className="food-chip-list">
            {foodAllergies.map((allergy) => (
              <div className="food-chip" key={allergy}>
                <i
                  className={`bi ${
                    allergyIcons[allergy] || "bi-shield-check"
                  }`}
                ></i>
                <span>{allergy}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="food-empty-text">
            No food allergies provided.
          </p>
        )}
      </div>

      {/* Favorite Cuisines */}

      <div className="food-section">
        <div className="food-section-heading">
          <div>
            <h3>Favorite Cuisines</h3>
            <p>Your preferred food styles and cuisines.</p>
          </div>

          <span className="food-count">
            {favoriteCuisines.length} selected
          </span>
        </div>

        {favoriteCuisines.length > 0 ? (
          <div className="food-chip-list">
            {favoriteCuisines.map((cuisine) => (
              <div className="food-chip cuisine-chip" key={cuisine}>
                <i className="bi bi-stars"></i>
                <span>{cuisine}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="food-empty-text">
            No favorite cuisines selected.
          </p>
        )}
      </div>

      {/* Disliked Foods */}

      <div className="food-section">
        <div className="food-section-heading">
          <div>
            <h3>Foods You Dislike</h3>
            <p>Foods you'd prefer to avoid in your meal plans.</p>
          </div>

          <i className="bi bi-slash-circle food-section-symbol"></i>
        </div>

        <div className="food-text-panel">
          {details.dislikedFoods?.trim() ||
            "No disliked foods specified."}
        </div>
      </div>

      {/* Additional Notes */}

      <div className="food-section">
        <div className="food-section-heading">
          <div>
            <h3>Additional Notes</h3>
            <p>Other food-related details you've shared.</p>
          </div>

          <i className="bi bi-journal-text food-section-symbol"></i>
        </div>

        <div className="food-text-panel">
          {details.additionalNotes?.trim() ||
            "No additional notes added."}
        </div>
      </div>
    </section>
  );
}

export default ClientFoodHabits;
