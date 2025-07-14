import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import { PopupLayout } from "../../components/popup-layout.tsx";

import "./style.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PopupLayout>
      <App />
    </PopupLayout>
  </React.StrictMode>,
);
