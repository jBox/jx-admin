import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Switch, Route, Link } from "react-browser-router";
import { connect } from "react-redux";

export default class Driver extends Component {
    static propTypes = {
        match: PropTypes.object,
        routes: PropTypes.array
    }

    breadcrumb = () => {
        const { match: { params: { feature, category } }, routes } = this.props;
        const info = { title: "行程管理中心", feature: "", active: "" };
        if (feature === "trips") {
            info.active = "行程列表";
        }

        return (
            <section className="content-header">
                <h1>{info.title} <small>健湖租车</small></h1>
                <ol className="breadcrumb">
                    <li><Link to="/driver"><i className="fa fa-dashboard"></i> 主页</Link></li>
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