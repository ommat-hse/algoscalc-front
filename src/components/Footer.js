import React from "react";
import "./NavMenu.css";
import { prodLink } from "../Api/index";
import Link from "@mui/material/Link";

export const Footer = () => {

    if(prodLink === "prod.ommat.ru")
        document.title = "Онлайн калькулятор"
    else
        document.title = "Онлайн калькулятор (тест)"

  return (
      <footer className="bg-light text-center text-lg-start">
          <div className="text-center p-3" style={{backgroundColor: "rgba(27, 41, 79, 1)", color: "#FFFFFF"}}>
              © 2023 OMMAT |
              <Link href="mailto:support@ommat.ru" underline="none" color="inherit"> обратная связь</Link>
          </div>
      </footer>
  );
};
