import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../AdminStyles/CreateDietPlans.css";

function CreateDietPlan() {
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState("");
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [selectedDay, setSelectedDay] = useState(0);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const [days, setDays] = useState([]);
  const id = localStorage.getItem("id")
  

  // Get clients
  useEffect(() => {
    async function getClients() {
      try {
        
        const token = localStorage.getItem("token");

        const response = await fetch("https://route66-backend-1-v5us.onrender.com/user/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load clients");
          console.log("error");
        }

        if (response.ok) {
          setClients(data.data);
        }
      } catch (err) {
        setError(err.message);
      }
    }

    getClients();
  }, []);

  async function AssignDietPlan() {
   
      const data = {
        hasDietPlans: true,
      };

      const response = await fetch(`https://route66-backend-1-v5us.onrender.com/user/ChangeDietPlan/${clientId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const getData = await response.json();

      if(!response.ok){
        console.log(getData.message);
        return
        
      }
      if(response.ok){
        console.log(getData.message);
        
      }



    
  }

  // Create 7 days
  useEffect(() => {
    const newDays = [];

    for (let i = 0; i < 7; i++) {
      newDays.push({
        day: i + 1,
        EarlyMorning: "",
        Morning: "",
        MidMorning: "",
        Lunch: "",
        Evening: "",
        Dinner: "",
      });
    }

    setDays(newDays);
  }, []);

  // Update food
  function changeFood(field, value) {
    const updatedDays = [...days];

    updatedDays[selectedDay][field] = value;

    setDays(updatedDays);
  }

  // Get end date
  function getEndDate() {
    if (startDate === "") {
      return "";
    }

    const date = new Date(startDate + "T12:00:00");

    date.setDate(date.getDate() + 6);

    return (
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0")
    );
  }

  // Save plan
  async function savePlan(event, status) {
    event.preventDefault();
    setError("");

    if (clientId === "" || title.trim() === "" || startDate === "") {
      setError("Please fill all plan details.");
      return;
    }

    let foodAdded = false;

    for (let i = 0; i < days.length; i++) {
      if (
        days[i].EarlyMorning.trim() !== "" ||
        days[i].Morning.trim() !== "" ||
        days[i].MidMorning.trim() !== "" ||
        days[i].Lunch.trim() !== "" ||
        days[i].Evening.trim() !== "" ||
        days[i].Dinner.trim() !== ""
      ) {
        foodAdded = true;
      }
    }

    if (status === "active" && foodAdded === false) {
      setError("Add at least one food before publishing.");
      return;
    }

    const planData = {
      clientId: clientId,
      title: title,
      startDate: startDate,
      endDate: getEndDate(),
      days: days,
    };

    try {
      setSaving(true);

      const token = localStorage.getItem("token");
      console.log(planData);

      const response = await fetch(
        "http://localhost:3000/dietPlan/createPlan",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(planData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to save plan");
      }

      navigate("/nutritionist/diet-plans", {
        state: {
          message: data.message || "Diet plan saved successfully",
        },
      });
      if(response.ok){
        AssignDietPlan()
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="create-diet-page">
      <header className="create-diet-header">
        <Link to="/nutritionist/diet-plans">
          <i className="bi bi-arrow-left"></i> Back to Diet Plans
        </Link>

        <h1>Create Diet Plan</h1>
        <p>Create a personalized 7-day meal plan.</p>
      </header>

      <form
        className="create-diet-form"
        
      >
        <section className="create-diet-section">
          <h2>Plan Information</h2>

          <div className="create-diet-fields">
            <div className="create-diet-field">
              <label>Diet Plan Title</label>

              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Enter plan title"
                required
              />
            </div>

            <div className="create-diet-field">
              <label>Select Client</label>

              <select
                value={clientId}
                onChange={(event) => setClientId(event.target.value)}
                required
              >
                <option value="">Choose a client</option>

                {clients.filter((sends)=>sends.profileCompleted===true).filter((sends)=>sends._id !==id ).map((client) => (
                  <option
                    key={client._id || client.id}
                    value={client._id || client.id}
                  >
                    {client.fullName || client.name || "Unnamed Client"}
                  </option>
                ))}
              </select>
            </div>

            <div className="create-diet-field">
              <label>Start Date</label>

              <input
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                required
              />
            </div>

            <div className="create-diet-field">
              <label>End Date</label>

              <input
                type="text"
                value={getEndDate()}
                placeholder="Select start date"
                readOnly
              />
            </div>
          </div>
        </section>

        <section className="create-diet-section">
          <h2>Weekly Meal Planner</h2>

          <div className="create-diet-day-tabs">
            {days.map((day, index) => (
              <button
                type="button"
                key={day.day}
                className={
                  selectedDay === index
                    ? "create-diet-day-tab selected"
                    : "create-diet-day-tab"
                }
                onClick={() => setSelectedDay(index)}
              >
                Day {day.day}
              </button>
            ))}
          </div>

          <h3>Day {selectedDay + 1}</h3>

          <div className="create-diet-meal-card">
            <label>Early Morning (6:00 - 6:30) </label>

            <input
              type="text"
              value={days[selectedDay]?.EarlyMorning || ""}
              placeholder="Early Morning"
              onChange={(event) =>
                changeFood("EarlyMorning", event.target.value)
              }
            />

            <label>Morning (7:30 - 8:00)</label>

            <input
              type="text"
              value={days[selectedDay]?.Morning || ""}
              placeholder="Morning"
              onChange={(event) => changeFood("Morning", event.target.value)}
            />

            <label>Mid Morning (11:30 - 12:00)</label>

            <input
              type="text"
              value={days[selectedDay]?.MidMorning || ""}
              placeholder="Mid Morning"
              onChange={(event) => changeFood("MidMorning", event.target.value)}
            />

            <label>Lunch (1:00 - 2:00)</label>

            <input
              type="text"
              value={days[selectedDay]?.Lunch || ""}
              placeholder="Lunch"
              onChange={(event) => changeFood("Lunch", event.target.value)}
            />

            <label>Evening (4:30 - 5:00) </label>

            <input
              type="text"
              value={days[selectedDay]?.Evening || ""}
              placeholder=" Evening"
              onChange={(event) => changeFood("Evening", event.target.value)}
            />

            <label>Dinner (7:30 - 8:00)</label>

            <input
              type="text"
              value={days[selectedDay]?.Dinner || ""}
              placeholder="Enter dinner"
              onChange={(event) => changeFood("Dinner", event.target.value)}
            />
          </div>

          <div className="create-diet-day-navigation">
            <button
              type="button"
              disabled={selectedDay === 0}
              onClick={() => setSelectedDay(selectedDay - 1)}
            >
              Previous Day
            </button>

            <span>Day {selectedDay + 1} of 7</span>

            <button
              type="button"
              disabled={selectedDay === 6}
              onClick={() => setSelectedDay(selectedDay + 1)}
            >
              Next Day
            </button>
          </div>
        </section>

        {error !== "" && <p className="create-diet-message error">{error}</p>}

        <div className="create-diet-form-footer">
          <Link to="/nutritionist/diet-plans" className="create-diet-cancel">
            Cancel
          </Link>

          <div className="create-diet-submit-actions">
            {/* <button
              type="button"
              disabled={saving}
              onClick={(event) => savePlan(event, "draft")}
            >
              {saving ? "Saving..." : "Save Draft"}
            </button> */}

            <button type="submit" disabled={saving} onClick={(event) => savePlan(event, "active")}>
              {saving ? "Saving..." : "Publish Plan"}
            </button>
          </div>
        </div>
      </form>

      <footer className="create-diet-footer">
        <span>© {new Date().getFullYear()} Nutriora</span>
        <span>Personalized care. Healthier lives.</span>
      </footer>
    </div>
  );
}

export default CreateDietPlan;
