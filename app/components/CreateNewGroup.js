import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";

function CreateNewGroup(props) {
  const navigate = useNavigate();
  const [newUserGroup, setnewUserGroup] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!(await isActive())) {
      props.setLogin(false);
      return;
    }
    try {
      const isAdmin = await axios.post("http://localhost:4000/checkmygroup", {
        token: localStorage.getItem("token"),
        groupName: "admin",
      });
      if (isAdmin.data.isAdmin === true) {
        props.setisAdmin(true);
      } else {
        props.setisAdmin(false);
        return false;
      }
    } catch (e) {
      console.log("wrong");
      // console.log(e);
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
          //props.setLogin(false);
          return false;
        }
      } catch (error) {
        //console.error(error);
        return false;
      }
      return true;
    }

    try {
      const response = await axios.post("http://localhost:4000/creategroup", {
        usergroup: newUserGroup,
        token: localStorage.getItem("token"),
      });
      if (response.data.response === "success") {
        alert("Group added!");
      }
      if (response.data.error === "User group already exists!") {
        alert("User group already exists!");
      }
      if (response.data.error === "You do not have access to this resource!") {
        alert("You do not have access to this resource!");
      }

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
      navigate("/CreateNewGroup");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container py-md-5">
      <div className="row align-items-center">
        <div className="col-lg-7 py-3 py-md-5">
          <form onSubmit={handleSubmit}>
            <h1 className="display-3">Create New User Group</h1>
            <div className="form-group">
              <label htmlFor="username-register" className="text-muted mb-1">
                <small>New User Group Name</small>
              </label>
              <input
                id="username-register"
                name="username"
                className="form-control"
                type="text"
                placeholder="Input New User Group"
                autoComplete="off"
                value={newUserGroup}
                onChange={(e) => setnewUserGroup(e.target.value)}
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

export default CreateNewGroup;
