import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

//My Components
import Header from "./components/Header";
import CreateNewUser from "./components/CreateNewUser";
import CreateNewGroup from "./components/CreateNewGroup";
import UserManagement from "./components/UserManagement";
import Body from "./components/body";
import HeaderLoggedIn from "./components/HeaderLoggedIn";
import HeaderLoggedOut from "./components/HeaderLoggedOut";
import GetUserDetails from "./components/GetUserDetails";
import BodyLoggedIn from "./components/BodyLoggedIn";
import BodyLoggedOut from "./components/BodyLoggedOut";
import BodyUnauthorised from "./components/Bodyunauthorised";
import EditCommonUserDetails from "./components/EditCommonUserDetails";
import GetAppDetails from "./components/GetAppDetails";
import GetPlanDetails from "./components/GetPlanDetails";
import CreateNewApp from "./components/CreateNewApp";
import KanbanBoard from "./components/KanbanBoard";
import CreateNewPlan from "./components/CreateNewPlan";
import CreateNewTask from "./components/CreateNewTask";
import EditPlan from "./components/EditPlan";
import EditApp from "./components/EditApp";
import PromoteTask from "./components/PromoteTask";
import DemoteTask from "./components/DemoteTask";
import GetTaskDetails from "./components/GetTaskDetails";
import EditTask from "./components/EditTask";
import ViewAppDetails from "./components/ViewAppDetails";

