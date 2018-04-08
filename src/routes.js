import "./dateFormat";
import React from "react";
import Layout from "./layouts/Layout";
import ExtraLayout from "./layouts/ExtraLayout";
import Login from "./containers/Login";
import Register from "./containers/Register";
import RegisterSuccess from "./containers/RegisterSuccess";
import Dashboard from "./containers/Dashboard";
import Manage from "./containers/Manage";
import ManageRegisters from "./containers/Manage/Registers";
import ManageDrivers from "./containers/Manage/Drivers";
import ManageVehicles from "./containers/Manage/Vehicles";
import ManageUsers from "./containers/Manage/Users";
import ManageOrders from "./containers/Manage/Orders";

import { authenticate } from "./redux/common";

const routes = [{
    id: "root",
    routes: [
        {
            path: "/:biz(login|register)",
            component: ExtraLayout,
            routes: [{
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
            }]
        },
        {
            path: "/",
            component: Layout,
            authorize: authenticate,
            routes: [{
                path: "/",
                exact: true,
                component: Dashboard
            }, {
                path: "/manage/:feature/:category?",
                component: Manage,
                routes: [{
                    path: "/manage/users/registers",
                    exact: true,
                    component: ManageRegisters
                }, {
                    path: "/manage/users/all",
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
                    component: ManageOrders
                }, {
                    path: "/manage/orders/cancelled",
                    exact: true,
                    component: ManageOrders
                }]
            }]
        }
    ]
}];

export default routes;