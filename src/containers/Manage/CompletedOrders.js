import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";

import OrderPreview from "../../components/Widgets/Order";

import manageOrdersSelector from "../../redux/selectors/manage/orders";
import { ordersInitialLoad } from "../../redux/actions/manage/orders";
import { driversInitialLoad, vehiclesInitialLoad } from "../../redux/actions/manage";

class Orders extends Component {

    static propTypes = {
        vehicles: PropTypes.array,
        drivers: PropTypes.array,
        orders: PropTypes.array,
        hasMore: PropTypes.bool,        
        ordersInitialLoad: PropTypes.func,
        driversInitialLoad: PropTypes.func,
        vehiclesInitialLoad: PropTypes.func
    }

    componentDidMount() {
        const { ordersInitialLoad, driversInitialLoad, vehiclesInitialLoad } = this.props;
        if (ordersInitialLoad) {
            ordersInitialLoad("completed");
        }
        if (driversInitialLoad) {
            driversInitialLoad();
        }
        if (vehiclesInitialLoad) {
            vehiclesInitialLoad();
        }
    }

    render() {
        const { orders, drivers, vehicles } = this.props;
        return orders.map((order) => (
            <OrderPreview
                key={order.id}
                order={order}
                vehicles={vehicles}
                drivers={drivers}
            />
        ));
    }
}

export default connect(manageOrdersSelector, {
    ordersInitialLoad,
    driversInitialLoad,
    vehiclesInitialLoad
})(Orders);