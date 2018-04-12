import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";
import Button from "../Form/Button";

export default class Confirm extends Component {
    static propTypes = {
        title: PropTypes.string,
        onConfirm: PropTypes.func,
        onClose: PropTypes.func
    }

    render() {
        const { children, title, onConfirm, onClose, ...props } = this.props;
        return (
            <Modal {...props}>
                <Modal.Header onClose={onClose}>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{children}</Modal.Body>
                <Modal.Footer>
                    <Button className="pull-left" onClick={onClose} flat> 取消 </Button>
                    <Button primary onClick={onConfirm} flat> 确认 </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
