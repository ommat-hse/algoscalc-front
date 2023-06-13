import React from "react";
import { NavMenu } from "./NavMenu";
import { Footer } from "./Footer";

export const Layout = ({ children }) => {
  return (
    <div>
      <NavMenu />
      <div
        tag="main"
        style={{
          paddingLeft: "10px",
          paddingRight: "10px",
          marginTop: "-20px",
        }}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
};
