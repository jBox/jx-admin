import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export default class Button extends Component {
    static defaultProps = {
        type: "button"
    }

    static propTypes = {
        primary: PropTypes.bool,
        success: PropTypes.bool,
        danger: PropTypes.bool,
        warning: PropTypes.bool,
        info: PropTypes.bool,
        lg: PropTypes.bool,
        sm: PropTypes.bool,
        xs: PropTypes.bool,
        flat: PropTypes.bool,
        block: PropTypes.bool,
        type: PropTypes.string,
        className: PropTypes.string,
        children: PropTypes.node
    }

    render() {
        const { children, type, className, block, primary, success, info, warning, danger, flat, lg, sm, xs, ...props } = this.props;
        let buttonBackgroundStyle = "btn-default";
        if (primary) {
            buttonBackgroundStyle = "btn-primary";
        } else if (success) {
            buttonBackgroundStyle = "btn-success";
        } else if (info) {
            buttonBackgroundStyle = "btn-info";
        } else if (warning) {
            buttonBackgroundStyle = "btn-warning";
        } else if (danger) {
            buttonBackgroundStyle = "btn-danger";
        }

        let buttonSize = "";
        if (lg) {
            buttonSize = "btn-lg";
        } else if (sm) {
            buttonSize = "btn-sm";
        } else if (xs) {
            buttonSize = "btn-xs";
        }

        const buttonBlock = block ? "btn-block" : "";

        const buttonFlat = flat ? "btn-flat" : "";

        const buttonClassNames = classNames(
            "btn",
            buttonBackgroundStyle,
            buttonSize,
            buttonBlock,
            buttonFlat,
            className
        );

        return (
            <button {...props} type={type} className={buttonClassNames} >
                {children}
            </button>
        );
    }
}