import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Interactive from "../Tables/Interactive";
import Button from "../Form/Button";
import styles from "./VehiclesList.css";

class Vehicle extends Component {
    static propTypes = {
        id: PropTypes.string,
        number: PropTypes.string,
        model: PropTypes.string,
        onDelete: PropTypes.func
    }

    handleDeleteClick = () => {
        const { id, number, model, onDelete } = this.props;
        if (onDelete) {
            onDelete({ id, number, model });
        }
    }

    render() {
        const { number, model } = this.props;
        return (
            <Interactive.Row>
                <Interactive.Cell>
                    {number}
                </Interactive.Cell>
                <Interactive.Cell>
                    {model}
                </Interactive.Cell>
                <Interactive.Tools>
                    <div className={styles.tools}><Button className="pull-right" onClick={this.handleDeleteClick} danger xs friable>删除</Button></div>
                </Interactive.Tools>
            </Interactive.Row>
        );
    }
}

export default class VehiclesList extends Component {
    static propTypes = {
        data: PropTypes.array,
        models: PropTypes.object,
        onDelete: PropTypes.func
    }

    list = () => {
        const { data, models, onDelete } = this.props;
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
                model: model ? model.label : v.model,
                onDelete
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