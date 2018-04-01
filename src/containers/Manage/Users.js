import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";

import UserList from "../../components/Widgets/UserList";

import manageUsersSelector from "../../redux/selectors/manage/users";
import { deleteUser, usersInitialLoad } from "../../redux/actions/manage";

class Users extends Component {

    static propTypes = {
        users: PropTypes.array,
        status: PropTypes.object,
        deleteUser: PropTypes.func,
        usersInitialLoad: PropTypes.func
    }

    componentDidMount() {
        const { usersInitialLoad } = this.props;
        if (usersInitialLoad) {
            usersInitialLoad();
        }
    }

    render() {
        const { users } = this.props;

        return (<div className="box">
            <div className="box-header">
                <h3 className="box-title">用户</h3>
            </div>

            <div className="box-body no-padding">
                <UserList data={users} />
            </div>
            <div className="box-footer clearfix">
            </div>
        </div>);
    }
}

export default connect(manageUsersSelector, {
    deleteUser,
    usersInitialLoad
})(Users);