
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import '../AdminStyles/ClientPersonalDetailsPage.css'

function ClientProfile() {
  const{id}=useParams()
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getPersonalDetails() {
    try {
      

      const response = await fetch(
        `https://route66-backend-1-v5us.onrender.com/details/personalDetailsFetch/${id}`
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
    getPersonalDetails();
  }, []);

  if (loading) {
    return <div className="client-profile-loading">Loading profile...</div>;
  }

  if (!details) {
    return (
      <div className="client-profile-empty">
        <i className="bi bi-person-circle"></i>
        <h2>No Personal Details Found</h2>
        <p>Not Yet to complete it</p>
        <Link to={`/nutritionist/clients/${id}`}>Go Back</Link>
      </div>
    );
  }

  return (
    <div className="client-profile-page">
      <div className="client-profile-header">
        <div>
          <span>MY ACCOUNT</span>
          <h1>Personal Profile</h1>
          <p>Your personal information and details.</p>
        </div>

        <Link to={`/nutritionist/clients/${id}`} className="client-profile-back">
          <i className="bi bi-arrow-left"></i> Back
        </Link>
      </div>

      <div className="client-profile-card">
        <div className="client-profile-avatar">
          <i className="bi bi-person"></i>
        </div>

        <h2>{details.fullname}</h2>
        <p>{details.city || "City not provided"}</p>

        <div className="client-profile-divider"></div>

        <div className="client-profile-info">
          <div className="client-profile-field">
            <div className="client-profile-field-icon">
              <i className="bi bi-person-vcard"></i>
            </div>
            <div>
              <span>Full Name</span>
              <h4>{details.fullname || "Not provided"}</h4>
            </div>
          </div>

          <div className="client-profile-field">
            <div className="client-profile-field-icon">
              <i className="bi bi-calendar3"></i>
            </div>
            <div>
              <span>Date of Birth</span>
              <h4>
                {details.dateOfBirth
                  ? new Date(details.dateOfBirth).toLocaleDateString("en-IN")
                  : "Not provided"}
              </h4>
            </div>
          </div>

          <div className="client-profile-field">
            <div className="client-profile-field-icon">
              <i className="bi bi-telephone"></i>
            </div>
            <div>
              <span>Phone Number</span>
              <h4>{details.phoneNumber || "Not provided"}</h4>
            </div>
          </div>

          <div className="client-profile-field">
            <div className="client-profile-field-icon">
              <i className="bi bi-gender-ambiguous"></i>
            </div>
            <div>
              <span>Gender</span>
              <h4>{details.gender || "Not provided"}</h4>
            </div>
          </div>

          <div className="client-profile-field">
            <div className="client-profile-field-icon">
              <i className="bi bi-geo-alt"></i>
            </div>
            <div>
              <span>City</span>
              <h4>{details.city || "Not provided"}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientProfile;
