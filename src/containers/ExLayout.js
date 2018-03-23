import React, { Component } from "react";

export default class ExLayout extends Component {
    componentDidMount() {
        this.previousClassName = document.body.className;
        document.body.className = "login-page";
    }

    componentWillUnmount() {
        document.body.className = this.previousClassName;
    }
}