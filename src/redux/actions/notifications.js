import {
    CALLOUT,
    CLOSE_CALLOUT
} from "./ActionTypes";

export const callout = ({ subject, message, type, delay }) => {
    return {
        type: CALLOUT,
        callout: { subject, message, type, delay }
    };
};

export const closeCallout = (id) => {
    return {
        type: CLOSE_CALLOUT,
        id
    };
};
