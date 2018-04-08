import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./OrderPreview.css";
import Form from "../Form";
import Autocomplete from "../Form/Autocomplete";
import { LPN_CONTENT_PATTERN } from "../utils";

import Button from "../Form/Button";

const VehicleItem = ({ model, count, withDriver, notes }) => {
    const additional = [`${count} 辆`];
    if (withDriver) {
        additional.push("带驾");
    }
    if (notes) {
        additional.push(notes);
    }

    return (<p><label>{model.label}</label> / {additional.join(" / ")}</p>)
};

export default class OrderPreview extends Component {
    static defaultProps = {
        vehicles: [],
        drivers: []
    }

    static propTypes = {
        vehicles: PropTypes.array,
        drivers: PropTypes.array,
        order: PropTypes.object,
        onConfirm: PropTypes.func,
        onSchedule: PropTypes.func
    }

    schedule = {
        driver: null,
        vehicle: null
    }

    handleConfirm = () => {
        const { order, onConfirm } = this.props;
        if (onConfirm) {
            onConfirm(order);
        }
    }

    handleSchedule = () => {
        console.log(this.schedule);
        const { order, onSchedule } = this.props;
        if (onSchedule) {
            onSchedule(order, this.schedule);
        }
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

    renderOperation = () => {

        const { order, vehicles, drivers } = this.props;

        if (order.status === "submitted") {
            return (
                <div className="row">
                    <div className="col-md-offset-8 col-md-4 col-sm-12">
                        <Button onClick={this.handleConfirm} block primary>确认订单</Button>
                    </div>
                </div>
            );
        }

        if (order.status === "confirmed") {
            const vehicleItems = vehicles.map((item) => ({ id: item.number, label: item.number, description: item.model }));
            const driverItems = drivers.map((item) => {
                const id = item.mobile;
                return { id, label: item.title || item.nickname, description: id };
            });
            return (
                <Form className="row" onSubmit={this.handleSchedule}>
                    <div className="col-md-4 col-sm-12">
                        <Autocomplete items={vehicleItems}
                            name="vehicle"
                            placeholder="车牌号, 车型"
                            pattern={`^${LPN_CONTENT_PATTERN}\\s*[,|，]\\s*(商务车|轿车)$`}
                            message="请输入车牌号与车型"
                            required
                            onChange={this.handleVehicleChange}
                        />
                    </div>
                    <div className="col-md-4 col-sm-12">
                        <Autocomplete items={driverItems}
                            name="driver"
                            pattern={`^[^\\d]+\\s*[,|，]\\s*1\\d{10}$`}
                            placeholder="司机称呼，手机号码"
                            message="请输入司机称呼与手机号码"
                            required
                            onChange={this.handleDriverChange}
                        />
                    </div>
                    <div className="col-md-4 col-sm-12">
                        <Button type="submit" block success>执行调度</Button>
                    </div>
                </Form>
            );
        }

        if (order.status === "cancelling") {
            return (
                <div className="row">
                    <div className="col-md-offset-8 col-md-4 col-sm-12">
                        <Button onClick={this.handleConfirmCancel} block danger>确认取消订单</Button>
                    </div>
                </div>
            );
        }

        return (
            <div className="row">
                <div className="col-md-offset-8 col-md-4 col-sm-12">
                    <Button onClick={this.handleConfirm} block primary>确认订单</Button>
                </div>
            </div>
        );
    }

    getBoxStyle = () => {
        const { order } = this.props;

        let boxStyle = "box-primary";
        switch (order.status) {
            case "confirmed":
                boxStyle = "box-warning";
                break;
            case "cancelling":
                boxStyle = "box-danger";
                break;
            case "scheduled":
                boxStyle = "box-success";
                break;
        }

        return boxStyle;
    }

    render() {
        const { order } = this.props;

        return (

            <div className={classNames("box", this.getBoxStyle())}>
                <div className="box-header with-border">
                    <div className="user-block">
                        <label className={styles.orderId}>订单：{order.id}</label>
                    </div>

                    <div className="box-tools">
                        <button type="button" className="btn btn-box-tool"><i className="fa fa-edit"></i></button>
                    </div>

                </div>

                <div className="box-body">
                    <p>联系人：<label>{order.name}</label></p>
                    <p>联系电话：<label>{order.mobile}</label></p>
                    <p>出发时间：<label>{order.departureTime.toDateTime()}</label></p>
                    <p>出发地点：<label>{order.departurePlace}</label></p>
                    <p>目的地：<label>{order.destination}</label></p>
                    <p>租车天数：<label>{`${order.duration} 天`}</label></p>
                    <p>下单时间：<label>{order.createTime.toDateTime()}</label></p>
                </div>

                <div className="box-footer box-comments">
                    {order.vehicles.map((item, index) => (<VehicleItem key={index} {...item} />))}
                </div>

                <div className="box-footer">
                    {this.renderOperation()}
                </div>
            </div>
        );
    }
}