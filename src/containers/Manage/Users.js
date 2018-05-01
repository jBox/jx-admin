import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";

import UserList from "../../components/Widgets/UserList";
import Confirm from "../../components/Overlays/Confirm";

import manageUsersSelector from "../../redux/selectors/manage/users";
import { deleteUser, updateUserRole, usersInitialLoad } from "../../redux/actions/manage";

class Users extends Component {

    static propTypes = {
        users: PropTypes.array,
        status: PropTypes.object,
        deleteUser: PropTypes.func,
        updateUserRole: PropTypes.func,
        usersInitialLoad: PropTypes.func
    }

    state = {
        confirm: { display: false }
    }

    componentDidMount() {
        const { usersInitialLoad } = this.props;
        if (usersInitialLoad) {
            usersInitialLoad();
        }
    }

    handleDeleteUser = (user) => {
        this.setState({ confirm: { display: true, user } });
    }

    handleConfirmRemoveUser = () => {
        const { confirm: { user } } = this.state;
        this.setState({ confirm: { display: false } }, () => {
            const { deleteUser } = this.props;
            if (deleteUser) {
                deleteUser(user);
            }
        });
    }

    handleCloseRemoveUser = () => {
        this.setState({ confirm: { display: false } });
    }

    handleDispatcherChange = (user, isDispatcher) => {
        const { updateUserRole } = this.props;
        if (updateUserRole) {
            updateUserRole(user, "dispatcher", isDispatcher ? "post" : "delete");
        }
    }

    render() {
        const { users } = this.props;
        const { confirm } = this.state;

        return (
            <Fragment>
                <div className="box">
                    <div className="box-header">
                        <h3 className="box-title">用户</h3>
                    </div>

                    <div className="box-body no-padding">
                        <UserList data={users} onDelete={this.handleDeleteUser} onDispatcherChange={this.handleDispatcherChange} />
                    </div>
                    <div className="box-footer clearfix">
                    </div>
                </div>

                {confirm.display && (<Confirm
                    title="删除用户"
                    onConfirm={this.handleConfirmRemoveUser}
                    onClose={this.handleCloseRemoveUser}
                    warning
                >
                    你知道吗，你正在删除用户 {confirm.user.nickname}，你确定要这么做吗？
                </Confirm>)}
            </Fragment>
        );
    }
}

export default connect(manageUsersSelector, {
    deleteUser,
    updateUserRole,
    usersInitialLoad
})(Users);