import Link from "@mui/material/Link";
import config from "../config";

const Footer: React.FC = () => {
  return (
    <footer className="bg-light text-center text-lg-start">
      <div
        className="text-center p-3"
        style={{
          backgroundColor: "rgba(27, 41, 79, 1)",
          color: "#FFFFFF",
          padding: "15px",
          textAlign: "center",
        }}
      >
        © 2024 OMMAT |
        <Link href="mailto:support@ommat.ru" underline="none" color="inherit">
          {" "}
          обратная связь
        </Link>
        | Версия: {config.version}
      </div>
    </footer>
  );
};

export default Footer;
