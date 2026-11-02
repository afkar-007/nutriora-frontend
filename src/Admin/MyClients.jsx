
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import '../AdminStyles/MyClient.css'
import LoadingGif from "../assets/LoadingNutoria.gif";

function MyClients() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const id = localStorage.getItem("id")

  useEffect(() => {
    async function fetchClients() {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:3000/user/users",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load clients");
        }

        // API should return an array of clients or { clients: [...] }
       setClients(data.data)
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchClients();
  }, []);


  
   





  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const name = client.fullName || client.name || "";
      const email = client.email || "";

      const matchesSearch = `${name} ${email}`
        .toLowerCase()
        .includes(search.toLowerCase().trim());

      // const status = client.profileCompleted || "Active";
      // const matchesStatus =
      //   statusFilter === "All" || status === statusFilter;

       return matchesSearch 
      //  && matchesStatus;
    });
  }, [clients, search, statusFilter]);

  function getInitials(name = "Client") {
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || "")
      .join("");
  }

  function getClientName(client) {
    return client.fullName || client.name || "Unnamed Client";
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
    <div className="my-clients-page">
      {/* Header */}
      <header className="clients-header">
        <div>
          <Link to="/nutritionist" className="clients-back-link">
            <i className="bi bi-arrow-left" /> Dashboard
          </Link>

          <span className="clients-eyebrow">CLIENT MANAGEMENT</span>
          <h1>My Clients</h1>

          <p>
            Manage your clients, understand their goals, and support
            their nutrition journey.
          </p>
        </div>

        <div className="clients-header-icon">
          <i className="bi bi-people" />
        </div>
      </header>

      {/* Summary */}
      <section className="clients-summary-grid">
        <article className="clients-summary-card">
          <div className="clients-summary-icon green">
            <i className="bi bi-people" />
          </div>
          <div>
            <span>Total Clients</span>
            <h2>{clients.length-1}</h2>
          </div>
        </article>

        <article className="clients-summary-card">
          <div className="clients-summary-icon blue">
            <i className="bi bi-person-check" />
          </div>
          <div>
            <span>Active Clients</span>
            <h2>
              {clients.filter((client) => (client.profileCompleted || "Active") === true).length}
            </h2>
          </div>
        </article>

        <article className="clients-summary-card">
          <div className="clients-summary-icon orange">
            <i className="bi bi-clipboard2-pulse" />
          </div>
          <div>
            <span>With Diet Plans</span>
            <h2>
              {clients.filter((client) => client.hasDietPlans===true).length}
            </h2>
          </div>
        </article>
      </section>

      {/* Client list */}
      <section className="clients-list-panel">
        <div className="clients-list-heading">
          <div>
            <h2>Client Directory</h2>
            <p>Search and review your assigned clients.</p>
          </div>

          <span className="clients-count-badge">
            {filteredClients.length-1} clients
          </span>
        </div>

        {/* Search and filter */}
        <div className="clients-toolbar">
          <div className="clients-search">
            <i className="bi bi-search" />

            <input
              type="search"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search clients"
            />

            {search && (
              <button
                type="button"
                className="clients-clear-search"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <i className="bi bi-x-lg" />
              </button>
            )}
          </div>

          {/* <select
            className="clients-status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter clients by status"
          >
            <option value="All">All clients</option>
            <option value="active">Active</option>
            <option value="Inactive">Inactive</option>
          </select> */}
        </div>

        {/* Loading, error, empty and client list states */}
        {loading ? (
          <div className="clients-state">
            <span className="clients-spinner" />
            <p>Loading your clients...</p>
          </div>
        ) : error ? (
          <div className="clients-state clients-error">
            <i className="bi bi-exclamation-circle" />
            <h3>Unable to load clients</h3>
            <p>{error}</p>
            <button
              type="button"
              className="clients-retry-btn"
              onClick={() => window.location.reload()}
            >
              Try again
            </button>
          </div>
        ) : filteredClients.length === 0 ? (
          <div className="clients-state">
            <div className="clients-empty-icon">
              <i className="bi bi-person-search" />
            </div>

            <h3>{search ? "No matching clients" : "No clients yet"}</h3>

            <p>
              {search
                ? "Try a different name or email address."
                : "Clients assigned to your account will appear here."}
            </p>
          </div>
        ) : (
          <div className="clients-table-wrapper">
            <table className="clients-table">
              <thead>
                <tr>
                  <th>CLIENT</th>
                  <th>EMAIL ADDRESS</th>
                  <th>STATUS</th>
                  <th>DIET PLAN</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {filteredClients.filter((sends)=>sends._id !==id).map((client) => {
                  const name = getClientName(client);
                  // const status = client.status || "Active";

                  return (
                    <tr key={client._id || client.id}>
                      <td>
                        <div className="clients-person">
                          <div className="clients-avatar">
                            {getInitials(name)}
                          </div>

                          <div>
                            <strong>{name}</strong>
                            <span>
                              {client.gender || "Client"}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="clients-email">
                        {client.email || "—"}
                      </td>

                      <td>
                        <span
                          className={`clients-status ${
                            client.profileCompleted === true ? "status-active" : "status-inactive"
                          }`}
                        >
                          <span />
                          {client.profileCompleted===true ?"Active":"in Active"}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`clients-plan-badge ${
                            client.hasDietPlan ? "plan-assigned" : "plan-pending"
                          }`}
                        >
                          {client.hasDietPlans ? "Assigned" : "Not assigned"}
                        </span>
                      </td>

                      <td>
                        <Link
                          to={`/nutritionist/clients/${client._id || client.id}`}
                          className="clients-view-btn"
                        >
                          View <i className="bi bi-arrow-up-right" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <footer className="clients-footer">
        <span>© {new Date().getFullYear()} Nutriora</span>
        <span>Personalized care. Healthier lives.</span>
      </footer>
    </div>
  );
}

export default MyClients;
