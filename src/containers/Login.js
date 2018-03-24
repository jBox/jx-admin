import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-browser-router";
import isEqual from "lodash/isEqual";
import ExLayout from "./ExLayout";
import Light from "../components/Tabs/Light";
import Form from "../components/Form/Login";

import loginSelector from "../redux/selectors/login";
import { login, obtainCaptcha, resetLogin } from "../redux/actions/login";

const Split = () => (
    <span style={{ paddingLeft: "15px", paddingRight: "15px" }}>|</span>
);

const ForgottenPsd = () => (
    <a href="#">忘记密码了？</a>
);

const GoRegister = () => (
    <span>我还没有账号，<Link to="/register" className="text-center">注册</Link></span>
);

class Login extends ExLayout {

    static propTypes = {
        history: PropTypes.object,
        captcha: PropTypes.object,
        submission: PropTypes.object,
        login: PropTypes.func,
        resetLogin: PropTypes.func,
        obtainCaptcha: PropTypes.func
    }

    componentWillReceiveProps(nextProps) {
        const { submission, history } = nextProps;
        if (!isEqual(submission, this.props.submission)) {
            history.replace("/");
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
    obtainCaptcha
})(Login);