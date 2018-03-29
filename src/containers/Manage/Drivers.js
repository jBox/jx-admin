import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import DriverList from "../../components/Form/DriverList";
import CreateDriver from "../../components/Widgets/CreateDriver";
import Button from "../../components/Form/Button";

import manageDriversSelector from "../../redux/selectors/manage/drivers";
import { createDriver, updateDriver, removeDriver, driversInitialLoad } from "../../redux/actions/manage";

class Drivers extends Component {

    static propTypes = {
        drivers: PropTypes.array,
        createDriver: PropTypes.func,
        updateDriver: PropTypes.func,
        removeDriver: PropTypes.func,
        driversInitialLoad: PropTypes.func
    }

    componentDidMount() {
        const { driversInitialLoad } = this.props;
        if (driversInitialLoad) {
            driversInitialLoad();
        }
    }

    state = {
        showAddDriver: false
    }

    handleAddDriverClick = () => {
        if (!this.state.showAddDriver) {
            this.setState({ showAddDriver: true });
        }
    }

    handleAddDriverSubmit = (driver) => {
        console.log(driver);
        const { createDriver } = this.props;
        if (createDriver) {
            createDriver();
        }


        if (this.state.showAddDriver) {
            this.setState({ showAddDriver: false });
        }
    }

    handleAddDriverClose = () => {
        if (this.state.showAddDriver) {
            this.setState({ showAddDriver: false });
        }
    }

    render() {
        const { showAddDriver } = this.state;

        return (<div className="box">
            <div className="box-header">
                <h3 className="box-title">司机</h3>

                <div className="box-tools">
                    <Button className="pull-right" onClick={this.handleAddDriverClick} success sm>
                        增加司机
                    </Button>
                </div>
            </div>

            <div className="box-body no-padding">
                <DriverList />
            </div>
            <div className="box-footer clearfix">
            </div>

            {showAddDriver && (<CreateDriver
                onSubmit={this.handleAddDriverSubmit}
                onClose={this.handleAddDriverClose} />)}
        </div>);
    }
}

export default connect(manageDriversSelector, {
    createDriver,
    updateDriver,
    removeDriver,
    driversInitialLoad
})(Drivers);