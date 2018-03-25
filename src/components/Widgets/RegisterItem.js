import React, { Component } from "react";
import classNames from "classnames";
import Select2 from "react-select2-wrapper";
import styles from "./RegisterItem.css";

export default class RegisterItem extends Component {

    state = {
        showOperators: false
    }

    handleClick = () => {
        if (!this.state.showOperators) {
            this.setState({ showOperators: true });
        }
    }

    render() {
        const { showOperators } = this.state;
        return (
            <div className={classNames("info-box", styles.register)} onClick={this.handleClick}>
                <span className="info-box-icon bg-aqua"><i className="fa fa-user-plus"></i></span>

                <div className="info-box-content">
                    <span className="info-box-text">魏兰</span>
                    <span className="info-box-number">18688950367</span>
                    <span className="info-box-text">注册日期：2018-03-03</span>
                </div>
                {showOperators && (<div className={classNames(styles.operators)}>

                    <div className="box-body">
                        <div className="row">
                            <div className="col-md-6 col-xs-12">
                                <div className="form-group input-group">
                                    <input type="text" name="message" placeholder="填写拒绝理由" className="form-control" />
                                    <span className="input-group-btn">
                                        <button type="submit" className="btn btn-danger btn-flat">拒绝</button>
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-6 col-xs-12">
                                <div className="form-group input-group">
                                    <div>
                                        <Select2
                                            className="form-control"
                                            multiple
                                            data={[
                                                { text: "管理员", id: 1 },
                                                { text: "驾驶员", id: 2 }
                                            ]}
                                            options={{
                                                placeholder: "选择用户的角色"
                                            }}
                                        />
                                    </div>

                                    <span className="input-group-btn">
                                        <button type="submit" className="btn btn-success btn-flat">审核通过</button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>)}
            </div>
        );
    }
}