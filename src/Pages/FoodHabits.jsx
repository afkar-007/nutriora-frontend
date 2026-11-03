import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/FoodHabits.css";
import { useEffect } from "react";
import FoodHabitsPost from "../Services/serFoodHabits";

function FoodHabits() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    dietType: "",
    mealsPerDay: "",
    foodAllergies: [],
    dislikedFoods: "",
    favoriteCuisines: [],
    eatingHabits: "",
    cookingPreference: "",
    additionalNotes: "",
  });

  useEffect(() => {
    const foodHabitsGateWay = localStorage.getItem("foodHabits");
    if (foodHabitsGateWay === "true") {
      navigate("/Lifestyle");
    }
  }, []);

  const [error, setError] = useState("");

  const dietOptions = [
    {
      value: "vegetarian",
      title: "Vegetarian",
      description: "Plant-based foods and dairy",
      icon: "bi-flower1",
    },
    {
      value: "non-vegetarian",
      title: "Non-vegetarian",
      description: "Includes meat, fish or eggs",
      icon: "bi-egg-fried",
    },
    {
      value: "vegan",
      title: "Vegan",
      description: "Entirely plant-based foods",
      icon: "bi-leaf",
    },
    {
      value: "eggetarian",
      title: "Eggetarian",
      description: "Vegetarian foods with eggs",
      icon: "bi-egg",
    },
    {
      value: "pescatarian",
      title: "Pescatarian",
      description: "Plant foods with fish",
      icon: "bi-water",
    },
    {
      value: "no-restrictions",
      title: "No restrictions",
      description: "I enjoy a variety of foods",
      icon: "bi-stars",
    },
  ];

  const allergyOptions = [
    "Peanuts",
    "Tree nuts",
    "Milk / Dairy",
    "Eggs",
    "Soy",
    "Wheat / Gluten",
    "Fish",
    "Shellfish",
    "Other",
    "No known allergies",
  ];

  const cuisineOptions = [
    "South Indian",
    "North Indian",
    "Continental",
    "Chinese",
    "Mediterranean",
    "Japanese",
    "Middle Eastern",
    "Other",
  ];

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleMultiSelect(field, value) {
    setFormData((previous) => {
      const currentValues = previous[field];

      if (field === "foodAllergies" && value === "No known allergies") {
        return {
          ...previous,
          foodAllergies: currentValues.includes(value)
            ? []
            : ["No known allergies"],
        };
      }

      if (field === "foodAllergies" && value !== "No known allergies") {
        const filteredValues = currentValues.filter(
          (item) => item !== "No known allergies",
        );

        return {
          ...previous,
          foodAllergies: filteredValues.includes(value)
            ? filteredValues.filter((item) => item !== value)
            : [...filteredValues, value],
        };
      }

      return {
        ...previous,
        [field]: currentValues.includes(value)
          ? currentValues.filter((item) => item !== value)
          : [...currentValues, value],
      };
    });
  }

  async function handleSubmit(e) {
    try {
      setLoading(true);
      e.preventDefault();
      setError("");

      if (!formData.dietType) {
        setError("Please select your preferred diet type.");
        return;
      }

      if (!formData.mealsPerDay) {
        setError("Please select how many meals you usually eat.");
        return;
      }

      if (!formData.cookingPreference) {
        setError("Please select your usual food preparation preference.");
        return;
      }

      if (
        formData.foodAllergies.includes("No known allergies") &&
        formData.foodAllergies.length > 1
      ) {
        setError(
          'Select either "No known allergies" or your specific allergies.',
        );
        return;
      }

      
      const id = localStorage.getItem("id");

      const data = {
        userId: id,
        dietType: formData.dietType,
        mealsPerDay: formData.mealsPerDay,
        foodAllergies: formData.foodAllergies,
        dislikedFoods: formData.dislikedFoods,
        favoriteCuisines: formData.favoriteCuisines,
        eatingHabits: formData.eatingHabits,
        cookingPreference: formData.cookingPreference,
        additionalNotes: formData.additionalNotes,
      };

    

      const response = await FoodHabitsPost(data);
      if (!response.ok) {
        alert(response.message);
        console.log(response.message);
        return;
      }

      if (response.ok) {
        navigate("/Lifestyle");

        localStorage.setItem("foodHabits", true);
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="food-page">
      <section className="food-card">
        <header className="food-header">
          <div className="food-brand">
            <i className="bi bi-flower1"></i>
            <span>Nutriora</span>
          </div>

          <span className="food-step">STEP 04 OF 05</span>
        </header>

        <div className="food-progress">
          <div className="food-progress-fill"></div>
        </div>

        <div className="food-intro">
          <p className="food-eyebrow">
            <i className="bi bi-egg-fried"></i>
            YOUR FOOD STORY
          </p>

          <h1>
            Food that fits
            <br />
            <span>your lifestyle.</span>
          </h1>

          <p>
            Healthy eating should work with your preferences, not against them.
            Tell us what you enjoy and what works for you.
          </p>
        </div>

        <form>
          {/* Diet Type */}

          <section className="food-section">
            <div className="food-section-heading">
              <h2>How do you usually eat?</h2>
              <span>Select one</span>
            </div>

            <div className="food-diet-grid">
              {dietOptions.map((option) => (
                <label
                  key={option.value}
                  className={`food-diet-card ${
                    formData.dietType === option.value ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="dietType"
                    value={option.value}
                    checked={formData.dietType === option.value}
                    onChange={handleChange}
                  />

                  <span className="food-diet-icon">
                    <i className={`bi ${option.icon}`}></i>
                  </span>

                  <span className="food-diet-content">
                    <strong>{option.title}</strong>
                    <small>{option.description}</small>
                  </span>

                  <span className="food-radio-check">
                    <i className="bi bi-check2"></i>
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* Meals Per Day */}

          <section className="food-section">
            <div className="food-section-heading">
              <h2>How many meals do you eat daily?</h2>
            </div>

            <div className="food-meals">
              {["1–2", "3", "4–5", "6+"].map((meal) => (
                <button
                  type="button"
                  key={meal}
                  className={`food-meal-option ${
                    formData.mealsPerDay === meal ? "selected" : ""
                  }`}
                  onClick={() =>
                    setFormData((previous) => ({
                      ...previous,
                      mealsPerDay: meal,
                    }))
                  }
                  aria-pressed={formData.mealsPerDay === meal}
                >
                  <span>{meal}</span>
                  <small>{meal === "3" ? "Typical" : "Meals"}</small>
                </button>
              ))}
            </div>
          </section>

          {/* Allergies */}

          <section className="food-section">
            <div className="food-section-heading">
              <h2>Any food allergies or sensitivities?</h2>
              <span>Select any</span>
            </div>

            <p className="food-section-description">
              This helps us identify foods that may not be suitable for you.
            </p>

            <div className="food-chip-list">
              {allergyOptions.map((allergy) => (
                <label
                  key={allergy}
                  className={`food-chip ${
                    formData.foodAllergies.includes(allergy) ? "selected" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.foodAllergies.includes(allergy)}
                    onChange={() => handleMultiSelect("foodAllergies", allergy)}
                  />

                  <i
                    className={
                      formData.foodAllergies.includes(allergy)
                        ? "bi bi-check-circle-fill"
                        : "bi bi-plus-circle"
                    }
                  ></i>

                  <span>{allergy}</span>
                </label>
              ))}
            </div>

            <p className="food-privacy-note">
              <i className="bi bi-shield-check"></i>
              Please list any known allergies accurately. Severe allergies
              require appropriate medical guidance.
            </p>
          </section>

          {/* Cuisine Preferences */}

          <section className="food-section">
            <div className="food-section-heading">
              <h2>Which cuisines do you enjoy?</h2>
              <span>Select any</span>
            </div>

            <div className="food-chip-list">
              {cuisineOptions.map((cuisine) => (
                <label
                  key={cuisine}
                  className={`food-chip ${
                    formData.favoriteCuisines.includes(cuisine)
                      ? "selected"
                      : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.favoriteCuisines.includes(cuisine)}
                    onChange={() =>
                      handleMultiSelect("favoriteCuisines", cuisine)
                    }
                  />

                  <i
                    className={
                      formData.favoriteCuisines.includes(cuisine)
                        ? "bi bi-check-circle-fill"
                        : "bi bi-plus-circle"
                    }
                  ></i>

                  <span>{cuisine}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Disliked Foods */}

          <section className="food-section">
            <div className="food-field">
              <label htmlFor="dislikedFoods">
                Foods you dislike <span>Optional</span>
              </label>

              <textarea
                id="dislikedFoods"
                name="dislikedFoods"
                rows="3"
                maxLength="500"
                value={formData.dislikedFoods}
                onChange={handleChange}
                placeholder="E.g. bitter gourd, mushrooms, certain vegetables..."
              />
            </div>
          </section>

          {/* Eating Habits */}

          <section className="food-section">
            <div className="food-field">
              <label htmlFor="eatingHabits">
                Tell us about your eating routine <span>Optional</span>
              </label>

              <textarea
                id="eatingHabits"
                name="eatingHabits"
                rows="3"
                maxLength="500"
                value={formData.eatingHabits}
                onChange={handleChange}
                placeholder="E.g. I skip breakfast, snack in the evening..."
              />
            </div>
          </section>

          {/* Cooking Preference */}

          <section className="food-section">
            <div className="food-section-heading">
              <h2>How do you usually get your meals?</h2>
            </div>

            <div className="food-cooking-options">
              {[
                {
                  value: "home-cooked",
                  icon: "bi-house-heart",
                  title: "Home-cooked",
                  description: "I mostly cook at home",
                },
                {
                  value: "mixed",
                  icon: "bi-arrow-left-right",
                  title: "A mix of both",
                  description: "Home meals and eating out",
                },
                {
                  value: "eating-out",
                  icon: "bi-shop",
                  title: "Mostly outside",
                  description: "Restaurants or ordered meals",
                },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`food-cooking-card ${
                    formData.cookingPreference === option.value
                      ? "selected"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="cookingPreference"
                    value={option.value}
                    checked={formData.cookingPreference === option.value}
                    onChange={handleChange}
                  />

                  <i className={`bi ${option.icon}`}></i>

                  <span>
                    <strong>{option.title}</strong>
                    <small>{option.description}</small>
                  </span>

                  <span className="food-radio-check">
                    <i className="bi bi-check2"></i>
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* Additional Notes */}

          <section className="food-section">
            <div className="food-field">
              <label htmlFor="additionalNotes">
                Anything else we should know? <span>Optional</span>
              </label>

              <textarea
                id="additionalNotes"
                name="additionalNotes"
                rows="3"
                maxLength="500"
                value={formData.additionalNotes}
                onChange={handleChange}
                placeholder="Share any other food preferences or requirements..."
              />
            </div>
          </section>

          {error && (
            <div className="food-error" role="alert">
              <i className="bi bi-exclamation-circle"></i>
              <span>{error}</span>
            </div>
          )}

          <footer className="food-footer">
            <button
              type="button"
              className="food-back"
              onClick={() => navigate(-1)}
            >
              <i className="bi bi-arrow-left"></i>
              Back
            </button>

            <button
              type="submit"
              onClick={(e) => handleSubmit(e)}
              className="food-continue"
              disabled={loading}
            >
              {loading ? "Loading..." : "Continue"}
              <i className="bi bi-arrow-right"></i>
            </button>
          </footer>
        </form>
      </section>

      {/* Wellness Side Panel */}

      <aside className="food-side">
        <div className="food-side-content">
          <span className="food-side-eyebrow">NO ONE-SIZE-FITS-ALL</span>

          <div className="food-art">
            <div className="food-art-ring food-ring-one"></div>
            <div className="food-art-ring food-ring-two"></div>

            <div className="food-art-center">
              <i className="bi bi-egg-fried"></i>
            </div>

            <div className="food-art-bubble food-bubble-one">
              <i className="bi bi-leaf"></i>
            </div>

            <div className="food-art-bubble food-bubble-two">
              <i className="bi bi-heart"></i>
            </div>

            <div className="food-art-bubble food-bubble-three">
              <i className="bi bi-stars"></i>
            </div>
          </div>

          <h2>
            Eat well.
            <br />
            <span>Feel your best.</span>
          </h2>

          <p>
            Your favorite foods, cultural traditions and daily routine matter. A
            sustainable nutrition plan should fit your real life.
          </p>

          <div className="food-side-points">
            <div>
              <i className="bi bi-check2-circle"></i>
              <span>Built around your preferences</span>
            </div>

            <div>
              <i className="bi bi-check2-circle"></i>
              <span>Designed for everyday life</span>
            </div>

            <div>
              <i className="bi bi-check2-circle"></i>
              <span>Focused on sustainable habits</span>
            </div>
          </div>
        </div>

        <div className="food-side-bottom">
          <i className="bi bi-shield-check"></i>
          <span>Your preferences deserve to be heard.</span>
        </div>
      </aside>
    </main>
  );
}

export default FoodHabits;
