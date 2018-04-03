import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";

import OrderPreview from "../../components/Widgets/OrderPreview";

export default class Orders extends Component {

    static propTypes = {
        orders: PropTypes.array,
        driversInitialLoad: PropTypes.func
    }

    componentDidMount() {
        const { driversInitialLoad } = this.props;
        if (driversInitialLoad) {
            driversInitialLoad();
        }
    }

    render() {

        return [
            <OrderPreview key={0} />,
            <OrderPreview key={1} />,
            <OrderPreview key={2} />,
            <OrderPreview key={3} />,
            <OrderPreview key={4} />
        ];
    }
}