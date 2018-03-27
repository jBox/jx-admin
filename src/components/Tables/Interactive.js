import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Interactive.css";
import isEqual from "lodash/isEqual";

class Cell extends Component {
    static propTypes = {
        children: PropTypes.node
    }
}

class Tools extends Component {
    static propTypes = {
        children: PropTypes.node
    }
}

class Head extends Component {
    static propTypes = {
        children: PropTypes.node
    }

    build = () => {
        const { children } = this.props;
        const items = [];
        React.Children.forEach(children, (child, index) => {
            if (child.type === Cell) {
                const { children, ...props } = child.props;
                items.push((<th key={index} {...props}>{children}</th>));
            }
        });

        return items;
    }

    render() {
        return (
            <tr>
                {this.build()}
            </tr>
        );
    }
}

class Row extends Component {
    static propTypes = {
        className: PropTypes.string,
        tools: PropTypes.node,
        children: PropTypes.node
    }

    state = {
        showTools: false
    }

    handleClick = () => {
        if (!this.state.showTools) {
            this.setState({ showTools: true });
        }
    }


    build = () => {
        const { children } = this.props;

        const row = {
            cells: []
        };

        React.Children.forEach(children, (child) => {
            const { children, ...props } = child.props;
            if (child.type === Cell) {
                row.cells.push({ children, props });
            } else if (child.type === Tools && !row.tools) {
                row.tools = { children, props };
            }
        });

        return row;
    }

    render() {
        const { cells, tools } = this.build();

        const row = [(
            <tr key="row" onClick={this.handleClick}>
                {cells.map((cell, index) => {
                    return (<td key={index} {...cell.props}>{cell.children}</td>);
                })}
            </tr>
        )];

        if (tools && this.state.showTools) {
            const { className: containerClassName, ...toolsProps } = tools.props
            const toolsClassName = classNames(styles.tools);
            const toolsCellClassName = classNames(styles.cell);
            const toolsContainerClassName = classNames(styles.container, containerClassName);
            row.push((
                <tr key="tools" className={toolsClassName}>
                    <td className={toolsCellClassName} colSpan="99">
                        <div {...toolsProps} className={toolsContainerClassName}>
                            {tools.children}
                        </div>
                    </td>
                </tr>
            ));
        }

        return row;
    }
}

export default class Interactive extends Component {
    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.node
    }

    render() {
        const { className, children } = this.props;
        const tableClassnames = classNames("table table-condensed", styles.interactive, className);
        return (
            <table className={tableClassnames}>
                <tbody>
                    {children}
                </tbody>
            </table>
        );
    }
}

Interactive.Head = Head;
Interactive.Row = Row;
Interactive.Cell = Cell;
Interactive.Tools = Tools;