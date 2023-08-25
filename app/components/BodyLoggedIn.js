import React, { useEffect } from "react";
import Container from "./Container";
import Page from "./Page";

function BodyLoggedIn() {
  return (
    <Page>
      <h2>You're Logged In</h2>
      <p>What do you want to do?</p>
    </Page>
  );
}

export default BodyLoggedIn;
