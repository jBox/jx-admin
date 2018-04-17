import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import homeSelector from "../../redux/selectors/driver";

class Home extends Component {
    render() {
        return "Home";
    }
}

export default connect(homeSelector)(Home);