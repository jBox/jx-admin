import {
    CALLOUT,
    CLOSE_CALLOUT
} from "./ActionTypes";

export const callout = ({ subject, message, type, duration }) => {
    return {
        type: CALLOUT,
        callout: { subject, message, type, duration }
    };
};

export const closeCallout = (id) => {
    return {
        type: CLOSE_CALLOUT,
        id
    };
};
