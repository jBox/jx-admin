import {
    API,
    LOGOUT
} from "./ActionTypes";

import Jwt from "../common/Jwt";

import isEmpty from "lodash/isEmpty";

export const logout = () => (dispatch) => {
    Jwt.clear();
    dispatch({ type: LOGOUT });
};
