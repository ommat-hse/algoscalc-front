import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";
import Divider from "@mui/material/Divider";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div
      style={{
        display: "grid",
        minHeight: "100%",
        gridTemplateRows: "auto 1fr auto",
        gridTemplateColumns: "100%",
      }}
    >
      <div>
        <Header />
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ maxWidth: "25%", margin: "5px" }}>
          <SideBar />
        </div>
        <Divider orientation="vertical" flexItem />
        <div
          style={{
            maxWidth: "75%",
            margin: "5px",
            display: "flex",
            width: "100%",
          }}
        >
          <main
            style={{
              paddingLeft: "10px",
              paddingRight: "10px",
              width: "100%",
            }}
          >
            {children}
          </main>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
