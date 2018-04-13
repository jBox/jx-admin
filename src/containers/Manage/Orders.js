import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";

import OrderPreview from "../../components/Widgets/OrderPreview";
import InfiniteScroll from "react-infinite-scroller";

import manageOrdersSelector from "../../redux/selectors/manage/orders";
import {
    loadMore,
    confirmOrder,
    scheduleOrder,
    confirmCancelOrder,
    completeOrder,
    ordersInitialLoad
} from "../../redux/actions/manage/orders";
import { driversInitialLoad, vehiclesInitialLoad } from "../../redux/actions/manage";

const centerAlign = { textAlign: "center" };

const Loader = () => {
    return (<div style={centerAlign}><i className="fa fa-refresh fa-spin"></i></div>);
};

class Orders extends Component {

    static propTypes = {
        history: PropTypes.object,
        vehicles: PropTypes.array,
        drivers: PropTypes.array,
        orders: PropTypes.array,
        hasMore: PropTypes.bool,
        confirmOrder: PropTypes.func,
        confirmCancelOrder: PropTypes.func,
        scheduleOrder: PropTypes.func,
        completeOrder: PropTypes.func,
        loadMore: PropTypes.func,
        ordersInitialLoad: PropTypes.func,
        driversInitialLoad: PropTypes.func,
        vehiclesInitialLoad: PropTypes.func
    }

    componentDidMount() {
        const { ordersInitialLoad, driversInitialLoad, vehiclesInitialLoad } = this.props;
        if (ordersInitialLoad) {
            ordersInitialLoad("submitted");
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

    handleCompleteOrder = (order, schedule) => {
        const { completeOrder } = this.props;
        if (completeOrder) {
            completeOrder(order);
        }
    }

    handleModifyOrder = (order) => {
        const { history } = this.props;
        if (history) {
            history.push(`/manage/orders/${order.id}`);
        }
    }

    handleLoadMore = () => {
        const { hasMore, loadMore } = this.props;
        if (hasMore && loadMore) {
            loadMore();
        }
    }

    render() {
        const { hasMore, orders, drivers, vehicles } = this.props;
        const noMore = !hasMore && orders.length > 0;
        const noAny = !hasMore && orders.length === 0;

        return (
            <Fragment>
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.handleLoadMore}
                    hasMore={hasMore}
                    loader={<Loader key={0} />}
                >
                    {orders.map((order) => (
                        <OrderPreview
                            key={order.id}
                            order={order}
                            vehicles={vehicles}
                            drivers={drivers}
                            onConfirm={this.handleConfirmOrder}
                            onConfirmCancel={this.handleConfirmCancelOrder}
                            onSchedule={this.handleScheduleOrder}
                            onComplete={this.handleCompleteOrder}
                            onModify={this.handleModifyOrder}
                        />
                    ))}
                </InfiniteScroll>

                {noMore && (<div style={centerAlign}>
                    <label>---------------- + ----------------</label>
                </div>)}

                {noAny && (<div style={centerAlign}>
                    <label>---------------- 暂无数据 ----------------</label>
                </div>)}
            </Fragment>
        );
    }
}

export default connect(manageOrdersSelector, {
    confirmOrder,
    scheduleOrder,
    confirmCancelOrder,
    completeOrder,
    loadMore,
    ordersInitialLoad,
    driversInitialLoad,
    vehiclesInitialLoad
})(Orders);