import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";

import OrderPreview from "../../components/Widgets/OrderPreview";

import manageOrdersSelector from "../../redux/selectors/manage/orders";
import { confirmOrder, scheduleOrder, confirmCancelOrder, ordersInitialLoad } from "../../redux/actions/orders";
import { driversInitialLoad, vehiclesInitialLoad } from "../../redux/actions/manage";

class Orders extends Component {

    static propTypes = {
        vehicles: PropTypes.array,
        drivers: PropTypes.array,
        orders: PropTypes.array,
        hasMore: PropTypes.bool,
        confirmOrder: PropTypes.func,
        confirmCancelOrder: PropTypes.func,
        scheduleOrder: PropTypes.func,
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

    handleConfirmOrder = (order) => {
        const { confirmOrder } = this.props;
        if (confirmOrder) {
            confirmOrder(order);
        }
    }

    handleConfirmCancelOrder = (order) => {
        const { confirmCancelOrder } = this.props;
        if (confirmCancelOrder) {
            confirmCancelOrder(order);
        }
    }

    handleScheduleOrder = (order, schedule) => {
        const { scheduleOrder } = this.props;
        if (scheduleOrder) {
            scheduleOrder(order, schedule);
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
                onConfirm={this.handleConfirmOrder}
                onConfirmCancel={this.handleConfirmCancelOrder}
                onSchedule={this.handleScheduleOrder}
            />
        ));
    }
}

export default connect(manageOrdersSelector, {
    confirmOrder,
    scheduleOrder,
    confirmCancelOrder,
    ordersInitialLoad,
    driversInitialLoad,
    vehiclesInitialLoad
})(Orders);