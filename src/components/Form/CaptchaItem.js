import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./CaptchaItem.css";

export default class CaptchaItem extends Component {
    static propTypes = {
        hasError: PropTypes.bool,
        verified: PropTypes.bool,
        pattern: PropTypes.string,
        message: PropTypes.string,
        name: PropTypes.string,
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
        onObtain: PropTypes.func
    }

    handleChange = (event) => {
        const { onChange } = this.props;
        if (onChange) {
            onChange(event);
        }
    }

    handleObtain = (event) => {
        const { onObtain } = this.props;
        if (onObtain) {
            onObtain();
        }
    }

    render() {
        const { hasError, verified, name, pattern, message, placeholder } = this.props;
        const input = { name, pattern, placeholder, onChange: this.handleChange };
        const className = classNames("form-group has-feedback", { "has-error": hasError });
        const btnClass = classNames("bg-gray input-group-addon", styles.captchaButton);
        const verifiedClass = classNames("glyphicon glyphicon-ok form-control-feedback", styles.verifiedIcon);
        return (
            <div className={className}>
                <div className="input-group">
                    <input type="text" className="form-control" {...input} />
                    <span className={btnClass} onClick={this.handleObtain}>
                        获取验证码
                    </span>
                    {verified && (<span className={verifiedClass}></span>)}
                </div>
                {hasError && message && (<span className="help-block">{message}</span>)}
            </div>
        );
    }
}