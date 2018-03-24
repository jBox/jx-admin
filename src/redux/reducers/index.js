import { combineReducers } from "redux";
import auth from "./auth";
import settings from "./settings";
import register from "./register";
import login from "./login";

export default combineReducers({
    auth,
    settings,
    register,
    login
});