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

function CreateNewTask(props) {
  const navigate = useNavigate();
  // const [userGroups, setUserGroups] = useState("");
  const [planGroups, setPlanGroups] = useState("");
  //   const [status, setStatus] = useState(1);
  //   const [newUser, setNewUser] = useState("");
  //   const [newEmail, setNewEmail] = useState("");
  //   const [newPassword, setNewPassword] = useState("");
  // const [groupOptions, setGroupOptions] = useState([]);
  const [planOptions, setPlanOptions] = useState([]);
  const [Task_name, setTask_name] = useState("");
  const [Task_description, setTask_description] = useState("");
  const [Task_notes, setTask_notes] = useState("");
  const [Task_plan, setTask_plan] = useState("");
  // const [Task_app_Acronym, setTask_app_Acronym] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!(await isActive())) {
      props.setLogin(false);
      return;
    }

    async function ispermitcreate() {
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
          props.setappPermitCreate(true);
          return true;
        } else {
          props.setappPermitCreate(false);
          return false;
        }
      } catch (e) {
        console.log("wrong");
        // console.log(e);
        // return false;
      }
    }

    if (!(await ispermitcreate())) {
      alert("You are not authorized to perform this action.");
      navigate(`/KanbanBoard?App_Acronym=${props.App_Acronym}`);
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
      const response = await axios.post("http://localhost:4000/createtask", {
        token: localStorage.getItem("token"),
        Task_name,
        Task_description,
        Task_notes,
        Task_plan,
        Task_app_Acronym: props.App_Acronym,
      });

      if (response.data.success === "Task created successfully") {
        alert("Task created successfully!");
        navigate(`/KanbanBoard?App_Acronym=${props.App_Acronym}`);
        setTask_name("");
        setTask_description("");
        setTask_notes("");
        setTask_plan("");
        // setPlan_MVP_name("");
        // setPlan_startDate("");
        // setPlan_endDate("");
        // setPlan_app_Acronym([]);
      }
      if (response.data.error === "Task_name cannot be blank!") {
        alert("Task_name cannot be blank!");
      }
      if (response.data.error === "Task_app_Acronym cannot be blank!") {
        alert("Task_app_Acronym cannot be blank!");
      }

      navigate("/CreateNewTask");
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
      .post("http://localhost:4000/getappacronyms", {
        token: token,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.error) {
          console.log(res.data.error);
          // handle error
          return;
        }

        if (res.data.groups) {
          const options = res.data.groups.map((group) => ({
            value: group.toLowerCase(),
            label: group,
          }));
          setGroupOptions(options);
        }
      })
      .catch((error) => console.error(error));

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

  // const handleTask_app_AcronymChange = (selectedOptions) => {
  //   setUserGroups(selectedOptions);
  //   setTask_app_Acronym(selectedOptions.value);
  //   console.log(selectedOptions);
  // };

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
            <h1 className="display-3">Create New Task</h1>
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
              <label htmlFor="Task_name-register" className="text-muted mb-1">
                <small>Task Name*</small>
              </label>
              <input
                id="Task_name-register"
                name="Task_name"
                className="form-control"
                type="text"
                placeholder="Task name"
                autoComplete="off"
                value={Task_name}
                onChange={(e) => setTask_name(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="Task_description-register"
                className="text-muted mb-1"
              >
                <small>Task Description</small>
              </label>
              <textarea
                id="Task_description-register"
                name="Task_description"
                className="form-control"
                type="text"
                placeholder="Task description"
                autoComplete="off"
                rows="4"
                cols="50"
                value={Task_description}
                onChange={(e) => setTask_description(e.target.value)}
              />
            </div>
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

export default CreateNewTask;
