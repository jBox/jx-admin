import React, { Component } from "react";
import PropTypes from "prop-types";

import Modal from "../Overlays/Modal";
import Form from "../Form";
import Button from "../Form/Button";
import FormInput from "../Form/Input";
import Select from "../Form/Select";
import { LPN_PATTERN } from "../utils";

export default class CreateVehicle extends Component {
    static propTypes = {
        models: PropTypes.object,
        error: PropTypes.string,
        onSubmit: PropTypes.func,
        onClose: PropTypes.func
    }

    constructor(props, context) {
        super(props, context);

        this.form = {
            number: "",
            model: ""
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
        const { onClose, models } = this.props;
        const selectData = Object.keys(models).reduce((items, key) => {
            return [...items, { id: key, text: models[key].label }];
        }, []);
        return (
            <Form action="/api/users/drivers" method="POST" onSubmit={this.handleSubmit}>
                <Modal>
                    <Modal.Header onClose={onClose}>
                        <Modal.Title>添加车辆</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <FormInput id="number" name="number" label="车牌号码" placeholder="车牌号码"
                            pattern={LPN_PATTERN}
                            message="请输入正确车牌号码"
                            required
                            onChange={this.handleInputChange} />

                        <Select id="model" name="model" label="车型" placeholder="车辆类型"
                            message="请选择车辆类型"
                            data={selectData}
                            required
                            onChange={this.handleInputChange}
                        />

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
