import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Control extends Component {
    static contextTypes = {
        validator: PropTypes.object
    }

    componentDidMount() {
        const { validator } = this.context;
        if (validator) {
            validator.register(this);
        }
    }

    componentWillUnmount() {
        const { validator } = this.context;
        if (validator) {
            validator.unregister(this);
        }
    }

    validate() {
        return true;
    }
}