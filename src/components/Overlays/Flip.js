import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./Flip.css";

const Front = ({ children }) => (children);

const Back = ({ children }) => (children);

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

    refineContents = () => {
        const { children } = this.props;
        const contents = {
            front: null,
            back: null
        };

        React.Children.forEach(children, (child) => {
            if (child.type === Front && !contents.front) {
                contents.front = child;
            } else if (child.type === Back && !contents.back) {
                contents.back = child;
            }
        });

        return contents;
    }

    render() {
        const { active } = this.state;
        const { front, back } = this.refineContents();

        const filpClassName = classNames(styles.flip, {
            [styles.active]: active,
            [styles.inActive]: !active
        });

        this.backShow = this.backShow || active;

        return (
            <div className={filpClassName}>
                <div className={styles.flipper}>
                    <div className={styles.front}>
                        {front}
                    </div>
                    <div className={styles.back}>
                        {this.backShow && back}
                    </div>
                </div>
            </div>
        )
    }
}

Flip.Front = Front;
Flip.Back = Back;