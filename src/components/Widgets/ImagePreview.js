import React, { Component } from "react";
import PropTypes from "prop-types";
import Viewer from "react-viewer";

export default class ImagePreview extends Component {

    static propTypes = {
        image: PropTypes.string
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { image } = nextProps;
        if (prevState.image.src !== image) {
            return {
                visible: !!image,
                image: { src: image }
            };
        }

        return null;
    }

    constructor(props) {
        super(props);

        this.state = {
            visible: !!props.image,
            image: { src: props.image }
        };
    }

    handleClose = () => {
        this.setState({ visible: false, image: { src: "" } });
    }

    render() {
        const { visible, image } = this.state;
        return (
            <Viewer
                zIndex={100000}
                visible={visible}
                onClose={this.handleClose}
                images={[image]}
                changeable={false}
                noNavbar
            />
        );
    }
}