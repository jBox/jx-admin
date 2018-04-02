import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Select2 from "react-select2-wrapper";
import Control from "./Control";
import styles from "./Select.css";

const getSelectedValue = (select) => {
    const values = [];
    const options = select.options;
    for (let i = 0; i < options.length; i++) {
        const opt = options[i];
        if (opt.selected) {
            values.push(opt.value);
        }
    }

    return values;
};

export default class Select extends Control {
    static defaultProps = {
        required: false
    }

    static propTypes = {
        id: PropTypes.string,
        name: PropTypes.string,
        data: PropTypes.array,
        hasError: PropTypes.bool,
        message: PropTypes.string,
        label: PropTypes.string,
        placeholder: PropTypes.string,
        defaultValue: PropTypes.array,
        disabled: PropTypes.bool,
        multiple: PropTypes.bool,
        required: PropTypes.bool,
        onChange: PropTypes.func
    }

    constructor(props, context) {
        super(props, context);

        this.state = {
            hasError: props.hasError
        }

        this.value = props.defaultValue;
    }

    componentWillReceiveProps(nextProps) {
        const { hasError, value } = nextProps;
        if (hasError !== this.hasError && hasError !== this.state.hasError) {
            this.setState({ hasError });
        }

        if (value !== this.props.value) {
            this.value = value;
        }
    }

    validate = () => {
        let hasError = false;
        const { required, multiple } = this.props;
        if (required) {
            if (multiple) {
                hasError = !(this.value && this.value.length > 0);
            } else {
                hasError = !this.value;
            }
        }

        if (this.state.hasError !== hasError) {
            this.setState({ hasError });
        }

        return !hasError;
    }

    handleChange = (event) => {
        const { multiple } = this.props;
        const values = getSelectedValue(event.target);
        this.value = values;
        if (!multiple) {
            this.value = this.value[0];
        }

        const { onChange } = this.props;
        if (onChange) {

            const target = {
                id: event.target.id,
                name: event.target.name,
                value: this.value
            };

            event.target = target;
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

    error = () => {
        const { hasError } = this.state;
        const { message } = this.props;
        if (hasError && message) {
            return (<span className="help-block">{message}</span>);
        }

        return null;
    }

    render() {
        const { id, name, data, className, defaultValue, disabled, multiple, placeholder } = this.props;
        const { hasError } = this.state;

        const containerClassName = classNames("form-group has-feedback", { "has-error": hasError });
        const selectClassName = classNames("form-control", className);

        return (
            <div className={containerClassName}>
                {this.label()}
                <Select2
                    id={id}
                    name={name}
                    defaultValue={defaultValue}
                    disabled={disabled}
                    className={selectClassName}
                    multiple={multiple}
                    data={data}
                    onChange={this.handleChange}
                    options={{
                        placeholder,
                        minimumResultsForSearch: Infinity
                    }}
                />
                {this.error()}
            </div>
        );
    }
}