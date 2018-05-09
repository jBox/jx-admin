import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./OrderPreview.css";

import { SERVICE_STATUS } from "../../utils";

import Button from "../../Form/Button";
import OrderOperation from "./OrderOperation";
import ScheduleVehicles from "./ScheduleVehicles";

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
    const status = order.service.status ?
        SERVICE_STATUS[order.service.status] :
        order.status.label;
    return (
        <div className="box box-widget box-solid collapsed-box" style={{ boxShadow: "none" }}>
            <div className="box-header">
                <span>订单状态：<label>{status}</label></span>

                <div className="box-tools pull-right">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse">查看详情 &gt;</button>
                </div>
            </div>
            <div className="box-body" style={{ display: "none", paddingTop: "0" }}>
                {traces.map((item, index) => (<OrderTrack key={index} {...item} />))}
            </div>
        </div>
    );
}

export default class OrderPreview extends Component {
    static defaultProps = {
        vehicles: []
    }

    static propTypes = {
        vehicles: PropTypes.array,
        order: PropTypes.object,
        onModify: PropTypes.func,
        onConfirm: PropTypes.func,
        onConfirmCancel: PropTypes.func,
        onDepart: PropTypes.func,
        onRevert: PropTypes.func,
        onComplete: PropTypes.func,
        onVehicleSchedule: PropTypes.func,
        onProgressDetails: PropTypes.func,
        onProgressReport: PropTypes.func
    }

    componentDidMount() {
        jQuery(".box").boxWidget();
    }

    handleProgressDetails = () => {
        const { onProgressDetails } = this.props;
        if (onProgressDetails) {
            onProgressDetails();
        }
    }

    handleProgressReport = (schedule) => {
        const { onProgressReport } = this.props;
        if (onProgressReport) {
            onProgressReport(schedule);
        }
    }

    handleScheduleVehicle = (vehicle) => {
        const { onVehicleSchedule } = this.props;
        if (onVehicleSchedule) {
            onVehicleSchedule(vehicle);
        }
    }

    getBoxStyle = () => {
        const { order } = this.props;

        let boxStyle = "box-primary";
        switch (order.status.id) {
            case "confirmed":
                boxStyle = "box-warning";
                break;
            case "scheduled":
                boxStyle = "box-success";
                break;
            case "cancelled":
                boxStyle = "box-danger";
                break;
        }

        return boxStyle;
    }

    render() {
        const {
            order,
            vehicles,
            onModify,
            onDepart,
            onRevert,
            onConfirm,
            onComplete,
            onConfirmCancel
        } = this.props;

        const editable = ["submitted", "confirmed"].includes(order.status.id);

        return (
            <div className={classNames("box", this.getBoxStyle())}>
                <div className="box-header with-border">
                    <div className="user-block">
                        <span className={styles.orderId}>订单：{order.id}</span>
                    </div>

                    {editable && (
                        <div className="box-tools">
                            <Button warning flat xs onClick={onModify}>
                                修改
                                </Button>
                        </div>
                    )}

                </div>

                <div className="box-body">
                    <ul className="list-unstyled">
                        <li>联系人：<label>{order.contact}</label></li>
                        <li>联系电话：<label>{order.mobile}</label></li>
                        {order.department && (<li>用车单位：<label>{order.department}</label></li>)}
                        <li>出发时间：<label>{order.departureTime.toDateTime()}</label></li>
                        <li>出发地点：<label>{order.departurePlace}</label></li>
                        <li>目的地：<label>{order.destination}</label></li>
                        <li>租车天数：<label>{`${order.duration} 天`}</label></li>
                        <li>下单时间：<label>{order.createTime.toDateTime()}</label></li>
                    </ul>
                </div>

                <ScheduleVehicles
                    order={order}
                    vehicles={vehicles}
                    onDepart={onDepart}
                    onRevert={onRevert}
                    onProgressDetails={this.handleProgressDetails}
                    onProgressReport={this.handleProgressReport}
                    onSchedule={this.handleScheduleVehicle}
                />

                <OrderStatus order={order} />

                <OrderOperation
                    vehicles={vehicles}
                    order={order}
                    onConfirm={onConfirm}
                    onConfirmCancel={onConfirmCancel}
                    onComplete={onComplete}
                />
            </div>
        );
    }
}