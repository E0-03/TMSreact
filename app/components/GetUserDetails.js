import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function GetUserDetails() {
  const [userDetails, setUserDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details from the server
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post("http://localhost:4000/getuserdetails", { token })
        .then((response) => {
          const data = response.data.data;
          setUserDetails(data);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    }
  }, []);

  const handleEdit = async (username) => {
    try {
      const isAdminResponse = await axios.post(
        "http://localhost:4000/checkmygroup",
        {
          token: localStorage.getItem("token"),
          groupName: "admin",
        }
      );
      if (isAdminResponse.data.isAdmin === true) {
        // Navigate to the UserManagement route with the selected username as a parameter
        navigate(`/UserManagement?username=${username}`);
      } else {
        // If the user is not an admin, do something else or show an error message
        alert("You are not authorized to perform this action.");
        navigate("/"); // Redirect to an unauthorized page
        // Optionally, you can redirect to another route or show an error message
        // navigate("/Unauthorized"); // Redirect to an unauthorized page
        // alert("You are not authorized to perform this action.");
      }
    } catch (error) {
      console.error("Error checking admin status:", error);
      // Handle the error appropriately, such as showing an error message or redirecting to an error page
    }
  };

  return (
    <div className="container py-md-5">
      <div className="row align-items-center">
        <div className="col-lg-12">
          <h1 className="display-3">User Details</h1>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>User Groups</th>
                <th>Status</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {userDetails.map((user, index) => (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.usergroup}</td>
                  <td>{user.status}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleEdit(user.username)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default GetUserDetails;
