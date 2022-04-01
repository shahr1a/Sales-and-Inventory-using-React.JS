import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import "./assets/boxicons-2.0.9/css/boxicons.min.css";
import "./assets/css/grid.css";
import "./assets/css/theme.css";
import "./assets/css/index.css";
import "./assets/css/style_login.css";

import Layout from "./components/layout/Layout";
import store from "./redux/store";

document.title = "Sale and Inventory";

ReactDOM.render(
	<Provider store={store}>
		<Layout />
	</Provider>,

	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
