import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeaderLoggedOut from "./HeaderLoggedOut";
import HeaderLoggedIn from "./HeaderLoggedIn";

function Header(props) {
  // const [login, setLogin] = useState(Boolean(localStorage.getItem("token")));

  return (
    <header className="header-bar bg-primary mb-3">
      <div className="container d-flex flex-column flex-md-row align-items-center p-3">
        <h4 className="my-0 mr-md-auto font-weight-normal">
          <a href="/" className="text-white">
            {" "}
            TMS{" "}
          </a>
        </h4>
        {props.login ? (
          <HeaderLoggedIn
            setLogin={props.setLogin}
            setisAdmin={props.setisAdmin}
            isAdmin={props.isAdmin}
            isProjectLead={props.isProjectLead}
            setisProjectLead={props.setisProjectLead}
            isProjectManager={props.isProjectManager}
            setisProjectManager={props.setisProjectManager}
          />
        ) : (
          <HeaderLoggedOut
            setLogin={props.setLogin}
            setisAdmin={props.setisAdmin}
            setusername={props.setusername}
            isProjectLead={props.isProjectLead}
            setisProjectLead={props.setisProjectLead}
            isProjectManager={props.isProjectManager}
            setisProjectManager={props.setisProjectManager}
          />
        )}
      </div>
    </header>
  );
}

export default Header;
