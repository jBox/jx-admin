import { combineReducers } from "redux";
import {
    CALLOUT,
    CLOSE_CALLOUT
} from "../actions/ActionTypes";

const callouts = (state = [], action) => {
    switch (action.type) {
        case CALLOUT:
            const callout = { ...action.callout, id: `${state.length + 1}`, active: true };
            return [...state, callout];
        case CLOSE_CALLOUT:
            const closeId = action.id;
            return state.reduce((callouts, callout) => {
                if (callout.id === closeId) {
                    return callouts.concat({ ...callout, active: false });
                }

                return callouts.concat({ ...callout });
            }, []);
            return false;
        default:
            return state;
    }
};

export default combineReducers({
    callouts
});