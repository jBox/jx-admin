import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./OrderProgress.css";

import Modal from "../Overlays/Modal";
import Form from "../Form";
import Button from "../Form/Button";

const calcProgress = ({ schedules, duration }) => {
    const percentages = schedules.map((schedule) => {
        const ps = schedule.progress || [];
        return ps.length / duration * 100;
    });

    if (percentages.length === 0) {
        return 0;
    }

    const percentage = Math.floor(percentages.reduce((total, p) => (total + p), 0) / percentages.length);
    return percentage >= 100 ? 100 : percentage;
};

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

class ProgressDetails extends Component {
    static propTypes = {
        order: PropTypes.object,
        onClose: PropTypes.func
    }

    refineProgress = () => {
        const { order } = this.props;
        const progress = {};
        for (let schedule of order.schedules) {
            for (let item of schedule.progress) {
                const date = new Date(item.date).format("yyyy年MM月dd日");
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
        const { onClose } = this.props;
        const progress = this.refineProgress();

        return (
            <Modal>
                <Modal.Header onClose={onClose}>
                    <Modal.Title>进度列表</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.zebra}>
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
                </Modal.Body>
                <Modal.Footer>
                    <Button friable primary onClick={onClose}>关闭</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}


export default class OrderProgress extends Component {
    static propTypes = {
        order: PropTypes.object
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const progress = calcProgress(nextProps.order);
        if (progress !== prevState.progress) {
            return { progress };
        }

        return null;
    }

    constructor(props) {
        super(props);
        this.state = {
            progress: calcProgress(props.order),
            dialog: { display: false }
        };
    }

    handleProgressClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({ dialog: { display: true } });
    }

    handleProgressDetailsClose = () => {
        this.setState({ dialog: { display: false } });
    }

    render() {
        const { order } = this.props;
        const { progress, dialog } = this.state;

        if (progress === 0) {
            return null;
        }

        return (
            <Fragment>
                <div className="box-comment">
                    <a href="progress/details" className={styles.content} onClick={this.handleProgressClick}>
                        <span>进度：</span>
                        <div className={classNames("progress progress-sm active", styles.progress)}>
                            <div className="progress-bar progress-bar-success progress-bar-striped"
                                role="progressbar"
                                aria-valuenow="20"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style={{ width: `${progress}%` }}>
                                <span className="sr-only">{`${progress}%`} Complete</span>
                            </div>
                        </div>
                        <span className={styles.percentage}>
                            {`${progress}%`}
                        </span>
                    </a>
                </div>

                {dialog.display && (
                    <ProgressDetails order={order} onClose={this.handleProgressDetailsClose} />
                )}

            </Fragment>
        );
    }
}