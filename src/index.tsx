import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store/store";
import "./static/styles/styles.scss";
import "dark-theme-util";
import NewTabContainer from "./components/new-tab/new-tab.container";

const main = ReactDOM.createRoot(
  document.getElementById("main") as HTMLElement
);
main.render(
  <React.StrictMode>
    <Provider store={store}>
      <NewTabContainer />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
