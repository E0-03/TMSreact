import React, { useState, useEffect } from "react";
import "./KanbanBoard.css"; // Import your CSS styles
import { useNavigate } from "react-router-dom";
import axios from "axios";

function KanbanBoard(props) {
  // Placeholder tasks
  // const initialTasks = [
  //   { id: 1, title: "Task 1", column: "Open" },
  //   { id: 2, title: "Task 2", column: "To-Do" },
  //   { id: 3, title: "Task 3", column: "Doing" },
  //   { id: 4, title: "Task 4", column: "Done" },
  //   { id: 5, title: "Task 5", column: "Completed" },
  // ];

  // const [tasks, setTasks] = useState(initialTasks);
  // const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  async function ispermitopen() {
    try {
      const appPermitOpenResponse = await axios.post(
        "http://localhost:4000/getapppermitopen",
        {
          token: localStorage.getItem("token"),
          App_Acronym: props.App_Acronym,
        }
      );

      const response = await axios.post("http://localhost:4000/checkmygroup", {
        token: localStorage.getItem("token"),
        groupName: appPermitOpenResponse.data.data,
      });

      if (response.data.isAdmin === true) {
        props.setappPermitOpen(true);
        return true;
      } else {
        props.setappPermitOpen(false);
        return false;
      }
    } catch (e) {
      console.log("wrong");
      // console.log(e);
      return false;
    }
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

      const response = await axios.post("http://localhost:4000/checkmygroup", {
        token: localStorage.getItem("token"),
        groupName: appPermitToDoResponse.data.data,
      });

      if (response.data.isAdmin === true) {
        props.setappPermitToDo(true);
        return true;
      } else {
        props.setappPermitToDo(false);
        return false;
      }
    } catch (e) {
      console.log("wrong");
      // console.log(e);
      return false;
    }
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

      const response = await axios.post("http://localhost:4000/checkmygroup", {
        token: localStorage.getItem("token"),
        groupName: appPermitDoingResponse.data.data,
      });

      if (response.data.isAdmin === true) {
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

  async function ispermitdone() {
    try {
      const appPermitDoneResponse = await axios.post(
        "http://localhost:4000/getapppermitdone",
        {
          token: localStorage.getItem("token"),
          App_Acronym: props.App_Acronym,
        }
      );

      const response = await axios.post("http://localhost:4000/checkmygroup", {
        token: localStorage.getItem("token"),
        groupName: appPermitDoneResponse.data.data,
      });

      if (response.data.isAdmin === true) {
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

  async function ispermitcreate() {
    try {
      const appPermitCreateResponse = await axios.post(
        "http://localhost:4000/getapppermitcreate",
        {
          token: localStorage.getItem("token"),
          App_Acronym: props.App_Acronym,
        }
      );

      const response = await axios.post("http://localhost:4000/checkmygroup", {
        token: localStorage.getItem("token"),
        groupName: appPermitCreateResponse.data.data,
      });

      if (response.data.isAdmin === true) {
        props.setappPermitCreate(true);
        return true;
      } else {
        props.setappPermitCreate(false);
        return false;
      }
    } catch (e) {
      console.log("wrong");
      // console.log(e);
      return false;
    }
  }

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000/gettaskdetailskanban",
          {
            token: localStorage.getItem("token"),
            Task_app_Acronym: props.App_Acronym,
          }
        );

        if (response.data.error === null) {
          const processedTasks = response.data.response.map((task) => ({
            id: task.Task_id,
            title: task.Task_name,
            plan: task.Task_plan,
            column: task.Task_state,
          }));

          setTasks(processedTasks);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [props.App_Acronym]);

  async function handleOnClick(path) {
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
    navigate(path);
  }

  async function handleOnClickinboard(path, taskId) {
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

    // try {
    //   const taskstate = await axios.post(
    //     "http://localhost:4000/viewtaskdetails",
    //     {
    //       token: localStorage.getItem("token"),
    //       Task_id: props.Task_id,
    //     }
    //   );
    //   if (taskstate.data.response.Task_state === 4) {
    //     props.setTaskState(4);
    //   }
    //   if (taskstate.data.response.Task_state === 1) {
    //     props.setTaskState(1);
    //   } else {
    //     navigate(path);
    //   }
    // } catch (error) {
    //   console.error("Error", error);
    // }

    props.setTask_id(taskId); // Update the Task_id state
    navigate(path);
  }

  async function handleOnClickCreateNewTask(path, taskId) {
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

    if (!(await ispermitcreate())) {
      navigate("/KanbanBoard");
      return;
    } else {
      navigate(path);
    }
    props.setTask_id(taskId); // Update the Task_id state
  }

  async function handleOnClickCreateNewPlan(path, taskId) {
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

    if (!props.isProjectManager) {
      navigate("/KanbanBoard");
      return;
    } else {
      navigate(path);
    }
    props.setTask_id(taskId); // Update the Task_id state
  }

  async function handleOnClickinboardcheck(path, taskId, taskPlan) {
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

    try {
      const taskstate = await axios.post(
        "http://localhost:4000/viewtaskdetails",
        {
          token: localStorage.getItem("token"),
          Task_id: taskId,
        }
      );

      if (taskstate.data.error) {
        navigate("/KanbanBoard");
        return;
      }
      if (taskstate.data.response.Task_state === "Open") {
        props.setTaskState(1);

        let result = await ispermitopen();
        if (result === false) {
          navigate("/KanbanBoard");
        } else {
          navigate(path);
        }
      }
      if (taskstate.data.response.Task_state === "To-Do") {
        props.setTaskState(2);

        let result = await ispermittodo();
        if (result === false) {
          navigate("/KanbanBoard");
        } else {
          navigate(path);
        }
      }
      if (taskstate.data.response.Task_state === "Doing") {
        props.setTaskState(3);

        let result = await ispermitdoing();
        if (result === false) {
          navigate("/KanbanBoard");
        } else {
          navigate(path);
        }
      }
      if (taskstate.data.response.Task_state === "Done") {
        props.setTaskState(4);

        let result = await ispermitdone();
        if (result === false) {
          navigate("/KanbanBoard");
        } else {
          navigate(path, {
            state: {
              Task_id: taskId,
              Task_plan: taskPlan, // Pass Task_plan as a URL parameter
            },
          });
        }
      }
      // if (taskstate.data.response.Task_state === 5) {
      //   props.setTaskState(5);

      //   let result = await ispermitcreate();
      //   if (result === false) {
      //     navigate("/KanbanBoard");
      //   } else {
      //     navigate(path);
      //   }
      // }
    } catch (error) {
      console.error("Error", error);
    }

    props.setTask_id(taskId); // Update the Task_id state
    //navigate(path);
  }

  return (
    <div className="kanban-board">
      <h1 className="board-title">Kanban Board for {props.App_Acronym}</h1>
      <h2>
        <button
          onClick={() => handleOnClick("/GetAppDetails")}
          className="btn btn-sm btn-primary"
        >
          back
        </button>
      </h2>
      {props.appPermitCreate ? (
        <>
          <button
            onClick={() => handleOnClickCreateNewTask("/CreateNewTask")}
            className="btn btn-sm btn-primary"
          >
            Create New Task
          </button>
        </>
      ) : null}
      {props.isProjectManager ? (
        <>
          <button
            onClick={() => handleOnClickCreateNewPlan("/CreateNewPlan")}
            className="btn btn-sm btn-primary"
          >
            Create New Plan
          </button>
          <button
            onClick={() => handleOnClickCreateNewPlan("/GetPlanDetails")}
            className="btn btn-sm btn-primary"
          >
            Edit Plan
          </button>
        </>
      ) : null}
      <div className="kanban-columns">
        <div className="kanban-column">
          <h2>Open</h2>
          {tasks.map((task) => {
            if (task.column === 1) {
              return (
                <div key={task.id} className="kanban-task">
                  <p>Task_id: {task.id}</p>
                  <p>Task_name: {task.title}</p>
                  <p>Task_plan: {task.plan}</p>
                  <div className="button-container">
                    <button
                      onClick={() =>
                        handleOnClickinboard("/GetTaskDetails", task.id)
                      }
                      className="btn btn-sm btn-primary"
                    >
                      View
                    </button>
                    {props.appPermitOpen ? (
                      <>
                        <button
                          onClick={() =>
                            handleOnClickinboardcheck("/EditTask", task.id)
                          }
                          className="btn btn-sm btn-primary"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleOnClickinboardcheck("/PromoteTask", task.id)
                          }
                          className="btn btn-sm btn-primary"
                        >
                          Promote
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
        <div className="kanban-column">
          <h2>To-Do</h2>
          {tasks.map((task) => {
            if (task.column === 2) {
              return (
                <div key={task.id} className="kanban-task">
                  <p>Task_id: {task.id}</p>
                  <p>Task_name: {task.title}</p>
                  <p>Task_plan: {task.plan}</p>
                  <div className="button-container">
                    <button
                      onClick={() =>
                        handleOnClickinboard("/GetTaskDetails", task.id)
                      }
                      className="btn btn-sm btn-primary"
                    >
                      View
                    </button>
                    {props.appPermitToDo ? (
                      <>
                        <button
                          onClick={() =>
                            handleOnClickinboardcheck("/EditTask", task.id)
                          }
                          className="btn btn-sm btn-primary"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleOnClickinboardcheck("/PromoteTask", task.id)
                          }
                          className="btn btn-sm btn-primary"
                        >
                          Promote
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
        <div className="kanban-column">
          <h2>Doing</h2>
          {tasks.map((task) => {
            if (task.column === 3) {
              return (
                <div key={task.id} className="kanban-task">
                  <p>Task_id: {task.id}</p>
                  <p>Task_name: {task.title}</p>
                  <p>Task_plan: {task.plan}</p>
                  <div className="button-container">
                    <button
                      onClick={() =>
                        handleOnClickinboard("/GetTaskDetails", task.id)
                      }
                      className="btn btn-sm btn-primary"
                    >
                      View
                    </button>
                    {props.appPermitDoing ? (
                      <>
                        <button
                          onClick={() =>
                            handleOnClickinboardcheck("/EditTask", task.id)
                          }
                          className="btn btn-sm btn-primary"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleOnClickinboardcheck("/PromoteTask", task.id)
                          }
                          className="btn btn-sm btn-primary"
                        >
                          Promote
                        </button>
                        <button
                          onClick={() =>
                            handleOnClickinboardcheck("/DemoteTask", task.id)
                          }
                          className="btn btn-sm btn-primary"
                        >
                          Demote
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
        <div className="kanban-column">
          <h2>Done</h2>
          {tasks.map((task) => {
            if (task.column === 4) {
              return (
                <div key={task.id} className="kanban-task">
                  <p>Task_id: {task.id}</p>
                  <p>Task_name: {task.title}</p>
                  <p>Task_plan: {task.plan}</p>
                  <div className="button-container">
                    <button
                      onClick={() =>
                        handleOnClickinboard("/GetTaskDetails", task.id)
                      }
                      className="btn btn-sm btn-primary"
                    >
                      View
                    </button>
                    {props.appPermitDone ? (
                      <>
                        <button
                          onClick={() =>
                            handleOnClickinboardcheck("/EditTask", task.id)
                          }
                          className="btn btn-sm btn-primary"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleOnClickinboardcheck("/PromoteTask", task.id)
                          }
                          className="btn btn-sm btn-primary"
                        >
                          Promote
                        </button>
                        <button
                          onClick={() =>
                            handleOnClickinboardcheck("/DemoteTask", task.id)
                          }
                          className="btn btn-sm btn-primary"
                        >
                          Demote
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
        <div className="kanban-column">
          <h2>Closed</h2>
          {tasks.map((task) => {
            if (task.column === 5) {
              return (
                <div key={task.id} className="kanban-task">
                  <p>Task_id: {task.id}</p>
                  <p>Task_name: {task.title}</p>
                  <p>Task_plan: {task.plan}</p>
                  <div className="button-container">
                    <button
                      onClick={() =>
                        handleOnClickinboard("/GetTaskDetails", task.id)
                      }
                      className="btn btn-sm btn-primary"
                    >
                      View
                    </button>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}

export default KanbanBoard;
