import React, { Component } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-browser-router";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default class Layout extends Component {
    componentDidMount() {
        console.log("Layout");
    }

    componentWillUnmount() {
        console.log("Unmount", "Layout");
    }

    static defaultProps = {
        routes: []
    }

    static propTypes = {
        routes: PropTypes.array
    }

    render() {
        const { routes } = this.props;
        const fullYear = new Date().getFullYear();
        return (
            <div className="wrapper">
                <Header />
                <Sidebar />
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