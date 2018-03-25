import { combineReducers } from "redux";
import auth from "./auth";
import settings from "./settings";
import register from "./register";
import login from "./login";
import manage from "./manage";

export default combineReducers({
    auth,
    settings,
    register,
    login,
    manage
});