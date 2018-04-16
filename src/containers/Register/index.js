import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import isEqual from "lodash/isEqual";
import { Link } from "react-browser-router";
import Light from "../../components/Tabs/Light";
import Form from "../../components/Form/Register";

import registerSelector from "../../redux/selectors/register";
import { submit, validateIdentity, obtainCaptcha, resetSubmission } from "../../redux/actions/register";

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

class Register extends Component {

    static propTypes = {
        history: PropTypes.object,
        verification: PropTypes.object,
        captcha: PropTypes.object,
        submission: PropTypes.object,
        submit: PropTypes.func,
        resetSubmission: PropTypes.func,
        validateIdentity: PropTypes.func,
        obtainCaptcha: PropTypes.func
    }

    handleFormChange = ({ name, value }) => {
        const { resetSubmission, submission } = this.props;
        if (resetSubmission && submission.state === "failure") {
            resetSubmission();
        }
    }

    componentWillReceiveProps(nextProps) {
        const { submission, history } = nextProps;
        if (!isEqual(submission, this.props.submission) && submission.state === "success") {
            history.replace("/register/success");
        }
    }

    render() {
        const { verification, submission, captcha, obtainCaptcha, submit } = this.props;
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
                                error={submission.error}
                                onObtainCaptcha={obtainCaptcha}
                                onChange={this.handleFormChange}
                                onSubmit={submit} />
                            <GoLogin />
                        </Light.Item>
                        <Light.Item id="acc">
                            <Form verification={verification}
                                captcha={captcha}
                                error={submission.error}
                                onObtainCaptcha={obtainCaptcha}
                                onChange={this.handleFormChange}
                                onSubmit={submit}
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
    resetSubmission,
    submit,
    validateIdentity,
    obtainCaptcha
})(Register);