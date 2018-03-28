import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./FormCaptcha.css";

const SENT_MESSAGE = "验证码短信已经发送至您的手机上，请注意查收！";

const SENT_FAILED = "验证码短信发送失败，请稍后重试！";

const BTN_INIT = "获取验证码";

const BTN_RESET = "重新获取";

export default class FormCaptcha extends Component {
    static propTypes = {
        hasError: PropTypes.bool,
        verified: PropTypes.bool,
        pattern: PropTypes.string,
        message: PropTypes.string,
        disabled: PropTypes.bool,
        sent: PropTypes.string,
        name: PropTypes.string,
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
        onObtain: PropTypes.func
    }

    constructor(props, context) {
        super(props, context);

        this.state = {
            countdown: -1,
            buttonDisabled: false
        };

        if (this.state.countdown > 0) {
            this.countdown();
        }
    }

    componentWillUnmount() {
        if (this.countdownTime) {
            clearTimeout(this.countdownTime);
        }
    }

    countdown = () => {
        const count = this.state.countdown;
        if (count > 0) {
            this.setState({ countdown: count - 1 }, () => {
                this.countdownTime = setTimeout(this.countdown, 1000);
            });
        } else {
            this.setState({ countdown: 0, buttonDisabled: false });
        }
    }

    handleChange = (event) => {
        const { onChange } = this.props;
        if (onChange) {
            onChange(event);
        }
    }

    handleObtain = (event) => {

        this.setState({ countdown: 60, buttonDisabled: true }, () => {
            this.countdown();
        });

        const { onObtain } = this.props;
        if (onObtain) {
            onObtain();
        }
    }

    render() {
        const { buttonDisabled, countdown } = this.state;
        const { hasError, sent, verified, name, pattern, disabled, message, placeholder } = this.props;
        const input = { name, pattern, placeholder, disabled, onChange: this.handleChange };
        const className = classNames("form-group has-feedback", { "has-error": hasError });
        const btnClass = classNames("btn btn-default btn-flat", styles.captchaButton);
        const verifiedClass = classNames("glyphicon glyphicon-ok form-control-feedback", styles.verifiedIcon);

        let btnLabel = BTN_INIT;
        if (countdown > 0) {
            btnLabel = `${countdown} 秒`;
        } else if (countdown === 0) {
            btnLabel = BTN_RESET;
        }

        return (
            <div className={className}>
                <div className="input-group">
                    <input type="text" className="form-control" {...input} />
                    <span className="input-group-btn">
                        <button type="button" className={btnClass} disabled={buttonDisabled || disabled} onClick={this.handleObtain}>
                            {btnLabel}
                        </button>
                    </span>
                    {verified && (<span className={verifiedClass}></span>)}
                </div>
                {!hasError && sent && (<span className="help-block">{sent === "success" ? SENT_MESSAGE : SENT_FAILED}</span>)}
                {hasError && message && (<span className="help-block">{message}</span>)}
            </div>
        );
    }
}