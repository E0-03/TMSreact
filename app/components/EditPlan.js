import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditPlan(props) {
  const navigate = useNavigate();
  //const [userGroups, setUserGroups] = useState([]);
  //const [status, setStatus] = useState(1);
  //const [newUser, setNewUser] = useState("");
  const [Plan_startDate, setPlan_startDate] = useState("");
  const [Plan_endDate, setPlan_endDate] = useState("");
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

    // if (!(await isActive())) {
    //   props.setLogin(false);
    //   return;
    // }

    // async function isActive() {
    //   try {
    //     const activeresponse = await axios.post(
    //       "http://localhost:4000/isactive",
    //       {
    //         token: localStorage.getItem("token"),
    //       }
    //     );
    //     if (activeresponse.data.status === 0) {
    //       return false;
    //     }
    //   } catch (error) {
    //     return false;
    //   }
    //   return true;
    // }

    try {
      const response = await axios.post("http://localhost:4000/editplan", {
        token: localStorage.getItem("token"),
        Plan_MVP_Name: props.Plan_MVP_Name,
        Plan_startDate,
        Plan_endDate,
      });
      if (response.data.success === "Plan updated successfully") {
        alert("Plan updated successfully!");
      } else {
        alert("Plan update failed!");
      }
      navigate("/GetPlanDetails");
    } catch (error) {
      console.error(error);
    }
  }

  async function handleOnClick(path) {
    navigate(path);
  }

  return (
    <div className="container py-md-5">
      <div className="row align-items-center">
        <div className="col-lg-7 py-3 py-md-5">
          <form onSubmit={handleSubmit}>
            <h1 className="display-3">Edit Plan</h1>
            <h2>
              <button
                onClick={() => handleOnClick("/GetPlanDetails")}
                className="btn btn-sm btn-primary"
              >
                back
              </button>
            </h2>
            <div className="form-group">
              <label htmlFor="appStartDate" className="text-muted mb-1">
                <small>Plan Start Date</small>
              </label>
              <input
                id="Plan_startDate"
                name="Plan_startDate"
                className="form-control"
                type="date"
                value={Plan_startDate}
                onChange={(e) => setPlan_startDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="appEndDate" className="text-muted mb-1">
                <small>Plan End Date</small>
              </label>
              <input
                id="Plan_endDate"
                name="Plan_endDate"
                className="form-control"
                type="date"
                value={Plan_endDate}
                onChange={(e) => setPlan_endDate(e.target.value)}
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

export default EditPlan;
