import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./ProgressDetails.css";

import Modal from "../../Overlays/Modal";
import Button from "../../Form/Button";

const Thumbnails = ({ pics, onPreview }) => {

    const handleClick = (img) => {
        return () => {
            if (onPreview) {
                onPreview(img);
            }
        }
    };

    return (
        <div className={styles.thumbnails}>
            {pics.map((img, index) => {
                if (img && img.id) {
                    return (
                        <div key={img.id}>
                            <img className="img-responsive" src={img.thumbnail} onClick={handleClick(img)} />
                        </div>
                    );
                }

                return <div key={index}></div>
            })}
        </div>
    )
};

const ProgressItem = ({ licenseNumber, model, driver, progress, onImagePreview }) => {

    const VehicleIcons = {
        "商务车": "fa-car bg-aqua", "轿车": "fa-car bg-purple",
        "中巴车": "fa-bus bg-yellow", "大巴车": "fa-bus bg-maroon"
    };

    /**date: "", // 日期 milage: "", // 里程 duration: "", // 行车时间
    tollFee: "", // 通行费 fuelFee: "", // 油费 parkingFee: "" // 停车费
    otherFee: "", // 其他费用 notes: "" // 备注 */

    const infos = [
        `行驶${progress.duration}小时`,
        `${progress.milage}公里`
    ];

    if (progress.fuelFee) {
        infos.push(`燃油费${progress.fuelFee}元`);
    }

    if (progress.tollFee) {
        infos.push(`过路费${progress.tollFee}元`);
    }

    if (progress.parkingFee) {
        infos.push(`停车费${progress.parkingFee}元`);
    }

    if (progress.otherFee) {
        infos.push(`其他费用${progress.otherFee}元`);
    }

    const reportDateTime = progress.report.toDateTime();

    const pics = [
        ...progress.pics,
        ...("0".repeat(3 - progress.pics.length).split(""))
    ];

    return (
        <li>
            <i className={classNames("fa", VehicleIcons[model])}></i>

            <div className="timeline-item">
                <span className="time"><i className="fa fa-clock-o"></i> {reportDateTime}</span>
                <h3 className="timeline-header">{licenseNumber} / {driver}</h3>
                <div className="timeline-body">{infos.join(", ")}</div>
                {progress.notes && (<div className={styles.notes}>{progress.notes}</div>)}
                {pics.length > 0 && (
                    <Thumbnails pics={pics} onPreview={onImagePreview} />
                )}
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
        onClose: PropTypes.func,
        onImagePreview: PropTypes.func
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
        const { onClose, onImagePreview, order } = this.props;
        const progress = this.refineProgress();

        return (
            <div className="box box-success box-solid">
                <div className="box-header with-border">
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
                                            <ProgressItem key={index} {...item} onImagePreview={onImagePreview} />
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
