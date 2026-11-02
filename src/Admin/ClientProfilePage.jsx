
import { useNavigate, useParams } from "react-router-dom";
import "../AdminStyles/ClientProfile.css"

function ClientPersonalDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="client-profile-page">

      <button
        className="profile-back-btn"
        onClick={() => navigate('/nutritionist/clients')}
      >
        <i className="bi bi-arrow-left"></i> Back
      </button>

      <div className="profile-heading">
        <span>CLIENT MANAGEMENT</span>
        <h2>Client Profile</h2>
        <p>View client information and health records.</p>
      </div>

      {/* Personal Details */}
      <div className="personal-details-card">
        <div className="profile-icon">
          <i className="bi bi-person"></i>
        </div>

        <div>
          <h3>Personal Details</h3>
          <p>View client's basic personal information</p>
        </div>

        <button
          onClick={() =>
            navigate(`/nutritionist/clients/${id}/personalDetails`)
          }
        >
          View Details <i className="bi bi-arrow-right"></i>
        </button>
      </div>

      {/* Other Details */}
      <div className="profile-section-heading">
        <h3>Health Information</h3>
        <p>Select a section to view complete details.</p>
      </div>

      <div className="profile-options">

        <div
          className="profile-option-card"
          onClick={() =>
            navigate(`/nutritionist/clients/${id}/body-measurements`)
          }
        >
          <i className="bi bi-speedometer2"></i>
          <div>
            <h4>Body Measurements</h4>
            <p>Height, weight and activity level</p>
          </div>
          <i className="bi bi-chevron-right"></i>
        </div>

        <div
          className="profile-option-card"
          onClick={() =>
            navigate(`/nutritionist/client/${id}/nutrition-goals`)
          }
        >
          <i className="bi bi-bullseye"></i>
          <div>
            <h4>Nutrition Goals</h4>
            <p>Goals, timeline and challenges</p>
          </div>
          <i className="bi bi-chevron-right"></i>
        </div>

        <div
          className="profile-option-card"
          onClick={() =>
            navigate(`/nutritionist/client/${id}/food-habits`)
          }
        >
          <i className="bi bi-egg-fried"></i>
          <div>
            <h4>Food Habits</h4>
            <p>Diet type, allergies and food preferences</p>
          </div>
          <i className="bi bi-chevron-right"></i>
        </div>

        <div
          className="profile-option-card"
          onClick={() =>
            navigate(`/nutritionist/client/${id}/lifestyle`)
          }
        >
          <i className="bi bi-heart-pulse"></i>
          <div>
            <h4>Lifestyle</h4>
            <p>Sleep, exercise and health information</p>
          </div>
          <i className="bi bi-chevron-right"></i>
        </div>

      

      </div>
    </div>
  );
}

export default ClientPersonalDetailsPage;
