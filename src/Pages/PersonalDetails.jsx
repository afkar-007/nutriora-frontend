import { useState } from "react";
import "../Styles/PersonalDetails.css";
import postPersonalDetails from "../Services/SerPersonalDetails";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function PersonalDetails() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    phone: "",
    gender: "",
    city: "",
  });

  useEffect(() => {
    const personalDetailsGateWay = localStorage.getItem("personalDetails");
    if (personalDetailsGateWay === "true") {
      navigate("/BodyMeasurements");
    }
  }, []);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    try {
      setLoading(true);
      e.preventDefault();
      setError("");

      if (!formData.fullName.trim()) {
        setError("Please enter your full name.");
        return;
      }
      if (formData.fullName.length < 3) {
        setError("Please enter a meaningful name.");
        return;
      }

      if (!formData.dateOfBirth) {
        setError("Please select your date of birth.");
        return;
      }

      if (new Date(formData.dateOfBirth) >= new Date()) {
        setError("Please enter a valid date of birth.");
        return;
      }

      if (!formData.phone.trim()) {
        setError("Please enter your phone number.");
        return;
      }

      if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
        setError("Enter a valid 10-digit phone number.");
        return;
      }

      console.log("Personal Information:", formData);
      const id = localStorage.getItem("id");

      const details = {
        userId: id,
        fullname: formData.fullName,
        dateOfBirth: formData.dateOfBirth,
        phoneNumber: formData.phone,
        gender: formData.gender,
        city: formData.city,
      };

      const response = await postPersonalDetails(details);
      if (!response.ok) {
        alert(response.message);
        return;
      }

      if (response.ok) {
        localStorage.setItem("personalDetails", true);
        navigate("/BodyMeasurements");
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="personal-page">
      <section className="personal-card">
        <div className="personal-heading">
          <div className="personal-brand">
            <i className="bi bi-flower1"></i>
            <span>Nutriora</span>
          </div>

          <span className="personal-step">STEP 01 / 05</span>
        </div>

        <div className="personal-progress">
          <div className="personal-progress-fill"></div>
        </div>

        <div className="personal-intro">
          <span className="personal-eyebrow">YOUR WELLNESS JOURNEY</span>

          <h1>Let's get to know you.</h1>

          <p>
            Tell us a little about yourself so we can personalize your nutrition
            experience.
          </p>
        </div>

        <form>
          <div className="personal-form-grid">
            <div className="personal-field full-width">
              <label htmlFor="fullName">Full name</label>

              <div className="personal-input-wrap">
                <i className="bi bi-person"></i>

                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </div>
            </div>

            <div className="personal-field">
              <label htmlFor="dateOfBirth">Date of birth</label>

              <div className="personal-input-wrap">
                <i className="bi bi-calendar3"></i>

                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="personal-field">
              <label htmlFor="phone">Phone number</label>

              <div className="personal-input-wrap">
                <i className="bi bi-telephone"></i>

                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="10-digit mobile number"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={10}
                  inputMode="numeric"
                />
              </div>
            </div>

            <div className="personal-field">
              <label htmlFor="gender">Gender (optional)</label>

              <div className="personal-input-wrap">
                <i className="bi bi-person-badge"></i>

                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <div className="personal-field">
              <label htmlFor="city">City (optional)</label>

              <div className="personal-input-wrap">
                <i className="bi bi-geo-alt"></i>

                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="Your city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="personal-error" role="alert">
              <i className="bi bi-exclamation-circle"></i>
              {error}
            </div>
          )}

          <div className="personal-footer">
            <p>
              <i className="bi bi-shield-lock"></i>
              Your information is kept private.
            </p>

            <button
              type="submit"
              className="personal-continue"
              onClick={(e) => handleSubmit(e)}
              disabled={loading}
            >
              {loading ? "Loading..." : "Continue"}
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        </form>
      </section>

      <aside className="personal-side">
        <div className="personal-side-content">
          <span>SMALL STEPS. LASTING CHANGE.</span>

          <h2>
            A healthier you
            <br />
            starts with
            <br />
            <em>understanding you.</em>
          </h2>

          <p>
            Your journey is unique. Let's build a nutrition experience that
            feels right for you.
          </p>
        </div>

        <div className="personal-side-bottom">
          <i className="bi bi-flower1"></i>
          <span>Mindful nutrition. Meaningful living.</span>
        </div>
      </aside>
    </main>
  );
}

export default PersonalDetails;
