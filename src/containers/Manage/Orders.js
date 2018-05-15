import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";

import OrderPreview from "../../components/Widgets/Order";
import Confirm from "../../components/Overlays/Confirm";
import InfiniteScroll from "react-infinite-scroller";
import ImagePreview from "../../components/Widgets/ImagePreview";

import manageOrdersSelector from "../../redux/selectors/manage/orders";
import {
    loadMore,
    confirmOrder,
    scheduleOrder,
    confirmCancelOrder,
    completeOrder,
    departSchedule,
    progressSchedule,
    revertSchedule,
    modifyOrder,
    cancelOrderImmediately,
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
        models: PropTypes.object,
        modifications: PropTypes.object,
        hasMore: PropTypes.bool,
        confirmOrder: PropTypes.func,
        confirmCancelOrder: PropTypes.func,
        scheduleOrder: PropTypes.func,
        completeOrder: PropTypes.func,
        departSchedule: PropTypes.func,
        modifyOrder: PropTypes.func,
        cancelOrderImmediately: PropTypes.func,
        progressSchedule: PropTypes.func,
        revertSchedule: PropTypes.func,
        loadMore: PropTypes.func,
        ordersInitialLoad: PropTypes.func,
        driversInitialLoad: PropTypes.func,
        vehiclesInitialLoad: PropTypes.func
    }

    state = { confirm: { display: false }, imagePreview: null }

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

    handleConfirmOrder = (order, department) => {
        const { confirmOrder } = this.props;
        if (confirmOrder) {
            confirmOrder(order, department);
        }
    }

    handleConfirmCancelOrder = (order) => {
        const { confirmCancelOrder } = this.props;
        if (confirmCancelOrder) {
            confirmCancelOrder(order);
        }
    }

    handleCancelOrderImmediately = (order) => {
        this.setState({ confirm: { display: true, order } });
    }

    handleConfirmCancelImmediately = () => {
        const { confirm: { order } } = this.state;
        this.setState({ confirm: { display: false } }, () => {
            const { cancelOrderImmediately } = this.props;
            if (cancelOrderImmediately) {
                cancelOrderImmediately(order);
            }
        });
    }

    handleCloseConfirmDailog = () => {
        this.setState({ confirm: { display: false } });
    }

    handleScheduleOrder = (order, schedule) => {
        const { scheduleOrder } = this.props;
        if (scheduleOrder) {
            scheduleOrder(order, schedule);
        }
    }

    handleCompleteOrder = (order) => {
        const { completeOrder } = this.props;
        if (completeOrder) {
            completeOrder(order);
        }
    }

    handleModifyOrder = (order) => {
        const { modifyOrder } = this.props;
        if (modifyOrder) {
            modifyOrder(order);
        }
    }

    handleLoadMore = () => {
        const { hasMore, loadMore } = this.props;
        if (hasMore && loadMore) {
            loadMore();
        }
    }

    handleImagePreview = (img) => {
        this.setState({ imagePreview: img.dataURL || img.src });
    }

    render() {
        const { hasMore, orders, models, modifications, drivers, vehicles, departSchedule, progressSchedule, revertSchedule } = this.props;
        const noAny = !hasMore && orders.length === 0;
        const { imagePreview, confirm } = this.state;

        return (
            <Fragment>
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.handleLoadMore}
                    hasMore={hasMore}
                    loader={<Loader key={0} />}
                    className="content-limit"
                >
                    {orders.map((order) => (
                        <OrderPreview
                            key={order.id}
                            order={order}
                            modification={modifications[order.id] || { state: "init" }}
                            models={models}
                            vehicles={vehicles}
                            drivers={drivers}
                            onConfirm={this.handleConfirmOrder}
                            onConfirmCancel={this.handleConfirmCancelOrder}
                            onCancel={this.handleCancelOrderImmediately}
                            onSchedule={this.handleScheduleOrder}
                            onComplete={this.handleCompleteOrder}
                            onModify={this.handleModifyOrder}
                            onDepart={departSchedule}
                            onProgress={progressSchedule}
                            onRevert={revertSchedule}
                            onImagePreview={this.handleImagePreview}
                        />
                    ))}
                </InfiniteScroll>

                {noAny && (<div style={centerAlign}>
                    <label>---------------- 暂无数据 ----------------</label>
                </div>)}

                {confirm.display && (<Confirm
                    title="取消订单"
                    onConfirm={this.handleConfirmCancelImmediately}
                    onClose={this.handleCloseConfirmDailog}
                    warning
                >
                    {`你知道吗，你正在取消订单${confirm.order.id}，你确定要这么做吗？`}
                </Confirm>)}

                <ImagePreview image={imagePreview} />
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
    departSchedule,
    progressSchedule,
    revertSchedule,
    modifyOrder,
    cancelOrderImmediately,
    ordersInitialLoad,
    driversInitialLoad,
    vehiclesInitialLoad
})(Orders);