import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import isEqual from "lodash/isEqual";
import Dropzone from "react-dropzone";

import styles from "./ImageLoader.css";

const IMG_MAX_SIZE = 1024;

const standardizeImage = (dataURL) => new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
        if (img.width <= IMG_MAX_SIZE && img.height <= IMG_MAX_SIZE) {
            return resolve(dataURL);
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

            return resolve(canvas.toDataURL("image/png", 0.5));
        } catch (error) {
            console.error(error);
        }
    };

    img.src = dataURL;
});

export default class ImageLoader extends Component {

    state = {
        imgs: []
    }

    handleDrop = (acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                standardizeImage(reader.result).then((dataURL) => {
                    this.setState({
                        imgs: [...this.state.imgs, dataURL]
                    });
                });
            };

            reader.readAsDataURL(file);
        });
    }

    render() {

        const { imgs } = this.state;

        return (
            <ul className={styles.list}>

                {imgs.map((dataUrl, index) => (
                    <li key={index}>
                        <img className="img-responsive" src={dataUrl} />
                        <div className={styles.remove}>
                            <span className="glyphicon glyphicon-trash"></span>
                        </div>
                    </li>
                ))}

                <li className={styles.x}>
                    <Dropzone onDrop={this.handleDrop} className={styles.dropzone}>
                        上传发票
                    </Dropzone>
                </li>
            </ul>
        );
    }
}
