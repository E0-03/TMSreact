import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Select from "react-select";

function PromoteTask(props) {
  const navigate = useNavigate();
  const [Task_notes, setTask_notes] = useState("");
  const [planGroups, setPlanGroups] = useState("");
  const [planOptions, setPlanOptions] = useState([]);
  const [Task_plan, setTask_plan] = useState("");
  const [The_plan, setThe_plan] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

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
      navigate(`/KanbanBoard?App_Acronym=${props.App_Acronym}`);
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
      navigate(`/KanbanBoard?App_Acronym=${props.App_Acronym}`);
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
      navigate(`/KanbanBoard?App_Acronym=${props.App_Acronym}`);
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
      navigate(`/KanbanBoard?App_Acronym=${props.App_Acronym}`);
      return;
    }

    if (!(await isActive())) {
      props.setLogin(false);
      return;
    }

    // const isPermitOpen = await ispermitopen();
    // console.log(isPermitOpen);
    // console.log(props.TaskState);

    // if (!(await ispermitopen()) && props.TaskState === 1) {
    //   alert("You are not authorized to perform this action.");
    //   navigate("/KanbanBoard");
    //   return;
    // }

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

    // if (props.TaskState === 1) {
    //   let result = await ispermitopen();
    //   if (result === false) {
    //     alert("You are not authorized to perform this action.");
    //     navigate("/KanbanBoard");
    //     return;
    //   }
    // }
    // if (props.TaskState === 2) {
    //   let result = await ispermittodo();
    //   if (result === false) {
    //     alert("You are not authorized to perform this action.");
    //     navigate("/KanbanBoard");
    //     return;
    //   } else {
    //     navigate(path);
    //   }
    // }

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

    try {
      const response = await axios.post("http://localhost:4000/promotetask", {
        Task_id: props.Task_id,
        Task_notes,
        Task_plan,
        token: localStorage.getItem("token"),
      });

      // Redirect to the same page to reset the form
      if (response.data.error) {
        alert(response.data.error);
      }

      navigate(`/KanbanBoard?App_Acronym=${props.App_Acronym}`);
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
            <h1 className="display-3">Promote {props.Task_id}</h1>
            <h2>
              <button
                onClick={() =>
                  handleOnClick(`/KanbanBoard?App_Acronym=${props.App_Acronym}`)
                }
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
              Promote
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PromoteTask;
