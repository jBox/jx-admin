import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import isEqual from "lodash/isEqual";
import isEmpty from "lodash/isEmpty";
import { LPN_CONTENT_PATTERN } from "../utils";

import Form from "../Form";
import Button from "../Form/Button";
import Input from "../Form/Input";
import Autocomplete from "../Form/Autocomplete";
import VehiclesEditor from "./VehiclesEditor";

const localDepartureTime = (departureTime) => {
    const time = new Date(departureTime);
    return time.format("yyyy-MM-ddThh:mm");
};

const EDITABLE_FIELDS = [
    "vehicles", "name", "mobile", "departureTime", "departurePlace", "destination", "duration", "notes"
];

const editableOrder = (order) => {
    return EDITABLE_FIELDS.reduce((obj, key) => {
        obj[key] = order[key];
        return obj;
    }, { id: order.id });
};

export default class OrderEditor extends Component {
    static defaultProps = {
        loading: false,
        models: {}
    }

    static propTypes = {
        loading: PropTypes.bool,
        models: PropTypes.object,
        order: PropTypes.object,
        onCancel: PropTypes.func,
        onSubmit: PropTypes.func
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { order } = nextProps;
        const stateOrder = editableOrder(order);
        const changed = !isEqual(stateOrder, prevState.order);

        const state = {};
        if (changed) {
            state.order = stateOrder;
            state.changed = false;
        }

        if (order.version !== prevState.version) {
            state.version = order.version;
        }

        if (!isEmpty(state)) {
            return state;
        }

        return null;
    }

    constructor(props) {
        super(props);
        const { order } = props;
        this.form = editableOrder(order);

        this.state = {
            order: this.form,
            version: order.version,
            changed: false
        };

    }

    handleSubmit = () => {
        const { onSubmit } = this.props;
        if (onSubmit) {
            onSubmit({ ...this.form, version: this.state.version });
        }
    }

    handleCancel = () => {
        const { onCancel, order } = this.props;
        if (onCancel) {
            onCancel(order);
        }
    }

    handleVehiclesChange = (items) => {
        this.updateOrder("vehicles", items);
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.updateOrder(name, value);
    }

    updateOrder = (name, value) => {
        const { order } = this.props;
        this.form[name] = value;
        const changed = !isEqual(this.form, order);
        if (changed !== this.state.changed) {
            this.setState({ changed });
        }
    }

    render() {
        const { loading, order, models } = this.props;
        const editable = !["cancelling", "cancelled", "completed"].includes(order.status.id);

        return (
            <div className="box box-primary">
                <div className="box-header with-border">
                    <h3 className="box-title">修改订单</h3>
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <div className="box-body">
                        <h4><label>订单号：</label>{order.id}</h4>
                        <p><label>订单状态：</label>{order.status.label}</p>

                        <Input id="name" name="name" label="联系人"
                            defaultValue={order.name}
                            onChange={this.handleInputChange}
                            plaseholder="联系人姓名"
                            message="请输入联系人"
                            required
                            readOnly={!editable}
                        />

                        <Input id="mobile" name="mobile" label="联系电话"
                            defaultValue={order.mobile}
                            onChange={this.handleInputChange}
                            plaseholder="手机号码"
                            message="请输入有效的手机号码"
                            pattern="^1\d{10}$"
                            required
                            readOnly={!editable}
                        />

                        <Input type="datetime-local" id="departureTime" name="departureTime" label="出发时间"
                            defaultValue={localDepartureTime(order.departureTime)}
                            onChange={this.handleInputChange}
                            plaseholder="出发时间"
                            message="请输入出发时间"
                            required
                            readOnly={!editable}
                        />

                        <Input id="departurePlace" name="departurePlace" label="出发地点"
                            defaultValue={order.departurePlace}
                            onChange={this.handleInputChange}
                            plaseholder="出发地点"
                            message="请输入出发地点"
                            required
                            readOnly={!editable}
                        />

                        <Input id="destination" name="destination" label="目的地"
                            defaultValue={order.destination}
                            onChange={this.handleInputChange}
                            plaseholder="目的地"
                            message="请输入目的地"
                            required
                            readOnly={!editable}
                        />

                        <Input type="number" id="duration" name="duration" label="租车天数"
                            defaultValue={order.duration}
                            onChange={this.handleInputChange}
                            plaseholder="租车天数"
                            message="请输入租车天数"
                            pattern="^\d+$"
                            required
                            readOnly={!editable}
                        />

                        <Input type="textarea" id="notes" name="notes" label="备注"
                            defaultValue={order.notes}
                            onChange={this.handleInputChange}
                            readOnly={!editable}
                        />
                    </div>

                    <div className="box-footer box-comments">
                        <VehiclesEditor
                            vehicles={order.vehicles}
                            models={models}
                            onChange={this.handleVehiclesChange}
                            disabled={!editable}
                        />
                    </div>

                    <div className="box-footer">
                        {editable && (
                            <Button danger flat onClick={this.handleCancel}>
                                取消订单
                            </Button>
                        )}
                        <Button type="submit" className="pull-right"
                            disabled={!this.state.changed || !editable}
                            flat primary
                        >
                            提交修改
                        </Button>
                    </div>
                </Form>

                {loading && (<div className="overlay">
                    <i className="fa fa-refresh fa-spin"></i>
                </div>)}
            </div>
        );
    }
}