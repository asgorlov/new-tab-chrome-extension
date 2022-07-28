import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import ToggleDarkModeComponent from "./components/toggle-dark-mode.component";
import SearchEngineComponent from "./components/search-engine.component";

const main = ReactDOM.createRoot(
    document.getElementById('main') as HTMLElement
);
main.render(
    <React.StrictMode>
        <SearchEngineComponent
            searchEngine="yandex"
            localization={getLanguage()}
        />
        <ToggleDarkModeComponent/>
    </React.StrictMode>
);

function getLanguage() {
    const nvg = window.navigator;
    return nvg ? nvg.language.substring(0, 2).toLowerCase() : "ru";
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
