
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../AdminStyles/ClientDietPlanPage.css'

function ClientDietPlanPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dietPlan, setDietPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function Loader() {
      await getDietPlan();
      await adminGateway()

    }
    Loader()
    
  }, [id]);

  console.log(id);

    function adminGateway() {
  const adminGate = localStorage.getItem("AdminLogin");

  if (adminGate !== "true") {
    navigate("/", { replace: true });
    return false;
  }

  return true;
}
  

  async function getDietPlan() {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://nutriora-backend.onrender.com/dietPlan/getOneClientPlan/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to fetch diet plan");
      }

      setDietPlan(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="client-plan-message">Loading diet plan...</div>;
  }

  if (error) {
    return <div className="client-plan-message">{error}</div>;
  }

  if (!dietPlan) {
    return (
      <div className="client-plan-message">
        <h3>No Diet Plan Found</h3>
        <p>This client does not have an assigned diet plan yet.</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="client-plan-page">
      <button
        className="client-plan-back"
        onClick={() => navigate(-1)}
      >
        <i className="bi bi-arrow-left"></i> Back
      </button>

      <div className="client-plan-header">
        <span>CLIENT NUTRITION</span>
        <h1>{dietPlan.title}</h1>
        <p>
          {String(dietPlan.startDate).slice(0, 10)} —{" "}
          {String(dietPlan.endDate).slice(0, 10)}
        </p>
      </div>

      <div className="client-plan-days">
        {dietPlan.days?.map((day, index) => (
          <div className="client-plan-day" key={day._id || index}>
            <h3>Day {day.day || index + 1}</h3>

            {[
              ["Early Morning", "EarlyMorning"],
              ["Morning", "Morning"],
              ["Mid Morning", "MidMorning"],
              ["Lunch", "Lunch"],
              ["Evening", "Evening"],
              ["Dinner", "Dinner"],
            ].map(([label, field]) => (
              <div className="client-plan-meal" key={field}>
                <span>{label}</span>
                <p>{day[field] || "Not added"}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClientDietPlanPage;
