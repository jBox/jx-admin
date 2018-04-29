import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { LPN_CONTENT_PATTERN } from "../utils";

import styles from "./ScheduleVehicles.css";

import Modal from "../Overlays/Modal";
import Form from "../Form";
import Button from "../Form/Button";
import Autocomplete from "../Form/Autocomplete";

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
                    <Button type="submit" block success>添加调度</Button>
                </div>
            </Form>
        );
    }
}

const VehicleItem = ({ schedulable, data, onSchedule }) => {
    const { model, count, withDriver, scheduled } = data;
    const additional = [`${count} 辆`];
    if (withDriver) {
        additional.push("带驾");
    }

    const handleScheduleClick = (item) => {
        return () => {
            if (onSchedule) {
                onSchedule(item);
            }
        }
    }

    const textColor = classNames({ [styles.scheduledColor]: scheduled });

    return (<p>
        <label className={textColor}>{model.label}</label><span className={textColor}> / {additional.join(" / ")}</span>
        {scheduled && (
            <i className={classNames("fa fa-fw fa-check-circle-o", styles.scheduledColor)}></i>
        )}
        {schedulable && (
            <Button className="pull-right"
                onClick={handleScheduleClick(data)}
                primary={!scheduled}
                flat xs
            >
                {scheduled ? "重新安排" : "安排车辆"}
            </Button>
        )}
    </p>)
};

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

class SchedulePopup extends Component {
    static propTypes = {
        vehicles: PropTypes.array,
        drivers: PropTypes.array,
        data: PropTypes.object,
        onClose: PropTypes.func,
        onSubmit: PropTypes.func
    }

    state = {
        schedules: []
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

    getScheduleId = () => {
        const token = this.state.schedules.length + 1;
        return `${Date.now()}${token}`;
    }

    render() {
        const { onClose, data, vehicles, drivers } = this.props;
        const { schedules } = this.state;
        const showScheduler = schedules.length < data.count;
        return (
            <Modal>
                <Modal.Header onClose={onClose}>
                    <Modal.Title>调度车辆</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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

                </Modal.Body>
                <Modal.Footer>
                    <Button className="pull-left" onClick={onClose}>取消</Button>
                    <Button type="submit" primary disabled={showScheduler} onClick={this.handleSubmit}>提交</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default class ScheduleVehicles extends Component {
    static defaultProps = {
        vehicles: [],
        drivers: []
    }

    static propTypes = {
        vehicles: PropTypes.array,
        drivers: PropTypes.array,
        order: PropTypes.object,
        onSchedule: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            dialog: { display: false }
        };
    }

    handleScheduleVehicle = (vehicle) => {
        this.setState({ dialog: { display: true, vehicle } });
    }

    handleSchedulePopupClose = () => {
        this.setState({ dialog: { display: false } });
    }

    handleSchedulePopupSubmit = (schedules) => {
        const { order, onSchedule } = this.props;
        const { vehicle: current } = this.state.dialog;
        let currentSchedules = order.schedules || [];
        // update order
        if (currentSchedules.length > 0) {
            currentSchedules = currentSchedules.reduce((items, item) => {
                if (item.belongs !== current.id) {
                    return items.concat(item);
                }

                return items;
            }, []);
        }

        order.schedules = [...currentSchedules, ...schedules];
        const vehicle = order.vehicles.find(x => x.id === current.id);
        vehicle.scheduled = true;

        this.setState({ dialog: { display: false } }, () => {
            const allScheduled = order.vehicles.every(x => x.scheduled);
            if (allScheduled && onSchedule) {
                // submit schedules
                onSchedule(order);
            }
        });
    }

    render() {
        const { order, vehicles, drivers } = this.props;
        const { dialog } = this.state;
        const schedulable = order.status.id === "confirmed";

        return (
            <Fragment>
                <div className="box-footer box-comments">
                    {order.vehicles.map((item) => (
                        <VehicleItem key={item.id}
                            schedulable={schedulable}
                            data={item}
                            onSchedule={this.handleScheduleVehicle}
                        />
                    ))}
                </div>

                {dialog.display && (
                    <SchedulePopup
                        data={dialog.vehicle}
                        vehicles={vehicles}
                        drivers={drivers}
                        onClose={this.handleSchedulePopupClose}
                        onSubmit={this.handleSchedulePopupSubmit}
                    />
                )}

            </Fragment>
        );
    }
}