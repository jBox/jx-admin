import React, { Component } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-browser-router";
import Header from "../containers/Header";
import Sidebar from "../containers/Sidebar";
import Callouts from "../containers/Callouts";

export default class Layout extends Component {
    static defaultProps = {
        routes: []
    }

    static propTypes = {
        routes: PropTypes.array
    }

    render() {
        const { routes, ...props } = this.props;
        const fullYear = new Date().getFullYear();
        return (
            <div className="wrapper">
                <Callouts {...props} />
                <Header {...props} />
                <Sidebar {...props} />
                <div className="content-wrapper">
                    <Switch>
                        {routes.map((route, index) => (<Route key={index} {...route} />))}
                    </Switch>
                </div>
                <footer className="main-footer">
                    <div className="pull-right hidden-xs">
                        <b>Version</b> {"1.0"}
                    </div>
                    <strong>Copyright &copy; {fullYear}
                        <a href="#">JH</a>.</strong> All rights reserved.
                </footer>
            </div>
        );
    }
}