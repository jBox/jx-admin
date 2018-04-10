import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import isEqual from "lodash/isEqual";

import landingSelector from "../redux/selectors/landing";
import { initialLogin } from "../redux/actions/login";

class Landing extends Component {

    static propTypes = {
        auth: PropTypes.object,
        history: PropTypes.object,
        initialLogin: PropTypes.func
    }

    state = {
        value: 0
    }

    componentDidMount() {
        const { auth, history } = this.props;
        if (auth.authenticated) {
            this.setState({ value: 100 }, () => history.replace(auth.returnUrl));
        }

        const { initialLogin } = this.props;
        if (initialLogin) {
            initialLogin(true);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { auth, history } = nextProps;
        if (auth.authenticated) {
            this.setState({ value: 100 }, () => {
                history.replace(auth.returnUrl);
            });
        } else if (auth.landing) {
            history.replace(`/login?returnUrl=${encodeURIComponent(auth.returnUrl)}`);
        }
    }

    render() {
        const { value } = this.state;
        return (
            <div className="progress progress-xxs">
                <div className="progress-bar progress-bar-success progress-bar-striped"
                    role="progressbar"
                    aria-valuenow={value}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ "width": `${value}%` }}>
                    <span className="sr-only">{value}% Complete (warning)</span>
                </div>
            </div>
        );
    }
}

export default connect(landingSelector, {
    initialLogin
})(Landing);