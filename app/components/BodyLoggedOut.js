import React, { useEffect } from "react";
import Container from "./Container";
import Page from "./Page";

function BodyLoggedOut() {
  return (
    <Page>
      <h2>Hi, welcome to Task Management system!</h2>
      <p>Please Log in to proceed</p>
    </Page>
  );
}

export default BodyLoggedOut;
