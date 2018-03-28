import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./FormInput.css";

export default class FormInput extends Component {
    static defaultProps = {
        type: "text",
        verified: false
    }

    static propTypes = {
        id: PropTypes.string,
        hasError: PropTypes.bool,
        verified: PropTypes.bool,
        message: PropTypes.string,
        label: PropTypes.string,
        icon: PropTypes.string,
        type: PropTypes.string,
        onChange: PropTypes.func
    }

    handleChange = (event) => {
        const { onChange } = this.props;

        if (onChange) {
            onChange(event);
        }
    }

    label = () => {
        const { id, label } = this.props;
        if (label) {
            const props = {};
            if (id) {
                props.htmlFor = id;
            }

            return (<label {...props}>{label}</label>);
        }

        return null;
    }

    icon = (verified) => {
        const { icon } = this.props;
        if (icon) {
            const glyphicon = verified ? "glyphicon-ok" : `glyphicon-${icon}`;
            const iconClass = classNames("glyphicon", glyphicon, "form-control-feedback", { [styles.verified]: verified });
            return (
                <span className={iconClass}></span>
            );
        }

        return null;
    }

    error = () => {
        const { hasError, message } = this.props;
        if (hasError && message) {
            return (<span className="help-block">{message}</span>);
        }

        return null;
    }

    render() {
        const { hasError, className, verified, ...rest } = this.props;

        const props = { ...rest, onChange: this.handleChange };
        const containerClassName = classNames("form-group has-feedback", { "has-error": hasError });
        const inputClassName = classNames("form-control", className);

        return (
            <div className={containerClassName}>
                {this.label()}
                <input {...props} className={inputClassName} />
                {this.icon(verified)}
                {this.error()}
            </div>
        );
    }
}