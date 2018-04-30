import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./OrderPreview.css";

import Button from "../Form/Button";

export default class OrderOperation extends Component {
    static defaultProps = {
        vehicles: [],
        drivers: []
    }

    static propTypes = {
        vehicles: PropTypes.array,
        drivers: PropTypes.array,
        order: PropTypes.object,
        onConfirm: PropTypes.func,
        onConfirmCancel: PropTypes.func,
        onComplete: PropTypes.func
    }

    handleConfirm = () => {
        const { onConfirm, order } = this.props;
        if (onConfirm) {
            onConfirm(order);
        }
    }

    handleConfirmCancel = () => {
        const { onConfirmCancel, order } = this.props;
        if (onConfirmCancel) {
            onConfirmCancel(order);
        }
    }

    handleDepart = () => {
        const { onDepart, order } = this.props;
        if (onDepart) {
            onDepart(order);
        }
    }

    handleRevert = () => {
        const { onRevert, order } = this.props;
        if (onRevert) {
            onRevert(order);
        }
    }

    handleComplete = () => {
        const { onComplete, order } = this.props;
        if (onComplete) {
            onComplete(order);
        }
    }

    confirmCancel = () => {
        return (
            <div className="box-footer">
                <div className="row">
                    <div className="col-md-offset-8 col-md-4 col-sm-12">
                        <Button onClick={this.handleConfirmCancel} block danger>确认取消订单</Button>
                    </div>
                </div>
            </div>
        );
    }

    confirm = () => {
        return (
            <div className="box-footer">
                <div className="row">
                    <div className="col-md-offset-8 col-md-4 col-sm-12">
                        <Button onClick={this.handleConfirm} block primary>确认订单</Button>
                    </div>
                </div>
            </div>
        );
    }

    complete = () => {
        return (
            <div className="box-footer">
                <div className="row">
                    <div className="col-md-offset-8 col-md-4 col-sm-12">
                        <Button onClick={this.handleComplete} block success>完成</Button>
                    </div>
                </div>
            </div>
        );
    }

    render() {

        const { order } = this.props;

        if (order.service.status === "cancelling") {
            return this.confirmCancel();
        }

        if (order.status.id === "submitted") {
            return this.confirm();
        }

        if (order.status.id === "reverted") {
            return this.complete();
        }

        return null;
    }
}