import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import Confirm from "../../Overlays/Confirm";
import DriverTrip from "./DriverTrip";
import Flip from "../../Overlays/Flip";
import ProgressEditor from "../ProgressEditor";

export default class Trip extends Component {
    static propTypes = {
        data: PropTypes.object,
        onDepart: PropTypes.func,
        onRevert: PropTypes.func,
        onProgress: PropTypes.func,
        onImagePreview: PropTypes.func
    }

    state = {
        confirm: { display: false },
        flip: {
            active: false,
            back: null
        }
    }

    handleRevert = () => {
        const { data: { terms, revertTime } } = this.props;
        if (terms.length > 0) {
            return this.setState({
                confirm: {
                    display: true,
                    message: "部分行程进度未汇报，您确定要收车吗？"
                }
            });
        } else if (new Date(revertTime).getTime() > Date.now()) {
            return this.setState({
                confirm: {
                    display: true,
                    message: "还未到计划收车时间，您确定要提前收车吗？"
                }
            })
        }

        return confirmRevert();
    }

    handleCloseConfirm = () => {
        if (this.state.confirm.display) {
            this.setState({ confirm: { display: false } });
        }
    }

    confirmRevert = () => {
        if (this.state.confirm.display) {
            this.setState({ confirm: { display: false } });
        }

        const { data, onRevert } = this.props;
        if (onRevert) {
            onRevert(data);
        }
    }

    handleProgressEdit = (progress) => {
        this.setState({ flip: { back: null } }, () =>
            this.setState({ flip: { active: true, data: progress, back: "progress" } })
        );
    }

    handleProgressReport = () => {
        this.setState({ flip: { back: null } }, () =>
            this.setState({ flip: { active: true, back: "progress" } })
        );
    }

    handleFlipBack = () => {
        this.setState({ flip: { active: false, back: this.state.flip.back } });
    }

    handleProgressSubmit = (progress) => {
        this.setState({ flip: { active: false, back: this.state.flip.back } }, () => {
            const { onProgress, data } = this.props;
            const updated = [...data.schedule.progress];
            const index = updated.findIndex(x => x.date === progress.date);
            if (index !== -1) {
                //edit
                updated[index] = { ...progress };
            } else {
                //create
                updated.push({ ...progress });
            }

            onProgress(data, updated);
        });
    }

    render() {
        const { confirm, flip } = this.state;
        const { data, onDepart, onImagePreview } = this.props;

        return (
            <Fragment>
                <Flip active={flip.active}>
                    <Flip.Front>
                        <DriverTrip
                            data={data}
                            onDepart={onDepart}
                            onRevert={this.handleRevert}
                            onProgressReport={this.handleProgressReport}
                            onProgressEdit={this.handleProgressEdit}
                        />
                    </Flip.Front>
                    <Flip.Back>
                        {flip.back === "progress" && (
                            <ProgressEditor
                                data={flip.data}
                                terms={data.terms}
                                onClose={this.handleFlipBack}
                                onSubmit={this.handleProgressSubmit}
                                onPreview={onImagePreview}
                            />
                        )}
                    </Flip.Back>
                </Flip>

                {confirm.display && (
                    <Confirm onClose={this.handleCloseConfirm} onConfirm={this.confirmRevert} warning>
                        {confirm.message}
                    </Confirm>
                )}

            </Fragment>
        );
    }
}