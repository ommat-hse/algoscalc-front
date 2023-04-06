import React from "react";
import { Collapse, Navbar, NavbarBrand } from "reactstrap";
import "./NavMenu.css";
import mainLogo from "./img/Logo.jpg";
import { prodLink } from "../Api/index";

export const NavMenu = () => {

    if(prodLink === "prod.ommat.ru")
        document.title = "Калькуляторы"
    else
        document.title = "Калькуляторы (тест)"

  return (
    <header>
      <Navbar
        className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3"
        style={{ backgroundColor: "#2888D5", color: "#FFFFFF" }}
      >
        <img src={mainLogo} alt="OMMAT" width="40" height="40" />
        <NavbarBrand
          style={{
            color: "#FFFFFF",
            fontWeight: "bold",
            paddingLeft: "10px",
            fontSize: "22px",
          }}
        >
            { prodLink === "prod.ommat.ru" ? "Калькуляторы" : "Калькуляторы (тест)" }
        </NavbarBrand>
        <Collapse className="flex-sm-row-reverse" navbar>
            <span id="fullName-user">OMMAT</span>
        </Collapse>
      </Navbar>
    </header>
  );
};
