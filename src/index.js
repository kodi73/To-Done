import "./style.css";
import { initApp, getState } from "./modules/app";
import { renderApp } from "./modules/dom";


initApp();
renderApp();
console.log("App State: ", getState());
console.log("To-Done initialized.");

