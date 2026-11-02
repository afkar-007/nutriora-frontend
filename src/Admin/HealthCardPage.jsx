import React, { useEffect, useState } from "react";
import "../AdminStyles/HealthCardPage.css";
import { useNavigate } from "react-router-dom";
import LoadingGif from "../assets/LoadingNutoria.gif";

function HealthCardPage() {
  const navigate = useNavigate();

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedHealthId, setSelectedHealthId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const[search,setSearch]=useState("")

  // Fetch all health plans
  async function getHealthPlans() {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:3000/healthPlan/healthAllGet",
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
        return;
      }

      setPlans(data.data);

      console.log(data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getHealthPlans();
  }, []);

  // Delete health plan
  async function deletePlan(id) {
    try {
      setDeleteLoading(true);
      setDeleteLoading(id);

      console.log(id);

      const response = await fetch(
        `http://localhost:3000/healthPlan/deleteOnePlan/${id}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      if (response.ok) {
        getHealthPlans();
        setShowDeleteConfirm(false);
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setSelectedHealthId("");
      setDeleteLoading(false);
    }
  }

  // Display array values
  function showItems(items) {
    if (!items || items.length === 0) {
      return "No details added";
    }

    if (Array.isArray(items)) {
      return items.join(", ");
    }

    return items;
  }


   if (loading) {
          return (
            <div className="client-profile-status">
              <img
                src={LoadingGif}
                alt="Loading..."
                className="profile-loading-gif"
              />
      
              
              <p>loading...</p>
            </div>
          );
        }



  return (
    <div className="health-plans-page">
      {showDeleteConfirm && (
        <div className="health-confirm-overlay">
          <div className="health-confirm-box">
            <div className="health-confirm-icon">
              <i className="bi bi-trash"></i>
            </div>

            <h3>Delete Health Plan?</h3>

            <p>
              Are you sure you want to delete this health plan? This action
              cannot be undone.
            </p>

            <div className="health-confirm-actions">
              <button
                className="health-cancel-btn"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setSelectedHealthId(null);
                }}
              >
                Cancel
              </button>

              <button
                className="health-confirm-delete-btn"
                onClick={() => deletePlan(selectedHealthId)}
                disabled={deleteLoading}
              >
                {deleteLoading ? "Deleting" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        className="client-health-back"
        onClick={() => navigate("/nutritionist")}
      >
        <i className="bi bi-arrow-left"></i>
        Back
      </button>

      {/* Header */}
      <div className="health-plans-header">
        <div>
          <p className="health-plans-subtitle">NUTRITION MANAGEMENT</p>

          <h2>Health Plans</h2>

          <p className="health-plans-description">
            Manage and monitor all created health plans.
          </p>
        </div>

        

        <div className="health-plans-count">
          <span>Total Plans</span>
          <h3>{plans.length}</h3>
        </div>

        

      </div>
      <div>
        
      <input type="text" placeholder="Search users..." className="input-field" onChange={(e)=>setSearch(e.target.value)} />
      </div>
      

      {/* Loading */}
      {loading && (
        <div className="health-plans-message">Loading health plans...</div>
      )}

      {/* Empty */}
      {!loading && plans.length === 0 && (
        <div className="health-plans-empty">
          <i className="bi bi-heart-pulse"></i>
          <h3>No Health Plans Yet</h3>
          <p>Health plans you create will appear here.</p>
        </div>
      )}

      {/* Cards */}
      {!loading && plans.length > 0 && (
        <div className="health-plans-grid">
          {plans.filter((sends)=>sends.clientId.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())).map((plan) => (
            <div className="health-plan-card" key={plan._id}>
              <div className="health-plan-card-header">
                <div className="health-plan-icon">
                  <i className="bi bi-heart-pulse"></i>
                </div>

                <button
                  className="health-plan-delete"
                  onClick={() => {
                    setSelectedHealthId(plan._id);
                    setShowDeleteConfirm(true);
                  }}
                  disabled={selectedHealthId === plan._id}
                  title="Delete health plan"
                >
                  {selectedHealthId === plan._id ? (
                    <i className="bi bi-arrow-repeat"></i>
                  ) : (
                    <i className="bi bi-trash3"></i>
                  )}
                </button>
              </div>

              <div className="health-plan-overview">
                <p className="ClientName">{plan.clientId.name}</p>

                <span>HEALTH OVERVIEW</span>

                <h3>{plan.overview || "Untitled Plan"}</h3>
              </div>

              <div className="health-plan-divider"></div>

              <div className="health-plan-details">
                <div className="health-plan-detail">
                  <div className="health-plan-detail-icon fruit-icon">
                    <i className="bi bi-apple"></i>
                  </div>

                  <div>
                    <h4>Fruits</h4>
                    <p>{showItems(plan.fruits)}</p>
                  </div>
                </div>

                <div className="health-plan-detail">
                  <div className="health-plan-detail-icon vegetable-icon">
                    <i className="bi bi-flower1"></i>
                  </div>

                  <div>
                    <h4>Vegetables</h4>
                    <p>{showItems(plan.vegetables)}</p>
                  </div>
                </div>

                <div className="health-plan-detail">
                  <div className="health-plan-detail-icon guideline-icon">
                    <i className="bi bi-journal-check"></i>
                  </div>

                  <div>
                    <h4>Guidelines</h4>
                    <p>{showItems(plan.guidelines)}</p>
                  </div>
                </div>

                <div className="health-plan-detail">
                  <div className="health-plan-detail-icon guideline-icon">
                    <i className="bi bi-bullseye"></i>
                  </div>

                  <div className="statusDiv">
                    <h4>Status</h4>
                    <p className={plan.status === "Completed" ? "Completed" : "active"}>{showItems(plan.status)}</p>
                  </div>
                </div>

                

                <button
                  onClick={() => navigate(`/healthCardDetails/${plan._id}`)}
                  className="view-details-btn"
                >
                  view Details
                </button>
              </div>

              <div className="health-plan-footer">
                <span>
                  <i className="bi bi-calendar3"></i>
                  Created Health Plan
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HealthCardPage;
