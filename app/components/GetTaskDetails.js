import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function GetTaskDetails(props) {
  const [taskDetails, setTaskDetails] = useState({});
  const [taskNotes, setTaskNotes] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch task details from the server
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post("http://localhost:4000/viewtaskdetails", {
          token,
          Task_id: props.Task_id,
        })
        .then((response) => {
          const taskData = response.data.response;
          setTaskDetails(taskData);
        })
        .catch((error) => {
          console.error("Error fetching task details:", error);
        });

      axios
        .post("http://localhost:4000/gettasknotes", {
          token,
          Task_id: props.Task_id,
        })
        .then((response) => {
          const notesData = response.data.data;
          setTaskNotes(getNotes(notesData));
          // console.log(getNotes(notesData));
        })
        .catch((error) => {
          console.error("Error fetching task notes:", error);
        });
    }
  }, []);

  // loop through noteData array and apphend to a string
  // return the string
  function getNotes(notesData) {
    let notes = "";
    for (let i = 0; i < notesData.length; i++) {
      notes +=
        "Task Action: " +
        notesData[i].Task_notes +
        "\n" +
        "Edited by: " +
        notesData[i].username +
        "\n" +
        "Task state: " +
        notesData[i].Task_state +
        "\n" +
        "Time stamp: " +
        notesData[i].Timestamp +
        "\n" +
        "-----------------------\n";
    }
    return notes;
  }

  const handleOnClick = (path) => {
    navigate(path);
  };

  return (
    <div className="container py-md-5">
      <div className="row align-items-center">
        <div className="col-lg-12">
          <h1 className="display-3">Task Details</h1>
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
          {Object.keys(taskDetails).length > 0 ? (
            <div>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Task Details</h5>
                  <p>
                    <strong>Task id:</strong> {taskDetails.Task_id}
                  </p>
                  <p>
                    <strong>Task Name:</strong> {taskDetails.Task_name}
                  </p>
                  <p>
                    <strong>Task Description:</strong>{" "}
                    <textarea
                      readOnly
                      rows="4"
                      cols="80"
                      value={taskDetails.Task_description}
                    />
                  </p>
                  <p>
                    <strong>Task Plan:</strong> {taskDetails.Task_plan}
                  </p>
                  <p>
                    <strong>Task State:</strong> {taskDetails.Task_state}
                  </p>
                  <p>
                    <strong>Task Creator:</strong> {taskDetails.Task_creator}
                  </p>
                  <p>
                    <strong>Task Owner:</strong> {taskDetails.Task_owner}
                  </p>
                  <p>
                    <strong>Task Creation Date:</strong>{" "}
                    {taskDetails.Task_createDate}
                  </p>
                </div>
              </div>
              <div className="card mt-4">
                <div className="card-body">
                  <h5 className="card-title">Audit Trail</h5>
                  <textarea
                    readOnly
                    rows="4"
                    cols="120"
                    defaultValue={taskNotes}
                  ></textarea>
                  {/* <ul>
                    {taskNotes.map((note, index) => (
                      <li key={index}>
                        {note.Task_notes}, Edited by: {note.username}, Task
                        state: {note.Task_state}, Time stamp: {note.Timestamp}
                      </li>
                    ))}
                  </ul> */}
                </div>
              </div>
            </div>
          ) : (
            <p>Loading task details...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default GetTaskDetails;
