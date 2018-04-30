import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./OrderProgress.css";

import Modal from "../Overlays/Modal";
import Form from "../Form";
import Button from "../Form/Button";

export default class OrderProgress extends Component {
    static propTypes = {
        order: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
            progress: this.calcProgress(props.order),
            dialog: { display: false }
        };
    }

    calcProgress = ({ schedules, duration }) => {
        const percentages = schedules.map((schedule) => {
            return schedule.progress.length / duration * 100;
        });

        if(percentages.length === 0){
            return 0;
        }

        const percentage = Math.floor(percentages.reduce((total, p) => (total + p), 0) / percentages.length);
        return percentage >= 100 ? 100 : percentage;
    }

    handleProgressClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
    }

    render() {
        const { progress } = this.state;

        if (progress === 0) {
            return null;
        }

        return (
            <div className="box-comment">
                <a href="progress/details" className={styles.content} onClick={this.handleProgressClick}>
                    <span>进度：</span>
                    <div className={classNames("progress progress-sm active", styles.progress)}>
                        <div className="progress-bar progress-bar-success progress-bar-striped"
                            role="progressbar"
                            aria-valuenow="20"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: `${progress}%` }}>
                            <span className="sr-only">{`${progress}%`} Complete</span>
                        </div>
                    </div>
                    <span className={styles.percentage}>
                        {`${progress}%`}
                    </span>
                </a>
            </div>
        );
    }
}