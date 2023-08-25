import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditCommonUserDetails(props) {
  const navigate = useNavigate();
  //const [userGroups, setUserGroups] = useState([]);
  //const [status, setStatus] = useState(1);
  //const [newUser, setNewUser] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  //const [groupOptions, setGroupOptions] = useState([]);
  //const [message, setMessage] = useState("");

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

    try {
      if (newPassword) {
        const responsepassword = await axios.post(
          "http://localhost:4000/changepasswordcommon",
          {
            token: localStorage.getItem("token"),
            username: props.username,
            newPassword: newPassword,
          }
        );
        if (responsepassword.data.response === "success") {
          alert("Password changed!");
          setNewPassword("");
        } else {
          alert("Password is invalid!");
        }
      }

      if (newEmail) {
        const responseemail = await axios.post(
          "http://localhost:4000/changeemailcommon",
          {
            token: localStorage.getItem("token"),
            username: props.username,
            newEmail: newEmail,
          }
        );
        if (responseemail.data.response === "success") {
          alert("Email changed!");
          setNewEmail("");
        }
        if (responseemail.data.error === "Email is invalid") {
          alert("Email is invalid!");
        }
        navigate("/EditCommonUserDetails");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container py-md-5">
      <div className="row align-items-center">
        <div className="col-lg-7 py-3 py-md-5">
          <form onSubmit={handleSubmit}>
            <h1 className="display-3">Edit your details</h1>
            <div className="form-group">
              <label htmlFor="email-register" className="text-muted mb-1">
                <small>New Email</small>
              </label>
              <input
                id="email-register"
                name="email"
                className="form-control"
                type="text"
                placeholder="you@example.com"
                autoComplete="off"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password-register" className="text-muted mb-1">
                <small>
                  New Password* (8-10 characters, must contain numbers and
                  special characters)
                </small>
              </label>
              <input
                id="password-register"
                name="password"
                className="form-control"
                type="password"
                placeholder="Create a password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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

export default EditCommonUserDetails;
