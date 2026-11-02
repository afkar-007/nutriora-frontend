import { useState } from "react";
import "../Styles/bodyMeasurements.css";
import BodyMeasurementPost from "../Services/serBodyMeasurement";
import {  useNavigate } from "react-router-dom";
import { useEffect } from "react";

function BodyMeasurements() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    height: "",
    currentWeight: "",
    targetWeight: "",
    activityLevel: "",
    occupation: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

   useEffect(()=>{
      const BodyMeasurementGateWay= localStorage.getItem("BodyDetails")
      if(BodyMeasurementGateWay==="true"){
        navigate('/NutritionGoals')
      }
  
  
  
    },[])




  async function handleSubmit(e) {
    try {
      setLoading(true);
      e.preventDefault();
      setError("");

      const height = Number(formData.height);
      const currentWeight = Number(formData.currentWeight);
      const targetWeight =
        formData.targetWeight === "" ? null : Number(formData.targetWeight);

      if (!formData.height || height < 50 || height > 260) {
        setError("Enter a valid height between 50 and 260 cm.");
        return;
      }

      if (!formData.currentWeight || currentWeight < 2 || currentWeight > 500) {
        setError("Enter a valid current weight in kg.");
        return;
      }

      if (
        targetWeight !== null &&
        (!Number.isFinite(targetWeight) ||
          targetWeight < 2 ||
          targetWeight > 500)
      ) {
        setError("Enter a valid target weight in kg.");
        return;
      }

      if (!formData.activityLevel) {
        setError("Please select your activity level.");
        return;
      }

      console.log("Body Measurements:", {
        ...formData,
        height,
        currentWeight,
        targetWeight,
      });

      const id = localStorage.getItem("id");

      const data = {
        userId: id,
        height: formData.height,
        currentWeight: formData.currentWeight,
        targetWeight: formData.targetWeight,
        occupation: formData.occupation,
        activityLevel: formData.activityLevel,
      };

      const response = await BodyMeasurementPost(data);

      if(!response.ok){
        alert(response.message)
        return
      }

      if(response.ok){
        localStorage.setItem("BodyDetails",true)
       
        navigate('/NutritionGoals')

      }


    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
    // Next: save the profile and move to Nutrition Goals.
  }

  const bmi =
    formData.height &&
    formData.currentWeight &&
    Number(formData.height) >= 50 &&
    Number(formData.height) <= 260 &&
    Number(formData.currentWeight) > 0
      ? (
          Number(formData.currentWeight) /
        (Number(formData.height) / 100) ** 2
      ).toFixed(1)
      : null;

  return (
    <main className="body-page">
      <section className="body-card">
        <div className="body-header">
          <div className="body-brand">
            <i className="bi bi-flower1"></i>
            <span>Nutriora</span>
          </div>

          <span className="body-step">STEP 02 / 05</span>
        </div>

        <div className="body-progress">
          <div className="body-progress-fill"></div>
        </div>

        <div className="body-intro">
          <span className="body-eyebrow">YOUR PHYSICAL PROFILE</span>

          <h1>Let's understand your body.</h1>

          <p>
            A few measurements help us understand your starting point and
            personalize your wellness journey.
          </p>
        </div>

        <form >
          <div className="body-form-grid">
            <div className="body-field">
              <label htmlFor="height">Height</label>

              <div className="body-input-wrap">
                <i className="bi bi-rulers"></i>

                <input
                  id="height"
                  name="height"
                  type="number"
                  placeholder="e.g. 170"
                  min="50"
                  max="260"
                  step={0.1}
                  value={formData.height}
                  onChange={handleChange}
                />

                <span className="body-unit">cm</span>
              </div>
            </div>

            <div className="body-field">
              <label htmlFor="currentWeight">Current weight</label>

              <div className="body-input-wrap">
                <i className="bi bi-speedometer2"></i>

                <input
                  id="currentWeight"
                  name="currentWeight"
                  type="number"
                  placeholder="e.g. 68"
                  min="2"
                  max="500"
                  step="0.1"
                  value={formData.currentWeight}
                  onChange={handleChange}
                />

                <span className="body-unit">kg</span>
              </div>
            </div>

            <div className="body-field">
              <label htmlFor="targetWeight">
                Target weight <span>(optional)</span>
              </label>

              <div className="body-input-wrap">
                <i className="bi bi-bullseye"></i>

                <input
                  id="targetWeight"
                  name="targetWeight"
                  type="number"
                  placeholder="e.g. 62"
                  min="2"
                  max="500"
                  step="0.1"
                  value={formData.targetWeight}
                  onChange={handleChange}
                />

                <span className="body-unit">kg</span>
              </div>
            </div>

            <div className="body-field">
              <label htmlFor="occupation">
                Occupation <span>(optional)</span>
              </label>

              <div className="body-input-wrap">
                <i className="bi bi-briefcase"></i>

                <input
                  id="occupation"
                  name="occupation"
                  type="text"
                  placeholder="e.g. Software developer"
                  value={formData.occupation}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="body-field body-activity-field">
            <label>How active are you on a typical day?</label>

            <div className="body-activity-options">
              {[
                {
                  value: "sedentary",
                  icon: "bi-cup-hot",
                  title: "Mostly sitting",
                  description: "Desk work, little daily exercise",
                },
                {
                  value: "light",
                  icon: "bi-person-walking",
                  title: "Lightly active",
                  description: "Walking or light exercise",
                },
                {
                  value: "moderate",
                  icon: "bi-bicycle",
                  title: "Moderately active",
                  description: "Regular exercise or active routine",
                },
                {
                  value: "very",
                  icon: "bi-lightning-charge",
                  title: "Very active",
                  description: "Intense exercise or physical work",
                },
              ].map((activity) => (
                <label
                  key={activity.value}
                  className={`body-activity-card ${
                    formData.activityLevel === activity.value ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="activityLevel"
                    value={activity.value}
                    checked={formData.activityLevel === activity.value}
                    onChange={handleChange}
                  />

                  <i className={`bi ${activity.icon}`}></i>

                  <span className="body-activity-text">
                    <strong>{activity.title}</strong>
                    <small>{activity.description}</small>
                  </span>

                  <i className="bi bi-check-circle-fill body-check"></i>
                </label>
              ))}
            </div>
          </div>

          {bmi && (
            <div className="body-bmi-preview">
              <div>
                <span className="body-bmi-label">YOUR BMI ESTIMATE</span>
                <p>For reference only, not a diagnosis.</p>
              </div>

              <strong>{bmi}</strong>
            </div>
          )}

          {error && (
            <div className="body-error" role="alert">
              <i className="bi bi-exclamation-circle"></i>
              {error}
            </div>
          )}

          <div className="body-footer">
            <button
              type="button"
              className="body-back"
              onClick={() => window.history.back()}
            >
              <i className="bi bi-arrow-left"></i>
              Back
            </button>

            <button type="submit" className="body-continue" disabled={loading} onClick={(e)=>handleSubmit(e)}>

             {loading?"Loading...": "Continue"}
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        </form>
      </section>

      <aside className="body-side">
        <div className="body-side-art">
          <div className="body-orbit body-orbit-one"></div>
          <div className="body-orbit body-orbit-two"></div>

          <div className="body-art-icon">
            <i className="bi bi-heart-pulse"></i>
          </div>

          <span className="body-art-dot body-dot-one"></span>
          <span className="body-art-dot body-dot-two"></span>
          <span className="body-art-dot body-dot-three"></span>
        </div>

        <div className="body-side-content">
          <span>EVERY BODY IS DIFFERENT</span>

          <h2>
            Progress is
            <br />
            personal.
            <br />
            <em>So is your plan.</em>
          </h2>

          <p>
            We focus on your individual needs, everyday habits, and sustainable
            progress — not unrealistic standards.
          </p>
        </div>

        <div className="body-side-bottom">
          <i className="bi bi-flower1"></i>
          <span>Mindful nutrition. Meaningful living.</span>
        </div>
      </aside>
    </main>
  );
}

export default BodyMeasurements;
