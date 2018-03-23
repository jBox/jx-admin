import React from "react";
import Layout from "./containers/Layout";
import Login from "./containers/Login";
import Register from "./containers/Register";
import RegisterSuccess from "./containers/RegisterSuccess";
import Dashboard from "./containers/Dashboard";
import Starter from "./containers/Starter";

const routes = [{
    id: "root",
    routes: [
        {
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
            path: "/",
            component: Layout,
            routes: [{
                path: "/",
                exact: true,
                component: Dashboard
            }, {
                path: "/starter",
                exact: true,
                component: Starter
            }]
        }
    ]
}];

export default routes;