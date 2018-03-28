import React, { Component } from "react";
import PropTypes from "prop-types";
import isEqual from "lodash/isEqual";
import isEmpty from "lodash/isEmpty";
import classNames from "classnames";
import FormInput from "./FormInput";
import FormCaptcha from "./FormCaptcha";

export default class Register extends Component {
    static propTypes = {
        intact: PropTypes.bool,
        verification: PropTypes.object,
        captcha: PropTypes.object,
        error: PropTypes.string,
        onChange: PropTypes.func,
        onSubmit: PropTypes.func,
        onObtainCaptcha: PropTypes.func
    }

    constructor(props, context) {
        super(props, context);

        this.form = {};

        this.state = {
            captchaDisabled: true,
            verification: {},
            terms: false,
            error: ""
        }
    }

    componentWillReceiveProps(nextProps) {
        const { verification, captcha } = nextProps;
        if (!isEqual(verification, this.props.verification) &&
            !isEqual(verification, this.state.verification)) {
            this.setState({ verification });
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
        const { intact } = this.props;
        const fields = ["nickname", "mobile", "captcha"];
        if (intact) {
            fields.push("username");
            fields.push("password");
            fields.push("confirmPassword");
        }

        const form = this.form;
        return fields.reduce((data, field) => {
            const isOwner = form.hasOwnProperty(field);
            data[field] = isOwner ? form[field].value : undefined;
            return data;
        }, { terms: this.state.terms });
    }

    handleInputChange = (event) => {
        const { name, value, pattern } = event.target;
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

    handleTermsChange = (event) => {
        const { name, checked } = event.target;

        if (name === "terms" && this.state.terms !== checked) {
            this.setState({ terms: checked });
        }
    }

    handleObtainCaptcha = () => {
        const { onObtainCaptcha } = this.props;
        if (onObtainCaptcha) {
            onObtainCaptcha(this.form.mobile.value)
        }
    }

    validateInputs = () => {
        const { intact } = this.props;
        const fields = ["nickname", "mobile", "captcha"];
        if (intact) {
            fields.push("username");
            fields.push("password");
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

        if (intact && !error.field) {
            const psdItem = this.form.password;
            const confirmPsdItem = this.form.confirmPassword;
            if (!confirmPsdItem || psdItem.value !== confirmPsdItem.value) {
                error.field = "confirmPassword";
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

    render() {
        const { intact, captcha, error: formError } = this.props;
        const { error, terms, verification, captchaDisabled } = this.state;
        const formData = this.extractFormData();

        return (
            <form action="/register" method="post" onSubmit={this.handleSubmit}>
                <FormInput name="nickname" placeholder="姓名" icon="info-sign"
                    hasError={error === "nickname"}
                    pattern=".+"
                    message="姓名不能为空"
                    defaultValue={formData.name}
                    onChange={this.handleInputChange} />
                <FormInput name="mobile" placeholder="手机号码" icon="phone"
                    hasError={error === "mobile"}
                    pattern="^1\d{10}$"
                    message="请输入正确的手机号码"
                    verified={verification.mobile && verification.mobile.verified}
                    defaultValue={formData.mobile}
                    onChange={this.handleInputChange} />
                <FormCaptcha name="captcha" placeholder="验证码"
                    hasError={error === "captcha"}
                    pattern="^\d{6}$"
                    message="验证码不正确"
                    disabled={captchaDisabled}
                    sent={captcha.state}
                    defaultValue={formData.captcha}
                    onChange={this.handleInputChange}
                    onObtain={this.handleObtainCaptcha} />
                {intact && <FormInput name="username" placeholder="用户名" icon="user"
                    hasError={error === "username"}
                    pattern="^[a-zA-z][\w-]{4,}$"
                    message="密码长度不能小于5，必须以字母开头，只能包含字母和数字"
                    verified={verification.username && verification.username.verified}
                    defaultValue={formData.username}
                    onChange={this.handleInputChange} />}
                {intact && <FormInput type="password" name="password" placeholder="密码" icon="lock"
                    hasError={error === "password"}
                    pattern=".{6,}"
                    message="密码长度不能小于6位数"
                    defaultValue={formData.password}
                    onChange={this.handleInputChange} />}
                {intact && <FormInput type="password" name="confirmPassword" placeholder="再次输入密码" icon="log-in"
                    hasError={error === "confirmPassword"}
                    message="输入密码不匹配"
                    defaultValue={formData.confirmPassword}
                    onChange={this.handleInputChange} />}

                {formError && (<div class="form-group has-feedback has-error">
                    <span class="help-block">{formError}</span>
                </div>)}

                <div className="row">
                    <div className="col-xs-8">
                        <div className="checkbox">
                            <label>
                                <input name="terms" type="checkbox" onChange={this.handleTermsChange} /> 同意 <a href="#terms">租车协议</a>
                            </label>
                        </div>
                    </div>
                    <div className="col-xs-4">
                        <button type="submit"
                            className="btn btn-primary btn-block btn-flat"
                            disabled={!terms || !!error || !!formError}
                        >
                            注册
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}