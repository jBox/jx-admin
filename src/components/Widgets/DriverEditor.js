import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./DriverList.css";

import Interactive from "../Tables/Interactive";
import Button from "../Form/Button";
import TextEditor from "../Form/TextEditor";

export default class DriverEditor extends Component {
    static defaultProps = {
        status: "normal"
    }

    static propTypes = {
        nickname: PropTypes.string,
        mobile: PropTypes.string,
        title: PropTypes.string,
        status: PropTypes.string
    }

    constructor(props) {
        
    }

    state = {
        edit: false,
        changed: false
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
        const { edit, changed } = this.state;

        const buttons = [];
        if (!edit) {
            buttons.push(
                <Button key="modify" className="pull-right" onClick={this.handleEditClick} sm primary>
                    修改
                </Button>
            );
        } else {
            buttons.push(
                <div key="modifyGroup" className={classNames("pull-right", styles.buttonGroup)}>
                    <Button type="submit" className="pull-right"
                        onClick={this.handleEditClick}
                        disabled={!changed}
                        sm success>
                        保存
                    </Button>
                    <Button className="pull-right" onClick={this.handleEditCancelClick} sm>
                        取消
                    </Button>
                </div>
            );
        }

        buttons.push(<Button key="del" className="pull-right" danger sm>删除</Button>);

        const { nickname, mobile, title } = this.props;
        return (
            <Interactive.Row>
                <Interactive.Cell>
                    <TextEditor name="nickname" defaultValue={nickname} editable={edit} required />
                </Interactive.Cell>
                <Interactive.Cell>
                    <TextEditor name="title" defaultValue={title} editable={edit} required />
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
