import { Navbar, NavbarBrand } from "reactstrap";
import config from "../config";
import mainLogo from "../assets/images/logo.png";

const Header: React.FC = () => {
  return (
    <header>
      <Navbar
        className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3"
        style={{
          backgroundColor: "#1B294F",
          color: "#FFFFFF",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "5px",
          }}
        >
          <img
            src={mainLogo}
            alt="OMMAT"
            width="60"
            height="60"
            onClick={() => {
              window.location.href = "#";
            }}
          />
          <NavbarBrand
            style={{
              color: "#FFFFFF",
              fontWeight: "bold",
              paddingLeft: "10px",
              fontSize: "22px",
              marginRight: "auto",
              cursor: "pointer",
            }}
            onClick={() => {
              window.location.href = "/";
            }}
          >
            {config.environment === "production"
              ? "Онлайн калькулятор"
              : "Онлайн калькулятор (тест)"}
          </NavbarBrand>
        </div>
      </Navbar>
    </header>
  );
};

export default Header;
