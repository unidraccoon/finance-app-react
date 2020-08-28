import React from "react";
import { Header } from "semantic-ui-react";
import Logo from "./Logo";

export const CustomHeader = (props: any) => {
  return (
    <>
      <header>
        <Header>
          <Logo />
          <Header.Content as="h2">{props.name}</Header.Content>
        </Header>
      </header>
    </>
  );
};
