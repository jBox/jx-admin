import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./DriverTrip.css";

import Button from "../Form/Button";
import Confirm from "../Overlays/Confirm";
import Progress from "./TripProgress";

export default class DriverTrip extends Component {
    static propTypes = {
        data: PropTypes.object,
        onDepart: PropTypes.func,
        onRevert: PropTypes.func,
        onProgress: PropTypes.func
    }

    state = {
        confirm: { display: false }
    }

    handleDepart = () => {
        const { data, onDepart } = this.props;
        if (onDepart) {
            onDepart(data);
        }
    }

    handleRevert = () => {
        const { terms, revertTime } = this.getTripInfo();
        if (terms.length > 0) {
            return this.setState({
                confirm: {
                    display: true,
                    message: "部分行程进度未汇报，您确定要收车吗？"
                }
            });
        } else if (new Date(revertTime).getTime() > Date.now()) {
            return this.setState({
                confirm: {
                    display: true,
                    message: "还未到计划收车时间，您确定要提前收车吗？"
                }
            })
        }

        return confirmRevert();
    }

    handleCloseConfirm = () => {
        if (this.state.confirm.display) {
            this.setState({ confirm: { display: false } });
        }
    }

    confirmRevert = () => {
        if (this.state.confirm.display) {
            this.setState({ confirm: { display: false } });
        }

        const { data, onRevert } = this.props;
        if (onRevert) {
            onRevert(data);
        }
    }

    handleProgressChange = (progress) => {
        console.log("progress", progress);
        const { data, onProgress } = this.props;
        if (onProgress) {
            onProgress(data, progress);
        }
    }

    getTripInfo = () => {
        const { data } = this.props;
        const departureTime = new Date(data.departureTime);
        departureTime.setDate(departureTime.getDate() + data.duration - 1);
        const revertTime = departureTime.toISOString().toDate();

        return {
            id: data.id,
            name: data.name,
            mobile: data.mobile,
            departureTime: data.departureTime.toDateTime(),
            revertTime,
            departurePlace: data.departurePlace,
            destination: data.destination,
            notes: data.notes,
            status: data.status,
            licenseNunber: data.licenseNunber,
            vehicleModel: data.vehicleModel,
            progress: data.progress,
            terms: data.terms
        }
    }

    renderOperation = () => {
        const { data } = this.props;
        // //scheduled,departure
        const status = data.status;
        switch (status) {
            case "scheduled":
                return (
                    <div className="box-footer">
                        <div className="row">
                            <div className="col-md-offset-8 col-md-4 col-sm-12">
                                <Button onClick={this.handleDepart} block warning>确认出车</Button>
                            </div>
                        </div>
                    </div>
                );
            case "departure":
                return (
                    <div className="box-footer">
                        <div className="row">
                            <div className="col-md-offset-8 col-md-4 col-sm-12">
                                <Button onClick={this.handleRevert} block warning>确认收车</Button>
                            </div>
                        </div>
                    </div>
                );
        }

        return null;
    }

    render() {
        const trip = this.getTripInfo();
        const { confirm } = this.state;

        return (
            <Fragment>
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
                            <li>发车时间：<label>{trip.departureTime.toDateTime()}</label></li>
                            <li>计划收车时间：<label>{trip.revertTime}</label></li>
                            <li className={styles.itemHeader}><label>客户信息</label></li>
                            <li>联系人：<label>{trip.name}</label></li>
                            <li>联系电话：<label>{trip.mobile}</label></li>
                            <li className={styles.itemHeader}><label>车辆信息</label></li>
                            <li>车牌号码：<label>{trip.licenseNunber}</label></li>
                            <li>车型：<label>{trip.vehicleModel}</label></li>
                        </ul>

                        {trip.status !== "scheduled" && (
                            <Progress data={trip.progress} terms={trip.terms} onChange={this.handleProgressChange} />
                        )}
                    </div>

                    {this.renderOperation()}
                </div>

                {confirm.display && (
                    <Confirm onClose={this.handleCloseConfirm} onConfirm={this.confirmRevert} warning>
                        {confirm.message}
                    </Confirm>
                )}

            </Fragment>
        );
    }
}