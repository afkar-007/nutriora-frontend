import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../AdminStyles/DietPlans.css";
import LoadingGif from "../assets/LoadingNutoria.gif";

const API_URL = "https://nutriora-backend.onrender.com/dietPlan/getPlan";

function DietPlans() {
  const navigate = useNavigate();

  const [plans, setPlans] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [userId, setUserId] = useState(null);

  async function fetchDietPlans() {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      console.log(data);
      
     

      if (!response.ok) {
        throw new Error(data.message || "Unable to load diet plans");
      }

      // const planList = Array.isArray(data.data) ? data : data.plans;

      // setPlans(Array.isArray(planList) ? planList : []);
      setPlans(data.data);

      
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDietPlans();
    console.log(userId);
  }, []);

  const filteredPlans = useMemo(() => {
    return plans.filter((plan) => {
      const title = plan.title || "";
      const clientName =
        plan.clientId?.fullName || plan.clientId?.name || plan.clientName || "";

      const matchesSearch = `${title} ${clientName}`
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        (plan.status || "draft").toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [plans, search, statusFilter]);

  const activeCount = plans.filter((plan) => plan.status === "Active").length;

  const draftCount = plans.filter((plan) => plan.status === "draft").length;

  const completedCount = plans.filter(
    (plan) => plan.status === "Completed",
  ).length;

  function formatDate(date) {
    if (!date) return "Not scheduled";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Not scheduled";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  function getClientName(plan) {
    return (
      plan.clientId?.fullName ||
      plan.clientId?.name ||
      plan.clientName ||
      "Client not assigned"
    );
  }

  function getInitials(name) {
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || "")
      .join("");
  }

  function getPlanStatus(status = "draft") {
    const normalizedStatus = status.toLowerCase();

    if (normalizedStatus === "active") return "Active";
    if (normalizedStatus === "completed") return "Completed";

    return "Draft";
  }

  async function handleDelete(planId) {
  try {
    setDeleteLoading(true);

    const token = localStorage.getItem("token");

    const response = await fetch(
      `https://nutriora-backend.onrender.com/dietPlan/DeleteClientPlan/${planId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    console.log("Delete response:", data);

    if (!response.ok) {
      throw new Error(data.message || "Unable to delete diet plan");
    }

    // Immediately remove the deleted plan from UI
    setPlans((previousPlans) =>
      previousPlans.filter((plan) => plan._id !== planId)
    );

    // Update client only if this was their last diet plan
    await changeHasDietPlans();

    setShowConfirm(false);

    alert(data.message);

  } catch (err) {
    alert(err.message || "Failed to delete diet plan");
  } finally {
    setDeletingId(null);
    setDeleteLoading(false);
  }
}

  async function changeHasDietPlans() {
    try {
      const data = {
        hasDietPlans: false,
      };

      console.log(userId);

      const response = await fetch(
        `https://nutriora-backend.onrender.com/user/ChangeDietPlan/${userId._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const getData = await response.json();

      if (!response.ok) {
        console.log(getData.message);
        return;
      }

      console.log(getData.message);
    } catch (err) {
      console.log(err.message);
    } finally {
      setUserId(null);
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

        <p>loading...</p>
      </div>
    );
  }


  // async function AssignDietPlan() {
   
  //     const data = {
  //       hasDietPlans: false,
  //     };

  //     const response = await fetch(`https://nutriora-backend.onrender.com/user/ChangeDietPlan/${clientId}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     const getData = await response.json();

  //     if(!response.ok){
  //       console.log(getData.message);
  //       return
        
  //     }
  //     if(response.ok){
  //       console.log(getData.message);
        
  //     }



    
  // }




  return (
    <div className="diet-plans-page">
      {showConfirm && (
        <div className="delete-overlay">
          <div className="delete-confirm-box">
            <div className="delete-icon">
              <i className="bi bi-trash3"></i>
            </div>

            <h3>Delete Diet Plan?</h3>

            <p>
              Are you sure you want to delete this diet plan? This action cannot
              be undone.
            </p>

            <div className="delete-actions">
              <button
                className="cancel-delete"
                onClick={() => {
                  (setShowConfirm(false), setDeletingId(null));
                }}
                disabled={deleteLoading}
              >
                Cancel
              </button>

              <button
                className="confirm-delete"
                onClick={() => handleDelete(deletingId)}
                disabled={deleteLoading}
              >
                {deleteLoading ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="diet-plans-header">
        <div className="diet-plans-header-content">
          <Link to="/nutritionist" className="diet-plans-back-link">
            <i className="bi bi-arrow-left" />
            Dashboard
          </Link>

          <span className="diet-plans-eyebrow">NUTRITION MANAGEMENT</span>

          <h1>Diet Plans</h1>

          <p>
            Create personalized nutrition plans and guide every client towards
            healthier habits.
          </p>
        </div>

        <button
          type="button"
          className="diet-create-button"
          onClick={() => navigate("/nutritionist/diet-plans/create")}
        >
          <i className="bi bi-plus-lg" />
          Create New Plan
        </button>
      </header>

      {/* Summary */}
      <section className="diet-summary-grid">
        <article className="diet-summary-card">
          <div className="diet-summary-icon total">
            <i className="bi bi-journal-medical" />
          </div>

          <div>
            <span>Total Plans</span>
            <h2>{plans.length}</h2>
            <p>All nutrition plans</p>
          </div>
        </article>

        <article className="diet-summary-card">
          <div className="diet-summary-icon active">
            <i className="bi bi-check-circle" />
          </div>

          <div>
            <span>Active Plans</span>
            <h2>{activeCount}</h2>
            <p>Currently in progress</p>
          </div>
        </article>

        <article className="diet-summary-card">
          <div className="diet-summary-icon completed">
            <i className="bi bi-trophy" />
          </div>

          <div>
            <span>Completed</span>
            <h2>{completedCount}</h2>
            <p>Finished nutrition plans</p>
          </div>
        </article>
      </section>

      {/* Plans panel */}
      <section className="diet-plans-panel">
        <div className="diet-panel-heading">
          <div>
            <h2>Your Nutrition Plans</h2>
            <p>Review and manage your personalized client plans.</p>
          </div>

          <span className="diet-plans-count">{filteredPlans.length} plans</span>
        </div>

        {/* Search and filters */}
        <div className="diet-plans-toolbar">
          <div className="diet-search-box">
            <i className="bi bi-search" />

            <input
              type="search"
              placeholder="Search plan or client..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search diet plans"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <i className="bi bi-x-lg" />
              </button>
            )}
          </div>

          <select
            className="diet-status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter diet plans by status"
          >
            <option value="All">All statuses</option>
            <option value="active">Active</option>

            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Loading */}
        {loading && (
          <div className="diet-plans-state">
            <span className="diet-loading-spinner" />
            <p>Loading your diet plans...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="diet-plans-state diet-plans-error">
            <i className="bi bi-exclamation-circle" />
            <h3>Unable to load diet plans</h3>
            <p>{error}</p>

            <button type="button" onClick={fetchDietPlans}>
              <i className="bi bi-arrow-clockwise" />
              Try again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filteredPlans.length === 0 && (
          <div className="diet-plans-state">
            <div className="diet-empty-icon">
              <i className="bi bi-journal-plus" />
            </div>

            <h3>
              {search || statusFilter !== "All"
                ? "No matching plans"
                : "Your journey starts here"}
            </h3>

            <p>
              {search || statusFilter !== "All"
                ? "Try another search term or change the status filter."
                : "Create your first personalized diet plan for a client."}
            </p>

            {!search && statusFilter === "All" && (
              <button
                type="button"
                className="diet-empty-create-button"
                onClick={() => navigate("/nutritionist/diet-plans/create")}
              >
                <i className="bi bi-plus-lg" />
                Create your first plan
              </button>
            )}
          </div>
        )}

        {/* Plan cards */}
        {!loading && !error && filteredPlans.length > 0 && (
          <div className="diet-plans-grid">
            {filteredPlans.map((plan) => {
              const clientName = getClientName(plan);
              const status = getPlanStatus(plan.status);
              const planId = plan._id || plan.id;

              return (
                <article className="diet-plan-card" key={planId}>
                  <div className="diet-plan-card-top">
                    <div className="diet-plan-card-icon">
                      <i className="bi bi-clipboard2-pulse" />
                    </div>

                    <span
                      className={`diet-plan-status status-${(
                        plan.status || "draft"
                      ).toLowerCase()}`}
                    >
                      <span />
                      {status}
                    </span>
                  </div>

                  <h3>{plan.title || "Personalized Diet Plan"}</h3>

                  <div className="diet-plan-client">
                    <div className="diet-client-avatar">
                      {getInitials(clientName)}
                    </div>

                    <div>
                      <span>PREPARED FOR</span>
                      <strong>{clientName}</strong>
                    </div>
                  </div>

                  <div className="diet-plan-dates">
                    <div>
                      <i className="bi bi-calendar-event" />
                      <span>Start date</span>
                      <strong>{formatDate(plan.startDate)}</strong>
                    </div>

                    <div>
                      <i className="bi bi-calendar-check" />
                      <span>End date</span>
                      <strong>{formatDate(plan.endDate)}</strong>
                    </div>

                    <div>
                      <i className="bi bi-bullseye"></i>
                      <span>Status</span>
                      <strong
                        className={
                          plan.status === "Completed"
                            ? "StatusCompleted"
                            : "NotCompleted"
                        }
                      >
                        {plan.status}
                      </strong>
                    </div>
                  </div>

                  <div className="diet-plan-card-footer">
                    <button
                      type="button"
                      className="diet-view-button"
                      onClick={() =>
                        navigate(`/nutritionist/diet-plans/${planId}`)
                      }
                    >
                      View plan
                      <i className="bi bi-arrow-up-right" />
                    </button>

                    <div className="diet-plan-actions">
                      <button
                        type="button"
                        title="Edit diet plan"
                        aria-label="Edit diet plan"
                        onClick={() =>
                          navigate(`/nutritionist/diet-plans/${planId}/edit`)
                        }
                      >
                        <i className="bi bi-pencil" />
                      </button>

                      <button
                        type="button"
                        className="diet-delete-button"
                        title="Delete diet plan"
                        aria-label="Delete diet plan"
                        disabled={deletingId === planId}
                        onClick={() => {
                          (setShowConfirm(true),
                            setDeletingId(planId),
                            setUserId(plan.clientId));
                        }}
                      >
                        {deletingId === planId ? (
                          <span className="diet-button-spinner" />
                        ) : (
                          <i className="bi bi-trash3" />
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <footer className="diet-plans-footer">
        <span>© {new Date().getFullYear()} Nutriora</span>
        <span>Personalized care. Healthier lives.</span>
      </footer>
    </div>
  );
}

export default DietPlans;
