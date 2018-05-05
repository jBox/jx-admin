import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import VehiclesList from "../../components/Widgets/VehiclesList";
import CreateVehicle from "../../components/Widgets/CreateVehicle";
import Button from "../../components/Form/Button";
import Confirm from "../../components/Overlays/Confirm";

import manageVehiclesSelector from "../../redux/selectors/manage/vehicles";
import { vehiclesInitialLoad, createVehicle, removeVehicle } from "../../redux/actions/manage";

class Vehicles extends Component {

    static propTypes = {
        vehicles: PropTypes.array,
        models: PropTypes.object,
        createVehicle: PropTypes.func,
        removeVehicle: PropTypes.func,
        vehiclesInitialLoad: PropTypes.func
    }

    componentDidMount() {
        const { vehiclesInitialLoad } = this.props;
        if (vehiclesInitialLoad) {
            vehiclesInitialLoad();
        }
    }

    state = {
        showAddVehicle: false,
        confirm: { display: false }
    }

    handleAddVehicleClick = () => {
        if (!this.state.showAddVehicle) {
            this.setState({ showAddVehicle: true });
        }
    }

    handleAddVehicleSubmit = (vehicle) => {
        const { createVehicle } = this.props;
        if (createVehicle) {
            createVehicle(vehicle);
        }

        if (this.state.showAddVehicle) {
            this.setState({ showAddVehicle: false });
        }
    }

    handleAddVehicleClose = () => {
        if (this.state.showAddVehicle) {
            this.setState({ showAddVehicle: false });
        }
    }

    handleDeleteVehicle = (vehicle) => {
        this.setState({ confirm: { display: true, vehicle } });
    }

    handleConfirmRemoveVehicle = () => {
        const { confirm: { vehicle } } = this.state;
        this.setState({ confirm: { display: false } }, () => {
            const { removeVehicle } = this.props;
            if (removeVehicle) {
                removeVehicle(vehicle);
            }
        });
    }

    handleCloseRemoveVehicle = () => {
        this.setState({ confirm: { display: false } });
    }

    render() {
        const { vehicles, models } = this.props;
        const { showAddVehicle, confirm } = this.state;

        return (
            <div className="box">
                <div className="box-header">
                    <h3 className="box-title">车辆</h3>

                    <div className="box-tools">
                        <Button className="pull-right" onClick={this.handleAddVehicleClick} success xs flat>
                            添加车辆
                    </Button>
                    </div>
                </div>

                <div className="box-body no-padding">
                    <VehiclesList data={vehicles} models={models} onDelete={this.handleDeleteVehicle} />
                </div>
                <div className="box-footer clearfix">
                </div>

                {showAddVehicle && (<CreateVehicle models={models}
                    onSubmit={this.handleAddVehicleSubmit}
                    onClose={this.handleAddVehicleClose} />)}

                {confirm.display && (<Confirm
                    title="删除车辆"
                    onConfirm={this.handleConfirmRemoveVehicle}
                    onClose={this.handleCloseRemoveVehicle}
                    warning
                >
                    你知道吗，你正在删除车牌号{confirm.vehicle.number}，你确定要这么做吗？
                </Confirm>)}
            </div>
        );
    }
}

export default connect(manageVehiclesSelector, {
    vehiclesInitialLoad,
    createVehicle,
    removeVehicle
})(Vehicles);