import React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.scss";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(<App />);
