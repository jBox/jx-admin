import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import homeSelector from "../../redux/selectors/driver";
import DriverTrip from "../../components/Widgets/Trip";
import { depart, revert, updateProgress, currentTripInitialLoad } from "../../redux/actions/driver";

class Home extends Component {

    static propTypes = {
        data: PropTypes.object,
        depart: PropTypes.func,
        revert: PropTypes.func,
        updateProgress: PropTypes.func,
        currentTripInitialLoad: PropTypes.func
    }

    componentDidMount() {
        const { currentTripInitialLoad } = this.props;
        if (currentTripInitialLoad) {
            currentTripInitialLoad();
        }
    }

    render() {
        const { data, depart, revert, updateProgress } = this.props;
        if (!data) {
            return "目前没有行程";
        }

        return (
            <DriverTrip data={data}
                onDepart={depart}
                onRevert={revert}
                onProgress={updateProgress}
            />
        );
    }
}

export default connect(homeSelector, {
    depart,
    revert,
    updateProgress,
    currentTripInitialLoad
})(Home);