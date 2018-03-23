import thunk from "redux-thunk";
import logger from "redux-logger";
import api from "./api";

export default [api, thunk, logger];