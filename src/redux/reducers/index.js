import { combineReducers } from "redux";
import auth from "./auth";
import settings from "./settings";
import register from "./register";
import login from "./login";
import manage from "./manage";
import driver from "./driver";
import notifications from "./notifications";

export default combineReducers({
    auth,
    settings,
    register,
    login,
    manage,
    notifications,
    driver
});