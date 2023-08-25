import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ViewAppDetails(props) {
  const [taskDetails, setTaskDetails] = useState({});
  const [taskNotes, setTaskNotes] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch task details from the server
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post("http://localhost:4000/getappdetailsforoneapp", {
          token,
          App_Acronym: props.App_Acronym,
        })
        .then((response) => {
          const appData = response.data.response;
          setTaskDetails(appData);
          setTaskNotes(appData.App_Description);
        })
        .catch((error) => {
          console.error("Error fetching task details:", error);
        });

      //   axios
      //     .post("http://localhost:4000/gettasknotes", {
      //       token,
      //       Task_id: props.Task_id,
      //     })
      //     .then((response) => {
      //       const notesData = response.data.data;
      //       setTaskNotes(getNotes(notesData));
      //       // console.log(getNotes(notesData));
      //     })
      //     .catch((error) => {
      //       console.error("Error fetching task notes:", error);
      //     });
    }
  }, []);

  // loop through noteData array and apphend to a string
  // return the string
  //   function getNotes(notesData) {
  //     let notes = "";
  //     for (let i = 0; i < notesData.length; i++) {
  //       notes +=
  //         "Task notes: " +
  //         notesData[i].Task_notes +
  //         "\n" +
  //         "Edited by: " +
  //         notesData[i].username +
  //         "\n" +
  //         "Task state: " +
  //         notesData[i].Task_state +
  //         "\n" +
  //         "Time stamp: " +
  //         notesData[i].Timestamp +
  //         "\n" +
  //         "-----------------------\n";
  //     }
  //     return notes;
  //   }

  function handleOnClick(path) {
    navigate(path);
  }

  return (
    <div className="container py-md-5">
      <div className="row align-items-center">
        <div className="col-lg-12">
          <h1 className="display-3">App Details</h1>
          <h2>
            <button
              onClick={() => handleOnClick("/GetAppDetails")}
              className="btn btn-sm btn-primary"
            >
              back
            </button>
          </h2>
          <h2>
            {props.isProjectLead ? (
              <>
                <button
                  onClick={() => handleOnClick("/EditApp")}
                  className="btn btn-sm btn-primary"
                >
                  Edit App
                </button>
              </>
            ) : null}
          </h2>
          {Object.keys(taskDetails).length > 0 ? (
            <div>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">App Details</h5>
                  <p>
                    <strong>App Acronym:</strong> {taskDetails.App_Acronym}
                  </p>
                  <p>
                    <strong>App_Rnumber:</strong> {taskDetails.App_Rnumber}
                  </p>
                  <p>
                    <strong>App start date:</strong> {taskDetails.App_startDate}
                  </p>
                  <p>
                    <strong>App end date:</strong> {taskDetails.App_endDate}
                  </p>
                  <p>
                    <strong>App permit Open:</strong>{" "}
                    {taskDetails.App_permit_Open}
                  </p>
                  <p>
                    <strong>App permit to do:</strong>{" "}
                    {taskDetails.App_permit_toDoList}
                  </p>
                  <p>
                    <strong>App permit doing:</strong>{" "}
                    {taskDetails.App_permit_Doing}
                  </p>
                  <p>
                    <strong>App permit create:</strong>{" "}
                    {taskDetails.App_permit_create}
                  </p>
                  <p>
                    <strong>App permit done:</strong>{" "}
                    {taskDetails.App_permit_Done}
                  </p>
                </div>
              </div>
              <div className="card mt-4">
                <div className="card-body">
                  <h5 className="card-title">App Description</h5>
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

export default ViewAppDetails;
