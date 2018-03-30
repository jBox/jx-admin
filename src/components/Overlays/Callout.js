import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Callout.css";

const Subject = ({ children }) => (<h4>{children}</h4>);

const Message = ({ children }) => (<p>{children}</p>);

export default class Callout extends Component {
    static defaultProps = {
        duration: 3
    }

    static propTypes = {
        id: PropTypes.string.isRequired,
        primary: PropTypes.bool,
        success: PropTypes.bool,
        danger: PropTypes.bool,
        warning: PropTypes.bool,
        info: PropTypes.bool,
        duration: PropTypes.number,
        children: PropTypes.node,
        onClose: PropTypes.func
    }

    state = {
        disappearing: false
    }

    componentDidMount() {
        const { duration } = this.props;
        this.lifeTimer = setTimeout(() => this.disappear(), duration * 1000);
    }

    componentWillUnmount() {
        if (this.lifeTimer) {
            clearTimeout(this.lifeTimer);
        }
        if (this.closeTimer) {
            clearTimeout(this.closeTimer);
        }
    }

    disappear = () => {
        this.setState({ disappearing: true }, () => this.noticeClose())
    }

    noticeClose = () => {
        const { onClose, id } = this.props;
        if (onClose) {
            this.closeTimer = setTimeout(() => onClose(id), 500);
        }
    }

    render() {
        const { children, className, success, info, warning, danger } = this.props;
        let calloutStyle = "callout-info";
        if (success) {
            calloutStyle = "callout-success";
        } else if (info) {
            calloutStyle = "callout-info";
        } else if (warning) {
            calloutStyle = "callout-warning";
        } else if (danger) {
            calloutStyle = "callout-danger";
        }

        const calloutClassName = classNames(
            "callout",
            calloutStyle,
            { [styles.disappearing]: this.state.disappearing }
        );

        return (
            <div className={calloutClassName}>
                {children}
            </div>
        )
    }
}

Callout.Subject = Subject;
Callout.Message = Message;