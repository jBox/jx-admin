import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Light.css";
import isEqual from "lodash/isEqual";

class Tab extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        checked: PropTypes.bool,
        children: PropTypes.node,
        onClick: PropTypes.func
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            checked: props.checked
        };
    }

    componentWillReceiveProps(nextProps) {
        const { checked } = nextProps;
        if (checked !== this.props.checked && checked !== this.state.checked) {
            this.setState({ checked });
        }
    }

    handleClick = (event) => {
        const { onClick } = this.props;
        if (onClick) {
            onClick(event);
        }

        if (!event.defaultPreventted) {
            event.preventDefault();
            this.setState({ checked: true });
        }

        event.stopPropagation();
    }

    render() {
        const { id, children, checked } = this.props;
        if (!checked) {
            return (<a id={id} href={id} onClick={this.handleClick}>{children}</a>);
        }

        return (<span>{children}</span>);
    }
}

class Tabs extends Component {
    static propTypes = {
        children: PropTypes.node
    }
}

class Item extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        children: PropTypes.node
    }

    render() {
        const { children } = this.props;
        return children;
    }
}

export default class Light extends Component {
    static propTypes = {
        children: PropTypes.node,
        onChange: PropTypes.func
    }

    constructor(props, context) {
        super(props, context);

        this.state = {
            activeTab: this.stateTab(props.children)
        };
    }

    componentWillReceiveProps(nextProps) {
        const nextTab = this.stateTab(nextProps.children);
        const thisTab = this.stateTab(this.props.children);
        if (nextTab !== thisTab && nextTab !== this.state.activeTab) {
            this.setState({ activeTab: nextTab });
        }
    }

    stateTab = (children) => {
        const tabs = [];

        React.Children.forEach(children, (child) => {
            if (tabs.length === 0 && child.type === Tabs) {
                React.Children.forEach(child.props.children, (subTab) => {
                    if (subTab.type === Tab) {
                        tabs.push({
                            id: subTab.props.id,
                            checked: !!subTab.props.checked
                        });
                    }
                });
            }
        });

        if (tabs.length > 0 && tabs.every(tab => !tab.checked)) {
            tabs[0].checked = true;
        }

        return tabs.find(x => x.checked).id;
    }

    build = () => {
        const { children } = this.props;
        const { activeTab } = this.state;

        const context = {
            tabs: []
        };

        React.Children.forEach(children, (child) => {
            if (child.type === Item && activeTab === child.props.id && !context.item) {
                context.item = {
                    id: child.props.id,
                    children: child.props.children
                };
            } else if (child.type === Tabs && context.tabs.length === 0) {
                React.Children.forEach(child.props.children, (subTab) => {
                    if (subTab.type === Tab) {
                        const { props } = subTab;
                        context.tabs.push({
                            id: props.id,
                            checked: activeTab === props.id,
                            children: props.children
                        });
                    }
                });
            }
        });

        return context;
    }

    handleTabClick = (event) => {
        const { onChange } = this.props;
        if (onChange) {
            onChange(event);
        }

        if (!event.defaultPreventted) {
            event.preventDefault();
            const { id } = event.target;
            const { activeTab } = this.state;
            if (activeTab !== id) {
                this.setState({ activeTab: id });
            }
        }

        event.stopPropagation();
    }

    render() {
        const { tabs, item = {} } = this.build();
        return [
            (<p key="header" className={styles.header}>
                {tabs.map((tab) =>
                    (<Tab {...tab} key={tab.id} onClick={this.handleTabClick} />)
                )}
            </p>),

            (<Item {...item} key="item" />)
        ];
    }
}

Light.Tabs = Tabs;
Light.Tab = Tab;
Light.Item = Item;