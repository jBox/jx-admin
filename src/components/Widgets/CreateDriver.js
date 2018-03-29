import React, { Component } from "react";
import PropTypes from "prop-types";

import Modal from "../Overlays/Modal";
import Form from "../Form";
import Button from "../Form/Button";
import FormInput from "../Form/Input";

export default class CreateDriver extends Component {
    static propTypes = {
        error: PropTypes.string,
        onSubmit: PropTypes.func,
        onClose: PropTypes.func
    }

    constructor(props, context) {
        super(props, context);

        this.form = {
            nickname: "",
            title: "",
            mobile: ""
        }
    }

    handleSubmit = () => {
        const { onSubmit } = this.props;
        if (onSubmit) {
            onSubmit(this.form);
        }
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.form[name] = value;
    }

    render() {
        const { onClose } = this.props;
        return (
            <Form action="/api/users/drivers" method="POST" onSubmit={this.handleSubmit}>
                <Modal>
                    <Modal.Header onClose={onClose}>
                        <Modal.Title>增加司机</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <FormInput id="nickname" name="nickname" label="姓名" placeholder="司机姓名"
                            pattern=".+"
                            message="司机姓名不能为空"
                            required
                            onChange={this.handleInputChange} />

                        <FormInput id="title" name="title" label="称呼" placeholder="司机称呼"
                            pattern=".+"
                            message="司机称呼不能为空"
                            required
                            onChange={this.handleInputChange} />

                        <FormInput id="mobile" name="mobile" label="联系电话" placeholder="手机号码"
                            pattern="^1\d{10}$"
                            message="手机号码不正确"
                            required
                            onChange={this.handleInputChange} />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="pull-left" onClick={onClose}>取消</Button>
                        <Button type="submit" primary>保存</Button>
                    </Modal.Footer>
                </Modal>
            </Form>
        );
    }
}
