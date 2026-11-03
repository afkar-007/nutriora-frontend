
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
 import "../Styles/ClientProfileDetails.css";
 import LoadingGif from '../assets/LoadingNutoria.gif'


function ClientPersonalDetails() {
  const navigate = useNavigate();

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPersonalDetails() {
      try {
        const id = localStorage.getItem("id");
        const token = localStorage.getItem("token");

        const response = await fetch(
          `https://nutriora-backend.onrender.com/details/personalDetailsFetch/${id}`,
          {
            method: "GET",
             headers: {
    'Content-Type': 'application/json'}

          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch profile details"
          );
        }
       
        setDetails(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPersonalDetails();
  }, []);

 if (loading) {
  return (
    <div className="client-profile-status">
      <img
        src={LoadingGif}
        alt="Loading..."
        className="profile-loading-gif"
      />

      <h3>Preparing your profile</h3>
      <p>Your wellness journey is loading...</p>
    </div>
  );
}

  if (error) {
    return <div className="client-profile-status">{error}</div>;
  }

  if (!details) {
    return (
      <div className="client-profile-status">
        Personal details not found.
      </div>
    );
  }

  const fields = [
    {
      label: "Full Name",
      value: details.fullname,
      icon: "bi-person",
    },
    {
      label: "Date of Birth",
      value: details.dateOfBirth
        ? new Date(details.dateOfBirth).toLocaleDateString("en-IN")
        : "",
      icon: "bi-calendar3",
    },
    {
      label: "Phone Number",
      value: details.phoneNumber,
      icon: "bi-telephone",
    },
    {
      label: "Gender",
      value: details.gender,
      icon: "bi-person-badge",
    },
    {
      label: "City",
      value: details.city,
      icon: "bi-geo-alt",
    },
  ];

  return (
    <main className="client-profile-page">
      <header className="client-profile-header">
        <button
          className="client-profile-back"
          onClick={() => navigate("/client/profile")}
        >
          <i className="bi bi-arrow-left"></i>
          Back to Home
        </button>

        <span className="client-profile-eyebrow">
          NUTRIORA / MY ACCOUNT
        </span>

        <h1>My Profile</h1>

        <p>
          Your personal information, thoughtfully organized.
        </p>
      </header>

      <section className="client-profile-card">
        <div className="client-profile-avatar">
          <i className="bi bi-person"></i>
        </div>

        <div className="client-profile-identity">
          <h2>{details.fullname || "Your Name"}</h2>
          <p>Personal Information</p>
        </div>

        {/* <button
          className="client-profile-edit"
        //   onClick={() => navigate("/personalDetails")}
        >
          <i className="bi bi-pencil"></i>
          Edit Details
        </button> */}
      </section>

      <section className="client-profile-section">
        <div className="client-profile-section-heading">
          <span>01</span>
          <div>
            <h2>Personal Details</h2>
            <p>Your basic information</p>
          </div>
        </div>

        <div className="client-profile-grid">
          {fields.map((field) => (
            <div className="client-profile-field" key={field.label}>
              <div className="client-profile-field-icon">
                <i className={`bi ${field.icon}`}></i>
              </div>

              <div>
                <span>{field.label}</span>
                <p>{field.value || "Not provided"}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default ClientPersonalDetails;
