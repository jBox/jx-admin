import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";

import CalloutBoard from "../components/Widgets/CalloutBoard";

import { calloutsSelector } from "../redux/selectors/notifications";
import { closeCallout } from "../redux/actions/notifications";

class Callouts extends Component {

    static propTypes = {
        callouts: PropTypes.array,
        closeCallout: PropTypes.func
    }

    render() {
        const { callouts, closeCallout } = this.props;

        return (<CalloutBoard data={callouts} onClose={closeCallout} />);
    }
}

export default connect(calloutsSelector, { closeCallout })(Callouts);