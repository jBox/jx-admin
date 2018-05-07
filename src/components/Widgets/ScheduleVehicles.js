import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import OrderVehicleView from "./OrderVehicleView";
import OrderProgress from "./OrderProgress";

export default class ScheduleVehicles extends Component {
    static defaultProps = {
        vehicles: []
    }

    static propTypes = {
        vehicles: PropTypes.array,
        order: PropTypes.object,
        onSchedule: PropTypes.func,
        onDepart: PropTypes.func,
        onRevert: PropTypes.func,
        onProgressDetails: PropTypes.func,
        onProgressReport: PropTypes.func
    }

    handleScheduleDepart = (schedule) => {
        const { order, onDepart } = this.props;
        if (onDepart) {
            onDepart(order, schedule);
        }
    }

    handleScheduleRevert = (schedule) => {
        const { order, onRevert } = this.props;
        if (onRevert) {
            onRevert(order, schedule);
        }
    }

    render() {
        const { order, vehicles, onProgressDetails, onProgressReport, onSchedule } = this.props;
        const schedulable = ["confirmed", "scheduled"].includes(order.status.id) &&
            (order.schedules.length === 0 || order.schedules.every(x => !x.status));

        return (
            <div className="box-footer box-comments">
                {order.vehicles.map((item) => (
                    <OrderVehicleView key={item.id}
                        schedulable={schedulable}
                        order={order}
                        data={item}
                        schedules={order.schedules.filter(x => x.belongs === item.id)}
                        onSchedule={onSchedule}
                        onDepart={this.handleScheduleDepart}
                        onRevert={this.handleScheduleRevert}
                        onProgressReport={onProgressReport}
                    />
                ))}

                <OrderProgress order={order} onDetails={onProgressDetails} />

            </div>
        );
    }
}