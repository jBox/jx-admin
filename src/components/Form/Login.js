import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import isEqual from "lodash/isEqual";
import isEmpty from "lodash/isEmpty";
import FormInput from "./FormInput";
import FormCaptcha from "./FormCaptcha";

export default class Login extends Component {
    static defaultProps = {
        mode: "mob"
    }

    static propTypes = {
        mode: PropTypes.string,
        captcha: PropTypes.object,
        error: PropTypes.string,
        onChange: PropTypes.func,
        onSubmit: PropTypes.func,
        onObtainCaptcha: PropTypes.func
    }

    constructor(props, context) {
        super(props, context);

        this.form = { remember: { value: false } };

        this.state = {
            captchaDisabled: true,
            mode: props.mode,
            error: ""
        }
    }

    componentWillReceiveProps(nextProps) {
        const { mode } = nextProps;
        if (this.props.mode !== mode && mode !== this.state.mode) {
            this.setState({ mode, error: "" });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (this.validateInputs()) {
            const { onSubmit } = this.props;
            const formData = this.extractFormData();
            if (onSubmit) {
                onSubmit(formData);
            }
        }
    }

    extractFormData = () => {
        const { mode } = this.state;
        const fields = ["username", "password", "remember"];
        if (mode === "mob") {
            fields[0] = "mobile";
            fields[1] = "captcha";
        }

        const form = this.form;
        return fields.reduce((data, field) => {
            const isOwner = form.hasOwnProperty(field);
            data[field] = isOwner ? form[field].value : undefined;
            return data;
        }, {});
    }

    handleInputChange = (event) => {
        const target = event.target;
        const { name, pattern } = target;
        const value = target.hasOwnProperty("checked") ?
            target.checked :
            target.value;
        this.form[name] = {
            value,
            pattern
        };

        // check captcha disabled
        const state = {};
        if (name === "mobile") {
            const r = new RegExp(pattern, "g");
            const captchaDisabled = !r.test(value);
            if (this.state.captchaDisabled !== captchaDisabled) {
                state.captchaDisabled = captchaDisabled;
            }
        }

        if (this.state.error === name) {
            state.error = "";
        }

        if (!isEmpty(state)) {
            this.setState(state);
        }

        const { onChange } = this.props;
        if (onChange) {
            onChange({ name, value });
        }
    }

    handleObtainCaptcha = () => {
        const { onObtainCaptcha } = this.props;
        if (onObtainCaptcha) {
            onObtainCaptcha(this.form.mobile.value)
        }
    }

    validateInputs = () => {
        const { mode } = this.state;
        const fields = ["username", "password"];
        if (mode === "mob") {
            fields[0] = "mobile";
            fields[1] = "captcha";
        }

        const error = {};
        for (let field of fields) {
            const item = this.form[field];
            if (!item) {
                error.field = field;
                break;
            }

            const { value, pattern } = item;
            if (pattern) {
                const reg = new RegExp(pattern, "ig");
                if (!reg.test(value)) {
                    error.field = field;
                    break;
                }
            }
        }

        if (error.field) {
            if (this.state.error !== error.field) {
                this.setState({ error: error.field });
            }

            return false;
        }

        if (this.state.error) {
            this.setState({ error: "" });
        }

        return true;
    }

    buildInputs = () => {
        const { captcha } = this.props;
        const { mode, error, captchaDisabled } = this.state;
        const formData = this.extractFormData();
        if (mode === "mob") {
            return [
                (<FormInput key="mobile" name="mobile" placeholder="手机号码" icon="phone"
                    hasError={error === "mobile"}
                    pattern="^1\d{10}$"
                    message="请输入正确的手机号码"
                    defaultValue={formData.mobile}
                    onChange={this.handleInputChange} />),
                (<FormCaptcha key="captcha" name="captcha" placeholder="验证码"
                    hasError={error === "captcha"}
                    pattern="^\d{6}$"
                    message="验证码不正确"
                    disabled={captchaDisabled}
                    sent={captcha.state}
                    defaultValue={formData.captcha}
                    onChange={this.handleInputChange}
                    onObtain={this.handleObtainCaptcha} />)
            ];
        }

        return [
            (<FormInput key="username" name="username" placeholder="用户名" icon="user"
                hasError={error === "username"}
                pattern="^[a-zA-z][\w-]{4,}$"
                message="密码长度不能小于5，必须以字母开头，只能包含字母和数字"
                defaultValue={formData.username}
                onChange={this.handleInputChange} />),
            (<FormInput key="password" type="password" name="password" placeholder="密码" icon="lock"
                hasError={error === "password"}
                pattern=".{6,}"
                message="密码长度不能小于6位数"
                defaultValue={formData.password}
                onChange={this.handleInputChange} />)
        ];
    }

    render() {
        const { error } = this.state;
        const { error: formError } = this.props;

        return (
            <form action="/login" method="post" onSubmit={this.handleSubmit}>
                {this.buildInputs()}

                {formError && (<div className="form-group has-feedback has-error">
                    <span className="help-block">{formError}</span>
                </div>)}

                <div className="row">
                    <div className="col-xs-8">
                        <div className="checkbox">
                            <label>
                                <input name="remember" type="checkbox" onChange={this.handleInputChange} /> 下次自动登录
                            </label>
                        </div>
                    </div>
                    <div className="col-xs-4">
                        <button type="submit"
                            className="btn btn-primary btn-block btn-flat"
                            disabled={!!error || !!formError}
                        >
                            登录
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}