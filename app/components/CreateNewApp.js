import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateNewApp() {
  const [App_Acronym, setApp_Acronym] = useState("");
  const [App_Description, setApp_Description] = useState("");
  const [App_Rnumber, setApp_Rnumber] = useState("");
  const [appStartDate, setAppStartDate] = useState("");
  const [appEndDate, setAppEndDate] = useState("");
  const [appPermitOpen, setAppPermitOpen] = useState("");
  const [appPermitToDoList, setAppPermitToDoList] = useState("");
  const [appPermitDoing, setAppPermitDoing] = useState("");
  const [appPermitDone, setAppPermitDone] = useState("");
  const [appPermitCreate, setAppPermitCreate] = useState("");
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

  const isPositiveInteger = (value) => {
    return /^[1-9][0-9]*$/.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!(await isActive())) {
      props.setLogin(false);
      return;
    }

    if (!isPositiveInteger(App_Rnumber)) {
      alert("App Rnumber must be positive integers");
      return;
    }

    // const isPositiveInteger = (value) => {
    //   return /^[1-9][0-9]*$/.test(value);
    // };

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

    const payload = {
      token: localStorage.getItem("token"),
      App_acronym: App_Acronym,
      App_Description: App_Description,
      App_Rnumber: App_Rnumber,
      App_startDate: appStartDate,
      App_endDate: appEndDate,
      App_permit_Open: appPermitOpen,
      App_permit_toDoList: appPermitToDoList,
      App_permit_Doing: appPermitDoing,
      App_permit_Done: appPermitDone,
      App_permit_create: appPermitCreate,
    };
    console.log("payload", payload);
    axios
      .post("http://localhost:4000/createapp", payload)
      .then((response) => {
        if (!response.data.error) {
          alert("Application created successfully");
          setApp_Acronym("");
          setApp_Description("");
          setApp_Rnumber("");
          setAppStartDate("");
          setAppEndDate("");
          // setAppPermitOpen([]);
          // setAppPermitToDoList([]);
          // setAppPermitDoing([]);
          // setAppPermitDone([]);
          // setAppPermitCreate([]);
          // navigate("/CreateNewApp");
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

  const handlePermitOpenChange = (selectedOptions) => {
    setPermitOpen(selectedOptions);
    setAppPermitOpen(selectedOptions.value);
  };

  const handlePermitToDoListChange = (selectedOptions) => {
    setPermitToDoList(selectedOptions);
    setAppPermitToDoList(selectedOptions.value);
  };

  const handlePermitDoingChange = (selectedOptions) => {
    setPermitDoing(selectedOptions);
    setAppPermitDoing(selectedOptions.value);
  };

  const handlePermitDoneChange = (selectedOptions) => {
    setPermitDone(selectedOptions);
    setAppPermitDone(selectedOptions.value);
  };

  const handlePermitCreateChange = (selectedOptions) => {
    setPermitCreate(selectedOptions);
    setAppPermitCreate(selectedOptions.value);
  };

  return (
    <div className="container py-md-5">
      <div className="row align-items-center">
        <div className="col-lg-7 py-3 py-md-5">
          <form onSubmit={handleSubmit}>
            <h1 className="display-3">Create New App</h1>
            <div className="form-group">
              <label htmlFor="App_Acronym-register" className="text-muted mb-1">
                <small>App Acronym*</small>
              </label>
              <input
                id="App_Acronym-register"
                name="App_Acronym"
                className="form-control"
                type="text"
                placeholder="Input App Acronym"
                autoComplete="off"
                value={App_Acronym}
                onChange={(e) => setApp_Acronym(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="App_Description-register"
                className="text-muted mb-1"
              >
                <small>App Description</small>
              </label>
              <textarea
                id="App_Description-register"
                name="App_Description"
                className="form-control"
                type="text"
                placeholder="Input App Description"
                autoComplete="off"
                rows="4"
                cols="50"
                value={App_Description}
                onChange={(e) => setApp_Description(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="App_Rnumber-register" className="text-muted mb-1">
                <small>App Rnumber* (Numbers Only) </small>
              </label>
              <input
                id="App_Rnumber-register"
                name="App_Rnumber"
                className="form-control"
                type="text"
                placeholder="Input App Rnumber"
                value={App_Rnumber}
                onChange={(e) => setApp_Rnumber(e.target.value)}
              />
              {isNaN(App_Rnumber) || Number(App_Rnumber) <= 0 ? (
                <p className="text-danger">
                  App Rnumber must be positive numbers
                </p>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="appStartDate" className="text-muted mb-1">
                <small>App Start Date</small>
              </label>
              <input
                id="appStartDate"
                name="appStartDate"
                className="form-control"
                type="date"
                value={appStartDate}
                onChange={(e) => setAppStartDate(e.target.value)}
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
                value={appEndDate}
                onChange={(e) => setAppEndDate(e.target.value)}
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

export default CreateNewApp;
