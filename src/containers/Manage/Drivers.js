import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import DriverList from "../../components/Form/DriverList";
import CreateDriver from "../../components/Widgets/CreateDriver";
import Button from "../../components/Form/Button";

export default class Drivers extends Component {

    state = {
        showAddDriver: false
    }

    handleAddDriverClick = () => {
        if (!this.state.showAddDriver) {
            this.setState({ showAddDriver: true });
        }
    }

    handleAddDriverSubmit = () => {
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
                <ul className="pagination pagination-sm no-margin pull-right">
                    <li><a href="#">«</a></li>
                    <li><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">»</a></li>
                </ul>
            </div>

            {showAddDriver && (<CreateDriver
                onSubmit={this.handleAddDriverSubmit}
                onClose={this.handleAddDriverClose} />)}
        </div>);
    }
}