import React, { useState } from "react";
import "../AdminStyles/Secret.css"
import { useNavigate } from "react-router-dom";


function Secret() {
    const navigate = useNavigate()
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");

  // Temporary password
  const secretPassword = "boomer";

  function handleSubmit(e) {
    e.preventDefault();

    if (password === secretPassword) {
      navigate('/personal')
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  }



  return (
    <>
    <button
  className="secret-back-btn"
  onClick={() => navigate("/nutritionist")}
>
  <i className="bi bi-arrow-left"></i>
  Back
</button>
    
    
    <div className="secret-page">
        


      <div className="secret-card">

        <div className="secret-icon">
          <i className="bi bi-shield-lock"></i>
        </div>

        <h2>Protected Access</h2>

        <p>
          This page is protected. Enter your password
          to continue.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="secret-input-group">
            <i className="bi bi-lock"></i>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="secret-error">{error}</p>
          )}

          <button type="submit" className="secret-submit">
            Unlock Access
            <i className="bi bi-arrow-right"></i>
          </button>

        </form>

        <div className="secret-footer">
          <i className="bi bi-shield-check"></i>
          Secure Access
        </div>

      </div>
    </div>
    </>
  );
}

export default Secret;