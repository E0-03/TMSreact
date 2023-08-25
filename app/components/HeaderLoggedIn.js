import axios from "axios";
import React, { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

function HeaderLoggedIn(props) {
  const navigate = useNavigate();
  function handleLogout() {
    props.setLogin(false);
    props.setisAdmin(false);
    localStorage.removeItem("token");
    navigate("/");
  }

  async function checkAdmin() {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post("http://localhost:4000/checkmygroup", {
        token: localStorage.getItem("token"),
        groupName: "admin",
      });
      if (response.data.error === null) {
        props.setisAdmin(true);
        return true;
      }
    } catch (error) {
      return false;
    }
    props.setisAdmin(false);
    return false;
  }

  async function checkProjectLead() {
    const token = localStorage.getItem("token");

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
        return true;
      }
    } catch (error) {
      return false;
    }
    props.setisProjectLead(false);
    return false;
  }

  async function checkProjectManager() {
    const token = localStorage.getItem("token");

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
        return true;
      }
    } catch (error) {
      return false;
    }
    props.setisProjectManager(false);
    return false;
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
        props.setLogin(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleOnClick(path) {
    let res = await checkAdmin();
    let res2 = await isActive();
    if (res === true) {
      navigate(path);
    } else {
      navigate(path);
    }
  }

  return (
    <div className="flex-row my-3 my-md-0">
      {props.isAdmin ? (
        <>
          <button
            onClick={() => handleOnClick("/GetAppDetails")}
            className="btn btn-sm btn-success mr-2"
          >
            App
          </button>
          <button
            onClick={() => handleOnClick("/GetPlanDetails")}
            className="btn btn-sm btn-success mr-2"
          >
            Plan
          </button>
          <button
            onClick={() => handleOnClick("/CreateNewUser")}
            className="btn btn-sm btn-success mr-2"
          >
            Create new User
          </button>
          <button
            onClick={() => handleOnClick("/UserManagement")}
            className="btn btn-sm btn-success mr-2"
          >
            User Management
          </button>
          <button
            onClick={() => handleOnClick("/GetUserDetails")}
            className="btn btn-sm btn-success mr-2"
          >
            Get User Details
          </button>
          <button
            onClick={() => handleOnClick("/CreateNewGroup")}
            className="btn btn-sm btn-success mr-2"
          >
            Create New Group
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => handleOnClick("/GetAppDetails")}
            className="btn btn-sm btn-success mr-2"
          >
            App
          </button>
          <button
            onClick={() => handleOnClick("/editcommonuserdetails")}
            className="btn btn-sm btn-success mr-2"
          >
            Change My Details
          </button>
        </>
      )}
      <button onClick={handleLogout} className="btn btn-sm btn-secondary">
        Log Out
      </button>
    </div>
  );
}

export default HeaderLoggedIn;
