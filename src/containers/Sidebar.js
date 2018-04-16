import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Menu from "../components/Widgets/Menu";
import Nameplate from "../components/Widgets/Nameplate";

import { getUserInfo } from "../redux/actions";
import sidebarSelector from "../redux/selectors/sidebar";

class Sidebar extends Component {
    static defaultProps = {
        navs: []
    }

    static propTypes = {
        user: PropTypes.object,
        navs: PropTypes.array,
        getUserInfo: PropTypes.func
    }

    componentDidMount() {
        const { getUserInfo } = this.props;
        if (getUserInfo) {
            getUserInfo();
        }
    }

    render() {
        const { user, navs } = this.props;
        return (
            <aside className="main-sidebar">
                <section className="sidebar">
                    <Nameplate profile={user} exquisite />
                    {navs.length > 0 && (<Menu navs={navs} />)}
                </section>
            </aside>
        );
    }
}

export default connect(sidebarSelector, {
    getUserInfo
})(Sidebar);