function Main() {
  const [login, setLogin] = useState(Boolean(localStorage.getItem("token")));
  const [isAdmin, setisAdmin] = useState(false);
  const [isProjectManager, setisProjectManager] = useState(false);
  const [isProjectLead, setisProjectLead] = useState(false);
  const [username, setusername] = useState("");
  const [Plan_MVP_Name, setPlan_MVP_Name] = useState("");
  const [App_Acronym, setApp_Acronym] = useState("");
  const [Task_id, setTask_id] = useState("");
  const [isInGroup, setisInGroup] = useState(false);
  const [appPermitOpen, setappPermitOpen] = useState(false);
  const [appPermitToDo, setappPermitToDo] = useState(false);
  const [appPermitDone, setappPermitDone] = useState(false);
  const [appPermitDoing, setappPermitDoing] = useState(false);
  const [appPermitCreate, setappPermitCreate] = useState(false);
  const [TaskState, setTaskState] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:4000/checkmygroup", {
        token: localStorage.getItem("token"),
        groupName: "admin",
      })
      .then((response) => {
        setisAdmin(response.data.isAdmin);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // console.log(isAdmin, "IN MAIN");
  return (
    <BrowserRouter>
      <Header
        login={login}
        setLogin={setLogin}
        setisAdmin={setisAdmin}
        isAdmin={isAdmin}
        setusername={setusername}
        isProjectLead={isProjectLead}
        setisProjectLead={setisProjectLead}
        isProjectManager={isProjectManager}
        setisProjectManager={setisProjectManager}
      />
      <Routes>
        <Route
          path="/"
          element={login ? <BodyLoggedIn /> : <BodyLoggedOut />}
        />
        <Route
          path="/CreateNewGroup"
          element={
            login && isAdmin ? (
              <CreateNewGroup setLogin={setLogin} setisAdmin={setisAdmin} />
            ) : (
              <BodyUnauthorised />
            )
          }
        />
        <Route
          path="/CreateNewUser"
          element={
            login && isAdmin ? (
              <CreateNewUser setLogin={setLogin} setisAdmin={setisAdmin} />
            ) : (
              <BodyUnauthorised />
            )
          }
        />
        <Route
          path="/UserManagement"
          element={
            login && isAdmin ? (
              <UserManagement setLogin={setLogin} setisAdmin={setisAdmin} />
            ) : (
              <BodyUnauthorised />
            )
          }
        />
        <Route
          path="/GetUserDetails"
          element={login && isAdmin ? <GetUserDetails /> : <BodyUnauthorised />}
        />
        <Route
          path="/EditCommonUserDetails"
          element={
            login ? (
              <EditCommonUserDetails
                setLogin={setLogin}
                setisAdmin={setisAdmin}
                username={username}
                setusername={setusername}
              />
            ) : (
              <BodyUnauthorised />
            )
          }
        />
        <Route
          path="/GetAppDetails"
          element={
            login ? (
              <GetAppDetails
                setLogin={setLogin}
                setApp_Acronym={setApp_Acronym}
                App_Acronym={App_Acronym}
                isProjectLead={isProjectLead}
                setisProjectLead={setisProjectLead}
                appPermitToDo={appPermitToDo}
                setappPermitToDo={setappPermitToDo}
                appPermitOpen={appPermitOpen}
                setappPermitOpen={setappPermitOpen}
                appPermitDone={appPermitDone}
                setappPermitDone={setappPermitDone}
                appPermitDoing={appPermitDoing}
                setappPermitDoing={setappPermitDoing}
                appPermitCreate={appPermitCreate}
                setappPermitCreate={setappPermitCreate}
              />
            ) : (
              <BodyUnauthorised />
            )
          }
        />
        <Route
          path="/GetPlanDetails"
          element={
            login ? (
              <GetPlanDetails
                setLogin={setLogin}
                setPlan_MVP_Name={setPlan_MVP_Name}
                Plan_MVP_Name={Plan_MVP_Name}
                isProjectManager={isProjectManager}
                setisProjectManager={setisProjectManager}
                setApp_Acronym={setApp_Acronym}
                App_Acronym={App_Acronym}
              />
            ) : (
              <BodyUnauthorised />
            )
          }
        />
        <Route
          path="/KanbanBoard"
          element={
            login ? (
              <KanbanBoard
                setLogin={setLogin}
                setApp_Acronym={setApp_Acronym}
                App_Acronym={App_Acronym}
                username={username}
                setusername={setusername}
                setTask_id={setTask_id}
                Task_id={Task_id}
                appPermitToDo={appPermitToDo}
                setappPermitToDo={setappPermitToDo}
                appPermitOpen={appPermitOpen}
                setappPermitOpen={setappPermitOpen}
                appPermitDone={appPermitDone}
                setappPermitDone={setappPermitDone}
                appPermitDoing={appPermitDoing}
                setappPermitDoing={setappPermitDoing}
                appPermitCreate={appPermitCreate}
                setappPermitCreate={setappPermitCreate}
                TaskState={TaskState}
                setTaskState={setTaskState}
                isProjectManager={isProjectManager}
                setisProjectManager={setisProjectManager}
              />
            ) : (
              <BodyUnauthorised />
            )
          }
        />
        <Route
          path="/CreateNewApp"
          element={
            login ? (
              <CreateNewApp
                setLogin={setLogin}
                isProjectLead={isProjectLead}
                setisProjectLead={setisProjectLead}
              />
            ) : (
              <BodyUnauthorised />
            )
          }
        />
        <Route
          path="/CreateNewPlan"
          element={
            login ? (
              <CreateNewPlan
                setLogin={setLogin}
                isProjectManager={isProjectManager}
                setisProjectManager={setisProjectManager}
                App_Acronym={App_Acronym}
                setApp_Acronym={setApp_Acronym}
              />
            ) : (
              <BodyUnauthorised />
            )
          }
        />
        <Route
          path="/CreateNewTask"
          element={
            login ? (
              <CreateNewTask
                setLogin={setLogin}
                setApp_Acronym={setApp_Acronym}
                App_Acronym={App_Acronym}
                appPermitCreate={appPermitCreate}
                setappPermitCreate={setappPermitCreate}
              />
            ) : (
              <BodyUnauthorised />
            )
          }
        />
        <Route
          path="/GetTaskDetails"
          element={
            login ? (
              <GetTaskDetails
                setLogin={setLogin}
                setTask_id={setTask_id}
                Task_id={Task_id}
                App_Acronym={App_Acronym}
                setApp_Acronym={setApp_Acronym}
              />
            ) : (
              <BodyUnauthorised />
            )
          }
        />
        <Route
          path="/DemoteTask"
          element={
            login ? (
              <DemoteTask
                setLogin={setLogin}
                setTask_id={setTask_id}
                Task_id={Task_id}
                TaskState={TaskState}
                setTaskState={setTaskState}
                App_Acronym={App_Acronym}
                setApp_Acronym={setApp_Acronym}
                appPermitOpen={appPermitOpen}
                setappPermitOpen={setappPermitOpen}
                appPermitToDo={appPermitToDo}
                setappPermitToDo={setappPermitToDo}
                appPermitDone={appPermitDone}
                setappPermitDone={setappPermitDone}
                appPermitDoing={appPermitDoing}
                setappPermitDoing={setappPermitDoing}
              />
            ) : (
              <BodyUnauthorised />
            )
          }
        />
        <Route
          path="/PromoteTask"
          element={
            login ? (
              <PromoteTask
                setLogin={setLogin}
                setTask_id={setTask_id}
                Task_id={Task_id}
                TaskState={TaskState}
                setTaskState={setTaskState}
                App_Acronym={App_Acronym}
                setApp_Acronym={setApp_Acronym}
                appPermitOpen={appPermitOpen}
                setappPermitOpen={setappPermitOpen}
                appPermitToDo={appPermitToDo}
                setappPermitToDo={setappPermitToDo}
                appPermitDone={appPermitDone}
                setappPermitDone={setappPermitDone}
                appPermitDoing={appPermitDoing}
                setappPermitDoing={setappPermitDoing}
              />
            ) : (
              <BodyUnauthorised />
            )
          }
        />
        <Route
          path="/EditPlan"
          element={
            login ? (
              <EditPlan
                setLogin={setLogin}
                setPlan_MVP_Name={setPlan_MVP_Name}
                Plan_MVP_Name={Plan_MVP_Name}
              />
            ) : (
              <BodyUnauthorised />
            )
          }
        />
        <Route
          path="/EditApp"
          element={
            login ? (
              <EditApp
                setLogin={setLogin}
                setApp_Acronym={setApp_Acronym}
                App_Acronym={App_Acronym}
                isProjectLead={isProjectLead}
                setisProjectLead={setisProjectLead}
              />
            ) : (
              <BodyUnauthorised />
            )
          }
        />
        <Route
          path="/ViewAppDetails"
          element={
            login ? (
              <ViewAppDetails
                setLogin={setLogin}
                isProjectLead={isProjectLead}
                setisProjectLead={setisProjectLead}
                App_Acronym={App_Acronym}
                setApp_Acronym={setApp_Acronym}
              />
            ) : (
              <BodyUnauthorised />
            )
          }
        />
        <Route
          path="/EditTask"
          element={
            login ? (
              <EditTask
                setLogin={setLogin}
                setTask_id={setTask_id}
                Task_id={Task_id}
                App_Acronym={App_Acronym}
                setApp_Acronym={setApp_Acronym}
                TaskState={TaskState}
                setTaskState={setTaskState}
              />
            ) : (
              <BodyUnauthorised />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<Main />);

if (module.hot) {
  module.hot.accept();
}
