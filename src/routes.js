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
                path: "/manage/:category",
                component: Manage,
                routes: [{
                    path: "/manage/registers",
                    exact: true,
                    component: ManageRegisters
                }]
            }]
        }
    ]
}];

export default routes;