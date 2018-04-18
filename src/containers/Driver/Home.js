import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import homeSelector from "../../redux/selectors/driver";
import DriverTrip from "../../components/Widgets/DriverTrip";

class Home extends Component {

    static propTypes = {
        trips: PropTypes.array
    }

    render() {
        const {trips}=this.props;
        return trips.map((trip, index) => (
            <DriverTrip key={index} data={trip} />
        ))
    }
}

export default connect(homeSelector)(Home);