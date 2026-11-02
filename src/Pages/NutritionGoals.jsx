import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/NutritionGoals.css";
import postNutritionGoals from "../Services/serNutritionGoals";

function NutritionGoals() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    primaryGoal: "",
    timeline: "",
    motivation: "",
    challenges: [],
  });

 
     useEffect(()=>{
    const NutritionGoalsGateWay= localStorage.getItem("NutritionGoals")
    if(NutritionGoalsGateWay==="true"){
      navigate('/FoodHabits')
    }



  },[])

  

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const goalOptions = [
    {
      value: "weight-loss",
      icon: "bi-person-arms-up",
      title: "Weight Loss",
      description: "Build healthier habits and manage weight",
    },
    {
      value: "weight-gain",
      icon: "bi-graph-up-arrow",
      title: "Weight Gain",
      description: "Increase weight with balanced nutrition",
    },
    {
      value: "muscle-gain",
      icon: "bi-lightning-charge",
      title: "Muscle Gain",
      description: "Support strength and muscle development",
    },
    {
      value: "healthy-eating",
      icon: "bi-heart-pulse",
      title: "Healthy Eating",
      description: "Improve daily food choices and nutrition",
    },
    {
      value: "fitness",
      icon: "bi-activity",
      title: "Improve Fitness",
      description: "Support energy, activity and performance",
    },
    {
      value: "better-habits",
      icon: "bi-stars",
      title: "Better Habits",
      description: "Create a sustainable daily routine",
    },
  ];

  const challengeOptions = [
    "Irregular meal timings",
    "Frequent cravings",
    "Lack of time to cook",
    "Eating outside often",
    "Difficulty staying consistent",
    "Not sure what to eat",
  ];

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleChallengeChange(challenge) {
    setFormData((previous) => ({
      ...previous,
      challenges: previous.challenges.includes(challenge)
        ? previous.challenges.filter((item) => item !== challenge)
        : [...previous.challenges, challenge],
    }));
  }

  async function handleSubmit(e) {
    try {
      setLoading(true)
      e.preventDefault();
      setError("");

      if (!formData.primaryGoal) {
        setError("Please select your primary nutrition goal.");
        return;
      }

      if (!formData.timeline) {
        setError("Please select your preferred timeline.");
        return;
      }

      console.log("Nutrition Goals:", formData);

      const id = localStorage.getItem("id");
      const data = {
        userId: id,
        primaryGoal: formData.primaryGoal,
        timeline: formData.timeline,
        motivation: formData.motivation,
        challenges: formData.challenges,
      };

      const response = await postNutritionGoals(data);

      if (!response.ok) {
        alert(response.message);
        console.log(response.message);

        return;
      }

      if (response.ok) {
        localStorage.setItem("NutritionGoals",true)
       
       navigate('/FoodHabits')
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="goals-page">
      <section className="goals-card">
        <header className="goals-header">
          <div className="goals-brand">
            <i className="bi bi-flower1"></i>
            <span>Nutriora</span>
          </div>

          <span className="goals-step">STEP 03 OF 05</span>
        </header>

        <div className="goals-progress">
          <div className="goals-progress-fill"></div>
        </div>

        <div className="goals-intro">
          <p className="goals-eyebrow">
            <i className="bi bi-stars"></i>
            YOUR WELLNESS JOURNEY
          </p>

          <h1>
            What would you like
            <br />
            to <span>achieve?</span>
          </h1>

          <p>
            Everyone has a different journey. Tell us what matters most to you
            so we can personalize your nutrition plan.
          </p>
        </div>

        <form >
          <div className="goals-section-heading">
            <h2>Choose your primary goal</h2>
            <span>Select one</span>
          </div>

          <div className="goals-options">
            {goalOptions.map((goal) => (
              <label
                className={`goals-option ${
                  formData.primaryGoal === goal.value ? "selected" : ""
                }`}
                key={goal.value}
              >
                <input
                  type="radio"
                  name="primaryGoal"
                  value={goal.value}
                  checked={formData.primaryGoal === goal.value}
                  onChange={handleChange}
                />

                <span className="goals-option-icon">
                  <i className={`bi ${goal.icon}`}></i>
                </span>

                <span className="goals-option-content">
                  <strong>{goal.title}</strong>
                  <small>{goal.description}</small>
                </span>

                <span className="goals-option-check">
                  <i className="bi bi-check2"></i>
                </span>
              </label>
            ))}
          </div>

          <div className="goals-field">
            <label htmlFor="timeline">Your preferred timeline</label>

            <div className="goals-input-wrap">
              <i className="bi bi-calendar3"></i>

              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
              >
                <option value="">Select a timeline</option>
                <option value="1-month">Next 1 month</option>
                <option value="3-months">Next 3 months</option>
                <option value="6-months">Next 6 months</option>
                <option value="gradual">Gradually, at my own pace</option>
              </select>

              <i className="bi bi-chevron-down goals-select-arrow"></i>
            </div>

            <small className="goals-helper">
              This helps us understand your expectations, not promise a specific
              result.
            </small>
          </div>

          <div className="goals-field">
            <label htmlFor="motivation">
              What motivates you? <span>Optional</span>
            </label>

            <textarea
              id="motivation"
              name="motivation"
              rows="3"
              maxLength="500"
              placeholder="Tell us what inspired you to start your wellness journey..."
              value={formData.motivation}
              onChange={handleChange}
            />

            <small className="goals-character-count">
              {formData.motivation.length}/500 characters
            </small>
          </div>

          <div className="goals-field">
            <label>
              What challenges do you face? <span>Optional · Select any</span>
            </label>

            <div className="goals-challenges">
              {challengeOptions.map((challenge) => (
                <label
                  key={challenge}
                  className={`goals-challenge ${
                    formData.challenges.includes(challenge) ? "selected" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.challenges.includes(challenge)}
                    onChange={() => handleChallengeChange(challenge)}
                  />

                  <i className="bi bi-check2"></i>
                  <span>{challenge}</span>
                </label>
              ))}
            </div>
          </div>

          {error && (
            <div className="goals-error" role="alert">
              <i className="bi bi-exclamation-circle"></i>
              {error}
            </div>
          )}

          <footer className="goals-footer">
            <button
              type="button"
              className="goals-back"
              onClick={() => navigate(-1)}
            >
              <i className="bi bi-arrow-left"></i>
              Back
            </button>

            <button type="submit" className="goals-continue" onClick={(e)=>handleSubmit(e)} disabled={loading}>
             {loading?"Loading...": "Continue"}
              <i className="bi bi-arrow-right"></i>
            </button>
          </footer>
        </form>
      </section>

      <aside className="goals-side">
        <div className="goals-side-top">
          <span className="goals-side-label">A HEALTHIER YOU, YOUR WAY</span>

          <div className="goals-art">
            <div className="goals-art-ring goals-ring-one"></div>
            <div className="goals-art-ring goals-ring-two"></div>

            <div className="goals-art-center">
              <i className="bi bi-flower2"></i>
            </div>

            <div className="goals-art-bubble goals-bubble-one">
              <i className="bi bi-heart-pulse"></i>
            </div>

            <div className="goals-art-bubble goals-bubble-two">
              <i className="bi bi-leaf"></i>
            </div>

            <div className="goals-art-bubble goals-bubble-three">
              <i className="bi bi-stars"></i>
            </div>
          </div>

          <h2>
            Small steps.
            <br />
            <span>Meaningful change.</span>
          </h2>

          <p>
            Your goals are unique to you. Build a healthier relationship with
            food, one thoughtful choice at a time.
          </p>
        </div>

        <div className="goals-side-bottom">
          <i className="bi bi-shield-check"></i>
          <span>Your wellness journey, your pace.</span>
        </div>
      </aside>
    </main>
  );
}

export default NutritionGoals;
