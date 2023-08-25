import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";

async function isActive() {
  try {
    const activeresponse = await axios.post("http://localhost:4000/isactive", {
      token: localStorage.getItem("token"),
    });
    if (activeresponse.data.status === 0) {
      return false;
    }
  } catch (error) {
    return false;
  }
  return true;
}

function CreateNewUser(props) {
  const navigate = useNavigate();
  const [userGroups, setUserGroups] = useState([]);
  const [status, setStatus] = useState(1);
  const [newUser, setNewUser] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [groupOptions, setGroupOptions] = useState([]);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!(await isActive())) {
      props.setLogin(false);
      return;
    }

    let stringedgroups = ","; // if blank, then does not add to usergroup
    if (userGroups.length < 1) {
      stringedgroups = null;
    }

    for (var i = 0; i < userGroups.length; i++) {
      stringedgroups += userGroups[i].value + ",";
    } // adds commas to the beginning and end of the string

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
      const response = await axios.post("http://localhost:4000/createnewuser", {
        token: localStorage.getItem("token"),
        usergroup: stringedgroups,
        status: status,
        username: newUser,
        email: newEmail,
        password: newPassword,
      });

      if (response.data.response === "success") {
        alert("New User added!");
        setNewUser("");
        setNewEmail("");
        setNewPassword("");
        setUserGroups([]);
      }
      if (response.data.error === "Username is in use") {
        alert("Username is in use!");
      }
      if (response.data.error === "Password is invalid") {
        alert("Password is invalid!");
      }
      if (response.data.error === "Username is invalid") {
        alert("Username is invalid!");
      }
      if (response.data.error === "You do not have access to this resource!") {
        alert("You do not have access to this resource!");
      }

      navigate("/CreateNewUser");
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

    console.log(selectedOptions);
  };

  /* const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };*/

  return (
    <div className="container py-md-5">
      <div className="row align-items-center">
        <div className="col-lg-7 py-3 py-md-5">
          <form onSubmit={handleSubmit}>
            <h1 className="display-3">Create New User</h1>
            <div className="form-group">
              <label htmlFor="username-register" className="text-muted mb-1">
                <small>Username*</small>
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
                  Password* (8-10 characters, must contain numbers and special
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

export default CreateNewUser;
