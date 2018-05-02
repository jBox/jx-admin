import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Interactive from "../Tables/Interactive";
import Button from "../Form/Button";
import Switch from "react-switch";

import styles from "./UserList.css";

const Role = ({ children }) => {
    const bgs = {
        "管理员": "bg-red",
        "调度员": "bg-light-blue",
        "司机": "bg-green"
    }
    return (<span className={classNames("badge", bgs[children])}>{children}</span>);
};

class User extends Component {
    static propTypes = {
        id: PropTypes.number,
        nickname: PropTypes.string,
        mobile: PropTypes.string,
        roles: PropTypes.array,
        onDelete: PropTypes.func,
        onDispatcherChange: PropTypes.func
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const isDispatcher = nextProps.roles.includes("调度员");
        if (prevState.isDispatcher !== isDispatcher) {
            return { isDispatcher };
        }

        return null;
    }

    constructor(props) {
        super(props);
        this.state = {
            isDispatcher: props.roles.includes("dispatcher")
        };
    }

    handleDelete = () => {
        const { id, nickname, mobile, roles, onDelete } = this.props;
        if (onDelete) {
            onDelete({ id, nickname, mobile, roles });
        }
    }

    handleDispatcherChange = (checked) => {
        const { id, nickname, mobile, roles, onDispatcherChange } = this.props;
        this.setState({ isDispatcher: checked }, () => {
            if (onDispatcherChange) {
                onDispatcherChange({ id, nickname, mobile, roles }, checked);
            }
        });
    }

    render() {
        const { nickname, mobile, roles } = this.props;
        const canBeDispatcher = roles.includes("管理员");
        return (
            <Interactive.Row>
                <Interactive.Cell>
                    {nickname}
                </Interactive.Cell>
                <Interactive.Cell>
                    {mobile}
                </Interactive.Cell>
                <Interactive.Cell>
                    {roles.map((role, index) => (<Role key={index}>{role}</Role>))}
                </Interactive.Cell>
                <Interactive.Tools>
                    <div className={styles.tools}>
                        {canBeDispatcher && (
                            <label htmlFor="dispatcher_switch" style={{ margin: 0 }}>
                                <span>调度员</span>
                                <Switch
                                    height={22}
                                    className="react-switch"
                                    onChange={this.handleDispatcherChange}
                                    checked={this.state.isDispatcher}
                                    id="dispatcher_switch"
                                />
                            </label>
                        )}
                        <Button key="del" className="pull-right" onClick={this.handleDelete} friable danger xs>删除</Button>
                    </div>
                </Interactive.Tools>
            </Interactive.Row>
        );
    }
}

export default class UserList extends Component {
    static propTypes = {
        data: PropTypes.array,
        onDelete: PropTypes.func,
        onDispatcherChange: PropTypes.func
    }

    list = () => {
        const { data, onDelete, onDispatcherChange } = this.props;
        if (data.length === 0) {
            return (
                <Interactive.Row>
                    <Interactive.Cell colSpan={3}>
                        没有用户
                    </Interactive.Cell>
                </Interactive.Row>
            );
        }

        return data.map((user) => {
            return (<User {...user} key={user.mobile} onDelete={onDelete} onDispatcherChange={onDispatcherChange} />);
        });
    }

    render() {
        return (
            <Interactive>
                <Interactive.Head>
                    <Interactive.Cell className={styles.nicknameCol}>姓名</Interactive.Cell>
                    <Interactive.Cell className={styles.mobileCol}>联系电话</Interactive.Cell>
                    <Interactive.Cell className={styles.rolesCol}>角色</Interactive.Cell>
                </Interactive.Head>

                {this.list()}

            </Interactive>
        );
    }
}