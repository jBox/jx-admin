import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Interactive from "../Tables/Interactive";
import Button from "../Form/Button";
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
    static defaultProps = {
        status: "normal"
    }

    static propTypes = {
        nickname: PropTypes.string,
        mobile: PropTypes.string,
        roles: PropTypes.array,
        status: PropTypes.string
    }

    render() {
        const { nickname, mobile, roles } = this.props;
        return (
            <Interactive.Row>
                <Interactive.Cell>
                    {nickname}
                </Interactive.Cell>
                <Interactive.Cell>
                    {mobile}
                </Interactive.Cell>
                <Interactive.Cell>
                    {roles.map((role) => (<Role key={role}>{role}</Role>))}
                </Interactive.Cell>
                <Interactive.Tools>
                    <div className={styles.tools}>
                        <Button key="del" className="pull-right" danger sm>删除</Button>
                    </div>
                </Interactive.Tools>
            </Interactive.Row>
        );
    }
}

export default class UserList extends Component {
    static propTypes = {
        data: PropTypes.array
    }

    list = () => {
        const { data } = this.props;
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
            return (<User {...user} key={user.mobile} />);
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