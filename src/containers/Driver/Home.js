import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import homeSelector from "../../redux/selectors/driver";
import DriverTrip from "../../components/Widgets/Trip";
import ImagePreview from "../../components/Widgets/ImagePreview";
import { depart, revert, updateProgress, currentTripInitialLoad } from "../../redux/actions/driver";

class Home extends Component {

    static propTypes = {
        data: PropTypes.object,
        depart: PropTypes.func,
        revert: PropTypes.func,
        updateProgress: PropTypes.func,
        currentTripInitialLoad: PropTypes.func
    }

    state = { imagePreview: null }

    componentDidMount() {
        const { currentTripInitialLoad } = this.props;
        if (currentTripInitialLoad) {
            currentTripInitialLoad();
        }
    }

    handleImagePreview = (img) => {
        this.setState({ imagePreview: img.src });
    }

    render() {
        const { data, depart, revert, updateProgress } = this.props;
        const { imagePreview } = this.state;
        if (!data) {
            return "目前没有行程";
        }

        return (
            <Fragment>
                <div className="content-limit">
                    <DriverTrip data={data}
                        onDepart={depart}
                        onRevert={revert}
                        onProgress={updateProgress}
                        onImagePreview={this.handleImagePreview}
                    />
                </div>

                <ImagePreview image={imagePreview} />
            </Fragment>
        );
    }
}

export default connect(homeSelector, {
    depart,
    revert,
    updateProgress,
    currentTripInitialLoad
})(Home);