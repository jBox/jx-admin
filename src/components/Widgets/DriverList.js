import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./DriverList.css";

import Interactive from "../Tables/Interactive";
import DriverEditor from "./DriverEditor";

export default class DriverList extends Component {
    static propTypes = {
        data: PropTypes.array,
        onUpdate: PropTypes.func,
        onDelete: PropTypes.func
    }

    list = () => {
        const { data, onUpdate, onDelete } = this.props;
        if (data.length === 0) {
            return (
                <Interactive.Row>
                    <Interactive.Cell colSpan={3}>
                        没有司机
                    </Interactive.Cell>
                </Interactive.Row>
            );
        }

        return data.map((driver, index) => {
            return (<DriverEditor {...driver} key={driver.mobile} onUpdate={onUpdate} onDelete={onDelete} />);
        });
    }

    render() {
        return (
            <Interactive className={styles.list}>
                <Interactive.Head>
                    <Interactive.Cell className={styles.nicknameCol}>姓名</Interactive.Cell>
                    <Interactive.Cell className={styles.titleCol}>称呼</Interactive.Cell>
                    <Interactive.Cell className={styles.mobileCol}>联系电话</Interactive.Cell>
                </Interactive.Head>

                {this.list()}

            </Interactive>
        );
    }
}