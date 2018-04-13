import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Validator from "./Validator";

export default class Form extends Component {

    static propTypes = {
        horizontal: PropTypes.bool,
        className: PropTypes.string,
        children: PropTypes.node,
        onSubmit: PropTypes.func
    }

    static childContextTypes = {
        validator: PropTypes.object.isRequired
    }

    constructor(props, context) {
        super(props, context);

        this.validator = new Validator();
    }

    getChildContext() {
        return {
            validator: this.validator
        };
    }

    handleSubmit = (event) => {
        event.stopPropagation();
        event.preventDefault();

        if (this.validator.validate()) {
            const { onSubmit } = this.props;

            if (onSubmit) {
                onSubmit(event);
            }
        }
    }

    render() {
        const { horizontal, children, className, ...props } = this.props;
        const formClassName = classNames({ "form-horizontal": horizontal }, className);
        return (
            <form {...props} className={formClassName} onSubmit={this.handleSubmit}>
                {children}
            </form>
        );
    }
}