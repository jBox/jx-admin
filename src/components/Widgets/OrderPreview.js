import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./OrderPreview.css";

export default class OrderPreview extends Component {
    static defaultProps = {

    }

    static propTypes = {
        order: PropTypes.object
    }

    render() {

        return (

            <div className="box box-primary">
                <div className="box-header with-border">
                    <div className="user-block">
                        <label className={styles.orderId}>2018090904340934241</label>
                    </div>

                    <div className="box-tools">
                        <button type="button" className="btn btn-box-tool"><i className="fa fa-edit"></i></button>
                    </div>

                </div>

                <div className="box-body">                    
                    <p>联系人：<label>xxx</label></p>
                    <p>联系电话：<label>xxxxxxxxxxxx</label></p>
                    <p>I took this photo this morning. What do you guys think?</p>
                    <p>I took this photo this morning. What do you guys think?</p>
                    <p>I took this photo this morning. What do you guys think?</p>
                </div>

                <div className="box-footer box-comments">
                    <div className="box-comment">

                        <img className="img-circle img-sm" src="/static/AdminLTE-2.4.3/dist/img/user3-128x128.jpg" alt="User Image" />

                        <div className="comment-text">
                            <span className="username">
                                Maria Gonzales <span className="text-muted pull-right">8:03 PM Today</span>
                            </span>
                            确认订单
                        </div>

                    </div>

                    <div className="box-comment">

                        <img className="img-circle img-sm" src="/static/AdminLTE-2.4.3/dist/img/user4-128x128.jpg" alt="User Image" />

                        <div className="comment-text">
                            <span className="username">
                                Luna Stark
                        <span className="text-muted pull-right">8:03 PM Today</span>
                            </span>
                            调动成功
                </div>

                    </div>

                </div>

                <div className="box-footer">
                    <form action="#" method="post">
                        <img className="img-responsive img-circle img-sm" src="/static/AdminLTE-2.4.3/dist/img/user4-128x128.jpg" alt="Alt Text" />

                        <div className="img-push">
                            <input type="text" className="form-control input-sm" placeholder="Press enter to post comment" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}