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

function EditTask(props) {
  const navigate = useNavigate();
  const [planGroups, setPlanGroups] = useState("");
  const [planOptions, setPlanOptions] = useState([]);
  const [Task_notes, setTask_notes] = useState("");
  const [Task_plan, setTask_plan] = useState("");
  const [The_plan, setThe_plan] = useState("");

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
      const response = await axios.post("http://localhost:4000/edittask", {
        token: localStorage.getItem("token"),
        Task_id: props.Task_id,
        Task_notes,
        Task_plan,
      });

      if (
        response.data.message === "Task notes and plan updated successfully"
      ) {
        alert("Task updated successfully");
        // setPlan_MVP_name("");
        // setPlan_startDate("");
        // setPlan_endDate("");
        // setPlan_app_Acronym([]);
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
  }, []);

  const handleTask_planChange = (selectedOptions) => {
    setPlanGroups(selectedOptions);
    setTask_plan(selectedOptions.value);
    console.log(selectedOptions);
  };

  const handleOnClick = (path) => {
    navigate(path);
  };

  /* const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };*/

  return (
    <div className="container py-md-5">
      <div className="row align-items-center">
        <div className="col-lg-7 py-3 py-md-5">
          <form onSubmit={handleSubmit}>
            <h1 className="display-3">Edit {props.Task_id}</h1>
            <h2>
              <button
                onClick={() => handleOnClick("/KanbanBoard")}
                className="btn btn-sm btn-primary"
              >
                back
              </button>
            </h2>
            <div className="form-group">
              <label htmlFor="Task_notes-register" className="text-muted mb-1">
                <small>Task Notes</small>
              </label>
              <textarea
                id="Task_notes-register"
                name="Task_notes"
                className="form-control"
                type="text"
                placeholder="Task notes"
                autoComplete="off"
                rows="4"
                cols="50"
                value={Task_notes}
                onChange={(e) => setTask_notes(e.target.value)}
              />
            </div>
            {props.TaskState === 1 && (
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
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditTask;
