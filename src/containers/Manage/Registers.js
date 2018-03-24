import React, { Component } from "react";

export default () => (<div className="box">
    <div className="box-header">
        <h3 className="box-title">Striped Full Width Table</h3>
    </div>
    <div className="box-body no-padding">
        <table className="table table-striped">
            <tbody><tr>
                <th style={{ width: "10px" }}>#</th>
                <th>姓名</th>
                <th>手机号码</th>
                <th style={{ width: "40px" }}>Label</th>
            </tr>
                <tr>
                    <td>1.</td>
                    <td>魏景波</td>
                    <td>
                        18688995461
                    </td>
                    <td><span className="badge bg-red">55%</span></td>
                </tr>
                <tr>
                    <td>2.</td>
                    <td>魏兰</td>
                    <td>
                        18688995461
                    </td>
                    <td><span className="badge bg-yellow">70%</span></td>
                </tr>
                <tr>
                    <td>3.</td>
                    <td>魏薇</td>
                    <td>
                        18688995461
                    </td>
                    <td><span className="badge bg-light-blue">30%</span></td>
                </tr>
                <tr>
                    <td>4.</td>
                    <td>魏景波</td>
                    <td>
                        18688995461
                    </td>
                    <td><span className="badge bg-green">90%</span></td>
                </tr>
            </tbody></table>
    </div>
</div>);