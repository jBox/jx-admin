import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./ProgressDetails.css";

import Modal from "../Overlays/Modal";
import Button from "../Form/Button";

const ProgressItem = ({ licenseNumber, model, driver, progress }) => {

    const VehicleIcons = {
        "商务车": "fa-car bg-aqua", "轿车": "fa-car bg-purple",
        "中巴车": "fa-bus bg-yellow", "大巴车": "fa-bus bg-maroon"
    };

    /**date: "", // 日期 milage: "", // 里程 duration: "", // 行车时间
    tollFee: "", // 通行费 fuelFee: "", // 油费 parkingFee: "" // 停车费 */

    const infos = [
        `行驶${progress.duration}小时`,
        `${progress.milage}公里`,
        `燃油费${progress.fuelFee}元`
    ];

    if (progress.tollFee) {
        infos.push(`过路费${progress.tollFee}元`);
    }

    if (progress.parkingFee) {
        infos.push(`停车费${progress.parkingFee}元`);
    }

    const reportDateTime = progress.report.toDateTime();

    return (
        <li>
            <i className={classNames("fa", VehicleIcons[model])}></i>

            <div className="timeline-item">
                <span className="time"><i className="fa fa-clock-o"></i> {reportDateTime}</span>
                <h3 className="timeline-header">{licenseNumber} / {driver}</h3>
                <div className="timeline-body">{infos.join(", ")}</div>
            </div>
        </li>
    )
};

const TimeLabel = ({ label }) => (
    <li className="time-label">
        <span className="bg-green">{label}</span>
    </li>
);

export default class ProgressDetails extends Component {
    static propTypes = {
        order: PropTypes.object,
        onClose: PropTypes.func
    }

    refineProgress = () => {
        const { order } = this.props;
        const progress = {};
        for (let schedule of order.schedules) {
            for (let item of schedule.progress) {
                const date = item.date.toDate();
                if (!progress[date]) {
                    progress[date] = [];
                }

                progress[date].push({
                    licenseNumber: schedule.licenseNumber,
                    model: schedule.model,
                    driver: schedule.driver,
                    progress: { ...item }
                });
            }
        }

        return progress;
    }

    render() {
        const { onClose, order } = this.props;
        const progress = this.refineProgress();

        return (
            <div className="box box-success box-solid">
                <div className={classNames("box-header with-border", styles.tableBlock)}>
                    <h3 className="box-title">订单{order.id} - 进度</h3>
                    <div className="box-tools">
                        <Button success flat xs onClick={onClose}>
                            返回
                        </Button>
                    </div>
                </div>
                <div className={classNames("box-body", styles.zebra)}>
                    <div className={styles.progressList}>
                        <ul className="timeline">

                            {Object.keys(progress).reverse().map((label) => {
                                return (
                                    <Fragment key={label}>
                                        <TimeLabel label={label} />

                                        {progress[label].map((item, index) => (
                                            <ProgressItem key={index} {...item} />
                                        ))}
                                    </Fragment>
                                );
                            })}

                            <li>
                                <i className="fa fa-clock-o bg-gray"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
