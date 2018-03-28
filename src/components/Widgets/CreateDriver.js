import React, { Component } from "react";
import PropTypes from "prop-types";

import Modal from "../Overlays/Modal";
import Form from "../Form";
import Button from "../Form/Button";
import FormInput from "../Form/FormInput";

export default class CreateDriver extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        onClose: PropTypes.func
    }

    handleSubmit = () => {
        const { onSubmit } = this.props;
        if (onSubmit) {
            onSubmit();
        }
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
                        <FormInput id="nickname" name="nickname" label="姓名" placeholder="司机姓名" />
                        <FormInput id="title" name="title" label="称呼" placeholder="某某师傅" />
                        <FormInput id="mobile" name="mobile" label="联系电话" placeholder="手机号码" />
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
