import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import isEqual from "lodash/isEqual";
import uuid from "uuid/v4";

import styles from "./VehiclesEditor.css";

import Button from "../../Form/Button";
import Input from "../../Form/Input";

class EditVehicle extends Component {
    static propTypes = {
        labelModels: PropTypes.object,
        vehicle: PropTypes.object,
        deletable: PropTypes.bool,
        disabled: PropTypes.bool,
        onDelete: PropTypes.func,
        onChange: PropTypes.func
    }

    validator = (value) => {
        const vehicle = this.extraVehicleState(value);
        return vehicle.model.id && !Number.isNaN(vehicle.count) && vehicle.count > 0;
    }

    handleChange = (event) => {
        const { onChange } = this.props;
        if (onChange) {
            const { value } = event.target;
            const vehicle = this.extraVehicleState(value);
            onChange(vehicle.id, vehicle);
        }
    }

    handleDelete = () => {
        const { vehicle, onDelete } = this.props;
        if (onDelete) {
            onDelete(vehicle.id);
        }
    }

    spliceVehicleState = (vehicle) => {
        const { model, count, withDriver, notes } = vehicle;
        const items = [
            model.label,
            `${count} 辆`
        ];

        if (withDriver) {
            items.push("带驾");
        }

        if (notes) {
            items.push(notes);
        }

        return items.join(" / ");
    }

    extraVehicleState = (text) => {
        const { vehicle } = this.props;
        const { labelModels } = this.props;
        const items = (text || "").split("/").reduce((items, item) => {
            return items.concat(item.trim());
        }, []);
        if (items.length < 2) {
            return { model: { id: "", label: "" }, count: 0 };
        }

        const model = labelModels[items[0]] || { id: "", label: items[0] };
        const [, count] = Array.from((/^(\d+)\s*辆$/ig.exec(items[1]) || []));

        const otherInfo = (items[2] || "").trim();
        const withDriver = otherInfo === "带驾";
        let notes = "";
        if (withDriver) {
            notes = (items[3] || "").trim();
        } else {
            notes = otherInfo;
        }

        return {
            ...vehicle,
            model,
            count: Number(count),
            withDriver,
            notes
        };
    }

    render() {

        const { vehicle, deletable, disabled } = this.props;
        const value = this.spliceVehicleState(vehicle);

        return (
            <div className={styles.input}>
                <div className="input-group">
                    <Input defaultValue={value}
                        validator={this.validator}
                        onChange={this.handleChange}
                        readOnly={disabled}
                    />
                    <span className="input-group-btn">
                        <Button danger flat onClick={this.handleDelete} disabled={!deletable || disabled}>
                            <i className="fa fa-trash-o"></i>
                        </Button>
                    </span>
                </div>
            </div>
        );
    }
}

const loopVehicles = (vehicles) => {
    const keys = ["id", "scheduled", "model", "count", "withDriver", "notes"];
    return vehicles.map((item) => {
        return keys.reduce((items, key) => {
            if (item.hasOwnProperty(key)) {
                items[key] = item[key];
            }
            return items;
        }, {});
    });
};

export default class VehiclesEditor extends Component {
    static defaultProps = {
        disabled: false,
        models: {}
    }

    static propTypes = {
        disabled: PropTypes.bool,
        models: PropTypes.object,
        vehicles: PropTypes.array,
        onChange: PropTypes.func
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { vehicles } = nextProps;
        if (!isEqual(vehicles, prevState.defaultVehicles)) {
            return {
                defaultVehicles: vehicles,
                vehicles: vehicles.map((item) => ({ ...item }))
            };
        }

        return null;
    }

    constructor(props) {
        super(props);
        this.state = {
            defaultVehicles: props.vehicles,
            vehicles: props.vehicles.map((item) => ({ ...item }))
        };
    }

    handleModify = (id, updated) => {
        const vehicles = [...this.state.vehicles];
        const index = vehicles.findIndex(x => x.id === id);
        vehicles[index] = updated;
        this.setState({ vehicles }, () => {
            const { onChange } = this.props;
            if (onChange) {
                onChange(loopVehicles(vehicles));
            }
        });
    }

    handleDelete = (id) => {
        const vehicles = this.state.vehicles.reduce((items, item) => {
            if (id !== item.id) {
                return items.concat({ ...item });
            };

            return items;
        }, []);

        this.setState({ vehicles }, () => {
            const { onChange } = this.props;
            if (onChange) {
                onChange(loopVehicles(vehicles));
            }
        });
    }

    handleCreate = () => {
        const { models } = this.props;
        const vehicles = [...this.state.vehicles, {
            model: { ...models.mvp },
            count: 1,
            withDriver: true,
            id: `${Date.now()}${this.state.vehicles.length}`
        }];
        this.setState({ vehicles }, () => {
            const { onChange } = this.props;
            if (onChange) {
                onChange(loopVehicles(vehicles));
            }
        });
    }

    render() {
        const { vehicles } = this.state;
        const { models, disabled } = this.props;
        const labelModels = Object.keys(models).reduce((items, key) => {
            const model = models[key];
            items[model.label] = model;
            return items;
        }, {});

        const deletable = vehicles.length > 1;

        return (
            <Fragment>
                <p>
                    <label>车辆信息</label>
                    <Button onClick={this.handleCreate} className="pull-right" disabled={disabled} xs>添加车辆</Button>
                </p>
                {vehicles.map((item) => (
                    <EditVehicle key={item.id}
                        deletable={deletable}
                        disabled={disabled}
                        labelModels={labelModels}
                        vehicle={item}
                        onChange={this.handleModify}
                        onDelete={this.handleDelete}
                    />
                ))}
            </Fragment>
        );
    }
}