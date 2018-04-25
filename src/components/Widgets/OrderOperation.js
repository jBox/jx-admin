import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./OrderPreview.css";
import Form from "../Form";
import Autocomplete from "../Form/Autocomplete";
import { LPN_CONTENT_PATTERN, SERVICE_STATUS } from "../utils";

import Button from "../Form/Button";

class Scheduler extends Component {
    static propTypes = {
        vehicles: PropTypes.array,
        drivers: PropTypes.array,
        order: PropTypes.object,
        onSchedule: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            reschedule: false
        }

        this.schedule = props.order.schedule ?
            {
                vehicle: { number: props.order.schedule.license },
                driver: { ...props.order.schedule.driver }
            } : {
                driver: null,
                vehicle: null
            };
    }

    handleReSchedule = (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({ reschedule: true });
    }

    submitButton = () => {
        const { order } = this.props;
        if (order.status.id === "confirmed" || this.state.reschedule) {
            return (<Button type="submit" block success>执行调度</Button>);
        }

        if (!this.state.reschedule && order.status.id === "scheduled") {
            return (<Button onClick={this.handleReSchedule} block warning>重新调度</Button>);
        }

        return null;
    }

    handleSchedule = () => {
        const { order, onSchedule } = this.props;
        if (onSchedule) {
            onSchedule(order, this.schedule);
        }
        this.setState({ reschedule: false });
    }

    handleVehicleChange = (item) => {
        const [number, model] = item.split(/[,|，]/);
        this.schedule.vehicle = {
            number: number ? number.trim() : "",
            model: model ? model.trim() : ""
        };
    }

    handleDriverChange = (item) => {
        const [title, mobile] = item.split(/[,|，]/);
        this.schedule.driver = {
            title: title ? title.trim() : "",
            mobile: mobile ? mobile.trim() : ""
        };
    }

    render() {
        const { order, vehicles, drivers, children } = this.props;
        const vehicleItems = vehicles.map((item) => ({
            id: item.number,
            label: item.number,
            description: item.model
        }));
        const driverItems = drivers.map((item) => {
            const id = item.mobile;
            return { id, label: item.title || item.nickname, description: id };
        });

        const showForm = order.status.id === "confirmed" || this.state.reschedule;

        const defaultSchedule = { vehicle: "", driver: "" };
        if (order.schedule /*license, driver:{mobile,title}*/) {
            const v = vehicles.find(x => x.number === order.schedule.license);
            if (v) {
                defaultSchedule.vehicle = `${v.number}, ${v.model}`;
            }
            defaultSchedule.driver = `${order.schedule.driver.title}, ${order.schedule.driver.mobile}`;
        }

        return (
            <Form className="row" onSubmit={this.handleSchedule}>
                {showForm && (<div className="col-md-4 col-sm-12">
                    <Autocomplete items={vehicleItems}
                        value={defaultSchedule.vehicle}
                        name="vehicle"
                        placeholder="车牌号, 车型"
                        pattern={`^${LPN_CONTENT_PATTERN}\\s*[,|，]\\s*(商务车|轿车)$`}
                        message="请输入车牌号与车型"
                        required
                        onChange={this.handleVehicleChange}
                    />
                </div>)}
                {showForm && (<div className="col-md-4 col-sm-12">
                    <Autocomplete items={driverItems}
                        value={defaultSchedule.driver}
                        name="driver"
                        pattern={`^[^\\d]+\\s*[,|，]\\s*1\\d{10}$`}
                        placeholder="司机称呼，手机号码"
                        message="请输入司机称呼与手机号码"
                        required
                        onChange={this.handleDriverChange}
                    />
                </div>)}
                <div className="col-md-4 col-sm-12">
                    {this.submitButton()}
                </div>
                {children}
            </Form>
        );
    }
}

export default class OrderOperation extends Component {
    static defaultProps = {
        vehicles: [],
        drivers: []
    }

    static propTypes = {
        vehicles: PropTypes.array,
        drivers: PropTypes.array,
        order: PropTypes.object,
        onConfirm: PropTypes.func,
        onConfirmCancel: PropTypes.func,
        onSchedule: PropTypes.func,
        onDepart: PropTypes.func,
        onRevert: PropTypes.func,
        onComplete: PropTypes.func
    }

    handleConfirm = () => {
        const { onConfirm, order } = this.props;
        if (onConfirm) {
            onConfirm(order);
        }
    }

    handleConfirmCancel = () => {
        const { onConfirmCancel, order } = this.props;
        if (onConfirmCancel) {
            onConfirmCancel(order);
        }
    }

    handleDepart = () => {
        const { onDepart, order } = this.props;
        if (onDepart) {
            onDepart(order);
        }
    }

    handleRevert = () => {
        const { onRevert, order } = this.props;
        if (onRevert) {
            onRevert(order);
        }
    }

    handleComplete = () => {
        const { onComplete, order } = this.props;
        if (onComplete) {
            onComplete(order);
        }
    }

    confirmCancel = () => {
        return (
            <div className="box-footer">
                <div className="row">
                    <div className="col-md-offset-8 col-md-4 col-sm-12">
                        <Button onClick={this.handleConfirmCancel} block danger>确认取消订单</Button>
                    </div>
                </div>
            </div>
        );
    }

    confirm = () => {
        return (
            <div className="box-footer">
                <div className="row">
                    <div className="col-md-offset-8 col-md-4 col-sm-12">
                        <Button onClick={this.handleConfirm} block primary>确认订单</Button>
                    </div>
                </div>
            </div>
        );
    }

    scheduleAndDepart = () => {
        const { order, vehicles, drivers, onSchedule } = this.props;
        return (
            <div className="box-footer">
                <Scheduler
                    order={order}
                    vehicles={vehicles}
                    drivers={drivers}
                    onSchedule={onSchedule}
                >
                    {order.status.id === "scheduled" && (
                        <div className="col-md-4 col-sm-12">
                            <Button onClick={this.handleDepart} block danger>确认发车</Button>
                        </div>
                    )}
                </Scheduler>
            </div>
        );
    }

    revert = () => {
        return (
            <div className="box-footer">
                <div className="row">
                    <div className="col-md-offset-8 col-md-4 col-sm-12">
                        <Button onClick={this.handleRevert} block danger>确认收车</Button>
                    </div>
                </div>
            </div>
        );
    }

    complete = () => {
        return (
            <div className="box-footer">
                <div className="row">
                    <div className="col-md-offset-8 col-md-4 col-sm-12">
                        <Button onClick={this.handleComplete} block success>完成</Button>
                    </div>
                </div>
            </div>
        );
    }

    render() {

        const { order } = this.props;

        if (order.service.status === "cancelling") {
            return this.confirmCancel();
        }

        if (order.status.id === "submitted") {
            return this.confirm();
        }

        if (order.status.id === "confirmed" || order.status.id === "scheduled") {
            return this.scheduleAndDepart();
        }

        if (order.status.id === "departure") {
            return this.revert();
        }

        if (order.status.id === "reverted") {
            return this.complete();
        }

        return null;
    }
}