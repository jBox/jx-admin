import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import isEqual from "lodash/isEqual";
import styles from "./TripProgress.css";

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

class ProgressEditor extends Component {
    static defaultProps = {
        availableDates: [],
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
        availableDates: PropTypes.array,
        onSubmit: PropTypes.func,
        onClose: PropTypes.func
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        const { data, mode } = nextProps;
        if (!isEqual(data, prevState.original)) {
            return {
                original: { ...data },
                data: { ...data },
                isEdit: !isDataEmpty(data)
            };
        }

        return null;
    }

    constructor(props, context) {
        super(props, context);

        const data = { ...props.data };
        this.state = {
            original: data,
            data,
            isEdit: !isDataEmpty(data)
        };
    }

    handleSubmit = () => {
        const { onSubmit } = this.props;
        if (onSubmit) {
            onSubmit(this.state.data);
        }
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ data: { ...this.state.data, [name]: value } });
    }

    render() {
        const { onClose, availableDates } = this.props;
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
                                    availableDates.map((item) => (
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

export default class TripProgress extends Component {

    static propTypes = {
        data: PropTypes.array,
        onChange: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            dialog: { display: false }
        }
    }

    handleDialogClose = () => {
        this.setState({ dialog: { display: false } });
    }

    handleDialogSubmit = (data) => {
        this.setState({ dialog: { display: false } });
    }

    handleReport = () => {
        this.setState({ dialog: { display: true } });
    }

    handleReportClick = (evnet) => {
        event.preventDefault();
        event.stopPropagation();

        this.setState({
            dialog: {
                display: true,
                data: {
                    date: "2018-09-08",
                    milage: "30",
                    duration: "14",
                    tollFee: "34",
                    fuelFee: "45",
                    parkingFee: "56"
                }
            }
        });
    }

    render() {
        const { dialog } = this.state;
        return (
            <Fragment>
                <ul className={classNames("nav nav-stacked", styles.progress)}>
                    <li>
                        <label>行程进度</label>
                        <Button className="pull-right" onClick={this.handleReport} flat xs>汇报进度</Button>
                    </li>
                    <li>
                        <a href="#/progress/report/" onClick={this.handleReportClick}>
                            行驶80公里, 13小时，过路费225元，油费320元 <span className="pull-right badge bg-aqua">04-12</span>
                        </a>
                    </li>
                    <li>
                        <a href="#/progress/report/" onClick={this.handleReportClick}>
                            行驶80公里, 13小时，过路费225元，油费320元 <span className="pull-right badge bg-aqua">04-13</span>
                        </a>
                    </li>
                    <li>
                        <a href="#/progress/report/" onClick={this.handleReportClick}>
                            行驶800公里, 13小时, 过路费225元, 油费320元, 停车费234元 <span className="pull-right badge bg-aqua">04-14</span>
                        </a>
                    </li>
                </ul>

                {dialog.display && (
                    <ProgressEditor
                        availableDates={["2018-09-09","2018-09-10","2018-09-11"]}
                        data={dialog.data}
                        onClose={this.handleDialogClose}
                        onSubmit={this.handleDialogSubmit}
                    />
                )}

            </Fragment>
        );
    }
}