import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-browser-router";
import isEqual from "lodash/isEqual";
import Light from "../components/Tabs/Light";
import Form from "../components/Form/Login";

import loginSelector from "../redux/selectors/login";
import { login, obtainCaptcha, resetLogin, initialLogin } from "../redux/actions/login";

const Split = () => (
    <span style={{ paddingLeft: "15px", paddingRight: "15px" }}>|</span>
);

const ForgottenPsd = () => (
    <a href="#">忘记密码了？</a>
);

const GoRegister = () => (
    <span>我还没有账号，<Link to="/register" className="text-center">注册</Link></span>
);

class Login extends Component {

    static propTypes = {
        auth: PropTypes.object,
        history: PropTypes.object,
        captcha: PropTypes.object,
        submission: PropTypes.object,
        login: PropTypes.func,
        resetLogin: PropTypes.func,
        initialLogin: PropTypes.func,
        obtainCaptcha: PropTypes.func
    }

    componentDidMount() {
        const { auth, history } = this.props;
        if (auth.authenticated && history) {
            return history.replace(auth.returnUrl);
        }

        const { initialLogin } = this.props;
        if (initialLogin) {
            initialLogin();
        }
    }

    componentWillReceiveProps(nextProps) {
        const { auth, history } = nextProps;
        if (!isEqual(auth, this.props.auth) && auth.authenticated) {
            history.replace(auth.returnUrl);
        }
    }

    handleFormChange = () => {
        const { resetLogin, submission } = this.props;
        if (resetLogin && submission.state === "failure") {
            resetLogin();
        }
    }

    render() {

        const { submission, captcha, login, obtainCaptcha } = this.props;

        const formProps = {
            captcha,
            error: submission.error,
            onSubmit: login,
            onChange: this.handleFormChange,
            onObtainCaptcha: obtainCaptcha
        };

        return (
            <div className="login-box">
                <div className="login-logo">
                    <a href="/"><b>Jianhu</b>CAR</a>
                </div>
                <div className="login-box-body">
                    <Light>
                        <Light.Tabs>
                            <Light.Tab id="mob" checked>手机登录</Light.Tab>
                            <Light.Tab id="acc">账号登录</Light.Tab>
                        </Light.Tabs>
                        <Light.Item id="mob">
                            <Form {...formProps} />
                            <br />
                            <GoRegister />
                        </Light.Item>
                        <Light.Item id="acc">
                            <Form {...formProps} mode="acc" />
                            <br />
                            <GoRegister /><Split /><ForgottenPsd />
                        </Light.Item>
                    </Light>
                </div>
            </div>
        );
    }
}

export default connect(loginSelector, {
    resetLogin,
    login,
    obtainCaptcha,
    initialLogin
})(Login);