import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Interactive from "../Tables/Interactive";
import Button from "../Form/Button";
import styles from "./VehiclesList.css";

class Vehicle extends Component {
    static defaultProps = {
        status: "normal"
    }

    static propTypes = {
        number: PropTypes.string,
        model: PropTypes.string,
        status: PropTypes.string
    }

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
            buttons.push(
                <Button key="modify" className="pull-right" onClick={this.handleEditClick} sm primary>
                    修改
                </Button>
            );
        } else {
            buttons.push(
                <div key="modifyGroup" className={classNames("pull-right", styles.buttonGroup)}>
                    <Button key="save" className="btn btn-success btn-sm pull-right"
                        onClick={this.handleEditClick}>
                        保存
                    </Button>
                    <Button key="cancel" className="pull-right"
                        onClick={this.handleEditCancelClick} sm>
                        取消
                    </Button>
                </div>
            );
        }

        buttons.push(<Button key="del" className="pull-right" danger sm>删除</Button>);

        const { number, model } = this.props;
        return (
            <Interactive.Row>
                <Interactive.Cell>
                    {edit ? (<input type="text" defaultValue={number} />) : number}
                </Interactive.Cell>
                <Interactive.Cell>
                    {edit ? (<input type="text" defaultValue={model} />) : model}
                </Interactive.Cell>
                <Interactive.Tools>
                    <div className={styles.tools}>{buttons}</div>
                </Interactive.Tools>
            </Interactive.Row>
        );
    }
}

export default class VehiclesList extends Component {
    static propTypes = {
        data: PropTypes.array,
        models: PropTypes.object
    }

    list = () => {
        const { data, models } = this.props;
        if (data.length === 0) {
            return (
                <Interactive.Row>
                    <Interactive.Cell colSpan={2}>
                        没有车辆
                    </Interactive.Cell>
                </Interactive.Row>
            );
        }

        return data.map((v, index) => {
            const model = models[v.model];
            const vehicle = {
                ...v,
                model: model ? model.label : v.model
            };

            return (<Vehicle {...vehicle} key={v.number} />);
        });
    }

    render() {
        return (
            <Interactive>
                <Interactive.Head>
                    <Interactive.Cell className={styles.numberCol}>车牌号码</Interactive.Cell>
                    <Interactive.Cell className={styles.modelCol}>车型</Interactive.Cell>
                </Interactive.Head>

                {this.list()}

            </Interactive>
        );
    }
}