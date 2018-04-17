import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./OrderPreview.css";

import Button from "../Form/Button";

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

    renderOperation = () => {

        const { order, vehicles, drivers } = this.props;

        if (order.status.id === "submitted") {
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

        return null;
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
        const { order } = this.props;

        return (

            <div className={classNames("box", this.getBoxStyle())}>
                <div className="box-header with-border">
                    <div className="user-block">
                        <label className={styles.orderId}>行程单号：{order.id}</label>
                    </div>

                    <div className="box-tools">
                        <button type="button" className="btn btn-box-tool" onClick={this.handleModify}>
                            <i className="fa fa-edit"></i>
                        </button>
                    </div>

                </div>

                <div className="box-body">
                    <h3>出车信息</h3>
                    <p>出发地点：<label>{order.departurePlace}</label></p>
                    <p>目的地：<label>{order.destination}</label></p>
                    <p>发车时间：<label>{order.departureTime.toDateTime()}</label></p>
                    <p>预计收车时间：<label>{`${order.duration} 天`}</label></p>
                    <h3>客户信息</h3>
                    <p>联系人：<label>{order.name}</label></p>
                    <p>联系电话：<label>{order.mobile}</label></p>
                    <h3>车辆信息</h3>
                    <p>车牌号码：<label>{order.name}</label></p>
                    <p>车型：<label>{order.mobile}</label></p>
                </div>

                {this.renderOperation()}
            </div>
        );
    }
}