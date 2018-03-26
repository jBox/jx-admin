import React, { Component } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-browser-router";
import styles from "./ExtraLayout.css";

export default class ExtraLayout extends Component {
    static defaultProps = {
        routes: []
    }

    static propTypes = {
        routes: PropTypes.array
    }

    componentDidMount() {
        this.previousClassName = document.body.className;
        document.body.className = styles.extra;
    }

    componentWillUnmount() {
        document.body.className = this.previousClassName;
    }

    render() {
        const { routes } = this.props;
        return (
            <Switch>
                {routes.map((route, index) => (<Route key={index} {...route} />))}
            </Switch>
        );
    }
}