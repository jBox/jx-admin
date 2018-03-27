import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import DriverList from "../../components/Form/DriverList";

export default class Drivers extends Component {

    state = {
        ok: false
    }

    handleExClick = () => {
        if (!this.state.ok) {
            this.setState({ ok: true });
        }
    }

    render() {
        return (<div className="box">
            <div className="box-header">
                <h3 className="box-title">司机</h3>

                <div className="box-tools">
                    <button type="button" className="btn btn-success btn-sm pull-right">增加司机</button>
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
        </div>);
    }
}