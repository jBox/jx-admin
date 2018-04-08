import { combineReducers } from "redux";
import orders from "./orders";
import {
    MANAGE_LOAD_USERS_REQUEST,
    MANAGE_LOAD_USERS_SUCCESS,
    MANAGE_LOAD_USERS_FAILURE,
    MANAGE_GET_DRIVERS_SUCCESS,
    MANAGE_GET_REGISTERS_SUCCESS,
    MANAGE_CONFIRM_REGISTEG_REQUEST,
    MANAGE_CONFIRM_REGISTEG_SUCCESS,
    MANAGE_CONFIRM_REGISTEG_FAILURE,
    MANAGE_ADD_DRIVER_SUCCESS,
    MANAGE_LOADED_ROLES,
    MANAGE_LOADED_MODELS,
    MANAGE_LOADED_ORDER_STATUS,
    MANAGE_LOAD_VEHICLES_SUCCESS,
    MANAGE_ADD_VEHICLE_SUCCESS
} from "../actions/ActionTypes";

const roles = (state = {}, action) => {
    switch (action.type) {
        case MANAGE_LOADED_ROLES:
            return action.data;
        default:
            return state;
    }
};

const models = (state = {}, action) => {
    switch (action.type) {
        case MANAGE_LOADED_MODELS:
            return action.data;
        default:
            return state;
    }
};

const orderStatus = (state = {}, action) => {
    switch (action.type) {
        case MANAGE_LOADED_ORDER_STATUS:
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
        default:
            return state;
    }
};

const drivers = (state = [], action) => {
    switch (action.type) {
        case MANAGE_GET_DRIVERS_SUCCESS:
            return action.data;
        case MANAGE_ADD_DRIVER_SUCCESS:
            const { driver } = action;
            return [{ ...driver, status: "new" }, ...state]
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
    status,
    registerConfirmations,
    roles,
    models,
    registers,
    drivers,
    users,
    vehicles,
    orders,
    orderStatus
});