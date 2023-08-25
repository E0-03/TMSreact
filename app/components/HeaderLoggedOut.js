import React, { useEffect, useState } from "react";
import axios from "axios";

function HeaderLoggedOut(props) {
  // const [loginusername, setloginusername] = useState();
  // const [loginpassword, setloginpassword] = useState();
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("Username and/or password is wrong");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/login",
        loginCredentials
      );
      console.log(response);
      if (response.data.response === "success") {
        localStorage.setItem("token", response.data.token);
        props.setLogin(true);
        props.setusername(loginCredentials.username);
      } else {
        // If there is an error, set the error message and clear it after 5 seconds
        setMessage(response.data.error);
        alert(message);
        console.log(response.data.console.error);
      }
    } catch (e) {
      console.log("Username and/or password is wrong");
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
      }
    } catch (e) {
      console.log("wrong");
      // console.log(e);
    }

    try {
      const responsePL = await axios.post(
        "http://localhost:4000/checkmygroup",
        {
          token: localStorage.getItem("token"),
          groupName: "project lead",
        }
      );
      if (responsePL.data.error === null) {
        props.setisProjectLead(true);
        // return true;
      } else {
        props.setisProjectLead(false);
      }
    } catch (error) {
      return false;
    }
    // return false;

    try {
      const responsePM = await axios.post(
        "http://localhost:4000/checkmygroup",
        {
          token: localStorage.getItem("token"),
          groupName: "project manager",
        }
      );
      if (responsePM.data.error === null) {
        props.setisProjectManager(true);
        // return true;
      } else {
        props.setisProjectManager(false);
      }
    } catch (error) {
      return false;
    }
    // return false;
  }

  return (
    <form onSubmit={handleSubmit} className="mb-0 pt-2 pt-md-0">
      <div className="row align-items-center">
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input
            onChange={(e) =>
              setLoginCredentials({
                ...loginCredentials,
                username: e.target.value,
              })
            }
            name="username"
            className="form-control form-control-sm input-dark"
            type="text"
            placeholder="Username"
            autoComplete="off"
          />
        </div>
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input
            onChange={(e) =>
              setLoginCredentials({
                ...loginCredentials,
                password: e.target.value,
              })
            }
            name="password"
            className="form-control form-control-sm input-dark"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="col-md-auto">
          <button className="btn btn-success btn-sm">Sign In</button>
        </div>
      </div>
    </form>
  );
}

export default HeaderLoggedOut;
