import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function UserManagement(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const queryparams = new URLSearchParams(location.search);
  const usernameFromUrl = queryparams.get("username");
  const [userGroups, setUserGroups] = useState([]);
  const [status, setStatus] = useState(1);
  const [newUser, setNewUser] = useState(usernameFromUrl || "");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [groupOptions, setGroupOptions] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();

    let stringedgroups = ","; // if blank, then does not add to usergroup
    if (userGroups.length < 1) {
      stringedgroups = null;
    }

    for (var i = 0; i < userGroups.length; i++) {
      stringedgroups += userGroups[i].value + ",";
    } // adds commas to the beginning and end of the string

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

    try {
      if (newPassword) {
        const responsepassword = await axios.post(
          "http://localhost:4000/changepassword",
          {
            token: localStorage.getItem("token"),
            username: newUser,
            newPassword: newPassword,
          }
        );
        if (responsepassword.data.response === "success") {
          alert("Password changed!");
          setNewPassword("");
          setNewUser("");
        }
        if (responsepassword.data.error === "Password is invalid!") {
          alert("Password is invalid!");
        }
        if (responsepassword.data.error === "Username does not exist!") {
          alert("Username does not exist!");
        }
        if (
          responsepassword.data.error ===
          "You do not have access to this resource!"
        ) {
          alert("You do not have access to this resource!");
        }
      }

      if (newEmail) {
        const responseemail = await axios.post(
          "http://localhost:4000/changeemail",
          {
            token: localStorage.getItem("token"),
            username: newUser,
            newEmail: newEmail,
          }
        );
        if (responseemail.data.response === "success") {
          alert("Email changed!");
          setNewEmail("");
          setNewUser("");
        }
        if (responseemail.data.error === "Email is invalid") {
          alert("Email is invalid!");
        }
        if (responseemail.data.error === "Username does not exist!") {
          alert("Username does not exist!");
        }
        if (
          responseemail.data.error ===
          "You do not have access to this resource!"
        ) {
          alert("You do not have access to this resource!");
        }
      }

      if (userGroups) {
        const responsegroup = await axios.post(
          "http://localhost:4000/changegroup",
          {
            token: localStorage.getItem("token"),
            newUserGroup: stringedgroups,
            username: newUser,
          }
        );
        if (responsegroup.data.response === "success") {
          alert("Group changed!");
          setUserGroups([]);
          setNewUser("");
        }
        if (responsegroup.data.error === "Username does not exist!") {
          alert("Username does not exist!");
        }
        if (
          responsegroup.data.error ===
          "You do not have access to this resource!"
        ) {
          alert("You do not have access to this resource!");
        }
      }

      if (status) {
        const responsestatus = await axios.post(
          "http://localhost:4000/changestatus",
          {
            token: localStorage.getItem("token"),
            username: newUser,
            newStatus: status,
          }
        );
        if (responsestatus.data.response === "success") {
          alert("Status changed!");
          setNewUser("");
        }
        if (responsestatus.data.error === "Username does not exist!") {
          alert("Username does not exist!");
        }
        if (
          responsestatus.data.error ===
          "You do not have access to this resource!"
        ) {
          alert("You do not have access to this resource!");
        }
        navigate("/UserManagement");
      }
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
    // console.log("running");
    axios
      .post("http://localhost:4000/getgroups", {
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
  }, []);

  const handleUserGroupsChange = (selectedOptions) => {
    setUserGroups(selectedOptions);
  };

  /* const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };*/

  return (
    <div className="container py-md-5">
      <div className="row align-items-center">
        <div className="col-lg-7 py-3 py-md-5">
          <form onSubmit={handleSubmit}>
            <h1 className="display-3">Edit User Details</h1>
            <div className="form-group">
              <label htmlFor="username-register" className="text-muted mb-1">
                <small>Username</small>
              </label>
              <input
                id="username-register"
                name="username"
                className="form-control"
                type="text"
                placeholder="Pick a username"
                autoComplete="off"
                value={newUser}
                onChange={(e) => setNewUser(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email-register" className="text-muted mb-1">
                <small>Email</small>
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
                  Password (8-10 characters, must contain numbers and special
                  characters)
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
            <div className="form-group">
              <label className="text-muted mb-1">
                <small>Status (0 = disabled, 1 = active)</small>
              </label>
              <div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="status"
                    id="status-disabled"
                    value="0"
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="status-disabled">
                    Disabled
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="status"
                    id="status-active"
                    value="1"
                    checked
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="status-active">
                    Active
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="text-muted mb-1">
                <small>User Group(s)</small>
              </label>
              <Select
                isMulti
                options={groupOptions}
                value={userGroups}
                onChange={handleUserGroupsChange}
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

export default UserManagement;
