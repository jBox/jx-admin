import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { tripsSelector } from "../../redux/selectors/driver";
import DriverTrip from "../../components/Widgets/Trip";
import ImagePreview from "../../components/Widgets/ImagePreview";
import { updateProgress, tripsInitialLoad } from "../../redux/actions/driver";

class Trips extends Component {

    static propTypes = {
        data: PropTypes.array,
        updateProgress: PropTypes.func,
        tripsInitialLoad: PropTypes.func
    }

    state = { imagePreview: null }

    componentDidMount() {
        const { tripsInitialLoad } = this.props;
        if (tripsInitialLoad) {
            tripsInitialLoad();
        }
    }

    handleImagePreview = (img) => {
        this.setState({ imagePreview: img.src });
    }

    render() {
        const { data, updateProgress } = this.props;
        const { imagePreview } = this.state;
        if (data.length === 0) {
            return "目前没有行程";
        }

        return (
            <Fragment>
                <div className="content-limit">
                    {data.map((item) => (
                        <DriverTrip key={item.id}
                            data={item}
                            onProgress={updateProgress}
                            onImagePreview={this.handleImagePreview}
                        />
                    ))}
                </div>
                <ImagePreview image={imagePreview} />
            </Fragment>
        );
    }
}

export default connect(tripsSelector, {
    updateProgress,
    tripsInitialLoad
})(Trips);