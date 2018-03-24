import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import headerSelector from "../redux/selectors/header";
import { logout } from "../redux/actions/header";

const Logo = () => (
    <a href="/" className="logo">
        <span className="logo-mini"><b>JH</b></span>
        <span className="logo-lg">Jinahu</span>
    </a>
);

const Nav = ({ onLogout }) => (
    <nav className="navbar navbar-static-top" role="navigation">
        <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
            <span className="sr-only">Toggle navigation</span>
        </a>
        <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
                <li className="dropdown user user-menu">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                        <img src="/static/AdminLTE-2.4.3/dist/img/user2-160x160.jpg" className="user-image" alt="User Image" />
                        <span className="hidden-xs">Alexander Pierce</span>
                    </a>
                    <ul className="dropdown-menu">
                        <li className="user-header">
                            <img src="/static/AdminLTE-2.4.3/dist/img/user2-160x160.jpg" className="img-circle" alt="User Image" />

                            <p>
                                Alexander Pierce - Web Developer <small>Member since Nov. 2012</small>
                            </p>
                        </li>
                        <li className="user-body">
                            <div className="row">
                                <div className="col-xs-4 text-center">
                                    <a href="#">Followers</a>
                                </div>
                                <div className="col-xs-4 text-center">
                                    <a href="#">Sales</a>
                                </div>
                                <div className="col-xs-4 text-center">
                                    <a href="#">Friends</a>
                                </div>
                            </div>
                        </li>
                        <li className="user-footer">
                            <div className="pull-left">
                                <a href="/profile" className="btn btn-default btn-flat">账号</a>
                            </div>
                            <div className="pull-right">
                                <a href="/logout" onClick={onLogout} className="btn btn-default btn-flat">登出</a>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
);

class Header extends Component {
    static propTypes = {
        history: PropTypes.object,
        authenticated: PropTypes.bool,
        logout: PropTypes.func
    }

    componentWillReceiveProps(nextProps) {
        const { authenticated, history } = nextProps;
        if (!authenticated && authenticated !== this.props.authenticated) {
            history.replace("/login");
        }
    }

    handleLogout = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const { logout } = this.props;
        if (logout) {
            logout();
        }
    }

    render() {
        return (<header className="main-header">
            <Logo key="logo" />
            <Nav onLogout={this.handleLogout} key="nav" />
        </header>);
    }
}

export default connect(headerSelector, {
    logout
})(Header);