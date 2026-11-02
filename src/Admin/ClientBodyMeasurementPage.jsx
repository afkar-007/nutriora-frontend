import '../AdminStyles/ClientBodyMeasurementPage.css'
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function ClientBodyMeasurementPage() {
  const { id } = useParams();

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  

  async function getBodyMeasurements() {
    try {
      const response = await fetch(
        `https://nutriora-backend.onrender.com/details/BodyMeasurementFetch/${id}`
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
      await getBodyMeasurements()
      await adminGateway()
      
    }
    Loader()
  }, [id]);

  if (loading) {
    return (
      <div className="client-body-loading">
        <div className="client-body-spinner"></div>
        <p>Loading body measurements...</p>
      </div>
    );
  }

    function adminGateway() {
  const adminGate = localStorage.getItem("AdminLogin");

  if (adminGate !== "true") {
    navigate("/", { replace: true });
    return false;
  }

  return true;
}

  if (!details) {
    return (
      <div className="client-body-empty">
        <i className="bi bi-clipboard2-pulse"></i>
        <h2>No Body Measurements Found</h2>
        <p>This client has not added their body measurement details yet.</p>

        <Link to={`/nutritionist/clients/${id}`}>
          <i className="bi bi-arrow-left"></i> Back to Dashboard
        </Link>
      </div>
    );
  }

  const height = Number(details?.height);
const weight = Number(details?.currentWeight);

const bmi =
  height > 0 && weight > 0
    ? (weight / (height / 100) ** 2).toFixed(1)
    : null;

// Body Type Calculation
let bodyType = "";

if (bmi !== null) {
  if (Number(bmi) < 18.5) {
    bodyType = "Underweight";
  } else if (Number(bmi) < 25) {
    bodyType = "Normal";
  } else if (Number(bmi) < 30) {
    bodyType = "Overweight";
  } else {
    bodyType = "Obesity";
  }
}

 
  return (
    <div className="client-body-page">
      <div className="client-body-header">
        <div>
          <span>CLIENT INFORMATION</span>
          <h1>Body Measurements</h1>
          <p>Physical measurements and activity information.</p>
        </div>

        <Link to={`/nutritionist/clients/${id}`} className="client-body-back">
          <i className="bi bi-arrow-left"></i> Back
        </Link>
      </div>

      <div className="client-body-card">
        <div className="client-body-profile">
          <div className="client-body-avatar">
            <i className="bi bi-person-arms-up"></i>
          </div>

          <div>
            <h2>Physical Profile</h2>
            <p>Body measurements and lifestyle overview</p>
          </div>
        </div>

        <div className="client-body-divider"></div>

        <div className="client-body-grid">
          <div className="client-body-field">
            <div className="client-body-icon">
              <i className="bi bi-rulers"></i>
            </div>

            <div>
              <span>Height</span>
              <h3>
                {details.height !== undefined && details.height !== ""
                  ? `${details.height} cm`
                  : "Not provided"}
              </h3>
            </div>
          </div>

          <div className="client-body-field">
            <div className="client-body-icon">
              <i className="bi bi-speedometer2"></i>
            </div>

            <div>
              <span>Current Weight</span>
              <h3>
                {details.currentWeight !== undefined &&
                details.currentWeight !== ""
                  ? `${details.currentWeight} kg`
                  : "Not provided"}
              </h3>
            </div>
          </div>

          <div className="client-body-field">
            <div className="client-body-icon">
              <i className="bi bi-bullseye"></i>
            </div>

            <div>
              <span>Target Weight</span>
              <h3>
                {details.targetWeight !== undefined &&
                details.targetWeight !== ""
                  ? `${details.targetWeight} kg`
                  : "Not provided"}
              </h3>
            </div>
          </div>

          <div className="client-body-field">
            <div className="client-body-icon">
              <i className="bi bi-activity"></i>
            </div>

            <div>
              <span>Activity Level</span>
              <h3>{details.activityLevel || "Not provided"}</h3>
            </div>
          </div>

          <div className="client-body-field client-body-field-full">
            <div className="client-body-icon">
              <i className="bi bi-briefcase"></i>
            </div>

            <div>
              <span>Occupation</span>
              <h3>{details.occupation || "Not provided"}</h3>
            </div>
          </div>
        </div>
      </div>
      {bmi !== null && (
  <div className="body-bmi-card">
    <div>
      <span className="body-bmi-label">Your BMI</span>
      <h3>{bmi}</h3>
      <p>Calculated using your current weight and height.</p>
    </div>

    <i className="bi bi-heart-pulse"></i>
    <p>{bodyType}</p>
  </div>
)}
    </div>
  );
}

export default ClientBodyMeasurementPage;