import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Avatar.css";

export default class Avatar extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        large: PropTypes.bool,
        small: PropTypes.bool,
        className: PropTypes.string
    }

    render() {
        const { title, large, small, className } = this.props;
        let sizeClass = styles.middle;
        if (large) {
            sizeClass = styles.large;
        } else if (small) {
            sizeClass = styles.small;
        }

        const avatarClassnames = classNames(styles.avatar, sizeClass, className);
        const letter = (title || " ")[0].toUpperCase();
        return (<div className={avatarClassnames}>
            <div className={styles.bg}>
                <span>{letter}</span>
            </div>
        </div>);
    }
}