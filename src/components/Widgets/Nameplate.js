import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import Avatar from "./Avatar";

const ROLES = {
    "super": "系统管理员",
    "admin": "系统管理员",
    "dispatcher": "调度员",
    "driver": "司机"
};

export default class Nameplate extends Component {
    static defaultProps = {
        exquisite: false
    }

    static propTypes = {
        profile: PropTypes.object,
        exquisite: PropTypes.bool,
        onLogout: PropTypes.func
    }

    exquisiteRender = () => {
        const { profile } = this.props;

        const title = profile.title || profile.nickname;

        return (
            <div className="user-panel">
                <div className="pull-left image">
                    <Avatar title={title} />
                </div>
                <div className="pull-left info">
                    <p>{profile.nickname}</p>
                    <a href="#"><i className="fa fa-circle text-success"></i> Online</a>
                </div>
            </div>
        );
    }


    render() {
        const { exquisite, profile, onLogout } = this.props;
        const title = profile.title || profile.nickname;

        if (exquisite) {
            return this.exquisiteRender();
        }

        const roles = profile.roles.map((role) => (ROLES[role])).join(", ");
        const registerDate = profile.createTime ? profile.createTime.toDate() : "";
        return (
            <Fragment>
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">

                    <Avatar className="user-image" title={title} small />
                    <span className="hidden-xs">{profile.nickname}</span>
                </a>
                <ul className="dropdown-menu">
                    <li className="user-header">
                        <Avatar title={title} large />

                        <p>
                            {title} {roles}
                            <small>注册时间 {registerDate}</small>
                        </p>
                    </li>
                    <li className="user-footer">
                        <div className="pull-right">
                            <a href="/logout" onClick={onLogout} className="btn btn-default btn-flat">登出</a>
                        </div>
                    </li>
                </ul>
            </Fragment>
        );
    }
}