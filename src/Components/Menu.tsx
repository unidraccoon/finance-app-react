import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { Accounts } from "./Accounts";
import { Dashboard } from "./Dashboard";
import { CustomHeader } from "./Header/Header";

export const RenderMenu = () => {
  return (
    <>
      <CustomMenu />

      <Route
        exact
        path="/"
        render={() => (
          <>
            <CustomHeader name="Dashboard" />
            <div className="container">
              <Dashboard />
            </div>
          </>
        )}
      />
      <Route
        path="/accounts"
        render={() => (
          <>
            <CustomHeader name="Accounts" />
            <div className="container">
              <Accounts />
            </div>
          </>
        )}
      />
    </>
  );
};

const CustomMenu = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  return (
    <nav className="open">
      <Menu fluid color="blue" vertical icon="labeled">
        <Menu.Item
          as={Link}
          to="/"
          name="Dashboard"
          active={activeItem === "Dashboard"}
          onClick={() => setActiveItem("Dashboard")}
        >
          <Icon name="newspaper" />
          {"Dashboard"}
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/accounts"
          name="Accounts"
          active={activeItem === "Accounts"}
          onClick={() => setActiveItem("Accounts")}
        >
          <Icon name="credit card" />
          {"Accounts"}
        </Menu.Item>
      </Menu>
    </nav>
  );
};
