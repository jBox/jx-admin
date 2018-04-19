import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import homeSelector from "../../redux/selectors/driver";
import DriverTrip from "../../components/Widgets/DriverTrip";
import { depart, revert, updateProgress } from "../../redux/actions/driver";

class Home extends Component {

    static propTypes = {
        trips: PropTypes.array,
        updateProgress: PropTypes.func
    }

    render() {
        const { trips, depart, revert, updateProgress } = this.props;
        return trips.map((trip, index) => (
            <DriverTrip key={index}
                data={trip}
                onDepart={depart}
                onRevert={revert}
                onProgress={updateProgress}
            />
        ))
    }
}

export default connect(homeSelector, {
    depart,
    revert,
    updateProgress
})(Home);