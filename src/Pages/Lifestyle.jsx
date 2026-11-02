import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/lifestyle.css";
import LifeStylePost from "../Services/serLifeStyle";
import { useEffect } from "react";

function Lifestyle() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profileChange, setProfileChange] = useState(true);

  const [formData, setFormData] = useState({
    sleepHours: "",
    sleepQuality: "",
    waterIntake: "",
    exerciseFrequency: "",
    exerciseType: [],
    activityLevel: "",
    stressLevel: "",
    medicalConditions: [],
    medications: "",
    digestiveIssues: "",
    smokingAlcohol: "",
    additionalNotes: "",
    eatingRoutine:""
  });

  // useEffect(() => {
  //   const ClientHomeGateWay = localStorage.getItem("ClientHome");
  //   if (ClientHomeGateWay === "true") {
  //     navigate("/clientHome");
  //   }
  // }, []);

  const [error, setError] = useState("");

  const sleepOptions = [
    { value: "less-than-5", label: "Less than 5 hours" },
    { value: "5-6", label: "5–6 hours" },
    { value: "7-8", label: "7–8 hours" },
    { value: "more-than-8", label: "More than 8 hours" },
  ];

  const waterOptions = [
    { value: "less-than-1", label: "Less than 1 L" },
    { value: "1-2", label: "1–2 L" },
    { value: "2-3", label: "2–3 L" },
    { value: "more-than-3", label: "More than 3 L" },
  ];

  const exerciseOptions = [
    "Walking",
    "Gym / Strength training",
    "Yoga",
    "Running / Cycling",
    "Sports",
    "No regular exercise",
  ];

  const conditionOptions = [
    "Diabetes",
    "Thyroid condition",
    "High blood pressure",
    "PCOS / PCOD",
    "High cholesterol",
    "Other",
    "No known conditions",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleMultiSelect = (field, value) => {
    setFormData((prev) => {
      const currentValues = prev[field];

      if (field === "medicalConditions") {
        if (value === "No known conditions") {
          return {
            ...prev,
            [field]: currentValues.includes(value) ? [] : [value],
          };
        }

        const withoutNone = currentValues.filter(
          (item) => item !== "No known conditions",
        );

        return {
          ...prev,
          [field]: withoutNone.includes(value)
            ? withoutNone.filter((item) => item !== value)
            : [...withoutNone, value],
        };
      }

      return {
        ...prev,
        [field]: currentValues.includes(value)
          ? currentValues.filter((item) => item !== value)
          : [...currentValues, value],
      };
    });

    setError("");
  };

  const id = localStorage.getItem("id");

  async function profileComplete() {
    const data = {
      profileCompleted: profileChange,
    };

    const response = await fetch(
      `https://nutriora-backend.onrender.com/user/changeProfile/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    const getData = await response.json();
    if (!response.ok) {
      alert(getData.message);
      console.log();
      
      return
    }

    if (response.ok) {
      // alert(getData.message);
    }
  }

  async function handleSubmit(e) {
    try {
      setLoading(true);

      e.preventDefault();

      if (
        formData.sleepHours === "" ||
        formData.waterIntake === "" ||
        formData.exerciseFrequency === "" ||
        formData.stressLevel === "" ||
        formData.sleepQuality === "" ||
        formData.activityLevel === "" ||
        formData.smokingAlcohol === "" 
      ) {
        setError("Please complete all required fields before continuing.");
        return;
      }

      if(formData.eatingRoutine===""){
        return setError("Please Enter Eating Routine")
      }

      console.log("Lifestyle & Health Background:", formData);
      const id = localStorage.getItem("id");

      const data = {
        userId: id,
        sleepHours: formData.sleepHours,
        sleepQuality: formData.sleepQuality,
        waterIntake: formData.waterIntake,
        exerciseFrequency: formData.exerciseFrequency,
        medications: formData.medications,
        exerciseType: formData.exerciseType,
        activityLevel: formData.activityLevel,
        stressLevel: formData.stressLevel,
        medicalConditions: formData.medicalConditions,
        digestiveIssues: formData.digestiveIssues,
        smokingAlcohol: formData.smokingAlcohol,
        additionalNotes: formData.additionalNotes,
        eatingRoutine:formData.eatingRoutine
      };

      console.log(data);

      const response = await LifeStylePost(data);

      if (!response.ok) {
        setError(response.message);
        return;
      }

      if (response.ok) {
        profileComplete()

        //  alert(response.message);
        localStorage.setItem("ClientHome", true);
        navigate("/clientHome");
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="lifestyle-page">
      <section className="lifestyle-form-side">
        <div className="lifestyle-form-wrapper">
          <header className="lifestyle-header">
            <button
              type="button"
              className="lifestyle-brand"
              aria-label="Go to Nutriora home"
            >
              <span className="lifestyle-brand-icon">
                <i className="bi bi-flower1"></i>
              </span>
              <span>nutriora</span>
            </button>

            <span className="lifestyle-step">STEP 05 OF 05 </span>
          </header>

          <div className="lifestyle-progress">
            <span></span>
          </div>

          <div className="lifestyle-intro">
            <span className="lifestyle-eyebrow">YOUR WELLNESS, YOUR WAY</span>

            <h1>
              Let's understand your <em>lifestyle.</em>
            </h1>

            <p>
              Your daily habits help us understand the bigger picture. Share
              what you're comfortable with so we can personalize your nutrition
              journey.
            </p>
          </div>

          <form className="lifestyle-form">
            {/* Sleep duration */}
            <section className="lifestyle-section">
              <div className="lifestyle-section-heading">
                <span className="lifestyle-section-icon">
                  <i className="bi bi-moon-stars"></i>
                </span>

                <div>
                  <h2>Sleep & recovery</h2>
                  <p>How much rest do you usually get?</p>
                </div>
              </div>

              <label className="lifestyle-label">
                Average sleep per night <span>*</span>
              </label>

              <div className="lifestyle-option-grid">
                {sleepOptions.map((option) => (
                  <label
                    className={`lifestyle-choice ${
                      formData.sleepHours === option.value ? "selected" : ""
                    }`}
                    key={option.value}
                  >
                    <input
                      type="radio"
                      name="sleepHours"
                      value={option.value}
                      checked={formData.sleepHours === option.value}
                      onChange={handleChange}
                    />
                    <span className="lifestyle-radio"></span>
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>

              <label
                className="lifestyle-label lifestyle-top-spacing"
                htmlFor="sleepQuality"
              >
                How would you describe your sleep quality?
              </label>

              <select
                id="sleepQuality"
                name="sleepQuality"
                value={formData.sleepQuality}
                onChange={handleChange}
                className="lifestyle-input"
              >
                <option value="">Select sleep quality</option>
                <option value="excellent">Excellent — refreshed</option>
                <option value="good">Good — mostly rested</option>
                <option value="average">Average — sometimes tired</option>
                <option value="poor">Poor — often tired</option>
              </select>
            </section>

            {/* Hydration */}
            <section className="lifestyle-section">
              <div className="lifestyle-section-heading">
                <span className="lifestyle-section-icon">
                  <i className="bi bi-droplet"></i>
                </span>

                <div>
                  <h2>Hydration</h2>
                  <p>How much water do you drink daily?</p>
                </div>
              </div>

              <label className="lifestyle-label">
                Daily water intake <span>*</span>
              </label>

              <div className="lifestyle-option-grid">
                {waterOptions.map((option) => (
                  <label
                    className={`lifestyle-choice ${
                      formData.waterIntake === option.value ? "selected" : ""
                    }`}
                    key={option.value}
                  >
                    <input
                      type="radio"
                      name="waterIntake"
                      value={option.value}
                      checked={formData.waterIntake === option.value}
                      onChange={handleChange}
                    />
                    <span className="lifestyle-radio"></span>
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* Exercise */}
            <section className="lifestyle-section">
              <div className="lifestyle-section-heading">
                <span className="lifestyle-section-icon">
                  <i className="bi bi-activity"></i>
                </span>

                <div>
                  <h2>Movement & exercise</h2>
                  <p>Tell us about your physical activity.</p>
                </div>
              </div>

              <label className="lifestyle-label">
                How often do you exercise? <span>*</span>
              </label>

              <div className="lifestyle-option-grid">
                {[
                  { value: "never", label: "Rarely / Never" },
                  { value: "1-2", label: "1–2 days / week" },
                  { value: "3-4", label: "3–4 days / week" },
                  { value: "5-plus", label: "5+ days / week" },
                ].map((option) => (
                  <label
                    className={`lifestyle-choice ${
                      formData.exerciseFrequency === option.value
                        ? "selected"
                        : ""
                    }`}
                    key={option.value}
                  >
                    <input
                      type="radio"
                      name="exerciseFrequency"
                      value={option.value}
                      checked={formData.exerciseFrequency === option.value}
                      onChange={handleChange}
                    />
                    <span className="lifestyle-radio"></span>
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>

              <label className="lifestyle-label lifestyle-top-spacing">
                Activities you usually do
              </label>

              <div className="lifestyle-chip-group">
                {exerciseOptions.map((activity) => (
                  <button
                    type="button"
                    key={activity}
                    className={`lifestyle-chip ${
                      formData.exerciseType.includes(activity) ? "active" : ""
                    }`}
                    onClick={() => handleMultiSelect("exerciseType", activity)}
                  >
                    {formData.exerciseType.includes(activity) && (
                      <i className="bi bi-check2"></i>
                    )}
                    {activity}
                  </button>
                ))}
              </div>
            </section>

            {/* Stress */}
            <section className="lifestyle-section">
              <div className="lifestyle-section-heading">
                <span className="lifestyle-section-icon">
                  <i className="bi bi-heart-pulse"></i>
                </span>

                <div>
                  <h2>Stress & daily routine</h2>
                  <p>Understand your everyday wellbeing.</p>
                </div>
              </div>

              <label className="lifestyle-label">
                How would you rate your current stress level? <span>*</span>
              </label>

              <div className="lifestyle-stress-grid">
                {[
                  { value: "low", label: "Low", icon: "bi-emoji-smile" },
                  {
                    value: "moderate",
                    label: "Moderate",
                    icon: "bi-emoji-neutral",
                  },
                  {
                    value: "high",
                    label: "High",
                    icon: "bi-emoji-frown",
                  },
                ].map((option) => (
                  <button
                    type="button"
                    key={option.value}
                    className={`lifestyle-stress-card ${
                      formData.stressLevel === option.value ? "active" : ""
                    }`}
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        stressLevel: option.value,
                      }));
                      setError("");
                    }}
                  >
                    <i className={`bi ${option.icon}`}></i>
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>

              <label
                className="lifestyle-label lifestyle-top-spacing"
                htmlFor="activityLevel"
              >
                What best describes your usual day?
              </label>

              <select
                id="activityLevel"
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleChange}
                className="lifestyle-input"
              >
                <option value="">Select daily routine</option>
                <option value="mostly-sitting">
                  Mostly sitting — desk / study
                </option>
                <option value="lightly-active">
                  Light movement throughout the day
                </option>
                <option value="moderately-active">
                  Regular walking and movement
                </option>
                <option value="physically-demanding">
                  Physically demanding work
                </option>
              </select>
            </section>

            {/* Medical background */}
            <section className="lifestyle-section">
              <div className="lifestyle-section-heading">
                <span className="lifestyle-section-icon">
                  <i className="bi bi-clipboard2-pulse"></i>
                </span>

                <div>
                  <h2>Health background</h2>
                  <p>
                    Optional information to help your nutritionist personalize
                    recommendations.
                  </p>
                </div>
              </div>

              <label className="lifestyle-label">
                Do you have any existing health conditions?
              </label>

              <div className="lifestyle-chip-group">
                {conditionOptions.map((condition) => (
                  <button
                    type="button"
                    key={condition}
                    className={`lifestyle-chip ${
                      formData.medicalConditions.includes(condition)
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      handleMultiSelect("medicalConditions", condition)
                    }
                  >
                    {formData.medicalConditions.includes(condition) && (
                      <i className="bi bi-check2"></i>
                    )}
                    {condition}
                  </button>
                ))}
              </div>

              <label
                className="lifestyle-label lifestyle-top-spacing"
                htmlFor="medications"
              >
                Current medications or supplements
              </label>

              <textarea
                id="medications"
                name="medications"
                value={formData.medications}
                onChange={handleChange}
                className="lifestyle-textarea"
                placeholder="share any relevant details..."
                rows="3"
              />

              <label
                className="lifestyle-label lifestyle-top-spacing"
                htmlFor="digestiveIssues"
              >
                Any digestive concerns?
              </label>

              <textarea
                id="digestiveIssues"
                name="digestiveIssues"
                value={formData.digestiveIssues}
                onChange={handleChange}
                className="lifestyle-textarea"
                placeholder="For example, bloating or irregular digestion..."
                rows="3"
              />

              <label className="lifestyle-label lifestyle-top-spacing">
                Smoking or alcohol habits
              </label>

              <div className="lifestyle-option-grid">
                {[
                  { value: "neither", label: "Neither" },
                  { value: "occasional", label: "Occasionally" },
                  { value: "regular", label: "Regularly" },
                  { value: "prefer-not-to-say", label: "Prefer not to say" },
                ].map((option) => (
                  <label
                    className={`lifestyle-choice ${
                      formData.smokingAlcohol === option.value ? "selected" : ""
                    }`}
                    key={option.value}
                  >
                    <input
                      type="radio"
                      name="smokingAlcohol"
                      value={option.value}
                      checked={formData.smokingAlcohol === option.value}
                      onChange={handleChange}
                    />
                    <span className="lifestyle-radio"></span>
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>

              <label
                className="lifestyle-label lifestyle-top-spacing"
                htmlFor="additionalNotes"
              >
                Anything else we should know?
              </label>

              <textarea
                id="additionalNotes"
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                className="lifestyle-textarea"
                placeholder="Share any lifestyle details or goals you'd like your nutritionist to understand..."
                rows="4"
              />

               <label
                className="lifestyle-label lifestyle-top-spacing"
                htmlFor="eatingRoutine"
              >
                Tell About Your Eating Routine
              </label>
                
                 <textarea
                id="eatingRoutine"
                name="eatingRoutine"
                value={formData.eatingRoutine}
                onChange={handleChange}
                className="lifestyle-textarea"
                placeholder="Tell About your eating Routine"
                rows="4"
              />


            </section>

            {error && (
              <div className="lifestyle-error" role="alert">
                <i className="bi bi-exclamation-circle"></i>
                {error}
              </div>
            )}

            <div className="lifestyle-privacy-note">
              <i className="bi bi-shield-check"></i>
              <p>
                Your health information should be kept private and shared only
                with authorized care professionals.
              </p>
            </div>

            <div className="lifestyle-actions">
              {/* <button
                type="button"
                className="lifestyle-back-button"
                onClick={() => navigate("/food-preferences")}
              >
                <i className="bi bi-arrow-left"></i>
                Back
              </button> */}

              <button
                type="submit"
                className="lifestyle-continue-button"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                {loading ? "Loading..." : "Continue"}
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>

            <p className="lifestyle-footer">
              Take your time. Your wellness journey starts with understanding.
            </p>
          </form>
        </div>
      </section>

      <aside className="lifestyle-visual">
        <div className="lifestyle-visual-decoration decoration-one"></div>
        <div className="lifestyle-visual-decoration decoration-two"></div>

        <div className="lifestyle-visual-content">
          <span className="lifestyle-visual-kicker">BEYOND THE PLATE</span>

          <div className="lifestyle-orbit">
            <div className="lifestyle-orbit-ring"></div>
            <div className="lifestyle-orbit-inner">
              <i className="bi bi-sunrise"></i>
            </div>

            <span className="lifestyle-orbit-icon orbit-sleep">
              <i className="bi bi-moon-stars"></i>
            </span>
            <span className="lifestyle-orbit-icon orbit-water">
              <i className="bi bi-droplet"></i>
            </span>
            <span className="lifestyle-orbit-icon orbit-move">
              <i className="bi bi-activity"></i>
            </span>
            <span className="lifestyle-orbit-icon orbit-heart">
              <i className="bi bi-heart"></i>
            </span>
          </div>

          <h2>
            Small habits.
            <br />
            <em>Lasting change.</em>
          </h2>

          <p>
            Nutrition is one piece of your wellbeing. Sleep, movement, hydration
            and stress all shape your everyday experience.
          </p>

          <div className="lifestyle-quote">
            <span>“</span>
            <p>
              A healthier life isn't built in a day. It's built by the little
              things you do every day.
            </p>
          </div>

          <div className="lifestyle-visual-bottom">
            <span>PERSONALIZED NUTRITION</span>
            <span>EST. IN BALANCE</span>
          </div>
        </div>
      </aside>
    </main>
  );
}

export default Lifestyle;
