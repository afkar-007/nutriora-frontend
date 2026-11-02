import React from 'react'
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../AdminStyles/HealthUsers.css'
import LoadingGif from "../assets/LoadingNutoria.gif";

function HealthUsers() {
    const navigate = useNavigate()


       const [users, setUsers] = useState([]);
      const [userLoading, setUserLoading] = useState(false);

     useEffect(() => {
    getUsers();
  }, []);

  const [search, setSearch] = useState("");

const filteredUsers = users.filter((user) =>
  `${user.name} ${user.email}`
    .toLowerCase()
    .includes(search.toLowerCase())
);

  async function getUsers() {
    try {
        setUserLoading(true)
      const response = await fetch(
        "https://nutriora-backend.onrender.com/user/users"
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
        return;
      }

      setUsers(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setUserLoading(false)
    }
  }

  const id = localStorage.getItem("id")

if (userLoading) {
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
    <div className="client-selection">
        <div className="client-selection-header">

  <div className="client-header-left">
    <button
      className="health-back-btn"
      onClick={() => navigate('/nutritionist')}
    >
      <i className="bi bi-arrow-left"></i>
      Back
    </button>

    
   
  </div>

  

</div>

  <div className="client-selection-header">
    <div>
      <span>CLIENT MANAGEMENT</span>
      <h3>Select Your Client</h3>
      <p>Search and choose a client to create a personalized diet plan.</p>
    </div>

    <div className="client-count">
      <i className="bi bi-people"></i>
     {users.filter((sends)=>sends.hasDietPlans===true).length}  Clients
    </div>
  </div>

  {/* SEARCH BOX */}

  <div className="client-search-box">
    <i className="bi bi-search"></i>

    <input
      type="text"
      placeholder="Search by client name or email..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    {search && (
      <button onClick={() => setSearch("")}>
        <i className="bi bi-x-circle"></i>
      </button>
    )}
  </div>

  {/* CLIENT LIST */}

  <div className="client-list">

    {userLoading ? (
      <p>Loading clients...</p>
    ) : filteredUsers.length === 0 ? (
      <div className="client-empty">
        <i className="bi bi-person-exclamation"></i>
        <h5>No Clients Found</h5>
        <p>Try searching with another name or email.</p>
      </div>
    ) : (
      filteredUsers.filter((sends)=>sends._id !==id).filter((sends)=>sends.hasDietPlans===true).map((user) => (
        <div className="client-select-card" key={user._id}>

          <div className="client-avatar">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <div className="client-info">
            <h5>{user.name}</h5>
            <p>{user.email}</p>
          </div>

          <button
            onClick={() =>
              navigate(`/nutritionist/healthCreate/${user._id}`)
            }
          >
            Choose Client
            <i className="bi bi-arrow-right"></i>
          </button>

        </div>
      ))
    )}

  </div>

</div>

  )
}

export default HealthUsers