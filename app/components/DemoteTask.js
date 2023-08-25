import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Select from "react-select";

function DemoteTask(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [Task_notes, setTask_notes] = useState("");
  const [planGroups, setPlanGroups] = useState("");
  const [planOptions, setPlanOptions] = useState([]);
  const [Task_plan, setTask_plan] = useState(
    location.state ? location.state.Task_plan : ""
  );
  const [The_plan, setThe_plan] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!(await isActive())) {
      props.setLogin(false);
      return;
    }

    async function ispermitopen() {
      try {
        const appPermitOpenResponse = await axios.post(
          "http://localhost:4000/getapppermitopen",
          {
            token: localStorage.getItem("token"),
            App_Acronym: props.App_Acronym,
          }
        );

        // console.log(appPermitOpenResponse.data.data);
        // console.log(props.App_Acronym);

        const response = await axios.post(
          "http://localhost:4000/checkmygroup",
          {
            token: localStorage.getItem("token"),
            groupName: appPermitOpenResponse.data.data,
          }
        );

        if (response.data.error === null) {
          props.setappPermitOpen(true);
          return true;
        } else {
          props.setappPermitOpen(false);
          return false;
        }
      } catch (e) {
        console.log("wrong");
        console.log(e);
        // return false;
      }
      // return true;
    }

    if (!(await ispermitopen()) && props.TaskState === 1) {
      alert("You are not authorized to perform this action.");
      navigate("/KanbanBoard");
      return;
    }

    async function ispermittodo() {
      try {
        const appPermitToDoResponse = await axios.post(
          "http://localhost:4000/getapppermittodo",
          {
            token: localStorage.getItem("token"),
            App_Acronym: props.App_Acronym,
          }
        );

        const response = await axios.post(
          "http://localhost:4000/checkmygroup",
          {
            token: localStorage.getItem("token"),
            groupName: appPermitToDoResponse.data.data,
          }
        );

        if (response.data.error === null) {
          props.setappPermitToDo(true);
          return true;
        } else {
          props.setappPermitToDo(false);
          return false;
        }
      } catch (e) {
        console.log("wrong");
        // console.log(e);
        // return false;
      }
    }

    if (!(await ispermittodo()) && props.TaskState === 2) {
      alert("You are not authorized to perform this action.");
      navigate("/KanbanBoard");
      return;
    }

    async function ispermitdoing() {
      try {
        const appPermitDoingResponse = await axios.post(
          "http://localhost:4000/getapppermitdoing",
          {
            token: localStorage.getItem("token"),
            App_Acronym: props.App_Acronym,
          }
        );

        const response = await axios.post(
          "http://localhost:4000/checkmygroup",
          {
            token: localStorage.getItem("token"),
            groupName: appPermitDoingResponse.data.data,
          }
        );

        if (response.data.error === null) {
          props.setappPermitDoing(true);
          return true;
        } else {
          props.setappPermitDoing(false);
          return false;
        }
      } catch (e) {
        console.log("wrong");
        // console.log(e);
        return false;
      }
    }

    if (!(await ispermitdoing()) && props.TaskState === 3) {
      alert("You are not authorized to perform this action.");
      navigate("/KanbanBoard");
      return;
    }

    async function ispermitdone() {
      try {
        const appPermitDoneResponse = await axios.post(
          "http://localhost:4000/getapppermitdone",
          {
            token: localStorage.getItem("token"),
            App_Acronym: props.App_Acronym,
          }
        );

        const response = await axios.post(
          "http://localhost:4000/checkmygroup",
          {
            token: localStorage.getItem("token"),
            groupName: appPermitDoneResponse.data.data,
          }
        );

        if (response.data.error === null) {
          props.setappPermitDone(true);
          return true;
        } else {
          props.setappPermitDone(false);
          return false;
        }
      } catch (e) {
        console.log("wrong");
        // console.log(e);
        return false;
      }
    }

    if (!(await ispermitdone()) && props.TaskState === 4) {
      alert("You are not authorized to perform this action.");
      navigate("/KanbanBoard");
      return;
    }

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

    const invalidStrings = [
      "-->>>--",
      "--<<<--",
      "~~>>>~~",
      "~~<<<~~",
      "==>>>==",
      "==<<<==",
      "++>>>++",
      "++<<<++",
    ];

    for (const invalidStr of invalidStrings) {
      if (Task_notes.includes(invalidStr)) {
        alert("Task_notes has invalid characters!");
        return; // Exit the function early
      }
    }

    // if (!(await isActive())) {
    //   props.setLogin(false);
    //   return;
    // }
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

    // async function isActive() {
    //   try {
    //     const activeresponse = await axios.post(
    //       "http://localhost:4000/isactive",
    //       {
    //         token: localStorage.getItem("token"),
    //       }
    //     );
    //     if (activeresponse.data.status === 0) {
    //       //props.setLogin(false);
    //       return false;
    //     }
    //   } catch (error) {
    //     //console.error(error);
    //     return false;
    //   }
    //   return true;
    // }

    try {
      const response = await axios.post("http://localhost:4000/demotetask", {
        Task_id: props.Task_id,
        Task_notes,
        Task_plan,
        token: localStorage.getItem("token"),
      });
      //   if (response.data.response === "success") {
      //     alert("Group added!");
      //   }
      //   if (response.data.error === "User group already exists!") {
      //     alert("User group already exists!");
      //   }
      //   if (response.data.error === "You do not have access to this resource!") {
      //     alert("You do not have access to this resource!");
      //   }

      /*if (response.data.error) {
        // If there is an error, set the error message and clear it after 5 seconds
        setMessage(response.data.error);
        setTimeout(() => setMessage(""), 5000);
      } else {
        // If success, set the success message and clear it after 5 seconds
        setMessage("Group added!");
        setTimeout(() => setMessage(""), 5000);
      }

      // Clear the form input after submission
      setnewUserGroup("");*/

      // Redirect to the same page to reset the form

      if (response.data.error) {
        alert(response.data.error);
      }
      navigate("/KanbanBoard");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("missing token");
      // handle missing token
      return;
    }

    axios
      .post("http://localhost:4000/viewtaskdetails", {
        token,
        Task_id: props.Task_id,
      })
      .then((response) => {
        const taskData = response.data.response.Task_plan;
        setThe_plan(taskData);
      })
      .catch((error) => {
        console.error("Error fetching task details:", error);
      });

    axios
      .post("http://localhost:4000/getplanname", {
        token: token,
        Plan_app_Acronym: props.App_Acronym,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.error) {
          console.log(res.data.error);
          // handle error
          return;
        }

        if (res.data.groups) {
          const plan = res.data.groups.map((group) => ({
            value: group.toLowerCase(),
            label: group,
          }));
          setPlanOptions(plan);
        }
      })
      .catch((error) => console.error(error));
    const selectedPlan = planOptions.find(
      (option) => option.value === Task_plan
    );
    if (selectedPlan) {
      setPlanGroups(selectedPlan);
    }
  }, []);

  const handleTask_planChange = (selectedOptions) => {
    setPlanGroups(selectedOptions);
    setTask_plan(selectedOptions.value);
    console.log(selectedOptions);
  };

  const handleOnClick = (path) => {
    navigate(path);
  };

  return (
    <div className="container py-md-5">
      <div className="row align-items-center">
        <div className="col-lg-7 py-3 py-md-5">
          <form onSubmit={handleSubmit}>
            <h1 className="display-3">Demote {props.Task_id}</h1>
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
                <small>Task Notes</small>
              </label>
              <textarea
                id="username-register"
                name="username"
                className="form-control"
                type="text"
                placeholder="Task Notes"
                autoComplete="off"
                rows="4"
                cols="50"
                value={Task_notes}
                onChange={(e) => setTask_notes(e.target.value)}
              />
            </div>
            {props.TaskState === 4 && (
              <div className="form-group">
                <label className="text-muted mb-1">
                  <small>Task Plan</small>
                </label>
                <Select
                  options={planOptions}
                  value={planGroups}
                  onChange={handleTask_planChange}
                />
              </div>
            )}
            <p>Current Task Plan: {The_plan}</p>
            <button
              type="submit"
              className="py-3 mt-4 btn btn-lg btn-success btn-block"
            >
              Demote
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DemoteTask;
