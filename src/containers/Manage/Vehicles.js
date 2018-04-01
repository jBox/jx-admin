import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import VehiclesList from "../../components/Widgets/VehiclesList";
import CreateDriver from "../../components/Widgets/CreateDriver";
import Button from "../../components/Form/Button";

import manageVehiclesSelector from "../../redux/selectors/manage/vehicles";
import { vehiclesInitialLoad } from "../../redux/actions/manage";
import { callout } from "../../redux/actions/notifications";

class Vehicles extends Component {

    static propTypes = {
        vehicles: PropTypes.array,
        models: PropTypes.object,
        vehiclesInitialLoad: PropTypes.func
    }

    componentDidMount() {
        const { vehiclesInitialLoad } = this.props;
        if (vehiclesInitialLoad) {
            vehiclesInitialLoad();
        }
    }

    render() {
        const { vehicles, models } = this.props;

        return (<div className="box">
            <div className="box-header">
                <h3 className="box-title">车辆</h3>

                <div className="box-tools">
                    <Button className="pull-right" onClick={this.handleAddDriverClick} success sm>
                        添加车辆
                    </Button>
                </div>
            </div>

            <div className="box-body no-padding">
                <VehiclesList data={vehicles} models={models} />
            </div>
            <div className="box-footer clearfix">
            </div>
        </div>);
    }
}

export default connect(manageVehiclesSelector, {
    vehiclesInitialLoad
})(Vehicles);