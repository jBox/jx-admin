import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ExLayout from "./ExLayout";
import { Link } from "react-browser-router";
import Light from "../components/Tabs/Light";
import Form from "../components/Form/Register";

import registerSelector from "../redux/selectors/register";
import { submit, validateIdentity, getCaptcha } from "../redux/actions/register";

const isMobilenumberValid = (num) => (
    /^1\d{10}$/g.test(num)
);

const isUsernameValid = (num) => (
    /^[a-zA-z][\w-]{4,}$/g.test(num)
);

const GoLogin = () => (
    <p style={{ marginTop: "20px" }}>
        我已经有账号了，
        <Link to="/login" className="text-center">登录</Link>
    </p>
);

class Register extends ExLayout {

    static propTypes = {
        verification: PropTypes.object,
        captcha: PropTypes.object,
        submission: PropTypes.object,
        submit: PropTypes.func,
        validateIdentity: PropTypes.func,
        getCaptcha: PropTypes.func
    }

    handleFormChange = ({ name, value }) => {
        const { validateIdentity } = this.props;
        if (validateIdentity) {
            if (name === "mobile" && isMobilenumberValid(value)) {
                validateIdentity(name, value);
            } else if (name === "username" && isUsernameValid(value)) {
                validateIdentity(name, value);
            }
        }
    }

    render() {
        const { verification, captcha } = this.props;
        return (
            <div className="register-box">
                <div className="register-logo">
                    <a href="/"><b>Jianhu</b>CAR</a>
                </div>

                <div className="register-box-body">
                    <Light>
                        <Light.Tabs>
                            <Light.Tab id="mob" checked>快速注册</Light.Tab>
                            <Light.Tab id="acc">注册</Light.Tab>
                        </Light.Tabs>
                        <Light.Item id="mob">
                            <Form verification={verification}
                                captcha={captcha}
                                onChange={this.handleFormChange} />
                            <GoLogin />
                        </Light.Item>
                        <Light.Item id="acc">
                            <Form verification={verification}
                                captcha={captcha}
                                onChange={this.handleFormChange}
                                intact />
                            <GoLogin />
                        </Light.Item>
                    </Light>
                </div>
            </div>
        );
    }
}

export default connect(registerSelector, {
    submit,
    validateIdentity,
    getCaptcha
})(Register);