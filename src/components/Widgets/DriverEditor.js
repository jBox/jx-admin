import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./DriverList.css";
import isEqual from "lodash/isEqual";

import Interactive from "../Tables/Interactive";
import Button from "../Form/Button";
import TextEditor from "../Form/TextEditor";

export default class DriverEditor extends Component {
    static propTypes = {
        nickname: PropTypes.string,
        mobile: PropTypes.string,
        title: PropTypes.string,
        status: PropTypes.string,
        onUpdate: PropTypes.func,
        onDelete: PropTypes.func
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { nickname, mobile, title, status } = nextProps;
        const state = {
            original: { nickname, mobile, title },
            nickname,
            mobile,
            title
        };

        /* if (status !== prevState.status) {

        } */

        if (!isEqual(state.original, prevState.original)) {
            state.changed = false;
            state.edit = false;
            console.log("state:", state);
            return state;
        }

        return null;
    }

    constructor(props) {
        super(props);

        const { nickname, mobile, title, status } = props;
        this.state = {
            status,
            original: { nickname, mobile, title },
            nickname,
            mobile,
            title,
            edit: false,
            changed: false,
            error: ""
        };
    }

    handleEditClick = () => {
        if (!this.state.edit) {
            this.setState({ edit: true });
        }
    }

    handleSaveClick = () => {
        const { nickname, mobile, title, changed } = this.state;
        const { onUpdate } = this.props;
        if (onUpdate && changed) {
            onUpdate({ nickname, mobile, title });
        }
    }

    handleDeleteClick = () => {
        const { original } = this.state;
        const { onDelete } = this.props;
        if (onDelete && original) {
            onDelete(original);
        }
    }

    handleEditCancelClick = () => {
        if (this.state.edit) {
            const { nickname, mobile, title } = this.state.original;
            this.setState({
                changed: false,
                edit: false,
                original: { nickname, mobile, title },
                nickname,
                mobile,
                title
            });
        }
    }

    handleTextChange = (event) => {
        const { name, value } = event.target;
        let error = this.state.error;
        if (error === name) {
            error = "";
        }

        const { nickname, mobile, title, original } = this.state;
        const stateValue = { nickname, mobile, title, [name]: value };
        const changed = !isEqual(stateValue, original);
        this.setState({ error, changed, ...stateValue });
    }

    handleTextError = (error) => {
        const { name } = error;
        if (this.state.error !== name) {
            this.setState({ error: name });
        }
    }

    render() {
        const { edit, changed, error } = this.state;

        const buttons = [];
        if (!edit) {
            buttons.push(
                <Button key="modify" className="pull-right" onClick={this.handleEditClick} friable xs primary>
                    修改
                </Button>
            );
        } else {
            buttons.push(
                <div key="modifyGroup" className={classNames("pull-right", styles.buttonGroup)}>
                    <Button type="submit" className="pull-right"
                        onClick={this.handleSaveClick}
                        disabled={!changed || !!error}
                        xs friable success>
                        保存
                    </Button>
                    <Button className="pull-right" onClick={this.handleEditCancelClick} xs friable>
                        取消
                    </Button>
                </div>
            );
        }

        buttons.push(<Button key="del" className="pull-right" onClick={this.handleDeleteClick} danger xs friable>删除</Button>);

        const { nickname, mobile, title } = this.state;
        return (
            <Interactive.Row>
                <Interactive.Cell>
                    <TextEditor name="nickname" defaultValue={nickname} editable={edit}
                        onError={this.handleTextError}
                        onChange={this.handleTextChange} required />
                </Interactive.Cell>
                <Interactive.Cell>
                    <TextEditor name="title" defaultValue={title} editable={edit}
                        onError={this.handleTextError}
                        onChange={this.handleTextChange} required />
                </Interactive.Cell>
                <Interactive.Cell>
                    {mobile}
                </Interactive.Cell>
                <Interactive.Tools>
                    <div className={styles.driverTools}>{buttons}</div>
                </Interactive.Tools>
            </Interactive.Row>
        );
    }
}
