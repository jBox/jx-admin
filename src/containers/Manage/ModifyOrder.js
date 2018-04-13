import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import isEqual from "lodash/isEqual";

import OrderEditor from "../../components/Widgets/OrderEditor";
import Confirm from "../../components/Overlays/Confirm";

import { modifyOrderSelector } from "../../redux/selectors/manage/orders";
import { cancelOrder, modifyOrder, orderInitialLoad } from "../../redux/actions/manage/orders";

const centerAlign = { textAlign: "center" };

const Loader = () => {
    return (<div style={centerAlign}><i className="fa fa-refresh fa-spin"></i></div>);
};

class ModifyOrder extends Component {

    static propTypes = {
        match: PropTypes.object,
        history: PropTypes.object,
        models: PropTypes.object,
        order: PropTypes.object,
        modify: PropTypes.object,
        modifyOrder: PropTypes.func,
        cancelOrder: PropTypes.func,
        orderInitialLoad: PropTypes.func
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { modify } = nextProps;
        if (!isEqual(modify, prevState.modify)) {
            return modify;
        }

        return null;
    }

    constructor(props) {
        super(props);
        this.state = {
            confirm: { display: false },
            modify: { ...props.modify }
        };
    }

    componentDidMount() {
        const {
            match: { params },
            orderInitialLoad
        } = this.props;
        if (orderInitialLoad) {
            orderInitialLoad(params.orderId);
        }
    }

    handleSubmit = (order) => {
        console.log("SUBMIT", order);
        const { modifyOrder } = this.props;
        if (modifyOrder) {
            modifyOrder(order);
        }
    }

    handleCancel = (order) => {
        this.setState({ confirm: { display: true, order } });
    }

    handleConfirmCancelOrder = () => {
        const { confirm: { order } } = this.state;
        this.setState({ confirm: { display: false } }, () => {
            const { cancelOrder } = this.props;
            if (cancelOrder) {
                cancelOrder(order);
            }
        });
    }

    handleCloseCancelOrder = () => {
        this.setState({ confirm: { display: false } });
    }

    render() {
        const { order, models } = this.props;
        if (!order) {
            return (<Loader />);
        }

        return (
            <Fragment>
                <OrderEditor
                    loading={this.state.modify.state === "request"}
                    order={order}
                    models={models}
                    onSubmit={this.handleSubmit}
                    onCancel={this.handleCancel}
                />

                {this.state.confirm.display && (<Confirm
                    title="取消订单"
                    onConfirm={this.handleConfirmCancelOrder}
                    onClose={this.handleCloseCancelOrder}
                    warning
                >
                    你知道吗，你正在取消这个订单，你确定要这么做吗？
                </Confirm>)}
            </Fragment>
        );
    }
}

export default connect(modifyOrderSelector, {
    modifyOrder,
    cancelOrder,
    orderInitialLoad
})(ModifyOrder);