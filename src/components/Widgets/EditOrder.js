import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { LPN_CONTENT_PATTERN } from "../utils";

import Form from "../Form";
import Button from "../Form/Button";
import Input from "../Form/Input";
import Autocomplete from "../Form/Autocomplete";

export default class OrderPreview extends Component {
    static defaultProps = {
        vehicles: [],
        drivers: []
    }

    static propTypes = {
        vehicles: PropTypes.array,
        drivers: PropTypes.array,
        order: PropTypes.object
    }

    handleSubmit = () => {

    }

    render() {
        const { order } = this.props;

        return (
            <div className="box box-primary">
                <div className="box-header with-border">
                    <h3 className="box-title">{order.id}</h3>
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <div className="box-body">
                        <Input id="name" name="name" label="联系人" required />
                        <Input id="mobile" name="mobile" label="联系电话" required />
                        <Input id="departureTime" name="departureTime" label="出发时间" required />
                        <Input id="departurePlace" name="departurePlace" label="出发地点" required />
                    </div>

                    <div className="box-footer">
                        <Button default>放弃</Button>
                        <Button type="submit" className="pull-right" info>提交</Button>
                    </div>
                </Form>
            </div>
        );
    }
}