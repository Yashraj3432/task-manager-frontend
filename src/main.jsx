import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/globals.css";
import "./styles/layout.css";
import "./styles/navbar.css";
import "./styles/forms.css";
import "./styles/dashboard.css";
import "./styles/projects.css";
import "./styles/taskboard.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>
);