import React, { useEffect, useState } from "react";
import Container from "./Container";
import Page from "./Page";
import BodyLoggedIn from "./BodyLoggedIn";
import BodyLoggedOut from "./BodyLoggedOut";

function Body(props) {
  // Set the initial state of loggedin to false

  // Example useEffect to mimic login functionality (replace with actual login logic)
  /*useEffect(() => {
    // You can check if the user is logged in here and update the state accordingly
    // For now, let's just assume the user is logged in if there is a token in localStorage
    const token = localStorage.getItem("token");
    //props.setLogin(!!token); // This will set loggedin to true if there's a token, and false otherwise
  }, []);*/

  return (
    <Container>
      <Page>
        {props.login ? (
          <BodyLoggedIn setloggedin={props.setLogin} />
        ) : (
          <BodyLoggedOut setloggedin={props.setLogin} />
        )}
      </Page>
    </Container>
  );
}

export default Body;
