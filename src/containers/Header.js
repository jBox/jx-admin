import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Nameplate from "../components/Widgets/Nameplate";

import headerSelector from "../redux/selectors/header";
import { getUserInfo } from "../redux/actions";
import { logout } from "../redux/actions/header";

const logoText = "健湖租车";

const Logo = () => (
    <a href="/" className="logo">
        <span className="logo-mini"><b>JH</b></span>
        <span className="logo-lg">{logoText}</span>
    </a>
);

const Nav = ({ user, onLogout }) => (
    <nav className="navbar navbar-static-top" role="navigation">
        <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
            <span className="sr-only">Toggle navigation</span>
        </a>
        <span className="sub-logo">健湖租车</span>
        <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
                <li className="dropdown user user-menu">
                    <Nameplate profile={user} onLogout={onLogout} />
                </li>
            </ul>
        </div>
    </nav>
);

const CollapseScreenSize = 767;

class Header extends Component {
    static propTypes = {
        history: PropTypes.object,
        location: PropTypes.object,
        authenticated: PropTypes.bool,
        user: PropTypes.object,
        getUserInfo: PropTypes.func,
        logout: PropTypes.func
    }

    componentDidMount() {
        const { getUserInfo } = this.props;
        if (getUserInfo) {
            getUserInfo();
        }
    }

    componentWillReceiveProps(nextProps) {
        const { authenticated, history, location } = nextProps;
        if (!authenticated && authenticated !== this.props.authenticated) {
            history.replace("/login");
        }

        if (location !== this.props.location && window.innerWidth < CollapseScreenSize) {
            // push menu close
            const pushmenu = jQuery(".sidebar-toggle").data("lte.pushmenu");
            if (pushmenu) {
                pushmenu.close();
            }
        }
    }

    handleLogout = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const { logout } = this.props;
        if (logout) {
            logout();
            location.href = "/";
        }
    }

    render() {
        const { user } = this.props;
        return (<header className="main-header">
            <Logo />
            <Nav user={user} onLogout={this.handleLogout} />
        </header>);
    }
}

export default connect(headerSelector, {
    logout,
    getUserInfo
})(Header);