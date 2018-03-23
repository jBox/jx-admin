import React from "react";
import { Link } from "react-browser-router";
import ExLayout from "./ExLayout";
import Light from "../components/Tabs/Light";
import Form from "../components/Form/Login";

const Split = () => (
    <span style={{ paddingLeft: "15px", paddingRight: "15px" }}>|</span>
);

const ForgottenPsd = () => (
    <a href="#">忘记密码了？</a>
);

const GoRegister = () => (
    <span>我还没有账号，<Link to="/register" className="text-center">注册</Link></span>
);

export default class Login extends ExLayout {
    render() {
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
                            <Form />
                            <br />
                            <GoRegister />
                        </Light.Item>
                        <Light.Item id="acc">
                            <Form mode="acc" />
                            <br />
                            <GoRegister /><Split /><ForgottenPsd />
                        </Light.Item>
                    </Light>
                </div>
            </div>
        );
    }
}