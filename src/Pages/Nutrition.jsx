import { useEffect, useState } from "react";
import "../Styles/Nutrition.css";
import { useNavigate } from "react-router-dom";
import LoadingGif from "../assets/LoadingNutoria.gif";

function Nutrition() {
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);


  const [updateId, setUpdateId] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    async function Loader() {
      await getDietPlan();
      await returnedToHome()
      
    }
    Loader()
  }, []);

   async function returnedToHome() {

     const login = localStorage.getItem("homePage");
    if (login !== "true") {
      navigate("/", { replace: true });
      

      return;
    }
    

    
  }



  async function getDietPlan() {
    try {
      const clientId = localStorage.getItem("id");
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://nutriora-backend.onrender.com/dietPlan/getClientPlan/${clientId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();
      

      if (!response.ok) {
        throw new Error(data.message || "Failed to load diet plan");
      }

      // Backend array return pannina, first object mattum edukkum
      // const dietPlan = Array.isArray(data) ? data[0] : data.plan || data;

      // setPlan(dietPlan || null);
      setPlan(data.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function ChangeIsCompleted(id) {
    try {
      setUpdateLoading(true);
      const data = {
        status: "Completed",
      };
      const response = await fetch(
        `https://nutriora-backend.onrender.com/dietPlan/updateComplete/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const getData = await response.json();

      if (response.ok) {
        setUpdateId(null);
        setShowConfirm(false);
        getDietPlan();
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setUpdateLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="client-profile-status">
        <img
          src={LoadingGif}
          alt="Loading..."
          className="profile-loading-gif"
        />

        <h3>Loading your diet plan...</h3>
      </div>
    );
  }

  if (!plan) {
    return (
      <>
        <button
          type="button"
          className="nutrition-back-btn"
          onClick={() => navigate("/clientHome")}
        >
          <i className="bi bi-arrow-left"></i>
          <span>Back</span>
        </button>

        <div className="client-home-empty">
          <i className="bi bi-calendar2-heart"></i>
          <h2>No Diet Plan Yet</h2>
          <p>Your nutritionist has not shared a diet plan yet.</p>
        </div>
      </>
    );
  }

  const day = plan.days?.[selectedDay];

  return (
    <>
      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-modal">
            <div className="confirm-icon">
              <i className="bi bi-check2-circle"></i>
            </div>

            <h3>Confirm Completion</h3>

            <p>Are you sure you want to mark this as completed?</p>

            <div className="confirm-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>

              <button
                className="confirm-btn"
                disabled={updateLoading}
                onClick={() => ChangeIsCompleted(updateId)}
              >
                <i className="bi bi-check-lg"></i>
                {updateLoading ? "Updating..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="client-home-page">
        <button
          type="button"
          className="nutrition-back-btn"
          onClick={() => navigate("/clientHome")}
        >
          <i className="bi bi-arrow-left"></i>
          <span>Back</span>
        </button>

        <header className="client-home-header">
          <div>
            <span className="client-home-eyebrow">
              YOUR PERSONAL WELLNESS SPACE
            </span>

            <h1>
              Your health, <span>your journey.</span>
            </h1>

            <p>Your personalized nutrition plan is ready.</p>
          </div>

          <div className="client-home-header-icon">
            <i className="bi bi-heart-pulse"></i>
          </div>
        </header>

        <section className="client-home-plan">
          <div className="client-home-plan-header">
            <div>
              <span className="client-home-plan-tag">YOUR PERSONAL PLAN</span>

              <h2>{plan.title}</h2>

              <p>Follow your daily meal routine.</p>
            </div>

            <i className="bi bi-journal-check"></i>
          </div>

          <div className="client-home-plan-info">
            <div>
              <span>START DATE</span>
              <p>{plan.startDate}</p>
            </div>

            <div>
              <span>END DATE</span>
              <p>{plan.endDate}</p>
            </div>

            <div>
              <span>Status</span>
              <p
                className={
                  plan.status === "Completed"
                    ? "StatusCompleted"
                    : "NotCompleted"
                }
              >
                {plan.status}
              </p>
            </div>
          </div>

          <div className="client-home-meal-section">
            <h3>Your Weekly Meal Plan</h3>

            <div className="client-home-day-tabs">
              {plan.days?.map((item, index) => (
                <button
                  type="button"
                  key={item.day}
                  className={
                    selectedDay === index
                      ? "client-home-day-tab active"
                      : "client-home-day-tab"
                  }
                  onClick={() => setSelectedDay(index)}
                >
                  <span>DAY</span>
                  <strong>{item.day}</strong>
                </button>
              ))}
            </div>

            {day && (
              <div className="client-home-meal-list">
                <h4>Day {day.day}</h4>

                <div className="client-home-meal-item">
                  <i className="bi bi-sunrise"></i>
                  <div>
                    <span>EARLY MORNING</span>
                    <p>{day.EarlyMorning || "Not added yet"}</p>
                  </div>
                </div>

                <div className="client-home-meal-item">
                  <i className="bi bi-cup-hot"></i>
                  <div>
                    <span>MORNING</span>
                    <p>{day.Morning || "Not added yet"}</p>
                  </div>
                </div>

                <div className="client-home-meal-item">
                  <i className="bi bi-apple"></i>
                  <div>
                    <span>MID MORNING</span>
                    <p>{day.MidMorning || "Not added yet"}</p>
                  </div>
                </div>

                <div className="client-home-meal-item">
                  <i className="bi bi-egg-fried"></i>
                  <div>
                    <span>LUNCH</span>
                    <p>{day.Lunch || "Not added yet"}</p>
                  </div>
                </div>

                <div className="client-home-meal-item">
                  <i className="bi bi-cup-straw"></i>
                  <div>
                    <span>EVENING</span>
                    <p>{day.Evening || "Not added yet"}</p>
                  </div>
                </div>

                <div className="client-home-meal-item">
                  <i className="bi bi-moon-stars"></i>
                  <div>
                    <span>DINNER</span>
                    <p>{day.Dinner || "Not added yet"}</p>
                  </div>
                </div>

                <div className="client-home-day-navigation">
                  <button
                    type="button"
                    disabled={selectedDay === 0}
                    onClick={() => setSelectedDay(selectedDay - 1)}
                  >
                    Previous Day
                  </button>

                  <span>
                    {selectedDay + 1} of {plan.days.length}
                  </span>

                  <button
                    type="button"
                    disabled={selectedDay === plan.days.length - 1}
                    onClick={() => setSelectedDay(selectedDay + 1)}
                  >
                    Next Day
                  </button>
                </div>
              </div>
            )}
          </div>

          {selectedDay === 6 && (
            <button
              className="complete-btn"
              
              disabled={(plan.status === "Completed")}
              onClick={() => {
                (setShowConfirm(true), setUpdateId(plan._id));
              }}
            >
              {plan.status === "Completed"
                ? "Your Diet Plan is Completed Successfully"
                : "Complete"}
            </button>
          )}
          <div className="client-home-plan-footer">
            <i className="bi bi-heart-pulse"></i>
            <p>Stay consistent and take your wellness one day at a time.</p>
          </div>
        </section>
      </div>
    </>
  );
}

export default Nutrition;
