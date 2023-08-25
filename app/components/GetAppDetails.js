import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function GetAppDetails(props) {
  const [AppDetails, setAppDetails] = useState([]);
  const navigate = useNavigate();

  async function handleOnClick(path, AppName) {
    if (!(await isActive())) {
      props.setLogin(false);
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
    props.setApp_Acronym(AppName);

    try {
      const responsePL = await axios.post(
        "http://localhost:4000/checkmygroup",
        {
          token: localStorage.getItem("token"),
          groupName: "project lead",
        }
      );
      if (responsePL.data.error === null) {
        props.setisProjectLead(true);
        navigate(path);
      } else {
        props.setisProjectLead(false);
        return false;
      }
    } catch (error) {
      console.error("Error", error);
    }

    try {
      const appPermitOpenResponse = await axios.post(
        "http://localhost:4000/getapppermitopen",
        {
          token: localStorage.getItem("token"),
          App_Acronym: AppName,
        }
      );

      const response = await axios.post("http://localhost:4000/checkmygroup", {
        token: localStorage.getItem("token"),
        groupName: appPermitOpenResponse.data.data,
      });

      if (response.data.isAdmin === true) {
        props.setappPermitOpen(true);
      } else {
        props.setappPermitOpen(false);
      }
    } catch (e) {
      console.log("wrong");
      // console.log(e);
    }

    try {
      const appPermitToDoResponse = await axios.post(
        "http://localhost:4000/getapppermittodo",
        {
          token: localStorage.getItem("token"),
          App_Acronym: AppName,
        }
      );

      const response = await axios.post("http://localhost:4000/checkmygroup", {
        token: localStorage.getItem("token"),
        groupName: appPermitToDoResponse.data.data,
      });

      if (response.data.isAdmin === true) {
        props.setappPermitToDo(true);
      } else {
        props.setappPermitToDo(false);
      }
    } catch (e) {
      console.log("wrong");
      // console.log(e);
    }

    try {
      const appPermitDoingResponse = await axios.post(
        "http://localhost:4000/getapppermitdoing",
        {
          token: localStorage.getItem("token"),
          App_Acronym: AppName,
        }
      );

      const response = await axios.post("http://localhost:4000/checkmygroup", {
        token: localStorage.getItem("token"),
        groupName: appPermitDoingResponse.data.data,
      });

      if (response.data.isAdmin === true) {
        props.setappPermitDoing(true);
      } else {
        props.setappPermitDoing(false);
      }
    } catch (e) {
      console.log("wrong");
      // console.log(e);
    }

    try {
      const appPermitDoneResponse = await axios.post(
        "http://localhost:4000/getapppermitdone",
        {
          token: localStorage.getItem("token"),
          App_Acronym: AppName,
        }
      );

      const response = await axios.post("http://localhost:4000/checkmygroup", {
        token: localStorage.getItem("token"),
        groupName: appPermitDoneResponse.data.data,
      });

      if (response.data.isAdmin === true) {
        props.setappPermitDone(true);
      } else {
        props.setappPermitDone(false);
      }
    } catch (e) {
      console.log("wrong");
      // console.log(e);
    }

    try {
      const appPermitCreateResponse = await axios.post(
        "http://localhost:4000/getapppermitcreate",
        {
          token: localStorage.getItem("token"),
          App_Acronym: AppName,
        }
      );

      const response = await axios.post("http://localhost:4000/checkmygroup", {
        token: localStorage.getItem("token"),
        groupName: appPermitCreateResponse.data.data,
      });

      if (response.data.isAdmin === true) {
        props.setappPermitCreate(true);
      } else {
        props.setappPermitCreate(false);
      }
    } catch (e) {
      console.log("wrong");
      // console.log(e);
    }

    navigate(path);
  }

  async function handleOnClickTask(path, AppName) {
    if (!(await isActive())) {
      props.setLogin(false);
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
    props.setApp_Acronym(AppName);

    // try {
    //   const responsePL = await axios.post(
    //     "http://localhost:4000/checkmygroup",
    //     {
    //       token: localStorage.getItem("token"),
    //       groupName: "project lead",
    //     }
    //   );
    //   if (responsePL.data.error === null) {
    //     props.setisProjectLead(true);
    //     navigate(path);
    //   } else {
    //     props.setisProjectLead(false);
    //     return false;
    //   }
    // } catch (error) {
    //   console.error("Error", error);
    // }

    try {
      const appPermitOpenResponse = await axios.post(
        "http://localhost:4000/getapppermitopen",
        {
          token: localStorage.getItem("token"),
          App_Acronym: AppName,
        }
      );

      const response = await axios.post("http://localhost:4000/checkmygroup", {
        token: localStorage.getItem("token"),
        groupName: appPermitOpenResponse.data.data,
      });

      if (response.data.isAdmin === true) {
        props.setappPermitOpen(true);
      } else {
        props.setappPermitOpen(false);
      }
    } catch (e) {
      console.log("wrong");
      // console.log(e);
    }

    try {
      const appPermitToDoResponse = await axios.post(
        "http://localhost:4000/getapppermittodo",
        {
          token: localStorage.getItem("token"),
          App_Acronym: AppName,
        }
      );

      const response = await axios.post("http://localhost:4000/checkmygroup", {
        token: localStorage.getItem("token"),
        groupName: appPermitToDoResponse.data.data,
      });

      if (response.data.isAdmin === true) {
        props.setappPermitToDo(true);
      } else {
        props.setappPermitToDo(false);
      }
    } catch (e) {
      console.log("wrong");
      // console.log(e);
    }

    try {
      const appPermitDoingResponse = await axios.post(
        "http://localhost:4000/getapppermitdoing",
        {
          token: localStorage.getItem("token"),
          App_Acronym: AppName,
        }
      );

      const response = await axios.post("http://localhost:4000/checkmygroup", {
        token: localStorage.getItem("token"),
        groupName: appPermitDoingResponse.data.data,
      });

      if (response.data.isAdmin === true) {
        props.setappPermitDoing(true);
      } else {
        props.setappPermitDoing(false);
      }
    } catch (e) {
      console.log("wrong");
      // console.log(e);
    }

    try {
      const appPermitDoneResponse = await axios.post(
        "http://localhost:4000/getapppermitdone",
        {
          token: localStorage.getItem("token"),
          App_Acronym: AppName,
        }
      );

      const response = await axios.post("http://localhost:4000/checkmygroup", {
        token: localStorage.getItem("token"),
        groupName: appPermitDoneResponse.data.data,
      });

      if (response.data.isAdmin === true) {
        props.setappPermitDone(true);
      } else {
        props.setappPermitDone(false);
      }
    } catch (e) {
      console.log("wrong");
      // console.log(e);
    }

    try {
      const appPermitCreateResponse = await axios.post(
        "http://localhost:4000/getapppermitcreate",
        {
          token: localStorage.getItem("token"),
          App_Acronym: AppName,
        }
      );

      const response = await axios.post("http://localhost:4000/checkmygroup", {
        token: localStorage.getItem("token"),
        groupName: appPermitCreateResponse.data.data,
      });

      if (response.data.isAdmin === true) {
        props.setappPermitCreate(true);
      } else {
        props.setappPermitCreate(false);
      }
    } catch (e) {
      console.log("wrong");
      // console.log(e);
    }

    navigate(path);
  }

  useEffect(() => {
    // Fetch user details from the server
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post("http://localhost:4000/getappdetails", { token })
        .then((response) => {
          const data = response.data.data;
          setAppDetails(data);
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

  function shortDesc(description) {
    if (description == null) {
      return "";
    } else if (description.length > 40) {
      return description.slice(0, 37) + "...";
    }
  }

  return (
    <div className="container py-md-5">
      <div className="row align-items-center">
        <div className="col-lg-12">
          <h1 className="display-3">App List</h1>
          <h2>
            {props.isProjectLead ? (
              <>
                <button
                  onClick={() => handleOnClick("/CreateNewApp")}
                  className="btn btn-sm btn-primary"
                >
                  Create new application
                </button>
              </>
            ) : null}
          </h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>App Acronym</th>
                <th>App Rnumber</th>
                <th>App Description</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>View app tasks</th>
                <th>View app details</th>
              </tr>
            </thead>
            <tbody>
              {AppDetails.map((user, index) => (
                <tr key={index}>
                  <td>{user.App_Acronym}</td>
                  <td>{user.App_Rnumber}</td>
                  <td>{shortDesc(user.App_Description)}</td>
                  <td>{user.App_startDate}</td>
                  <td>{user.App_endDate}</td>

                  <td>
                    <button
                      onClick={() =>
                        handleOnClickTask("/KanbanBoard", user.App_Acronym)
                      }
                      className="btn btn-sm btn-primary"
                    >
                      View Tasks
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        handleOnClickTask("/ViewAppDetails", user.App_Acronym)
                      }
                      className="btn btn-sm btn-primary"
                    >
                      View App Details
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

export default GetAppDetails;
