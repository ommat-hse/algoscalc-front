import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import "./NavMenu.css";
import mainLogo from "./img/Logo.png";
import { prodLink } from "../Api/index";

export const NavMenu = () => {

    if(prodLink === "prod.ommat.ru")
        document.title = "Онлайн калькулятор"
    else
        document.title = "Онлайн калькулятор (тест)"

  return (
    <header>
      <Navbar
        className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3"
        style={{ backgroundColor: "#1B294F", color: "#FFFFFF" }}
      >
        <img src={mainLogo} alt="OMMAT" width="60" height="60" />
        <NavbarBrand
          style={{
            color: "#FFFFFF",
            fontWeight: "bold",
            paddingLeft: "10px",
            fontSize: "22px",
            marginRight: "auto"
          }}
        >
            { prodLink === "prod.ommat.ru" ? "Онлайн калькулятор" : "Онлайн калькулятор (тест)" }
        </NavbarBrand>
      </Navbar>
    </header>
  );
};
