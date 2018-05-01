import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Switch, Route, Link } from "react-browser-router";
import { connect } from "react-redux";

import { loadRoles } from "../../redux/actions/manage";

class Manage extends Component {
    static propTypes = {
        match: PropTypes.object,
        routes: PropTypes.array,
        loadRoles: PropTypes.func
    }

    componentDidMount() {
        const { loadRoles } = this.props;
        if (loadRoles) {
            loadRoles();
        }
    }

    breadcrumb = () => {
        const { match: { params: { feature, category } }, routes } = this.props;
        const info = { title: "管理中心", feature: "", active: "" };
        if (feature === "orders") {
            info.title = "订单管理中心";
            switch (category) {
                case "done":
                    info.active = "已完成订单列表";
                    break;
                case "cancelled":
                    info.active = "已取消订单列表";
                    break;
                default:
                    if (category) {
                        info.feature = "待处理订单";
                        info.active = `订单: ${category}`;
                    } else {
                        info.active = "待处理订单列表";
                    }
                    break;
            }
        } else if (feature === "drivers") {
            info.title = "司机管理中心";
            info.active = "司机列表";
        } else if (feature === "vehicles") {
            info.title = "车辆管理中心";
            info.active = "车辆列表";
        } else if (feature === "users") {
            info.title = "用户管理中心";
            switch (category) {
                case "registers":
                    info.active = "新注册用户列表";
                    break;
                default:
                    info.active = "用户列表";
                    break;
            }
        }

        return (
            <section className="content-header">
                <h1>{info.title} <small>健湖租车</small></h1>
                <ol className="breadcrumb">
                    <li><Link to="/dashboard"><i className="fa fa-dashboard"></i> 主页</Link></li>
                    {info.feature && (
                        <li>
                            <Link to={`/manage/${feature}`}><i className="fa fa-list"></i> {info.feature}</Link>
                        </li>
                    )}
                    {info.active && (
                        <li className="active">{info.active}</li>
                    )}
                </ol>
            </section>
        );
    }

    render() {
        const { match: { params: { feature, category } }, routes } = this.props;

        return (
            <Fragment>
                {this.breadcrumb()}

                <section className="content container-fluid">
                    <Switch>
                        {routes.map((route, index) => (<Route key={index} {...route} />))}
                    </Switch>
                </section>
            </Fragment>
        );
    }
}

export default connect(null, {
    loadRoles
})(Manage);