import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./Flip.css";

export default class Flip extends Component {
    static propTypes = {
        active: PropTypes.bool,
        back: PropTypes.node,
        children: PropTypes.node
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { active } = nextProps;
        if (active !== prevState.props.active) {
            return {
                active,
                props: { active }
            };
        }

        return null;
    }

    constructor(props) {
        super(props);
        this.state = {
            props: { active: props.active },
            active: props.active
        };

        this.backShow = false;
    }

    render() {
        const { active } = this.state;
        const { children, back } = this.props;

        const filpClassName = classNames(styles.flip, {
            [styles.active]: active
        });

        this.backShow = this.backShow || active;

        return (
            <div className={filpClassName}>
                <div className={styles.flipper}>
                    <div className={styles.front}>
                        {children}
                    </div>
                    <div className={styles.back}>
                        {this.backShow && back}
                    </div>
                </div>
            </div>
        )
    }
}