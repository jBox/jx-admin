import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./CalloutBoard.css";

import Callout from "../Overlays/Callout";

const CalloutTypes = {
    success: { success: true },
    error: { danger: true },
    warning: { warning: true },
    info: { info: true },
    get(type) {
        const ct = this[type];
        if (ct) {
            return ct;
        }

        return this.info;
    }
};

const CalloutItem = ({ id, subject, message, duration, type, onClose }) => {
    const props = { ...CalloutTypes.get(type), id, duration, onClose };
    return (
        <Callout {...props}>
            {subject && (<Callout.Subject>{subject}</Callout.Subject>)}
            {message && (<Callout.Message>{message}</Callout.Message>)}
        </Callout>
    );
}

export default class CalloutBoard extends Component {
    static propTypes = {
        data: PropTypes.array,
        onClose: PropTypes.func
    }

    render() {
        const { data, onClose } = this.props;
        return (
            <div className={styles.board}>
                {data.map((item, index) => (
                    <CalloutItem key={item.id} {...item} onClose={onClose} />
                ))}
            </div>
        );
    }
}
