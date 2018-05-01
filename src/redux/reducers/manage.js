import { combineReducers } from "redux";
import orders from "./orders";
import drivers from "./drivers";
import {
    MANAGE_LOAD_USERS_REQUEST,
    MANAGE_LOAD_USERS_SUCCESS,
    MANAGE_LOAD_USERS_FAILURE,
    MANAGE_GET_REGISTERS_SUCCESS,
    MANAGE_CONFIRM_REGISTEG_REQUEST,
    MANAGE_CONFIRM_REGISTEG_SUCCESS,
    MANAGE_CONFIRM_REGISTEG_FAILURE,
    MANAGE_LOADED_ROLES,
    MANAGE_LOADED_MODELS,
    MANAGE_LOADED_ORDER_STATUS,
    MANAGE_LOAD_VEHICLES_SUCCESS,
    MANAGE_ADD_VEHICLE_SUCCESS,
    MANAGE_DEL_VEHICLE_SUCCESS,
    MANAGE_DEL_USER_SUCCESS,
    MANAGE_UPD_USER_SUCCESS
} from "../actions/ActionTypes";

const roles = (state = {}, action) => {
    switch (action.type) {
        case MANAGE_LOADED_ROLES:
            return action.data;
        default:
            return state;
    }
};

const vehicles = (state = [], action) => {
    switch (action.type) {
        case MANAGE_LOAD_VEHICLES_SUCCESS:
            return action.data;
        case MANAGE_ADD_VEHICLE_SUCCESS:
            return [...state, action.vehicle];
        case MANAGE_DEL_VEHICLE_SUCCESS: {
            const { id } = action.vehicle;
            const vehicles = [...state];
            const index = vehicles.findIndex(x => x.id === id);
            if (index !== -1) {
                vehicles.splice(index, 1);
            }

            return vehicles;
        }
        default:
            return state;
    }
};

const registers = (state = [], action) => {
    switch (action.type) {
        case MANAGE_GET_REGISTERS_SUCCESS:
            return action.data;
        case MANAGE_CONFIRM_REGISTEG_SUCCESS:
            const { mobile } = action;
            return state.reduce((items, item) => {
                if (item.mobile === mobile) {
                    return items.concat({ ...item, status: action.action });
                }

                return items.concat(item);
            }, []);
        default:
            return state;
    }
};

const users = (state = [], action) => {
    switch (action.type) {
        case MANAGE_LOAD_USERS_SUCCESS:
            return action.data;
        case MANAGE_DEL_USER_SUCCESS: {
            const { user: { id } } = action;
            const index = state.findIndex(x => x.id === id);
            if (index !== -1) {
                const users = [...state];
                users.splice(index, 1);
                return users;
            }

            return state;
        }
        case MANAGE_UPD_USER_SUCCESS: {
            const { user } = action;
            const index = state.findIndex(x => x.id === user.id);
            if (index !== -1) {
                const users = [...state];
                users[index] = user;
                return users;
            }

            return state;
        }
        default:
            return state;
    }
};

const registerConfirmations = (state = {}, action) => {
    switch (action.type) {
        case MANAGE_CONFIRM_REGISTEG_REQUEST:
            return { ...state, [action.mobile]: "request" };
        case MANAGE_CONFIRM_REGISTEG_SUCCESS:
            return { ...state, [action.mobile]: "success" };
        case MANAGE_CONFIRM_REGISTEG_FAILURE:
            return { ...state, [action.mobile]: "failure" };
        default:
            return state;
    }
};

const status = (state = {}, action) => {
    switch (action.type) {
        case MANAGE_LOAD_USERS_REQUEST:
            return { ...state, users: { loading: "request" } };
        case MANAGE_LOAD_USERS_SUCCESS:
            return { ...state, users: { loading: "success" } };
        case MANAGE_LOAD_USERS_FAILURE:
            return { ...state, users: { loading: "failure" } };
        default:
            return state;
    }
};

export default combineReducers({
    registerConfirmations,
    roles,
    status,
    registers,
    drivers,
    users,
    vehicles,
    orders
});