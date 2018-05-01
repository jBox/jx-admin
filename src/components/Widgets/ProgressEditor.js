import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import isEqual from "lodash/isEqual";

import Form from "../Form";
import Button from "../Form/Button";
import Dropdown from "../Form/Dropdown";
import FormInput from "../Form/Input";
import Modal from "../Overlays/Modal";

const isDataEmpty = (data) => {
    if (!data) {
        return true;
    }

    return data.date === "" &&
        data.milage === "" &&
        data.duration === "" &&
        data.tollFee === "" &&
        data.fuelFee === "" &&
        data.parkingFee === "";
};

export default class ProgressEditor extends Component {
    static defaultProps = {
        terms: [],
        data: {
            date: "", // 日期
            milage: "", // 里程
            duration: "", // 行车时间
            tollFee: "", // 通行费
            fuelFee: "", // 油费
            parkingFee: "" // 停车费
        }
    }

    static propTypes = {
        data: PropTypes.object,
        terms: PropTypes.array,
        onSubmit: PropTypes.func,
        onClose: PropTypes.func
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        const { data, terms } = nextProps;
        if (!isEqual(data, prevState.original)) {
            const isEdit = !isDataEmpty(data);
            return {
                original: { ...data },
                data: isEdit ? { ...data } : { ...data, date: terms[0] },
                isEdit
            };
        }

        return null;
    }

    constructor(props, context) {
        super(props, context);

        const data = { ...props.data };
        const isEdit = !isDataEmpty(data);
        this.state = {
            original: { ...data },
            data: isEdit ? { ...data } : { ...data, date: props.terms[0] },
            isEdit
        };
    }

    handleSubmit = () => {
        const { onSubmit } = this.props;
        if (onSubmit) {
            onSubmit({ ...this.state.data, report: new Date().toISOString() });
        }
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ data: { ...this.state.data, [name]: value } });
    }

    render() {
        const { onClose, terms } = this.props;
        const { isEdit, data } = this.state;
        const title = isEdit ? `编辑进度 （${data.date}）` : "汇报进度";
        const submitButton = isEdit ? `提交修改` : "提交汇报";
        return (
            <Form action="/api/users/drivers" method="POST" onSubmit={this.handleSubmit}>
                <Modal>
                    <Modal.Header onClose={onClose}>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {!isEdit && (
                            <Dropdown id="date" name="date" label="行车日期"
                                defaultValue={data.date}
                                options={
                                    terms.map((item) => (
                                        { value: item, label: item }
                                    ))
                                }
                                onChange={this.handleInputChange}
                            />
                        )}
                        <FormInput type="number" id="milage" name="milage" label="里程（公里）" placeholder="里程"
                            message="请输入正确的里程数"
                            defaultValue={data.milage}
                            required
                            onChange={this.handleInputChange} />
                        <FormInput type="number" id="duration" name="duration" label="行车时间（小时）" placeholder="行车时间"
                            message="请输入正确的行车时间"
                            defaultValue={data.duration}
                            required
                            onChange={this.handleInputChange} />
                        <FormInput type="number" id="fuelFee" name="fuelFee" label="油费" placeholder="油费"
                            message="请输入正确的油费"
                            defaultValue={data.fuelFee}
                            required
                            onChange={this.handleInputChange} />
                        <FormInput type="number" id="tollFee" name="tollFee" label="通行费" placeholder="通行费"
                            message="请输入正确的通行费"
                            defaultValue={data.tollFee}
                            onChange={this.handleInputChange} />
                        <FormInput type="number" id="parkingFee" name="parkingFee" label="停车费" placeholder="停车费"
                            message="请输入正确的停车费"
                            defaultValue={data.parkingFee}
                            onChange={this.handleInputChange} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="pull-left" onClick={onClose}>取消</Button>
                        <Button type="submit" primary>{submitButton}</Button>
                    </Modal.Footer>
                </Modal>
            </Form>
        );
    }
}
