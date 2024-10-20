import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import Index from "./pages";
import { ToastContainer } from "react-toastify";
import GlobalStyle from "./style";
import { HashRouter } from "react-router-dom";

// Change toast color
const toastStyle: React.CSSProperties = { background: "default" };

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
	<React.StrictMode>
		<GlobalStyle />
		<ToastContainer toastStyle={toastStyle} position="bottom-left" />
		<HashRouter>
			<Index />
		</HashRouter>
	</React.StrictMode>
);
