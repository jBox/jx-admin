import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./OrderPreview.css";
import Form from "../Form";
import Autocomplete from "../Form/Autocomplete";
import { SERVICE_STATUS } from "../utils";

import Flip from "../Overlays/Flip";
import Button from "../Form/Button";
import OrderOperation from "./OrderOperation";
import ScheduleVehicles from "./ScheduleVehicles";
import OrderEditor from "./OrderEditor";
import ProgressDetails from "./ProgressDetails";
import ProgressEditor from "./ProgressEditor2";
import VehicleScheduler from "./VehicleScheduler";

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
        modification: PropTypes.object,
        onModify: PropTypes.func,
        onCancel: PropTypes.func,
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

    state = {
        flipActive: false,
        flipBack: null
    }

    handleFlipBack = () => {
        this.setState({ flipActive: false });
    }

    handleModify = () => {
        this.setState({
            flipBack: "modify",
            flipActive: true
        });
    }

    handleProgressDetails = () => {
        this.setState({
            flipBack: "progress-details",
            flipActive: true
        });
    }

    handleProgressReport = (schedule) => {
        this.setState({
            schedule,
            flipBack: "progress-report",
            flipActive: true
        });
    }

    handleProgressReportSubmit = (progress) => {
        const { order } = this.props;
        const { schedule } = this.state;
        schedule.progress = [...schedule.progress, progress];
        this.setState({ flipActive: false }, () => {
            const { onProgress } = this.props;
            if (onProgress) {
                onProgress(order, schedule);
            }
        });
    }

    handleScheduleVehicle = (vehicle) => {
        const { order: { schedules } } = this.props;
        const original = schedules.filter(x => x.belongs === vehicle.id);

        this.setState({
            vehicle,
            original,
            flipBack: "schedule",
            flipActive: true
        });
    }

    handleVehicleSchedulerSubmit = (schedules) => {
        const { order, onSchedule } = this.props;
        const { vehicle: current } = this.state;
        let currentSchedules = order.schedules || [];
        // update order
        if (currentSchedules.length > 0) {
            currentSchedules = currentSchedules.reduce((items, item) => {
                if (item.belongs !== current.id) {
                    return items.concat(item);
                }

                return items;
            }, []);
        }

        order.schedules = [...currentSchedules, ...schedules];
        const vehicle = order.vehicles.find(x => x.id === current.id);
        vehicle.scheduled = true;

        this.setState({ flipActive: false }, () => {
            const allScheduled = order.vehicles.every(x => x.scheduled);
            if (allScheduled && onSchedule) {
                // submit schedules
                onSchedule(order);
            }
        });
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
        const {
            order, models, modification, vehicles, drivers,
            onModify,
            onCancel,
            onDepart,
            onRevert
        } = this.props;

        const editable = ["submitted", "confirmed"].includes(order.status.id);
        const { flipActive, flipBack } = this.state;

        return (
            <Flip active={flipActive}>
                <Flip.Front>
                    <div className={classNames("box", this.getBoxStyle())}>
                        <div className="box-header with-border">
                            <div className="user-block">
                                <span className={styles.orderId}>订单：{order.id}</span>
                            </div>

                            {editable && (
                                <div className="box-tools">
                                    <Button warning flat xs onClick={this.handleModify}>
                                        修改
                                </Button>
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
                            onDepart={onDepart}
                            onRevert={onRevert}
                            onProgressDetails={this.handleProgressDetails}
                            onProgressReport={this.handleProgressReport}
                            onSchedule={this.handleScheduleVehicle}
                        />

                        <OrderStatus order={order} />

                        <OrderOperation {...this.props} />
                    </div>
                </Flip.Front>
                <Flip.Back>
                    {flipBack === "modify" && (
                        <OrderEditor
                            models={models}
                            order={order}
                            modification={modification}
                            onSubmit={onModify}
                            onCancel={onCancel}
                            onClose={this.handleFlipBack}
                        />
                    )}
                    {flipBack === "progress-details" && (
                        <ProgressDetails
                            order={order}
                            onClose={this.handleFlipBack}
                        />
                    )}
                    {flipBack === "progress-report" && (
                        <ProgressEditor
                            order={order}
                            terms={this.state.schedule.terms}
                            onClose={this.handleFlipBack}
                            onSubmit={this.handleProgressReportSubmit}
                        />
                    )}
                    {flipBack === "schedule" && (
                        <VehicleScheduler
                            order={order}
                            data={this.state.vehicle}
                            original={this.state.original}
                            vehicles={vehicles}
                            drivers={drivers}
                            onClose={this.handleFlipBack}
                            onSubmit={this.handleVehicleSchedulerSubmit}
                        />
                    )}
                </Flip.Back>
            </Flip>
        );
    }
}