import "./style.css";
import { initApp, getState } from "./modules/app";

initApp();
console.log("App State: ", getState());
console.log("To-Done initialized.");

