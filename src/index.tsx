import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import reportWebVitals from "./reportWebVitals";
import SearchEngineContainer from "./components/search-engine.container";
import DarkModeToggleContainer from "./components/dark-mode-toggle.container";
import {Provider} from "react-redux";
import {store} from "./store/store";

const main = ReactDOM.createRoot(
    document.getElementById('main') as HTMLElement
);
main.render(
    <React.StrictMode>
        <Provider store={store}>
            <SearchEngineContainer/>
            <DarkModeToggleContainer/>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
