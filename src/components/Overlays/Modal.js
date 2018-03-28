import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

class Header extends Component {
    static defaultProps = {
        closeButton: true
    }

    static propTypes = {
        closeButton: PropTypes.bool,
        className: PropTypes.string,
        onClose: PropTypes.func
    }

    render() {
        const { children, className, closeButton, onClose } = this.props;
        const headerClassName = classNames("modal-header", className);
        return (
            <div className={headerClassName}>
                {closeButton && (<button type="button" className="close" onClick={onClose} aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>)}
                {children}
            </div>
        );
    }
}

class Title extends Component {
    static propTypes = {
        className: PropTypes.string
    }

    render() {
        const { children, className } = this.props;
        const titleClassName = classNames("modal-title", className);
        return (
            <h4 className={titleClassName}>{children}</h4>
        );
    }
}

class Body extends Component {
    static propTypes = {
        className: PropTypes.string
    }

    render() {
        const { children, className } = this.props;
        const bodyClassName = classNames("modal-body", className);
        return (
            <div className={bodyClassName}>{children}</div>
        );
    }
}

class Footer extends Component {
    static propTypes = {
        className: PropTypes.string
    }

    render() {
        const { children, className } = this.props;
        const footerClassName = classNames("modal-footer", className);
        return (
            <div className={footerClassName}>{children}</div>
        );
    }
}

export default class Modal extends Component {
    static propTypes = {
        primary: PropTypes.bool,
        success: PropTypes.bool,
        danger: PropTypes.bool,
        warning: PropTypes.bool,
        info: PropTypes.bool,
        className: PropTypes.string
    }

    render() {
        const { children, className, primary, success, info, warning, danger } = this.props;
        let modalStyle = "";
        if (primary) {
            modalStyle = "modal-primary";
        } else if (success) {
            modalStyle = "modal-success";
        } else if (info) {
            modalStyle = "modal-info";
        } else if (warning) {
            modalStyle = "modal-warning";
        } else if (danger) {
            modalStyle = "modal-danger";
        }

        const modalClassName = classNames("modal", modalStyle, "fade in", className);
        return (
            <div className={modalClassName} style={{ display: "block" }}>
                <div className="modal-dialog">
                    <div className="modal-content">{children}</div>
                </div>
            </div>
        );
    }
}

Modal.Body = Body;
Modal.Header = Header;
Modal.Title = Title;
Modal.Footer = Footer; 