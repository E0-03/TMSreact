import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditApp(props) {
  //   const [App_Acronym, setApp_Acronym] = useState("");
  const [App_Description, setApp_Description] = useState("");
  const [App_startDate, setApp_startDate] = useState("");
  const [App_endDate, setApp_endDate] = useState("");
  const [App_permit_Open, setApp_permit_Open] = useState("");
  const [App_permit_toDoList, setApp_permit_toDoList] = useState("");
  const [App_permit_Doing, setApp_permit_Doing] = useState("");
  const [App_permit_Done, setApp_permit_Done] = useState("");
  const [App_permit_create, setApp_permit_create] = useState("");
  //   const [appStartDate, setAppStartDate] = useState("");
  //   const [appEndDate, setAppEndDate] = useState("");
  //   const [appPermitOpen, setAppPermitOpen] = useState("");
  //   const [appPermitToDoList, setAppPermitToDoList] = useState("");
  //   const [appPermitDoing, setAppPermitDoing] = useState("");
  //   const [appPermitDone, setAppPermitDone] = useState("");
  //   const [appPermitCreate, setAppPermitCreate] = useState("");
  const [groupOptions, setGroupOptions] = useState([]);
  const [PermitOpen, setPermitOpen] = useState([]);
  const [PermitToDoList, setPermitToDoList] = useState([]);
  const [PermitDoing, setPermitDoing] = useState([]);
  const [PermitDone, setPermitDone] = useState([]);
  const [PermitCreate, setPermitCreate] = useState([]);
  const navigate = useNavigate();

  // let stringedOpen = "";
  // for (var i = 0; i < appPermitOpen.length; i++) {
  //   stringedOpen += appPermitOpen[i].value;
  // }

  // let stringedToDoList = "";
  // for (var i = 0; i < appPermitToDoList.length; i++) {
  //   stringedToDoList += appPermitToDoList[i].value;
  // }

  // let stringedDoing = "";
  // for (var i = 0; i < appPermitDoing.length; i++) {
  //   stringedDoing += appPermitDoing[i].value;
  // }

  // let stringedDone = "";
  // for (var i = 0; i < appPermitDone.length; i++) {
  //   stringedDone += appPermitDone[i].value;
  // }

  // let stringedCreate = "";
  // for (var i = 0; i < appPermitCreate.length; i++) {
  //   stringedCreate += appPermitCreate[i].value;
  // }

  // if (!(await isActive())) {
  //   props.setLogin(false);
  //   return;
  // }

  // let stringedgroups = ","; // if blank, then does not add to usergroup
  // if (userGroups.length < 1) {
  //   stringedgroups = null;
  // }

  // for (var i = 0; i < userGroups.length; i++) {
  //   stringedgroups += userGroups[i].value + ",";
  // } // adds commas to the beginning and end of the string

  // try {
  //   const isAdmin = await axios.post("http://localhost:4000/checkmygroup", {
  //     token: localStorage.getItem("token"),
  //     groupName: "admin",
  //   });
  //   if (isAdmin.data.isAdmin === true) {
  //     props.setisAdmin(true);
  //   } else {
  //     props.setisAdmin(false);
  //     return false;
  //   }
  // } catch (e) {
  //   console.log("wrong");
  //   // console.log(e);
  // }

  // try {
  const handleSubmit = async (e) => {
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

    // try {
    //   const responsePL = await axios.post(
    //     "http://localhost:4000/checkmygroup",
    //     {
    //       token: localStorage.getItem("token"),
    //       groupName: "project lead",
    //     }
    //   );
    //   if (responsePL.data.error === null) {
    //     props.setisProjectLead(true);
    //     navigate(path);
    //   } else {
    //     props.setisProjectLead(false);
    //     return false;
    //   }
    // } catch (error) {
    //   return false;
    // }

    const payload = {
      token: localStorage.getItem("token"),
      App_Acronym: props.App_Acronym,
      App_Description,
      App_startDate,
      App_endDate,
      App_permit_Open,
      App_permit_toDoList,
      App_permit_Doing,
      App_permit_Done,
      App_permit_create,
    };
    console.log("payload", payload);
    axios
      .post("http://localhost:4000/editapp", payload)
      .then((response) => {
        if (!response.data.error) {
          alert("Application updated successfully");
          //   setApp_Acronym("");
          setApp_Description("");
          //   setApp_Rnumber("");
          //   setAppStartDate("");
          //   setAppEndDate("");
          //   setAppPermitOpen([]);
          //   setAppPermitToDoList([]);
          //   setAppPermitDoing([]);
          //   setAppPermitDone([]);
          //   setAppPermitCreate([]);
          navigate("/ViewAppDetails");
        } else {
          if (response.data.error === "App_acronym already exists!") {
            alert("App_acronym already exists!");
          } else if (
            response.data.error === "You do not have access to this resource!"
          ) {
            alert("You do not have access to this resource!");
          } else {
            alert(response.data.error);
          }
        }
      })
      .catch((error) => {
        // if (error === "App_acronym already exists") {
        //   alert("App_acronym already exists!");
        // }
        // if (error === "You do not have access to this resource!") {
        //   alert("You do not have access to this resource!");
        // }
        // alert(error);
        console.log(error);
        alert("here");
      });
    // catch (error) {
    //   console.error(error);
    // }
  };

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

  const handleOnClick = (path) => {
    navigate(path);
  };

  const handlePermitOpenChange = (selectedOptions) => {
    setPermitOpen(selectedOptions);
    setApp_permit_Open(selectedOptions.value);
  };

  const handlePermitToDoListChange = (selectedOptions) => {
    setPermitToDoList(selectedOptions);
    setApp_permit_toDoList(selectedOptions.value);
  };

  const handlePermitDoingChange = (selectedOptions) => {
    setPermitDoing(selectedOptions);
    setApp_permit_Doing(selectedOptions.value);
  };

  const handlePermitDoneChange = (selectedOptions) => {
    setPermitDone(selectedOptions);
    setApp_permit_Done(selectedOptions.value);
  };

  const handlePermitCreateChange = (selectedOptions) => {
    setPermitCreate(selectedOptions);
    setApp_permit_create(selectedOptions.value);
  };

  return (
    <div className="container py-md-5">
      <div className="row align-items-center">
        <div className="col-lg-7 py-3 py-md-5">
          <form onSubmit={handleSubmit}>
            <h1 className="display-3">Edit App: {props.App_Acronym}</h1>
            <h2>
              <button
                onClick={() => handleOnClick("/ViewAppDetails")}
                className="btn btn-sm btn-primary"
              >
                back
              </button>
            </h2>
            <div className="form-group">
              <label htmlFor="appStartDate" className="text-muted mb-1">
                <small>App Start Date</small>
              </label>
              <input
                id="appStartDate"
                name="appStartDate"
                className="form-control"
                type="date"
                value={App_startDate}
                onChange={(e) => setApp_startDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="appEndDate" className="text-muted mb-1">
                <small>App End Date</small>
              </label>
              <input
                id="appEndDate"
                name="appEndDate"
                className="form-control"
                type="date"
                value={App_endDate}
                onChange={(e) => setApp_endDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="text-muted mb-1">
                <small>App Permit (Open)</small>
              </label>
              <Select
                id="appPermitOpen"
                name="appPermitOpen"
                options={groupOptions}
                value={PermitOpen}
                onChange={handlePermitOpenChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="appPermitToDoList" className="text-muted mb-1">
                <small>App Permit (To Do List)</small>
              </label>
              <Select
                id="appPermitToDoList"
                name="appPermitToDoList"
                options={groupOptions}
                value={PermitToDoList}
                onChange={handlePermitToDoListChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="appPermitDoing" className="text-muted mb-1">
                <small>App Permit (Doing)</small>
              </label>
              <Select
                id="appPermitDoing"
                name="appPermitDoing"
                options={groupOptions}
                value={PermitDoing}
                onChange={handlePermitDoingChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="appPermitDone" className="text-muted mb-1">
                <small>App Permit (Done)</small>
              </label>
              <Select
                id="appPermitDone"
                name="appPermitDone"
                options={groupOptions}
                value={PermitDone}
                onChange={handlePermitDoneChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="appPermitCreate" className="text-muted mb-1">
                <small>App Permit (Create)</small>
              </label>
              <Select
                id="appPermitCreate"
                name="appPermitCreate"
                options={groupOptions}
                value={PermitCreate}
                onChange={handlePermitCreateChange}
              />
            </div>
            <p>If field is empty, it will not be updated</p>
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

export default EditApp;
