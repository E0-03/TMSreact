import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// async function isActive() {
//   try {
//     const activeresponse = await axios.post("http://localhost:4000/isactive", {
//       token: localStorage.getItem("token"),
//     });
//     if (activeresponse.data.status === 0) {
//       return false;
//     }
//   } catch (error) {
//     return false;
//   }
//   return true;
// }

function CreateNewPlan(props) {
  const navigate = useNavigate();
  const [userGroups, setUserGroups] = useState([]);
  //   const [status, setStatus] = useState(1);
  //   const [newUser, setNewUser] = useState("");
  //   const [newEmail, setNewEmail] = useState("");
  //   const [newPassword, setNewPassword] = useState("");
  const [groupOptions, setGroupOptions] = useState([]);
  const [Plan_MVP_name, setPlan_MVP_name] = useState("");
  const [Plan_startDate, setPlan_startDate] = useState("");
  const [Plan_endDate, setPlan_endDate] = useState("");
  const [Plan_app_Acronym, setPlan_app_Acronym] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();

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

    // if (!(await isActive())) {
    //   props.setLogin(false);
    //   return;
    // }

    // let stringedappacronym = userGroups.value; // if blank, then does not add to usergroup
    // if (userGroups.length < 1) {
    //   stringedgroups = null;
    // }

    // for (var i = 0; i < userGroups.length; i++) {
    //   stringedgroups += userGroups[i].value + ",";
    // } // adds commas to the beginning and end of the string

    // try {
    //   const isAdmin = await axios.post("http://localhost:4000/checkmygroup", {
    //     token: localStorage.getItem("token"),
    //     groupName: "admin",
    //   });
    //   if (isAdmin.data.isAdmin === true) {
    //     props.setisAdmin(true);
    //   } else {
    //     props.setisAdmin(false);
    //     return false;
    //   }
    // } catch (e) {
    //   console.log("wrong");
    //   // console.log(e);
    // }

    try {
      const response = await axios.post("http://localhost:4000/createplan", {
        token: localStorage.getItem("token"),
        Plan_MVP_name,
        Plan_startDate,
        Plan_endDate,
        Plan_app_Acronym: props.App_Acronym,
      });

      if (response.data.success === "Plan created successfully") {
        alert("Plan created successfully!");
        setPlan_MVP_name("");
        setPlan_startDate("");
        setPlan_endDate("");
        setPlan_app_Acronym([]);
      }
      if (response.data.error === "Error executing the query") {
        alert("Plan_MVP_name already exists!");
      }
      if (response.data.error === "Plan_app_Acronym does not exist") {
        alert("Plan_app_Acronym is Mandatory");
      }

      navigate("/CreateNewPlan");
    } catch (error) {
      console.error(error);
    }
  }

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     console.log("missing token");
  //     // handle missing token
  //     return;
  //   }

  //   axios
  //     .post("http://localhost:4000/getappacronyms", {
  //       token: token,
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       if (res.data.error) {
  //         console.log(res.data.error);
  //         // handle error
  //         return;
  //       }

  //       if (res.data.groups) {
  //         const options = res.data.groups.map((group) => ({
  //           value: group.toLowerCase(),
  //           label: group,
  //         }));
  //         setGroupOptions(options);
  //       }
  //     })
  //     .catch((error) => console.error(error));
  // }, []);

  const handleUserGroupsChange = (selectedOptions) => {
    setUserGroups(selectedOptions);
    setPlan_app_Acronym(selectedOptions.value);
    console.log(selectedOptions);
  };

  /* const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };*/

  const handleOnClick = (path) => {
    navigate(path);
  };

  return (
    <div className="container py-md-5">
      <div className="row align-items-center">
        <div className="col-lg-7 py-3 py-md-5">
          <form onSubmit={handleSubmit}>
            <h1 className="display-3">Create New Plan</h1>
            <h2>
              <button
                onClick={() => handleOnClick("/KanbanBoard")}
                className="btn btn-sm btn-primary"
              >
                back
              </button>
            </h2>
            <div className="form-group">
              <label htmlFor="username-register" className="text-muted mb-1">
                <small>Plan_MVP_name*</small>
              </label>
              <input
                id="Plan_MVP_name-register"
                name="Plan_MVP_name"
                className="form-control"
                type="text"
                placeholder="Plan MVP name"
                autoComplete="off"
                value={Plan_MVP_name}
                onChange={(e) => setPlan_MVP_name(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="appStartDate" className="text-muted mb-1">
                <small>Plan Start Date</small>
              </label>
              <input
                id="Plan_startDate"
                name="Plan_startDate"
                className="form-control"
                type="date"
                value={Plan_startDate}
                onChange={(e) => setPlan_startDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="appEndDate" className="text-muted mb-1">
                <small>Plan End Date</small>
              </label>
              <input
                id="Plan_endDate"
                name="Plan_endDate"
                className="form-control"
                type="date"
                value={Plan_endDate}
                onChange={(e) => setPlan_endDate(e.target.value)}
              />
            </div>
            {/* <div className="form-group">
              <label className="text-muted mb-1">
                <small>App Acronym</small>
              </label>
              <Select
                options={groupOptions}
                value={userGroups}
                onChange={handleUserGroupsChange}
              />
            </div> */}
            <button
              type="submit"
              className="py-3 mt-4 btn btn-lg btn-success btn-block"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateNewPlan;
