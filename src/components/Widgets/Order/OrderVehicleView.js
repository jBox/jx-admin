import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./OrderVehicleView.css";
import Button from "../../Form/Button";

export default class OrderVehicleView extends Component {
    static propTypes = {
        order: PropTypes.object,
        data: PropTypes.object,
        schedules: PropTypes.array,
        schedulable: PropTypes.bool,
        onSchedule: PropTypes.func,
        onDepart: PropTypes.func,
        onRevert: PropTypes.func,
        onProgressReport: PropTypes.func
    }

    generateDepartHandler = (schedule) => {
        const { onDepart } = this.props;
        return () => {
            if (onDepart) {
                onDepart(schedule);
            }
        }
    }

    generateRevertHandler = (schedule) => {
        const { onRevert } = this.props;
        return () => {
            if (onRevert) {
                onRevert(schedule);
            }
        }
    }

    generateProgressHandler = (schedule) => {
        const { onProgressReport } = this.props;
        return () => {
            onProgressReport(schedule);
        }
    }

    handleScheduleClick = () => {
        const { data, onSchedule } = this.props;
        if (onSchedule) {
            onSchedule(data);
        }
    }

    handleRescheduleClick = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const { data, onSchedule } = this.props;
        if (onSchedule) {
            onSchedule(data);
        }
    }

    renderActionButton = (item) => {
        switch (item.status) {
            case "start":
                return (
                    <div className={classNames("pull-right", styles.buttonGroup)}>
                        {item.terms.length > 0 && (
                            <Button flat xs primary onClick={this.generateProgressHandler(item)}>
                                汇报进度
                            </Button>
                        )}
                        <Button flat xs danger onClick={this.generateRevertHandler(item)}>
                            确认收车
                        </Button>
                    </div>
                );
            case "end":
                if (item.terms.length === 0) {
                    return null;
                }

                return (
                    <Button className="pull-right" primary flat xs onClick={this.generateProgressHandler(item)}>
                        汇报进度
                    </Button>
                );
            default:
                return (
                    <Button className="pull-right" flat xs warning onClick={this.generateDepartHandler(item)}>
                        确认发车
                    </Button>
                );
        }
    }

    render() {
        const { schedules, schedulable, data, order } = this.props;
        const { model, count, withDriver, scheduled } = data;
        const additional = [model.label, `${count} 辆`];
        if (withDriver) {
            additional.push("带驾");
        }

        const actionable = order.status.id !== "cancelled";

        return (
            <Fragment>
                <div className="box-comment">
                    {scheduled && (
                        <i className={classNames("fa fa-fw fa-check-circle-o", styles.scheduledIcon)}></i>
                    )}
                    <div className={styles.content}>
                        <div className={styles.list}>
                            <span className={styles.item}>{additional.join(" / ")}</span>
                            {actionable && schedulable && !scheduled && (
                                <Button className="pull-right"
                                    onClick={this.handleScheduleClick}
                                    primary
                                    flat xs
                                >
                                    安排车辆
                                </Button>
                            )}
                            {actionable && schedulable && scheduled && (
                                <a href="#re-schedule" onClick={this.handleRescheduleClick}>
                                    重新安排
                                </a>
                            )}
                        </div>
                        {schedules.length > 0 && schedules.map((item) => (
                            <div key={item.id} className={styles.list}>
                                <span className={styles.scheduleItem}>{item.licenseNumber}</span>
                                {item.status && (
                                    <span className={classNames(
                                        "badge",
                                        { "bg-yellow": item.status === "start", "bg-green": item.status === "end" },
                                        styles.departure)}
                                    >
                                        {item.status === "start" ? "已发车" : "已收车"}
                                    </span>
                                )}
                                {actionable && this.renderActionButton(item)}
                            </div>
                        ))}
                    </div>
                </div>
            </Fragment>
        );
    }
}