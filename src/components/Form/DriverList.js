import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Interactive from "../Tables/Interactive";
import Button from "./Button";
import styles from "./DriverList.css";

class Driver extends Component {
    state = {
        edit: false
    }

    handleEditClick = () => {
        if (!this.state.edit) {
            this.setState({ edit: true });
        }
    }

    handleEditCancelClick = () => {
        if (this.state.edit) {
            this.setState({ edit: false });
        }
    }

    render() {
        const { edit } = this.state;

        const buttons = [];
        if (!edit) {
            buttons.push(<Button key="modify" className="pull-right"
                onClick={this.handleEditClick} sm primary>
                修改
        </Button>);
        } else {
            buttons.push(<div key="modifyGroup" className={classNames("pull-right", styles.buttonGroup)}>
                <Button key="save" className="btn btn-success btn-sm pull-right"
                    onClick={this.handleEditClick}>
                    保存
        </Button>
                <Button key="cancel" className="pull-right"
                    onClick={this.handleEditCancelClick} sm>
                    取消
        </Button></div>);
        }
        buttons.push(<Button key="del" className="pull-right" danger sm>
            删除
    </Button>);

        return (
            <Interactive.Row>
                <Interactive.Cell>
                    {edit ? (<input type="text" defaultValue="刘海" />) : "刘海"}
                </Interactive.Cell>
                <Interactive.Cell>
                    {edit ? (<input type="text" defaultValue="刘师傅" />) : "刘师傅"}
                </Interactive.Cell>
                <Interactive.Cell>
                    {edit ? (<input type="text" defaultValue="18688950367" />) : "18688950367"}
                </Interactive.Cell>
                <Interactive.Tools>
                    <div className={styles.driverTools}>{buttons}</div>
                </Interactive.Tools>
            </Interactive.Row>
        );
    }
}

export default class DriverList extends Component {

    state = {
        ok: false
    }

    handleExClick = () => {
        if (!this.state.ok) {
            this.setState({ ok: true });
        }
    }

    render() {
        return (
            <Interactive>
                <Interactive.Head>
                    <Interactive.Cell className={styles.nicknameCol}>姓名</Interactive.Cell>
                    <Interactive.Cell className={styles.titleCol}>称呼</Interactive.Cell>
                    <Interactive.Cell className={styles.mobileCol}>联系电话</Interactive.Cell>
                </Interactive.Head>

                <Driver key={1} />

                <Driver key={2} />

                <Driver key={3} />

            </Interactive>
        );
    }
}