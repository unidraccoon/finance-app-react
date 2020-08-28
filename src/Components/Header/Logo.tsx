import React from "react";
import logo from "./logo.svg";
// import "./index.css";

export default class Logo extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <>
        <div className="logo">
          <img src={logo} />
        </div>
      </>
    );
  }
}
