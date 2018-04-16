import React, { Component } from "react";

export default class RegisterSuccess extends Component {

    render() {
        return (
            <div className="register-box">
                <div className="register-logo">
                    <a href="/"><b>Jianhu</b>CAR</a>
                </div>

                <div className="register-box-body">
                    <h2>注册成功!</h2>
                    <p>我们将对您的注册信息进行审核，审核通过后，将以短信的方式通知您。感谢您的支持！</p>
                </div>
            </div>
        );
    }
}