import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import App from "./App";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

ReactDOM.render(<App history={history} />, document.getElementById("root"));
