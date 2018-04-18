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

const OrderTrack = ({ state, time }) => {
    return (
        <div className={styles.track}>
            <label>{state}</label>
            <span>{time}</span>
        </div>
    );
};

const OrderStatus = ({ order }) => {
    const traces = order.traces.reduceRight((items, item) => {
        return items.concat({ state: item.state, time: item.time.toDateTime() });
    }, []);
    return (
        <div className="box box-widget box-solid collapsed-box" style={{ boxShadow: "none" }}>
            <div className="box-header">
                <span>订单状态：<label>{order.status.label}</label></span>

                <div className="box-tools pull-right">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse">查看详情 &gt;</button>
                </div>
            </div>
            <div className="box-body" style={{ display: "none" }}>
                {traces.map((item, index) => (<OrderTrack key={index} {...item} />))}
            </div>
        </div>
    );
}

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
        onSchedule: PropTypes.func,
        onConfirmCancel: PropTypes.func,
        onComplete: PropTypes.func,
        onModify: PropTypes.func
    }

    schedule = {
        driver: null,
        vehicle: null
    }

    componentDidMount() {
        jQuery(".box").boxWidget();
    }

    handleConfirm = () => {
        const { order, onConfirm } = this.props;
        if (onConfirm) {
            onConfirm(order);
        }
    }

    handleModify = () => {
        const { order, onModify } = this.props;
        if (onModify) {
            onModify(order);
        }
    }

    handleSchedule = () => {
        console.log(this.schedule);
        const { order, onSchedule } = this.props;
        if (onSchedule) {
            onSchedule(order, this.schedule);
        }
    }

    handleConfirmCancel = () => {
        const { order, onConfirmCancel } = this.props;
        if (onConfirmCancel) {
            onConfirmCancel(order);
        }
    }

    handleComplete = () => {
        const { order, onComplete } = this.props;
        if (onComplete) {
            onComplete(order);
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

        if (order.status.id === "submitted") {
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

        if (order.status.id === "confirmed") {
            const vehicleItems = vehicles.map((item) => ({ id: item.number, label: item.number, description: item.model }));
            const driverItems = drivers.map((item) => {
                const id = item.mobile;
                return { id, label: item.title || item.nickname, description: id };
            });
            return (
                <div className="box-footer">
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
                </div>
            );
        }

        if (order.status.id === "cancelling") {
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

        if (order.status.id === "scheduled") {

            const duration = Number(order.duration);
            const departureTime = new Date(order.departureTime);
            const endTime = departureTime.setDate(departureTime.getDate() + duration);
            const disabled = endTime > Date.now();
            return (
                <div className="box-footer">
                    <div className="row">
                        <div className="col-md-offset-8 col-md-4 col-sm-12">
                            <Button onClick={this.handleComplete} disabled={disabled} block success>完成</Button>
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    }

    getBoxStyle = () => {
        const { order } = this.props;

        let boxStyle = "box-primary";
        switch (order.status.id) {
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
                        <button type="button" className="btn btn-box-tool" onClick={this.handleModify}>
                            <i className="fa fa-edit"></i>
                        </button>
                    </div>

                </div>

                <div className="box-body">
                    <ul className="list-unstyled">
                        <li>联系人：<label>{order.name}</label></li>
                        <li>联系电话：<label>{order.mobile}</label></li>
                        <li>出发时间：<label>{order.departureTime.toDateTime()}</label></li>
                        <li>出发地点：<label>{order.departurePlace}</label></li>
                        <li>目的地：<label>{order.destination}</label></li>
                        <li>租车天数：<label>{`${order.duration} 天`}</label></li>
                        <li>下单时间：<label>{order.createTime.toDateTime()}</label></li>
                    </ul>
                </div>

                <div className="box-footer box-comments">
                    {order.vehicles.map((item, index) => (<VehicleItem key={index} {...item} />))}
                </div>

                <OrderStatus order={order} />

                {this.renderOperation()}
            </div>
        );
    }
}