import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Select2 from "react-select2-wrapper";
import styles from "./RegisterItem.css";

const roles = [
    { text: "管理员", id: "admin" },
    { text: "调度员", id: "dispatcher" },
    { text: "驾驶员", id: "driver" }
];

const getSelectedValue = (select) => {
    const values = [];
    const options = select.options;
    for (let i = 0; i < options.length; i++) {
        const opt = options[i];
        if (opt.selected) {
            values.push(opt.value);
        }
    }

    return values;
};

const ConfirmStatus = ({ status }) => {
    const statusIcons = {
        "pass": "glyphicon-ok-circle",
        "reject": "glyphicon-ban-circle"
    };

    const iconClassName = classNames("glyphicon", statusIcons[status]);
    const className = classNames(styles.confirmStatus, styles[status]);
    return (
        <div className={className}>
            <i className={iconClassName}></i>
        </div>
    );
}

export default class RegisterItem extends Component {
    static propTypes = {
        confirmation: PropTypes.string,
        data: PropTypes.object,
        onPass: PropTypes.func,
        onReject: PropTypes.func
    }

    state = {
        showOperators: false,
        enablePassButton: false,
        enableRejectButton: false
    }

    options = {
        reject: "",
        roles: []
    }

    handleClick = () => {
        if (!this.state.showOperators) {
            this.setState({ showOperators: true });
        }
    }

    handleRejectReasonChange = (event) => {
        const { value } = event.target;
        this.options.reject = value;
        const enableRejectButton = !!value;
        if (enableRejectButton !== this.state.enableRejectButton) {
            this.setState({ enableRejectButton });
        }
    }

    handleRolesChange = (event) => {
        const values = getSelectedValue(event.target);
        this.options.roles = values;
        const enablePassButton = !!(values && values.length > 0);
        if (enablePassButton !== this.state.enableRejectButton) {
            this.setState({ enablePassButton });
        }
    }

    handleRejectClick = () => {
        const { onReject } = this.props;
        if (onReject) {
            onReject(this.options.reject);
        }
    }

    handlePassClick = () => {
        const { onPass } = this.props;
        if (onPass) {
            onPass(this.options.roles);
        }
    }

    buildOperators = () => {
        const { confirmation } = this.props;
        const { enablePassButton, enableRejectButton } = this.state;
        const disabled = confirmation === "request";
        return (
            <div className={classNames(styles.operators)}>
                <div className="box-body">
                    <div className="row">
                        <div className="col-md-6 col-xs-12">
                            <div className="form-group input-group">
                                <input type="text" name="rejectMessage" placeholder="填写拒绝理由" className="form-control"
                                    onChange={this.handleRejectReasonChange} disabled={disabled} />
                                <span className="input-group-btn">
                                    <button type="button" className="btn btn-danger btn-flat" onClick={this.handleRejectClick}
                                        disabled={!enableRejectButton || disabled}>
                                        拒绝
                                    </button>
                                </span>
                            </div>
                        </div>
                        <div className="col-md-6 col-xs-12">
                            <div className="form-group input-group">
                                <div>
                                    <Select2
                                        defaultValue={this.options.roles}
                                        disabled={disabled}
                                        className="form-control"
                                        multiple
                                        data={roles}
                                        onChange={this.handleRolesChange}
                                        options={{
                                            placeholder: "选择用户的角色"
                                        }}
                                    />
                                </div>

                                <span className="input-group-btn">
                                    <button type="button" className="btn btn-success btn-flat"
                                        onClick={this.handlePassClick}
                                        disabled={!enablePassButton || disabled}>
                                        审核通过
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { data } = this.props;
        const { showOperators, enablePassButton, enableRejectButton } = this.state;
        const registerTime = new Date(data.registerTime).format("yyyy年MM月dd日");
        return (
            <div className={classNames("info-box", styles.register)} onClick={this.handleClick}>
                <span className="info-box-icon bg-aqua"><i className="fa fa-user-plus"></i></span>

                <div className="info-box-content">
                    <span className="info-box-text">{data.nickname}</span>
                    <span className="info-box-number">{data.mobile}</span>
                    <span className="info-box-text">注册日期：{registerTime}</span>
                </div>
                {!data.status && showOperators && this.buildOperators()}
                {data.status && (<ConfirmStatus status={data.status} />)}
            </div>
        );
    }
}