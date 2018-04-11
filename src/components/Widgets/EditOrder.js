import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { LPN_CONTENT_PATTERN } from "../utils";

import Form from "../Form";
import Button from "../Form/Button";
import Input from "../Form/Input";
import Autocomplete from "../Form/Autocomplete";

const localDepartureTime = (departureTime) => {
    const time = new Date(departureTime);
    return time.format("yyyy-MM-ddThh:mm");
};

export default class OrderPreview extends Component {
    static defaultProps = {
        vehicles: [],
        drivers: []
    }

    static propTypes = {
        vehicles: PropTypes.array,
        drivers: PropTypes.array,
        order: PropTypes.object,
        onCancel: PropTypes.func,
        onSubmit: PropTypes.func
    }

    handleSubmit = () => {
        const { onSubmit } = this.props;
        if (onSubmit) {
            onSubmit();
        }
    }

    render() {
        const { order, onCancel } = this.props;

        return (
            <div className="box box-primary">
                <div className="box-header with-border">
                    <h3 className="box-title">修改订单</h3>
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <div className="box-body">
                        <h4><label>订单号：</label>{order.id}</h4>
                        <p><label>订单状态：</label>{order.status.label}</p>


                        <Input id="name" name="name" label="联系人" defaultValue={order.name} required />
                        <Input id="mobile" name="mobile" label="联系电话" defaultValue={order.mobile} required />
                        <Input type="datetime-local" id="departureTime" name="departureTime" label="出发时间"
                            defaultValue={localDepartureTime(order.departureTime)}
                            required
                        />
                        <Input id="departurePlace" name="departurePlace" label="出发地点" defaultValue={order.departurePlace} required />
                        <Input id="destination" name="destination" label="目的地" defaultValue={order.destination} required />
                        <Input type="number" id="duration" name="duration" label="租车天数" defaultValue={order.duration} required />
                        <Input type="textarea" id="notes" name="notes" label="备注" defaultValue={order.notes} />
                    </div>

                    <div className="box-footer">
                        <Button danger flat onClick={onCancel}>取消订单</Button>
                        <Button type="submit" className="pull-right" flat primary>提交修改</Button>
                    </div>
                </Form>
            </div>
        );
    }
}