import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import isEqual from "lodash/isEqual";
import isString from "lodash/isString";
import Dropzone from "react-dropzone";

import styles from "./ImageLoader.css";

const IMG_MAX_SIZE = 1024;

const standardizeImage = (dataURL) => new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
        if (img.width <= IMG_MAX_SIZE && img.height <= IMG_MAX_SIZE) {
            return resolve({ dataURL, width: img.width, height: img.height });
        }

        try {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = IMG_MAX_SIZE;
            canvas.height = IMG_MAX_SIZE;

            // set size proportional to image
            if (img.width > img.height) {
                canvas.height = canvas.width * (img.height / img.width);
            } else {
                canvas.width = canvas.height * (img.width / img.height);
            }

            // resize to final size
            ctx.drawImage(img, 0, 0, img.width, img.height,
                0, 0, canvas.width, canvas.height);

            const cURL = canvas.toDataURL("image/jpeg", 0.5);
            return resolve({ dataURL: cURL, width: canvas.width, height: canvas.height });
        } catch (error) {
            console.error(error);
        }
    };

    img.src = dataURL;
});

const refineImages = (files) => {
    return new Promise((resolve, reject) => {
        const images = [];
        for (let file of files) {
            const reader = new FileReader();
            reader.onload = () => {
                standardizeImage(reader.result).then((img) => {
                    images.push(img);
                    if (images.length === files.length) {
                        return resolve(images);
                    }
                }).catch((error) => {
                    return reject(error);
                });
            };

            reader.readAsDataURL(file);
        }
    });
};

export default class ImageLoader extends Component {
    static defaultProps = {
        imgs: []
    }

    static propTypes = {
        imgs: PropTypes.array,
        onChange: PropTypes.func
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { imgs } = nextProps;
        if (!isEqual(prevState.props.imgs, imgs)) {
            return {
                props: { imgs: [...imgs] },
                imgs: [...imgs]
            };
        }

        return null;
    }

    constructor(props) {
        super(props);

        this.state = {
            props: { imgs: [...props.imgs] },
            imgs: [...props.imgs]
        }
    }

    handleDrop = (acceptedFiles) => {
        const { onChange } = this.props;
        const acceptabe = 3 - this.state.imgs.length;
        const acceptabeImages = [];
        if (acceptabe > 0) {
            refineImages(acceptedFiles.slice(0, acceptabe)).then((images) => {
                const { imgs } = this.state;
                const data = [...imgs];
                for (let img of images) {
                    const id = `${Date.now()}${data.length}`;
                    data.push({ ...img, id });
                }

                const updater = { imgs: data };
                this.setState(updater, () => {
                    if (onChange) {
                        onChange(updater.imgs);
                    }
                });
            });
        }
    }

    render() {

        const { imgs } = this.state;

        return (
            <ul className={styles.list}>

                {imgs.map((img, index) => (
                    <li key={index}>
                        <img className="img-responsive" src={img.dataURL} />
                        <div className={styles.remove}>
                            <span className="glyphicon glyphicon-trash"></span>
                        </div>
                    </li>
                ))}

                {imgs.length < 3 && (
                    <li className={styles.x}>
                        <Dropzone accept="image/*" onDrop={this.handleDrop} className={styles.dropzone}>
                            上传发票
                        </Dropzone>
                    </li>
                )}
            </ul>
        );
    }
}
