import React, { Component } from "react";
import PropTypes from "prop-types";
import isFunction from "lodash/isFunction";
import classNames from "classnames";

export default class Dropdown extends Component {
    static propTypes = {
        id: PropTypes.string,
        name: PropTypes.string,
        options: PropTypes.array,
        label: PropTypes.string,
        onChange: PropTypes.func
    }

    handleChange = (event) => {
        const { onChange } = this.props;

        if (onChange) {
            onChange(event);
        }
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

    extraInputProps = () => {
        const keys = [
            "id", "name", "value", "defaultValue", "disabled", "placeholder", "readOnly"
        ];
        const props = this.props;
        return keys.reduce((obj, key) => {
            if (props.hasOwnProperty(key)) {
                obj[key] = props[key];
            }

            return obj;
        }, {});
    }

    render() {
        const { className, options } = this.props;
        const props = {
            ...this.extraInputProps(),
            onChange: this.handleChange
        };

        const inputClassName = classNames("form-control", className);

        return (
            <div className="form-group">
                {this.label()}
                <select {...props} className={inputClassName}>
                    {options.map((option, index) => (
                        <option key={index} value={option.value} selected={option.selected}>{option.label}</option>
                    ))}
                </select>
            </div>
        );
    }
}