import React, { Component } from "react";
import PropTypes from "prop-types";

import Flip from "../../Overlays/Flip";
import OrderEditor from "./OrderEditor";
import ProgressDetails from "./ProgressDetails";
import VehicleScheduler from "./VehicleScheduler";
import OrderPreview from "./OrderPreview";
import ProgressEditor from "../ProgressEditor";

export default class Order extends Component {
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
        onComplete: PropTypes.func,
        onImagePreview: PropTypes.func
    }

    state = {
        flipActive: false,
        flipBack: null
    }

    handleFlipBack = () => {
        this.setState({ flipActive: false });
    }

    handleModify = () => {
        this.setState({ flipBack: null }, () => this.setState({
            flipBack: "modify",
            flipActive: true
        }));
    }

    handleProgressDetails = () => {
        this.setState({ flipBack: null }, () => this.setState({
            flipBack: "progress-details",
            flipActive: true
        }));
    }

    handleProgressReport = (schedule) => {
        this.setState({ flipBack: null }, () => this.setState({
            schedule,
            flipBack: "progress-report",
            flipActive: true
        }));
    }

    handleProgressReportSubmit = (progress) => {
        const { order } = this.props;
        const { schedule } = this.state;
        schedule.progress = [...schedule.progress, progress];

        this.setState({ flipBack: null }, () => this.setState({ flipActive: false }, () => {
            const { onProgress } = this.props;
            if (onProgress) {
                onProgress(order, schedule);
            }
        }));
    }

    handleScheduleVehicle = (vehicle) => {
        const { order: { schedules } } = this.props;
        const original = schedules.filter(x => x.belongs === vehicle.id);

        this.setState({ flipBack: null }, () => this.setState({
            vehicle,
            original,
            flipBack: "schedule",
            flipActive: true
        }));
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

    handleOrderEditorSubmit = (order) => {
        const { onModify } = this.props;
        if (onModify) {
            onModify(order);
        }
        // this.setState({ flipActive: false });
    }

    render() {
        const {
            order,
            models,
            modification,
            vehicles,
            drivers,
            onCancel,
            onDepart,
            onRevert,
            onConfirm,
            onComplete,
            onConfirmCancel,
            onImagePreview
        } = this.props;

        const { flipActive, flipBack } = this.state;

        return (
            <Flip active={flipActive}>
                <Flip.Front>
                    <OrderPreview
                        vehicles={vehicles}
                        order={order}
                        onModify={this.handleModify}
                        onConfirm={onConfirm}
                        onConfirmCancel={onConfirmCancel}
                        onDepart={onDepart}
                        onRevert={onRevert}
                        onComplete={onComplete}
                        onVehicleSchedule={this.handleScheduleVehicle}
                        onProgressDetails={this.handleProgressDetails}
                        onProgressReport={this.handleProgressReport}
                    />
                </Flip.Front>
                <Flip.Back>
                    {flipBack === "modify" && (
                        <OrderEditor
                            models={models}
                            order={order}
                            modification={modification}
                            onSubmit={this.handleOrderEditorSubmit}
                            onCancel={onCancel}
                            onClose={this.handleFlipBack}
                        />
                    )}
                    {flipBack === "progress-details" && (
                        <ProgressDetails
                            order={order}
                            onClose={this.handleFlipBack}
                            onImagePreview={onImagePreview}
                        />
                    )}
                    {flipBack === "progress-report" && (
                        <ProgressEditor
                            order={order}
                            terms={this.state.schedule.terms}
                            onClose={this.handleFlipBack}
                            onSubmit={this.handleProgressReportSubmit}
                            onPreview={onImagePreview}
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