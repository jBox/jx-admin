//// CALL API ////
export const API = "@CALL/API";
/********************************/

export const LOGOUT = "logout";

/***************** START Callouts *****************/
export const CALLOUT = "callout";
export const CLOSE_CALLOUT = "callout/cls";
/***************** END Callouts   *****************/

/***************** START REGISTER *****************/
export const SUBMIT_REG_REQUEST = "reg/submit/req";
export const SUBMIT_REG_SUCCESS = "reg/submit/sec";
export const SUBMIT_REG_FAILURE = "reg/submit/fai";
export const RESET_SUBMIT = "reg/reset/sub";

export const VALIDATE_REQUEST = "reg/val/req";
export const VALIDATE_SUCCESS = "reg/val/sec";
export const VALIDATE_FAILURE = "reg/val/fai";

export const GET_CAP_REQUEST = "reg/cap/req";
export const GET_CAP_SUCCESS = "reg/cap/sec";
export const GET_CAP_FAILURE = "reg/cap/fai";

/***************** END REGISTER   *****************/

/***************** START LOGIN *****************/
export const LOGIN_REQUEST = "login/req";
export const LOGIN_SUCCESS = "login/sec";
export const LOGIN_FAILURE = "login/fai";
export const RESET_LOGIN = "login/reset";
export const INIT_LOGIN = "login/initial";
export const LANDING_LOGIN = "landing/login";

export const GET_USER_IFNO = "user/info";

export const LOGIN_CAP_REQUEST = "login/cap/req";
export const LOGIN_CAP_SUCCESS = "login/cap/sec";
export const LOGIN_CAP_FAILURE = "login/cap/fai";
/***************** END LOGIN   *****************/

/***************** START MANAGE *****************/

export const MANAGE_LOADED_ROLES = "m/load/roles";

export const MANAGE_LOADED_MODELS = "m/load/models";

export const MANAGE_LOADED_ORDER_STATUS = "m/load/status";

export const MANAGE_LOAD_MORE_ORDERS_REQUEST = "m/load-more/orders/req";
export const MANAGE_LOAD_MORE_ORDERS_SUCCESS = "m/load-more/orders/suc";
export const MANAGE_LOAD_MORE_ORDERS_FAILURE = "m/load-more/orders/fai";

export const MANAGE_LOAD_ORDERS_REQUEST = "m/load/orders/req";
export const MANAGE_LOAD_ORDERS_SUCCESS = "m/load/orders/suc";
export const MANAGE_LOAD_ORDERS_FAILURE = "m/load/orders/fai";

export const MANAGE_GET_ORDER_REQUEST = "m/get/order/req";
export const MANAGE_GET_ORDER_SUCCESS = "m/get/order/suc";
export const MANAGE_GET_ORDER_FAILURE = "m/get/order/fai";

export const MANAGE_ORDER_UPDATED = "m/orders/updated";

export const MANAGE_MODIFY_ORDER_REQUEST = "m/mod/order/req";
export const MANAGE_MODIFY_ORDER_SUCCESS = "m/mod/order/suc";
export const MANAGE_MODIFY_ORDER_FAILURE = "m/mod/order/fai";

export const MANAGE_LOAD_USERS_REQUEST = "m/load/users/req";
export const MANAGE_LOAD_USERS_SUCCESS = "m/load/users/suc";
export const MANAGE_LOAD_USERS_FAILURE = "m/load/users/fai";

export const MANAGE_LOAD_VEHICLES_REQUEST = "m/load/vs/req";
export const MANAGE_LOAD_VEHICLES_SUCCESS = "m/load/vs/suc";
export const MANAGE_LOAD_VEHICLES_FAILURE = "m/load/vs/fai";

export const MANAGE_ADD_VEHICLE_SUCCESS = "m/add/vhc/suc";
export const MANAGE_DEL_VEHICLE_SUCCESS = "m/del/vhc/suc";
export const MANAGE_ADD_DRIVER_SUCCESS = "m/add/drv/suc";
export const MANAGE_DEL_USER_SUCCESS = "m/del/user/suc";

export const MANAGE_UPD_USER_REQUEST = "m/upd/user/req";
export const MANAGE_UPD_USER_SUCCESS = "m/upd/user/suc";
export const MANAGE_UPD_USER_FAILURE = "m/upd/user/fai";

export const MANAGE_UPDATE_DRIVER_REQUEST = "m/u/drv/req";
export const MANAGE_UPDATE_DRIVER_SUCCESS = "m/u/drv/suc";
export const MANAGE_UPDATE_DRIVER_FAILURE = "m/u/drv/fai";
export const MANAGE_UPDATE_DRIVER_STATUS_RESET = "m/u/d/stat/rs";

export const MANAGE_DEL_DRIVER_REQUEST = "m/d/drv/req";
export const MANAGE_DEL_DRIVER_SUCCESS = "m/d/drv/suc";
export const MANAGE_DEL_DRIVER_FAILURE = "m/d/drv/fai";

export const MANAGE_GET_DRIVERS_SUCCESS = "m/q/drv/suc";
export const MANAGE_GET_REGISTERS_SUCCESS = "m/q/regs/suc";
export const MANAGE_CONFIRM_REGISTEG_REQUEST = "m/conf/reg/req";
export const MANAGE_CONFIRM_REGISTEG_SUCCESS = "m/conf/reg/suc";
export const MANAGE_CONFIRM_REGISTEG_FAILURE = "m/conf/reg/fai";
/***************** END MANAGE   *****************/

/***************** START DRIVER *****************/
export const DRIVER_LOAD_CURR_TRIP = "drv/ld/curr/trip";
export const DRIVER_LOAD_TRIPS = "drv/ld/trips";

export const DRIVER_TRIP_DEPART_REQUEST = "drv/trip/d/req";
export const DRIVER_TRIP_DEPART_SUCCESS = "drv/trip/d/suc";
export const DRIVER_TRIP_DEPART_FAILURE = "drv/trip/d/fai";

export const DRIVER_TRIP_REVERT_REQUEST = "drv/trip/r/req";
export const DRIVER_TRIP_REVERT_SUCCESS = "drv/trip/r/suc";
export const DRIVER_TRIP_REVERT_FAILURE = "drv/trip/r/fai";

export const DRIVER_TRIP_UPDATE_REQUEST = "drv/trip/u/req";
export const DRIVER_TRIP_UPDATE_SUCCESS = "drv/trip/u/suc";
export const DRIVER_TRIP_UPDATE_FAILURE = "drv/trip/u/fai";

/***************** END DRIVER   *****************/
