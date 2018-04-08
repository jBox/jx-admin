import React from "react";
import Control from "./Control";
import PropTypes from "prop-types";
import classNames from "classnames";
import ReactAutocomplete from "react-autocomplete";
import isString from "lodash/isString";
import isObject from "lodash/isObject";

import styles from "./Autocomplete.css"

const plainText = (text) => {
    if (isString(text)) {
        return text.trim().toLowerCase();
    }

    return text;
};

const shouldItemRender = (item, value) => {
    const [label, description] = value.split(/[,，]/);
    const plainLabel = plainText(label);
    const plainDescription = plainText(description);
    const itemLabel = item.label.toLowerCase();
    const descriptionLabel = item.description.toLowerCase();
    if (itemLabel.indexOf(plainLabel) > -1) {
        return true;
    }
    if (descriptionLabel.indexOf(plainLabel) > -1) {
        return true;
    }
    if (plainDescription && descriptionLabel.indexOf(plainDescription) > -1) {
        return true;
    }
    return false;
};

const menuStyle = {
    borderRadius: "0",
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
    background: "rgb(255, 255, 255)",
    padding: "2px",
    position: "absolute",
    overflow: "auto",
    zIndex: 1,
    top: "34px",
    left: "0",
    with: "100%",
    maxHeight: "200px"
};

const wrapperStyle = {
    display: "block",
    position: "relative"
};

export default class Autocomplete extends Control {
    static defaultProps = {
        required: false
    }

    static propTypes = {
        items: PropTypes.array,
        className: PropTypes.string,
        pattern: PropTypes.string,
        message: PropTypes.string,
        required: PropTypes.bool,
        onChange: PropTypes.func
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { value, hasError } = nextProps;
        const state = { ...prevState };
        let anyUpdate = false;
        if (value !== state.lastValue) {
            anyUpdate = true;
            state.value = value;
            state.lastValue = value;
        }
        if (hasError !== state.hasError) {
            anyUpdate = true;
            state.hasError = hasError;
        }

        return anyUpdate ? state : null;
    }

    constructor(props) {
        super(props);
        this.state = {
            hasError: props.hasError,
            value: props.value,
            lastValue: props.value
        };
    }

    extraInputProps = () => {
        const props = [
            "id", "name", "type", "value", "defaultValue", "disabled", "placeholder"
        ];

        return props.reduce((obj, key) => {
            if (this.props.hasOwnProperty(key)) {
                obj[key] = this.props[key];
            }

            return obj;
        }, { type: "text" });
    }

    handleChange = (event) => {
        const { onChange } = this.props;
        const { value } = event.target;
        this.setState({ value });
        if (onChange) {
            onChange(value);
        }
    }

    handleSelect = (value) => {
        const { onChange } = this.props;
        this.setState({ value });
        if (onChange) {
            onChange(value);
        }
    }

    extraItems = () => {
        const { items } = this.props;
        return items.map((item, index) => {
            if (isString(item)) {
                return { id: item, label: item, description: "" };
            } else if (isObject(item)) {
                return {
                    id: item.hasOwnProperty("id") ? item.id : index,
                    label: item.hasOwnProperty("label") ? `${item.label}` : "",
                    description: item.hasOwnProperty("description") ? `${item.description}` : ""
                }
            }
        });
    }

    validate = () => {
        let hasError = false;
        const { required, pattern } = this.props;
        const { value } = this.state;
        if (required) {
            hasError = !value;
        }

        if (!hasError) {
            const r = new RegExp(pattern, "ig");
            hasError = !r.test(value);
        }

        if (this.state.hasError !== hasError) {
            this.setState({ hasError });
        }

        return !hasError;
    }

    handleBlur = (event) => {
        this.validate();
    }

    label = () => {
        const { id, label } = this.props;
        if (label) {
            const props = {};
            if (id) {
                props.htmlFor = id;
            }

            return (<label {...props}>{label}</label>);
        }

        return null;
    }

    error = () => {
        const { hasError } = this.state;
        const { message } = this.props;
        if (hasError && message) {
            return (<span className="help-block">{message}</span>);
        }

        return null;
    }

    render() {
        const { className } = this.props;
        const { hasError } = this.state;

        const containerClassName = classNames("form-group", { "has-error": hasError });
        const inputClassNames = classNames("form-control", className);
        return (
            <div className={containerClassName}>
                {this.label()}
                <ReactAutocomplete
                    inputProps={{
                        ...this.extraInputProps(),
                        className: inputClassNames,
                        onBlur: this.handleBlur
                    }}
                    wrapperStyle={wrapperStyle}
                    menuStyle={menuStyle}
                    items={this.extraItems()}
                    shouldItemRender={shouldItemRender}
                    getItemValue={item => {
                        const labels = [item.label];
                        if (item.description) {
                            labels.push(item.description)
                        };

                        return labels.join(", ");
                    }}
                    renderItem={(item, highlighted) =>
                        <div className={styles.item} key={item.id} style={{
                            backgroundColor: highlighted ? "#eee" : "transparent",
                            padding: "6px 10px"
                        }}>
                            <span>{item.label}</span>
                            <span>{item.description}</span>
                        </div>
                    }
                    value={this.state.value}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                />
                {this.error()}
            </div>
        );
    }
}