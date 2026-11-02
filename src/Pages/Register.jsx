import { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Register.css";
import register from "../Services/Register";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);
  const emailPattern = /^[^\s@]+@gmail\.com$/;
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const gateway = localStorage.getItem("userLoggedIn");
  //   if (gateway === "true") {
  //     navigate("/personalDetails");
  //   }
  // }, []);

  async function registering(e) {
    try {
      setLoading(true);
      e.preventDefault();

      if (!name.trim(" ")) {
        setError("Name field is Empty");
        return;
      }
      if (!email.trim(" ")) {
        setError("Email field is Empty");
        return;
      }

      if (!emailPattern.test(email)) {
        setError("Enter a valid Email");
        return;
      }

      if (!password.trim(" ")) {
        setError("password field is Empty");
        return;
      }

      if (password.length < 4) {
        setError("Password must contain at least 4 characters.");
        return;
      }
      if (!confirmPassword.trim(" ")) {
        setError("Confirm Password field is Empty");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      setError(null);

      const response = await register(name, email, confirmPassword);

      if (!response.ok) {
        setError(response.message);
        console.log("error");

        return;
      }

      if (response.ok) {
        navigate("/login");
        alert(response.message);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        localStorage.removeItem("userLoggedIn");
        localStorage.removeItem("personalDetails");
        localStorage.removeItem("NutritionGoals");
        localStorage.removeItem("ClientHome");
        localStorage.removeItem("foodHabits");
        localStorage.removeItem("BodyDetails");
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page register-page">
      {/* BRAND SECTION */}
      <section className="register-brand">
        <Link to="/" className="auth-logo">
          <span className="logo-icon">N</span>
          Nutriora
        </Link>

        <div className="brand-content">
          <span className="brand-label">A HEALTHIER YOU STARTS HERE</span>

          <h1>
            Your wellness.
            <br />
            <span>Your way.</span>
          </h1>

          <p>
            Build a healthier relationship with food. Discover personalized
            nutrition guidance designed around your lifestyle and goals.
          </p>

          <div className="register-brand-note">
            <i className="bi bi-flower1"></i>
            <span>Small steps. Meaningful change.</span>
          </div>
        </div>

        <p className="brand-footer">Wellness, made personal.</p>
      </section>

      {/* REGISTER FORM */}
      <section className="auth-form-section register-form-section">
        <div className="auth-form-container register-form-container">
          <Link to="/" className="mobile-logo">
            <span className="logo-icon">N</span>
            Nutriora
          </Link>

          <div className="auth-heading register-heading">
            <span className="auth-eyebrow">START YOUR JOURNEY</span>

            <h2>Create your account</h2>

            <p>
              Join Nutriora and take the first step toward mindful, personalized
              nutrition.
            </p>
          </div>

          <form className="auth-form register-form">
            {/* FULL NAME */}
            <div className="form-group">
              <label htmlFor="fullName">Full name</label>

              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                minLength={2}
                required
              />
            </div>

            {/* EMAIL */}
            <div className="form-group">
              <label htmlFor="register-email">Email address</label>

              <input
                type="email"
                id="register-email"
                name="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <div className="password-label">
                <label htmlFor="register-password">Password</label>

                <span className="password-hint">Min. 4 characters</span>
              </div>

              <div className="register-password-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  id="register-password"
                  name="password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  maxLength={20}
                  required
                />

                <button
                  type="button"
                  className="text-button password-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <i
                    className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                  ></i>
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm password</label>

              <div className="register-password-wrap">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                  maxLength={20}
                />

                <button
                  type="button"
                  className="text-button password-toggle"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  <i
                    className={`bi ${
                      showConfirmPassword ? "bi-eye-slash" : "bi-eye"
                    }`}
                  ></i>
                </button>
              </div>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="register-error" role="alert">
                <i className="bi bi-exclamation-circle"></i>
                {error}
              </div>
            )}

            {/* TERMS */}
            <label className="register-terms">
              <input type="checkbox" required />

              <span>
                I agree to the <Link to="/terms">Terms of Service</Link> and{" "}
                <Link to="/privacy">Privacy Policy</Link>.
              </span>
            </label>

            {/* SUBMIT */}
            <button
              type="submit"
              className="register-submit"
              disabled={loading}
              onClick={(e) => registering(e)}
            >
              {loading ? "Registering" : "Create account"}
              <i className="bi bi-arrow-right"></i>
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>

          <p className="auth-legal register-legal">
            Your journey to better wellbeing begins with a single step.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Register;
