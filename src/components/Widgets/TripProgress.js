import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./TripProgress.css";

import Button from "../Form/Button";
import ProgressEditor from "./ProgressEditor";

const ProgressItem = ({ date, milage, duration, fuelFee, tollFee, parkingFee, onClick }) => {

    const fee = Number(fuelFee) + Number(tollFee) + Number(parkingFee);
    const infos = [`行驶${duration}小时`, `${milage}公里`, `其他费用${fee.toFixed(1)}￥`];

    const dateTime = new Date(date).format("MM-dd");
    const handleClick = () => {
        const data = { date, milage, duration, fuelFee, tollFee, parkingFee };
        return (event) => {
            event.preventDefault();
            event.stopPropagation();
            onClick(data);
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

export default class TripProgress extends Component {

    static propTypes = {
        terms: PropTypes.array,
        data: PropTypes.array,
        onChange: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            dialog: { display: false }
        }
    }

    handleDialogClose = () => {
        this.setState({ dialog: { display: false } });
    }

    handleDialogSubmit = (item) => {
        this.setState({ dialog: { display: false } }, () => {
            const { onChange, data } = this.props;
            const updated = [...data];
            const index = updated.findIndex(x => x.date === item.date);
            if (index !== -1) {
                //edit
                updated[index] = { ...item };
            } else {
                //create
                updated.push({ ...item });
            }

            onChange(updated);
        });
    }

    handleReport = () => {
        this.setState({ dialog: { display: true } });
    }

    handleReportClick = (item) => {
        this.setState({
            dialog: {
                display: true,
                data: item
            }
        });
    }

    render() {
        const { data, terms } = this.props;
        const { dialog } = this.state;
        return (
            <Fragment>
                <ul className={classNames("nav nav-stacked", styles.progress)}>
                    <li>
                        <label>行程进度</label>
                        {terms.length > 0 && (
                            <Button className="pull-right" onClick={this.handleReport} flat xs>汇报进度</Button>
                        )}
                    </li>
                    {data.map((item, index) => (
                        <ProgressItem key={index} {...item} onClick={this.handleReportClick} />
                    ))}

                </ul>

                {dialog.display && (
                    <ProgressEditor
                        terms={terms}
                        data={dialog.data}
                        onClose={this.handleDialogClose}
                        onSubmit={this.handleDialogSubmit}
                    />
                )}

            </Fragment>
        );
    }
}