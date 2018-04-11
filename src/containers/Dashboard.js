import React, { Component } from "react";

export default class Dashboard extends Component {
    render() {
        return [
            (<section key="content-header" className="content-header">
                <h1>
                    管理中心 <small>健湖租车</small>
                </h1>
                <ol className="breadcrumb">
                    <li className="active">主页</li>
                </ol>
            </section>),

            (<section key="content" className="content container-fluid">
                <div className="row">
                    <div className="col-lg-4 col-xs-12">
                        <div className="small-box bg-aqua">
                            <div className="inner">
                                <h3>150</h3>

                                <p>新订单</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-bag"></i>
                            </div>
                            <a href="#" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                    <div className="col-lg-4 col-xs-12">
                        <div className="small-box bg-green">
                            <div className="inner">
                                <h3>65</h3>

                                <p>已完成订单</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-stats-bars"></i>
                            </div>
                            <a href="#" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                    <div className="col-lg-4 col-xs-12">
                        <div className="small-box bg-red">
                            <div className="inner">
                                <h3>65</h3>

                                <p>已取消订单</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-pie-graph"></i>
                            </div>
                            <a href="#" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                </div>
            </section>)
        ];
    }
}