import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";

import EditOrder from "../../components/Widgets/EditOrder";

import { modifyOrderSelector } from "../../redux/selectors/manage/orders";
import { modifyOrder, orderInitialLoad } from "../../redux/actions/orders";
import { driversInitialLoad, vehiclesInitialLoad } from "../../redux/actions/manage";

const centerAlign = { textAlign: "center" };

const Loader = () => {
    return (<div style={centerAlign}><i className="fa fa-refresh fa-spin"></i></div>);
};

class ModifyOrder extends Component {

    static propTypes = {
        match: PropTypes.object,
        history: PropTypes.object,
        vehicles: PropTypes.array,
        drivers: PropTypes.array,
        order: PropTypes.object,
        modifyOrder: PropTypes.func,
        orderInitialLoad: PropTypes.func,
        driversInitialLoad: PropTypes.func,
        vehiclesInitialLoad: PropTypes.func
    }

    componentDidMount() {
        const {
            match: { params },
            orderInitialLoad,
            driversInitialLoad,
            vehiclesInitialLoad
        } = this.props;
        if (orderInitialLoad) {
            orderInitialLoad(params.orderId);
        }
        if (driversInitialLoad) {
            driversInitialLoad();
        }
        if (vehiclesInitialLoad) {
            vehiclesInitialLoad();
        }
    }

    render() {
        const { order, drivers, vehicles } = this.props;
        if (!order) {
            return null;
        }

        return (
            <EditOrder order={order} drivers={drivers} vehicles={vehicles} />
        );
    }
}

export default connect(modifyOrderSelector, {
    modifyOrder,
    orderInitialLoad,
    driversInitialLoad,
    vehiclesInitialLoad
})(ModifyOrder);