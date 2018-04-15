import React, { Component } from "react";
import PropTypes from "prop-types";
import Input from "./Input";

export default class TextEditor extends Component {
    static propTypes = {
        editable: PropTypes.bool,
        onChange: PropTypes.func
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { defaultValue, value } = nextProps;
        const { input } = prevState;
        if (input.value !== value || input.defaultValue !== defaultValue) {
            return {
                input: { defaultValue, value },
                value: value || defaultValue || ""
            };
        }

        return null;
    }

    constructor(props, context) {
        super(props, context);
        const { defaultValue, value } = props;
        this.state = {
            input: { defaultValue, value },
            value: value || defaultValue || ""
        };
    }

    handleChange = (event) => {
        const value = event.target.value;
        if (this.state.value !== value) {
            this.setState({ value });
        }

        const { onChange } = this.props;
        if (onChange) {
            onChange(event);
        }
    }

    render() {
        const { editable, ...props } = this.props;
        const { value } = this.state;
        if (editable) {
            return (<Input {...props} onChange={this.handleChange} />);
        }

        return value;
    }
}