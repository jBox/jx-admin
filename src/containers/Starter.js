import React, { Component } from "react";

export default class Starter extends Component {
    render() {
        return [
            (<section key="content-header" className="content-header">
                <h1>
                    Page Header <small>Optional description</small>
                </h1>
                <ol className="breadcrumb">
                    <li className="active">Starter</li>
                </ol>
            </section>),

            (<section key="content" className="content container-fluid">
                Starter
            </section>)
        ];
    }
}