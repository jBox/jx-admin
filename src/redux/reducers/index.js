import { combineReducers } from "redux";
import auth from "./auth";
import settings from "./settings";
import register from "./register";

export default combineReducers({
    auth,
    settings,
    register
});