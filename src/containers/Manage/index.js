import React, { Component } from "react";
import PropTypes from "prop-types";
import { Switch, Route, Link } from "react-browser-router";

export default class Manage extends Component {
    static propTypes = {
        match: PropTypes.object,
        routes: PropTypes.array
    }

    render() {
        const { match: { params: { category } }, routes } = this.props;

        return [
            (<section key="content-header" className="content-header">
                <h1>
                    服务管理中心 <small>健湖租车</small>
                </h1>
                <ol className="breadcrumb">
                    <li><Link to="/"><i className="fa fa-dashboard"></i> 主页</Link></li>
                    <li className="active">{category}</li>
                </ol>
            </section>),

            (<section key="content" className="content container-fluid">
                <Switch>
                    {routes.map((route, index) => (<Route key={index} {...route} />))}
                </Switch>
            </section>)
        ];
    }
}