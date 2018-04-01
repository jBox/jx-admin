import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Route, Link } from "react-browser-router";

const NavItem = ({ to, exact, children }) => {
    const path = typeof to === "object" ? to.pathname : to;

    // Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202
    const escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");

    return (
        <Route path={escapedPath} exact={exact} children={({ location, match }) => {
            const isActive = !!match;
            const className = classNames({ "active": isActive, "menu-open": isActive });
            return (
                <li className={className}>
                    <Link to={to}>{children}</Link>
                </li>
            );
        }}
        />
    );
};

const Treeview = ({ to, icon, label, bridge, children }) => {
    const path = typeof to === "object" ? to.pathname : to;

    // Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202
    const escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");

    return (
        <Route path={escapedPath} children={({ location, match }) => {
            const isActive = !!match;
            const className = classNames("treeview", { "active": isActive });
            return (
                <li className={className}>
                    <a href="#">
                        {icon && (<i className={classNames("fa", "fa-" + icon)}></i>)}
                        <span>{label}</span>
                        {bridge && (<span className="pull-right-container">
                            {bridge}
                        </span>)}
                    </a>
                    <ul className="treeview-menu">
                        {children}
                    </ul>
                </li>
            );
        }}
        />
    );
};

export default class Menu extends Component {

    componentDidMount() {
        jQuery("#sidebar_menu").tree();
    }

    render() {
        return (
            <ul id="sidebar_menu" className="sidebar-menu">
                <li className="header">导航</li>
                <NavItem to="/" exact>
                    <i className="fa fa-home"></i> <span>主页</span>
                </NavItem>
                <Treeview to="/manage/orders" icon="shopping-cart" label="订单管理"
                    bridge={(<i className="fa fa-angle-left pull-right"></i>)}>
                    <NavItem to="/manage/orders/pending">
                        <i className="fa fa-circle-o"></i> <span>待处理订单</span>
                        <span className="pull-right-container">
                            <small className="label pull-right bg-green">2</small>
                        </span>
                    </NavItem>
                    <NavItem to="/manage/orders/done">
                        <i className="fa fa-circle-o"></i> <span>已完成订单</span>
                    </NavItem>
                    <NavItem to="/manage/orders/cancelled">
                        <i className="fa fa-circle-o"></i> <span>已取消订单</span>
                    </NavItem>
                </Treeview>
                <NavItem to="/manage/registers">
                    <i className="fa fa-car"></i> <span>车辆管理</span>
                    <span className="pull-right-container">
                        <small className="label pull-right bg-green">new</small>
                    </span>
                </NavItem>
                <NavItem to="/manage/drivers">
                    <i className="fa fa-user"></i> <span>司机管理</span>
                </NavItem>
                <Treeview to="/manage/users" icon="users" label="用户管理"
                    bridge={(<i className="fa fa-angle-left pull-right"></i>)}>
                    <NavItem to="/manage/users/registers">
                        <i className="fa fa-circle-o"></i> <span>新注册用户</span>
                        <span className="pull-right-container">
                            <small className="label pull-right bg-green">2</small>
                        </span>
                    </NavItem>
                    <NavItem to="/manage/users/all">
                        <i className="fa fa-circle-o"></i> <span>用户</span>
                    </NavItem>
                </Treeview>
            </ul>
        );
    }
}