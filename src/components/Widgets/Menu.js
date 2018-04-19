import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Route, Link } from "react-browser-router";

const NavItem = ({ to, exact, children }) => {
    const path = typeof to === "object" ? to.pathname : to;
    const escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");

    return (
        <Route path={escapedPath} exact={exact} children={({ location, match }) => {
            const isActive = !!match;
            const className = classNames({ "active": isActive });
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
    const escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");

    return (
        <Route path={escapedPath} children={({ location, match }) => {
            const isActive = !!match;
            const className = classNames("treeview", { "active": isActive, "menu-open": isActive });
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

const Nav = ({ data }) => {
    const { label, icon, to, children } = data;
    if (children && children.length > 0) {
        // tree
        const bridge = (<i className="fa fa-angle-left pull-right"></i>);
        return (
            <Treeview to={to} icon={icon} label={label} bridge={bridge}>
                {children.map((item) => (<Nav key={item.to} data={item} />))}
            </Treeview>
        );
    } else {
        // item
        return (
            <NavItem to={to} exact>
                {icon && (<i className={classNames("fa", `fa-${icon}`)}></i>)} <span>{label}</span>
            </NavItem>
        );
    }
};

export default class Menu extends Component {
    static propTypes = {
        navs: PropTypes.array
    }

    componentDidMount() {
        jQuery("#sidebar_menu").tree();
    }

    render() {
        const { navs } = this.props;
        return (
            <ul id="sidebar_menu" className="sidebar-menu">
                <li className="header">导航</li>
                {navs.length > 0 && navs.map((item) => (<Nav key={item.to} data={item} />))}
            </ul>
        );
    }
}