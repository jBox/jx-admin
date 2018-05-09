import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Form from "../../Form";
import Button from "../../Form/Button";
import Input from "../../Form/Input";

export default class OrderOperation extends Component {
    static defaultProps = {
        vehicles: []
    }

    static propTypes = {
        vehicles: PropTypes.array,
        order: PropTypes.object,
        onConfirm: PropTypes.func,
        onConfirmCancel: PropTypes.func,
        onComplete: PropTypes.func
    }

    confirmation = {}

    handleConfirm = () => {
        const { onConfirm, order } = this.props;
        if (onConfirm) {
            onConfirm(order, this.confirmation.department);
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

    handleDepartmentChange = (event) => {
        const { value } = event.target;
        this.confirmation.department = value;
    }

    confirm = () => {
        const { order } = this.props;
        const departmentable = !order.department;
        const confirmButtonStyles = classNames({
            "col-md-offset-8": !departmentable
        }, "col-md-offset-8 col-md-4 col-sm-12");

        if (departmentable) {
            return (
                <div className="box-footer">
                    <Form onSubmit={this.handleConfirm}>
                        <div className="row">
                            <div className="col-md-offset-4 col-md-4 col-sm-12">
                                <Input
                                    name="department"
                                    placeholder="用车单位"
                                    message="请输入用车单位"
                                    required
                                    onChange={this.handleDepartmentChange}
                                />
                            </div>
                            <div className="col-md-4 col-sm-12">
                                <Button type="submit" block primary>确认订单</Button>
                            </div>
                        </div>
                    </Form>
                </div>
            )
        }

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

        if (order.status.id === "scheduled" &&
            order.schedules.length > 0 &&
            order.schedules.every(x => x.status === "end")
        ) {
            return this.complete();
        }

        return null;
    }
}