import React, { Component } from "react";
import { Link } from "react-browser-router";

export default class Sidebar extends Component {
    render() {
        return (
            <aside className="main-sidebar">
                <section className="sidebar">

                    <div className="user-panel">
                        <div className="pull-left image">
                            <img src="/static/AdminLTE-2.4.3/dist/img/user2-160x160.jpg" className="img-circle" alt="User Image" />
                        </div>
                        <div className="pull-left info">
                            <p>Alexander Pierce</p>
                            <a href="#"><i className="fa fa-circle text-success"></i> Online</a>
                        </div>
                    </div>

                    <form action="#" method="get" className="sidebar-form">
                        <div className="input-group">
                            <input type="text" name="q" className="form-control" placeholder="Search..." />
                            <span className="input-group-btn">
                                <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search"></i>
                                </button>
                            </span>
                        </div>
                    </form>
                    <ul className="sidebar-menu" data-widget="tree">
                        <li className="header">导航</li>
                        <li className="active">
                            <Link to="/">
                                <i className="fa fa-home"></i> <span>主页</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/manage/orders">
                                <i className="fa fa-edit"></i> <span>订单管理</span>
                                <span className="pull-right-container">
                                    <small className="label pull-right bg-green">new</small>
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/manage/registers">
                                <i className="fa fa-edit"></i> <span>注册管理</span>
                                <span className="pull-right-container">
                                    <small className="label pull-right bg-green">new</small>
                                </span>
                            </Link>
                        </li>
                    </ul>
                </section>
            </aside>
        );
    }
}