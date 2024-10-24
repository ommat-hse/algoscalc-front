import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import config from "./config";
import Layout from "./components/Layout";
import { Algorithm } from "./components/Algorithm";

function App() {
  document.title =
    config.environment === "production"
      ? "Онлайн калькулятор"
      : "Онлайн калькулятор (тест)";

  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/algorithm" element={<Algorithm />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
