import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import DriverList from "../../components/Widgets/DriverList";
import CreateDriver from "../../components/Widgets/CreateDriver";
import Button from "../../components/Form/Button";
import Confirm from "../../components/Overlays/Confirm";

import manageDriversSelector from "../../redux/selectors/manage/drivers";
import { driversInitialLoad } from "../../redux/actions/manage";
import { createDriver, updateDriver, removeDriver } from "../../redux/actions/manage/drivers";
import { callout } from "../../redux/actions/notifications";

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
        showAddDriver: false,
        confirm: { display: false }
    }

    handleAddDriverClick = () => {
        if (!this.state.showAddDriver) {
            this.setState({ showAddDriver: true });
        }
    }

    handleAddDriverSubmit = (driver) => {
        const { createDriver } = this.props;
        if (createDriver) {
            createDriver(driver);
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

    handleRemoveDriver = (driver) => {
        this.setState({ confirm: { display: true, driver } });
    }

    handleConfirmRemoveDriver = () => {
        const { removeDriver } = this.props;
        const { confirm } = this.state;
        this.setState({ confirm: { display: false } }, () => {
            if (removeDriver && confirm.driver) {
                removeDriver(confirm.driver);
            }
        });
    }

    handleCloseRemoveDriver = () => {
        this.setState({ confirm: { display: false } });
    }

    render() {
        const { drivers, updateDriver } = this.props;
        const { showAddDriver, confirm } = this.state;

        return (<div className="box">
            <div className="box-header">
                <h3 className="box-title">司机</h3>

                <div className="box-tools">
                    <Button className="pull-right" onClick={this.handleAddDriverClick} success xs flat>
                        添加司机
                    </Button>
                </div>
            </div>

            <div className="box-body no-padding">
                <DriverList data={drivers} onUpdate={updateDriver} onDelete={this.handleRemoveDriver} />
            </div>
            <div className="box-footer clearfix">
            </div>

            {showAddDriver && (<CreateDriver
                onSubmit={this.handleAddDriverSubmit}
                onClose={this.handleAddDriverClose} />)}

            {confirm.display && (<Confirm
                title="删除司机"
                onConfirm={this.handleConfirmRemoveDriver}
                onClose={this.handleCloseRemoveDriver}
                warning
            >
                你知道吗，你正在删除一个司机，你确定要这么做吗？
            </Confirm>)}
        </div>);
    }
}

export default connect(manageDriversSelector, {
    createDriver,
    updateDriver,
    removeDriver,
    driversInitialLoad,
    callout
})(Drivers);