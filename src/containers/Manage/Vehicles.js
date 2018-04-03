import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import VehiclesList from "../../components/Widgets/VehiclesList";
import CreateVehicle from "../../components/Widgets/CreateVehicle";
import Button from "../../components/Form/Button";

import manageVehiclesSelector from "../../redux/selectors/manage/vehicles";
import { vehiclesInitialLoad, createVehicle } from "../../redux/actions/manage";
import { callout } from "../../redux/actions/notifications";

class Vehicles extends Component {

    static propTypes = {
        vehicles: PropTypes.array,
        models: PropTypes.object,
        createVehicle: PropTypes.func,
        vehiclesInitialLoad: PropTypes.func
    }

    componentDidMount() {
        const { vehiclesInitialLoad } = this.props;
        if (vehiclesInitialLoad) {
            vehiclesInitialLoad();
        }
    }

    state = {
        showAddVehicle: false
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

    render() {
        const { vehicles, models } = this.props;
        const { showAddVehicle } = this.state;

        return (<div className="box">
            <div className="box-header">
                <h3 className="box-title">车辆</h3>

                <div className="box-tools">
                    <Button className="pull-right" onClick={this.handleAddVehicleClick} success sm>
                        添加车辆
                    </Button>
                </div>
            </div>

            <div className="box-body no-padding">
                <VehiclesList data={vehicles} models={models} />
            </div>
            <div className="box-footer clearfix">
            </div>

            {showAddVehicle && (<CreateVehicle models={models}
                onSubmit={this.handleAddVehicleSubmit}
                onClose={this.handleAddVehicleClose} />)}
        </div>);
    }
}

export default connect(manageVehiclesSelector, {
    vehiclesInitialLoad,
    createVehicle
})(Vehicles);