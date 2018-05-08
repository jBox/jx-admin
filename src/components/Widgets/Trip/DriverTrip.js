import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./DriverTrip.css";

import Button from "../../Form/Button";
import Progress from "./Progress";

export default class DriverTrip extends Component {
    static propTypes = {
        data: PropTypes.object,
        onDepart: PropTypes.func,
        onRevert: PropTypes.func,
        onProgressEdit: PropTypes.func,
        onProgressReport: PropTypes.func
    }

    handleDepart = () => {
        const { data, onDepart } = this.props;
        if (onDepart) {
            onDepart(data);
        }
    }

    handleRevert = () => {
        const { data, onRevert } = this.props;
        if (onRevert) {
            onRevert(data);
        }
    }

    getTripInfo = () => {
        const { data } = this.props;
        return {
            id: data.id,
            name: data.name,
            mobile: data.mobile,
            departureTime: data.departureTime.toDateTime(),
            revertTime: data.revertTime.toDateTime(),
            departurePlace: data.departurePlace,
            destination: data.destination,
            notes: data.notes,
            terms: data.terms,
            schedule: { ...data.schedule }
        }
    }

    renderOperation = () => {
        const { data } = this.props;
        // //scheduled,departure
        const status = data.schedule.status;
        switch (status) {
            case "end":
                return null;
            case "start":
                return (
                    <div className="box-footer">
                        <div className="row">
                            <div className="col-md-offset-8 col-md-4 col-sm-12">
                                <Button onClick={this.handleRevert} block warning>确认收车</Button>
                            </div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="box-footer">
                        <div className="row">
                            <div className="col-md-offset-8 col-md-4 col-sm-12">
                                <Button onClick={this.handleDepart} block primary>确认出车</Button>
                            </div>
                        </div>
                    </div>
                );

        }
    }

    render() {
        const { onProgressEdit, onProgressReport } = this.props;
        const trip = this.getTripInfo();

        return (
            <div className={classNames("box", "box-primary")}>
                <div className="box-header with-border">
                    <div className="user-block">
                        <label className={styles.id}>行程单号：{trip.id}</label>
                    </div>
                </div>

                <div className="box-body">

                    <ul className="list-unstyled">
                        <li className={styles.itemHeader}><label>出车信息</label></li>
                        <li>出发地点：<label>{trip.departurePlace}</label></li>
                        <li>目的地：<label>{trip.destination}</label></li>
                        <li>发车时间：<label>{trip.departureTime}</label></li>
                        <li>计划收车时间：<label>{trip.revertTime}</label></li>
                        <li className={styles.itemHeader}><label>客户信息</label></li>
                        <li>联系人：<label>{trip.contact}</label></li>
                        <li>联系电话：<label>{trip.mobile}</label></li>
                        <li className={styles.itemHeader}><label>车辆信息</label></li>
                        <li>车牌号码：<label>{trip.schedule.licenseNumber}</label></li>
                        <li>车型：<label>{trip.schedule.model}</label></li>
                    </ul>

                    {trip.schedule.status && (
                        <Progress
                            data={trip.schedule.progress}
                            terms={trip.terms}
                            onEdit={onProgressEdit}
                            onReport={onProgressReport}
                        />
                    )}
                </div>

                {this.renderOperation()}
            </div>
        );
    }
}