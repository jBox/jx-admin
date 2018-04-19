import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import isEqual from "lodash/isEqual";
import { Redirect } from "react-browser-router";

import landingSelector from "../redux/selectors/landing";
import { initialLogin } from "../redux/actions/login";

class Landing extends Component {

    static propTypes = {
        auth: PropTypes.object,
        initialLogin: PropTypes.func
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        const { auth } = nextProps;
        if (!isEqual(auth, prevState.auth)) {
            const state = { auth, value: 100 };
            if (auth.authenticated) {
                state.returnUrl = auth.returnUrl;
            } else if (auth.landing) {
                state.returnUrl = `/login?returnUrl=${encodeURIComponent(auth.returnUrl || "/")}`;
            }

            return state;
        }

        return null;
    }

    constructor(props) {
        super(props);
        this.state = {
            auth: { ...props.auth },
            returnUrl: props.auth.returnUrl,
            value: 0
        };
    }

    componentDidMount() {
        const { auth } = this.props;
        if (auth.authenticated) {
            this.setState({ value: 100, returnUrl: auth.returnUrl });
        }

        const { initialLogin } = this.props;
        if (initialLogin) {
            initialLogin(true);
        }
    }

    render() {
        const { value, returnUrl } = this.state;

        if (returnUrl) {
            return (<Redirect to={returnUrl} />);
        }

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