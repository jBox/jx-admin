import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./DriverTrip.css";

import Button from "../Form/Button";
import Modal from "../Overlays/Modal";
import Progress from "./TripProgress";

export default class DriverTrip extends Component {
    static defaultProps = {
    }

    static propTypes = {
        data: PropTypes.object,
        onDispatch: PropTypes.func,
        onRecovery: PropTypes.func
    }

    componentDidMount() {
    }

    handleDispatch = () => {
        const { data, onDispatch } = this.props;
        if (onDispatch) {
            onDispatch(data);
        }
    }

    handleRecovery = () => {
        const { data, onRecovery } = this.props;
        if (onRecovery) {
            onRecovery(data);
        }
    }

    getTripInfo = () => {
        const { data } = this.props;
        const departureTime = new Date(data.departureTime);
        departureTime.setDate(departureTime.getDate() + data.duration);
        const backTime = departureTime.toISOString().toDate();
        return {
            id: data.id,
            name: data.name,
            mobile: data.mobile,
            departureTime: data.departureTime.toDateTime(),
            backTime,
            departurePlace: data.departurePlace,
            destination: data.destination,
            notes: data.notes,
            licenseNunber: data.licenseNunber,
            vehicleModel: data.vehicleModel,
            progress: []
        }
    }

    handleProgressChange = (progress) => {
        console.log("progress", progress);
    }

    renderOperation = () => {
        return (
            <div className="box-footer">
                <div className="row">
                    <div className="col-md-offset-8 col-md-4 col-sm-12">
                        <Button onClick={this.handleDispatch} block primary>确认出车</Button>
                    </div>
                    <div className="col-md-offset-8 col-md-4 col-sm-12">
                        <Button onClick={this.handleRecovery} block primary>确认收车</Button>
                    </div>
                </div>
            </div>
        );
    }

    render() {
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
                        <li>发车时间：<label>{trip.departureTime.toDateTime()}</label></li>
                        <li>收车时间：<label>{trip.backTime}</label></li>
                        <li className={styles.itemHeader}><label>客户信息</label></li>
                        <li>联系人：<label>{trip.name}</label></li>
                        <li>联系电话：<label>{trip.mobile}</label></li>
                        <li className={styles.itemHeader}><label>车辆信息</label></li>
                        <li>车牌号码：<label>{trip.licenseNunber}</label></li>
                        <li>车型：<label>{trip.vehicleModel}</label></li>
                    </ul>

                    <Progress data={trip.progress} onChange={this.handleProgressChange} />

                </div>

                {this.renderOperation()}
            </div>
        );
    }
}