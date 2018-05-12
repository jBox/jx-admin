import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./Progress.css";
import Button from "../../Form/Button";

const ProgressItem = ({ data, onClick }) => {
    const { date, milage, duration, fuelFee, tollFee, parkingFee, otherFee, notes } = data;
    const fee = Number(fuelFee) + Number(tollFee) + Number(parkingFee) + Number(otherFee);
    const infos = [`行驶${duration}小时`, `${milage}公里`, `总费用${fee.toFixed(1)}元`];

    const dateTime = new Date(date).format("MM-dd");
    const handleClick = () => {
        return (event) => {
            event.preventDefault();
            event.stopPropagation();
            onClick({ ...data });
        }
    };
    return (
        <li>
            <a onClick={handleClick()}>
                {infos.join(", ")} <span className="pull-right badge bg-aqua">{dateTime}</span>
            </a>
        </li>
    );
};

export default class Progress extends Component {

    static propTypes = {
        terms: PropTypes.array,
        data: PropTypes.array,
        onReport: PropTypes.func,
        onEdit: PropTypes.func
    }

    handleItemClick = (item) => {
        const { onEdit } = this.props;
        if (onEdit) {
            onEdit(item);
        }
    }

    render() {
        const { data, terms, onReport } = this.props;
        return (
            <ul className={classNames("nav nav-stacked", styles.progress)}>
                <li>
                    <label>行程进度</label>
                    {terms.length > 0 && (
                        <Button className="pull-right" onClick={onReport} flat xs>汇报进度</Button>
                    )}
                </li>
                {data.map((item, index) => (
                    <ProgressItem key={index} data={item} onClick={this.handleItemClick} />
                ))}

            </ul>
        );
    }
}