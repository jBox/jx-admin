import React, { Component } from "react";

export default class Dashboard extends Component {
    componentDidMount() {
        console.log("Dashboard");
    }

    componentWillUnmount() {
        console.log("Unmount", "Dashboard");
    }

    render() {
        return [
            (<section key="content-header" className="content-header">
                <h1>
                    Page Header <small>Optional description</small>
                </h1>
                <ol className="breadcrumb">
                    <li className="active">Home</li>
                </ol>
            </section>),

            (<section key="content" className="content container-fluid">
                home
            </section>)
        ];
    }
}