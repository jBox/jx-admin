import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./OrderPreview.css";
import Form from "../Form";
import Autocomplete from "../Form/Autocomplete";
import { SERVICE_STATUS } from "../utils";

import Button from "../Form/Button";
import OrderOperation from "./OrderOperation";
import ScheduleVehicles from "./ScheduleVehicles";
import { scheduleOrder } from "../../redux/actions/manage/orders";

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
        vehicles: [],
        drivers: []
    }

    static propTypes = {
        vehicles: PropTypes.array,
        drivers: PropTypes.array,
        order: PropTypes.object,
        onModify: PropTypes.func,
        onConfirm: PropTypes.func,
        onConfirmCancel: PropTypes.func,
        onSchedule: PropTypes.func,
        onDepart: PropTypes.func,
        onRevert: PropTypes.func,
        onProgress: PropTypes.func,
        onComplete: PropTypes.func
    }

    componentDidMount() {
        jQuery(".box").boxWidget();
    }

    handleModify = () => {
        const { order, onModify } = this.props;
        if (onModify) {
            onModify(order);
        }
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
        const { order, vehicles, drivers, onSchedule, onDepart, onProgress, onRevert } = this.props;

        const editable = order.schedules.length === 0 ||
            order.schedules.every(x => !x.status);

        return (
            <div className={classNames("box", this.getBoxStyle())}>
                <div className="box-header with-border">
                    <div className="user-block">
                        <label className={styles.orderId}>订单：{order.id}</label>
                    </div>

                    {editable && (
                        <div className="box-tools">
                            <button type="button" className="btn btn-box-tool" onClick={this.handleModify}>
                                <i className="fa fa-edit"></i>
                            </button>
                        </div>
                    )}

                </div>

                <div className="box-body">
                    <ul className="list-unstyled">
                        <li>联系人：<label>{order.contact}</label></li>
                        <li>联系电话：<label>{order.mobile}</label></li>
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
                    drivers={drivers}
                    onSchedule={onSchedule}
                    onDepart={onDepart}
                    onProgress={onProgress}
                    onRevert={onRevert}
                />

                <OrderStatus order={order} />

                <OrderOperation {...this.props} />
            </div>
        );
    }
}