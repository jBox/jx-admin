import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { tripsSelector } from "../../redux/selectors/driver";
import DriverTrip from "../../components/Widgets/DriverTrip";
import { updateProgress, tripsInitialLoad } from "../../redux/actions/driver";

class Trips extends Component {

    static propTypes = {
        data: PropTypes.array,
        updateProgress: PropTypes.func,
        tripsInitialLoad: PropTypes.func
    }

    componentDidMount() {
        const { tripsInitialLoad } = this.props;
        if (tripsInitialLoad) {
            tripsInitialLoad();
        }
    }

    render() {
        const { data, updateProgress } = this.props;
        if (data.length === 0) {
            return "目前没有行程";
        }

        return (
            <Fragment>
                {data.map((item) => (
                    <DriverTrip key={item.id}
                        data={item}
                        onProgress={updateProgress}
                    />
                ))}
            </Fragment>
        );
    }
}

export default connect(tripsSelector, {
    updateProgress,
    tripsInitialLoad
})(Trips);