import "./dateFormat";
import React from "react";
import Layout from "./layouts/Layout";
import ExtraLayout from "./layouts/ExtraLayout";
import Landing from "./containers/Landing";
import Login from "./containers/Login";
import Register from "./containers/Register";
import AccessDenied from "./containers/AccessDenied";
import RegisterSuccess from "./containers/Register/Success";
import Dashboard from "./containers/Dashboard";
import Manage from "./containers/Manage";
import ManageRegisters from "./containers/Manage/Registers";
import ManageDrivers from "./containers/Manage/Drivers";
import ManageVehicles from "./containers/Manage/Vehicles";
import ManageUsers from "./containers/Manage/Users";
import ManageOrders from "./containers/Manage/Orders";
import ManageCancelledOrders from "./containers/Manage/CancelledOrders";
import ManageCompletedOrders from "./containers/Manage/CompletedOrders";
import Driver from "./containers/Driver";
import DriverHome from "./containers/Driver/Home";
import DriverTrips from "./containers/Driver/Trips";

import {
    authenticate,
    driverAuthorize,
    adminAuthorize
} from "./redux/common";

const routes = [{
    id: "root",
    routes: [
        {
            path: "/:biz(landing|login|register|access)",
            component: ExtraLayout,
            routes: [{
                path: "/landing",
                exact: true,
                component: Landing
            }, {
                path: "/login",
                exact: true,
                component: Login
            }, {
                path: "/register",
                exact: true,
                component: Register
            }, {
                path: "/register/success",
                exact: true,
                component: RegisterSuccess
            }, {
                path: "/access/denied",
                exact: true,
                component: AccessDenied
            }]
        },
        {
            path: "/",
            component: Layout,
            authorize: authenticate,
            routes: [{
                path: "/dashboard",
                exact: true,
                component: Dashboard,
                authorize: adminAuthorize
            }, {
                path: "/manage/:feature/:category?",
                component: Manage,
                authorize: adminAuthorize,
                routes: [{
                    path: "/manage/users/registers",
                    exact: true,
                    component: ManageRegisters
                }, {
                    path: "/manage/users",
                    exact: true,
                    component: ManageUsers
                }, {
                    path: "/manage/drivers",
                    exact: true,
                    component: ManageDrivers
                }, {
                    path: "/manage/vehicles",
                    exact: true,
                    component: ManageVehicles
                }, {
                    path: "/manage/orders",
                    exact: true,
                    component: ManageOrders
                }, {
                    path: "/manage/orders/done",
                    exact: true,
                    component: ManageCompletedOrders
                }, {
                    path: "/manage/orders/cancelled",
                    exact: true,
                    component: ManageCancelledOrders
                }]
            }, {
                path: "/driver/:feature?",
                component: Driver,
                authorize: driverAuthorize,
                routes: [{
                    path: "/driver",
                    exact: true,
                    component: DriverHome
                }, {
                    path: "/driver/trips",
                    exact: true,
                    component: DriverTrips
                }]
            }]
        }
    ]
}];

export default routes;