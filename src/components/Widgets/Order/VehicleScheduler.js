import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import isEqual from "lodash/isEqual";
import { LPN_CONTENT_PATTERN } from "../../utils";

import Form from "../../Form";
import Button from "../../Form/Button";
import Autocomplete from "../../Form/Autocomplete";

class Scheduler extends Component {
    static propTypes = {
        vehicles: PropTypes.array,
        drivers: PropTypes.array,
        onSubmit: PropTypes.func
    }

    schedule = {}

    handleSubmit = () => {
        const { onSubmit } = this.props;
        const { vehicle, driver } = this.schedule;
        if (onSubmit) {
            onSubmit({
                licenseNumber: vehicle.number,
                model: vehicle.model,
                driver: driver.title,
                mobile: driver.mobile
            });
        }
    }

    handleVehicleChange = (item) => {
        const [number, model] = item.split(/[,|，]/);
        this.schedule.vehicle = {
            number: number ? number.trim() : "",
            model: model ? model.trim() : ""
        };
    }

    handleDriverChange = (item) => {
        const [title, mobile] = item.split(/[,|，]/);
        this.schedule.driver = {
            title: title ? title.trim() : "",
            mobile: mobile ? mobile.trim() : ""
        };
    }

    render() {
        const { order, vehicles, drivers, children } = this.props;
        const vehicleItems = vehicles.map((item) => ({
            id: item.number,
            label: item.number,
            description: item.model
        }));
        const driverItems = drivers.map((item) => {
            const id = item.mobile;
            return { id, label: item.title || item.nickname, description: id };
        });

        return (
            <Form className="row" onSubmit={this.handleSubmit}>
                <div className="col-md-4 col-sm-12">
                    <Autocomplete items={vehicleItems}
                        name="vehicle"
                        placeholder="车牌号, 车型"
                        pattern={`^${LPN_CONTENT_PATTERN}\\s*[,|，]\\s*(商务车|轿车|中巴车|大巴车)$`}
                        message="请输入车牌号与车型"
                        required
                        onChange={this.handleVehicleChange}
                    />
                </div>
                <div className="col-md-4 col-sm-12">
                    <Autocomplete items={driverItems}
                        name="driver"
                        pattern={`^[^\\d]+\\s*[,|，]\\s*1\\d{10}$`}
                        placeholder="司机称呼，手机号码"
                        message="请输入司机称呼与手机号码"
                        required
                        onChange={this.handleDriverChange}
                    />
                </div>
                <div className="col-md-4 col-sm-12">
                    <Button type="submit" className="pull-right" friable success>添加调度</Button>
                </div>
            </Form>
        );
    }
}

const VehicleText = ({ data }) => {
    const { model, count, withDriver, notes } = data;
    const additional = [`${count} 辆`];
    if (withDriver) {
        additional.push("带驾");
    }

    if (notes) {
        return (
            <Fragment>
                <p><label>{model.label}</label> / {additional.join(" / ")}</p>
                <p>{notes}</p>
            </Fragment>
        );
    }

    return (<p><label>{model.label}</label> / {additional.join(" / ")}</p>);
};

const ScheduleItem = ({ id, licenseNumber, model, driver, mobile, onDelete }) => {
    const info = `${licenseNumber}, ${driver}, ${mobile}`;
    const handleDelete = (id) => {
        return () => {
            if (onDelete) {
                onDelete(id);
            }
        }
    };

    return (
        <li className="list-group-item">
            {info}<Button className="pull-right" flat danger xs onClick={handleDelete(id)}>删除</Button>
        </li>
    )
}

export default class VehicleScheduler extends Component {
    static propTypes = {
        defaultValue: PropTypes.array,
        vehicles: PropTypes.array,
        drivers: PropTypes.array,
        data: PropTypes.object,
        order: PropTypes.object,
        onClose: PropTypes.func,
        onSubmit: PropTypes.func
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { original } = nextProps;
        if (!isEqual(original, prevState.props.original)) {
            return {
                props: { original },
                schedules: original
            }
        }

        return null;
    }

    constructor(props) {
        super(props);

        this.state = {
            props: { original: props.original },
            schedules: props.original
        };
    }

    handleSubmit = () => {
        const { onSubmit } = this.props;
        if (onSubmit) {
            onSubmit(this.state.schedules);
        }
    }

    handleSchedulerSubmit = (item) => {
        const { data: { id: belongs } } = this.props;
        const id = this.getScheduleId();
        const schedules = [...this.state.schedules, { ...item, id, belongs }];
        this.setState({ schedules });
    }

    handleSchedulerItemDelete = (id) => {
        const schedules = this.state.schedules.reduce((items, item) => {
            if (item.id !== id) {
                return items.concat({ ...item });
            }

            return items;
        }, []);

        this.setState({ schedules });
    }

    handleGoBack = () => {
        const { onClose } = this.props;
        /* if (!isEqual(this.state.schedules, original)) {
            this.setState({ schedules: original });
        } */

        if (onClose) {
            onClose();
        }
    }

    getScheduleId = () => {
        const token = this.state.schedules.length + 1;
        return `${Date.now()}${token}`;
    }

    render() {
        const { order, data, vehicles, drivers, original } = this.props;
        const { schedules } = this.state;
        const showScheduler = schedules.length < data.count;
        const nothingChanged = isEqual(schedules, original);
        return (
            <div className="box box-primary box-solid">
                <div className="box-header with-border">
                    <h3 className="box-title">订单{order.id} - 调度车辆</h3>
                    <div className="box-tools">
                        <Button primary flat xs onClick={this.handleGoBack}>返回</Button>
                    </div>
                </div>
                <div className="box-body">
                    <VehicleText data={data} />

                    {schedules.length > 0 && (
                        <ul className="list-group list-group-unbordered">
                            {schedules.map((item) => (
                                <ScheduleItem key={item.id} {...item} onDelete={this.handleSchedulerItemDelete} />
                            ))}
                        </ul>
                    )}

                    {showScheduler && (
                        <Scheduler
                            vehicles={vehicles}
                            drivers={drivers}
                            onSubmit={this.handleSchedulerSubmit}
                        />
                    )}

                </div>

                <div className="box-footer">
                    <Button friable flat primary right disabled={showScheduler || nothingChanged} onClick={this.handleSubmit}>
                        确定
                    </Button>
                </div>
            </div>
        );
    }
}