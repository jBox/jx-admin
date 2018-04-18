import {
    API,
    GET_USER_IFNO
} from "./ActionTypes";

export const getUserInfo = () => (dispatch, getState) => {
    const { auth } = getState();
    if (auth.authenticated) {
        return dispatch({
            type: API,
            endpoint: { url: "/api/users/userinfo", method: "GET" },
            success: ({ data, dispatch }) => {
                dispatch({
                    data,
                    type: GET_USER_IFNO
                });
            }
        });
    }
};