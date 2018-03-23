import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import InputItem from "./InputItem";
import CaptchaItem from "./CaptchaItem";

export default class Login extends Component {
    static defaultProps = {
        mode: "mob"
    }

    static propTypes = {
        mode: PropTypes.string,
        onSubmit: PropTypes.func
    }

    constructor(props, context) {
        super(props, context);

        this.form = { remember: { value: false } };

        this.state = {
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
            console.log(formData);
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

        if (this.state.error === name) {
            this.setState({ error: "" });
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
        const formData = this.extractFormData();
        const { mode, error } = this.state;
        if (mode === "mob") {
            return [
                (<InputItem key="mobile" name="mobile" placeholder="手机号码" icon="phone"
                    hasError={error === "mobile"}
                    pattern="^1\d{10}$"
                    message="请输入正确的手机号码"
                    defaultValue={formData.mobile}
                    onChange={this.handleInputChange} />),
                (<CaptchaItem key="captcha" name="captcha" placeholder="验证码"
                    hasError={error === "captcha"}
                    pattern="^\d{6}$"
                    message="验证码不正确"
                    defaultValue={formData.captcha}
                    onChange={this.handleInputChange} />)
            ];
        }

        return [
            (<InputItem key="username" name="username" placeholder="用户名" icon="user"
                hasError={error === "username"}
                pattern="^[a-zA-z][\w-]{4,}$"
                message="密码长度不能小于5，必须以字母开头，只能包含字母和数字"
                defaultValue={formData.username}
                onChange={this.handleInputChange} />),
            (<InputItem key="password" type="password" name="password" placeholder="密码" icon="lock"
                hasError={error === "password"}
                pattern=".{6,}"
                message="密码长度不能小于6位数"
                defaultValue={formData.password}
                onChange={this.handleInputChange} />)
        ];
    }

    render() {
        const { error } = this.state;
        return (
            <form action="/login" method="post" onSubmit={this.handleSubmit}>
                {this.buildInputs()}

                <div className="row">
                    <div className="col-xs-8">
                        <div className="checkbox">
                            <label>
                                <input name="remember" type="checkbox" onChange={this.handleInputChange} /> 记住我
                            </label>
                        </div>
                    </div>
                    <div className="col-xs-4">
                        <button type="submit"
                            className="btn btn-primary btn-block btn-flat"
                            disabled={!!error}
                        >
                            登录
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}