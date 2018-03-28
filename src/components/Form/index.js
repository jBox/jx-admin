import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export default class Form extends Component {

    static propTypes = {
        horizontal: PropTypes.bool,
        className: PropTypes.string,
        children: PropTypes.node,
        onSubmit: PropTypes.func
    }

    handleSubmit = (event) => {
        event.stopPropagation();
        event.preventDefault();

        const { onSubmit } = this.props;

        if (onSubmit) {
            onSubmit(event);
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