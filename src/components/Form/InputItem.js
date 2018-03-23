import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./InputItem.css";

export default class CaptchaItem extends Component {
    static defaultProps = {
        verified: false,
        type: "text"
    }

    static propTypes = {
        verified: PropTypes.bool,
        hasError: PropTypes.bool,
        pattern: PropTypes.string,
        message: PropTypes.string,
        icon: PropTypes.string,
        type: PropTypes.string,
        name: PropTypes.string,
        defaultValue: PropTypes.string,
        placeholder: PropTypes.string,
        onChange: PropTypes.func
    }

    handleChange = (event) => {
        const { onChange } = this.props;

        if (onChange) {
            onChange(event);
        }
    }

    render() {
        const { hasError, verified, type, name, defaultValue, message, pattern, placeholder } = this.props;
        const icon = verified ? "glyphicon-ok" : `glyphicon-${this.props.icon}`;
        const input = { type, name, defaultValue, placeholder, pattern, onChange: this.handleChange };
        const className = classNames("form-group has-feedback", { "has-error": hasError });
        const iconClass = classNames("glyphicon", icon, "form-control-feedback", { [styles.verified]: verified });
        return (
            <div className={className}>
                <input className="form-control" {...input} />
                <span className={iconClass}></span>
                {hasError && message && (<span className="help-block">{message}</span>)}
            </div>
        );
    }
}