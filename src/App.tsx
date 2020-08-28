import React, { useState, useEffect } from "react";
import { Router, Route, Switch, BrowserRouter } from "react-router-dom";

import { RenderMenu } from "./Components/Menu";

function App(props: any) {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route render={RenderMenu} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
