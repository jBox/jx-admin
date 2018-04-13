import React from "react";
import PropTypes from "prop-types";
import isFunction from "lodash/isFunction";
import classNames from "classnames";
import Control from "./Control";
import styles from "./FormInput.css";

export default class Input extends Control {
    static defaultProps = {
        type: "text",
        verified: false,
        required: false
    }

    static propTypes = {
        id: PropTypes.string,
        hasError: PropTypes.bool,
        verified: PropTypes.bool,
        message: PropTypes.string,
        pattern: PropTypes.string,
        label: PropTypes.string,
        icon: PropTypes.string,
        type: PropTypes.string,
        required: PropTypes.bool,
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        onError: PropTypes.func,
        validator: PropTypes.func
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
        const { required, pattern, id, name, message, onError } = this.props;
        const validator = isFunction(this.props.validator) ?
            this.props.validator :
            (value) => {
                let valid = true;
                if (required) {
                    valid = !!this.value;
                }

                if (valid) {
                    const r = new RegExp(pattern, "ig");
                    valid = r.test(this.value);
                }

                return valid;
            };

        const hasError = !validator(this.value);
        if (this.state.hasError !== hasError) {
            this.setState({ hasError });
        }

        if (hasError && onError) {
            onError({ id, name, message });
        }

        return !hasError;
    }

    handleBlur = (event) => {
        this.validate();

        const { onBlur } = this.props;

        if (onBlur) {
            onBlur(event);
        }
    }

    handleChange = (event) => {
        const { value } = event.target;
        this.value = value;

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

    icon = () => {
        const { icon, verified } = this.props;
        if (icon) {
            const glyphicon = verified ? "glyphicon-ok" : `glyphicon-${icon}`;
            const iconClass = classNames("glyphicon", glyphicon, "form-control-feedback", { [styles.verified]: verified });
            return (
                <span className={iconClass}></span>
            );
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

    extraInputProps = () => {
        const keys = [
            "id", "name", "type", "value", "defaultValue", "disabled", "placeholder", "readOnly"
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
        const { className, icon } = this.props;
        const { hasError } = this.state;

        const props = {
            ...this.extraInputProps(),
            onChange: this.handleChange,
            onBlur: this.handleBlur
        };

        const containerClassName = classNames("form-group", {
            "has-feedback": !!icon,
            "has-error": hasError
        });
        const inputClassName = classNames("form-control", className);

        if (props.type === "textarea") {
            const { type, ...rest } = props;
            return (
                <div className={containerClassName}>
                    {this.label()}
                    <textarea rows="3" {...rest} className={inputClassName} />
                    {this.icon()}
                    {this.error()}
                </div>
            );
        }

        return (
            <div className={containerClassName}>
                {this.label()}
                <input {...props} className={inputClassName} />
                {this.icon()}
                {this.error()}
            </div>
        );
    }
}