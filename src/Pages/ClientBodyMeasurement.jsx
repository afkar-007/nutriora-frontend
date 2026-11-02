import { useEffect, useState } from "react";
import LoadingGif from "../assets/LoadingNutoria.gif";
import "../Styles/ClientBodyMeasurement.css";
import { useNavigate } from "react-router-dom";

function ClientBodyMeasurements() {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [showBodyType, setShowBodyType] = useState("");

  useEffect(() => {
    async function Loader() {
      await fetchBodyMeasurements();
      await checkbodytype()
    }
    Loader()
    
  }, []);

  async function fetchBodyMeasurements() {
    try {
      setLoading(true);
      setError("");

      const id = localStorage.getItem("id");
      const token = localStorage.getItem("token");

      if (!id) {
        setError("Please login to view your details.");
        return;
      }

      const response = await fetch(
        `https://nutriora-backend.onrender.com/details/BodyMeasurementFetch/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch body measurements.");
      }

      if (!result.data) {
        setDetails(null);
        return;
      }

      setDetails(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const height = Number(details?.height);
  const weight = Number(details?.currentWeight);

  const bmi =
    height > 0 && weight > 0 ? (weight / (height / 100) ** 2).toFixed(1) : null;

  if (loading) {
    return (
      <div className="body-profile-status">
        <img
          src={LoadingGif}
          alt="Loading..."
          className="profile-loading-gif"
        />
        <h3>Loading body measurements</h3>
        <p>Preparing your wellness details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="body-profile-status">
        <h3>Unable to load details</h3>
        <p>{error}</p>
        <button onClick={fetchBodyMeasurements}>Try Again</button>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="body-profile-status">
        <i className="bi bi-rulers"></i>
        <h3>No body measurement details found</h3>
        <p>
          Complete your body measurements form to see your information here.
        </p>
      </div>
    );
  }


  

  const measurements = [
    {
      label: "Height",
      value: details.height ? `${details.height} cm` : "Not provided",
      icon: "bi-rulers",
    },
    {
      label: "Current Weight",
      value: details.currentWeight
        ? `${details.currentWeight} kg`
        : "Not provided",
      icon: "bi-person-standing",
    },
    {
      label: "Target Weight",
      value:
        details.targetWeight !== null &&
        details.targetWeight !== undefined &&
        details.targetWeight !== ""
          ? `${details.targetWeight} kg`
          : "Not provided",
      icon: "bi-bullseye",
    },
    {
      label: "Activity Level",
      value: details.activityLevel || "Not provided",
      icon: "bi-activity",
    },
    {
      label: "Occupation",
      value: details.occupation || "Not provided",
      icon: "bi-briefcase",
    },
  ];

// if (bmi == null || !Number.isFinite(Number(bmi))) {
//   setShowBodyType("");
// } else if (bmi < 18.5) {
//   setShowBodyType("under weight");
// } else if (bmi < 25) {
//   setShowBodyType("normal");
// } else if (bmi < 30) {
//   setShowBodyType("over weight");
// } else {
//   setShowBodyType("obesity");
// }


async function checkbodytype() {
  

  if (bmi == null || !Number.isFinite(Number(bmi))) {
    setShowBodyType("");
  } else if (Number(bmi) < 18.5) {
    setShowBodyType("Under weight");
  } else if (Number(bmi) < 25) {
    setShowBodyType("Normal");
  } else if (Number(bmi) < 30) {
    setShowBodyType("Overweight");
  } else {
    setShowBodyType("Obesity");
  }
}

  return (
    <section className="body-profile">
      <div className="body-profile-heading">
        <div>
          <span className="body-profile-eyebrow">YOUR WELLNESS PROFILE</span>
          <h2>Body Measurements</h2>
          <p>Your physical measurements and daily activity information.</p>
        </div>

        <span className="body-profile-icon">
          <i className="bi bi-rulers"></i>
        </span>
      </div>
      <button
        type="button"
        className="body-back-home"
        onClick={() => navigate("/client/profile")}
      >
        <i className="bi bi-arrow-left"></i>
        <span>Back to Home</span>
      </button>

      {bmi && (
  <div className="body-bmi-card">
    <div>
      <span className="body-bmi-label">Your BMI</span>
      <h3>{bmi}</h3>
      <p>Calculated using your current weight and height.</p>
      
    </div>
    <i className="bi bi-heart-pulse"></i>
  </div>
)}

      <div className="body-measurement-grid">
        {measurements.map((item) => (
          <div className="body-measurement-card" key={item.label}>
            <div className="body-measurement-icon">
              <i className={`bi ${item.icon}`}></i>
            </div>

            <div>
              <span className="body-measurement-label">{item.label}</span>
              <h3>{item.value}</h3>
              
            </div>
           
          </div>
        ))}
      </div>
      <div className="body-measurement-card" >
       <div>
              <span className="body-measurement-label">body type</span>
             <p>{showBodyType}</p>
              
            </div>
            </div> 
       
    </section>
  );
}

export default ClientBodyMeasurements;
