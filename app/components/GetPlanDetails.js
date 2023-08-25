import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function GetPlanDetails(props) {
  const [PlanDetails, setPlanDetails] = useState([]);
  const navigate = useNavigate();

  async function handleOnClick(path, mvpName) {
    if (!(await isActive())) {
      props.setLogin(false);
      return;
    }

    if (!(await checkProjectManager())) {
      props.setisProjectManager(false);
      return;
    }

    async function isActive() {
      try {
        const activeresponse = await axios.post(
          "http://localhost:4000/isactive",
          {
            token: localStorage.getItem("token"),
          }
        );
        if (activeresponse.data.status === 0) {
          return false;
        }
      } catch (error) {
        return false;
      }
      return true;
    }
    // Set the MVP name in the parent component's state
    props.setPlan_MVP_Name(mvpName);
    navigate(path);
  }

  async function checkProjectManager() {
    const token = localStorage.getItem("token");

    try {
      const responsePM = await axios.post(
        "http://localhost:4000/checkmygroup",
        {
          token: localStorage.getItem("token"),
          groupName: "project manager",
        }
      );
      if (responsePM.data.error === null) {
        props.setisProjectManager(true);
        return true;
      }
    } catch (error) {
      return false;
    }
    props.setisProjectManager(false);
    return false;
  }

  useEffect(() => {
    // Fetch user details from the server
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post("http://localhost:4000/getplanname", {
          token,
          Plan_app_Acronym: props.App_Acronym,
          //  Plan_Acronym: "uuu",
        })
        .then((response) => {
          const data = response.data.groups;
          console.log(data);
          setPlanDetails(data);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    }
  }, []);

  /*const handleEdit = async (username) => {
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
  };*/

  const handleBack = async (path) => {
    navigate(path);
  };

  return (
    <div className="container py-md-5">
      <div className="row align-items-center">
        <div className="col-lg-12">
          <h1 className="display-3">Plan List for {props.App_Acronym}</h1>
          <h2>
            <button
              onClick={() => handleBack("/KanbanBoard")}
              className="btn btn-sm btn-primary"
            >
              back
            </button>
          </h2>
          <h2>
            {props.isProjectManager ? (
              <>
                <button
                  onClick={() => handleOnClick("/CreateNewPlan")}
                  className="btn btn-sm btn-primary"
                >
                  Create new plan
                </button>
              </>
            ) : null}
          </h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>MVP name</th>
              </tr>
            </thead>
            <tbody>
              {PlanDetails.map((user, index) => (
                <tr key={index}>
                  <td>{user}</td>
                  <td>
                    {props.isProjectManager ? (
                      <>
                        <button
                          onClick={() => handleOnClick("/EditPlan", user)}
                          className="btn btn-sm btn-primary"
                        >
                          Edit
                        </button>
                      </>
                    ) : null}
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

export default GetPlanDetails;
