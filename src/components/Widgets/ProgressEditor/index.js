import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import isEqual from "lodash/isEqual";

import Form from "../../Form";
import Button from "../../Form/Button";
import Dropdown from "../../Form/Dropdown";
import FormInput from "../../Form/Input";
import ImageLoader from "./ImageLoader";

const isDataEmpty = (data) => {
    if (!data) {
        return true;
    }

    return data.date === "" &&
        data.milage === "" &&
        data.duration === "" &&
        data.tollFee === "" &&
        data.fuelFee === "" &&
        data.parkingFee === "" &&
        data.otherFee === "" &&
        data.notes === "";
};

export default class ProgressEditor extends Component {
    static defaultProps = {
        terms: [],
        data: {
            date: "", // 日期
            milage: "", // 里程
            duration: "", // 行车时间
            tollFee: "", // 通行费
            fuelFee: "", // 油费
            parkingFee: "", // 停车费
            otherFee: "", // 其他费
            notes: "", // 备注
            pics: []
        }
    }

    static propTypes = {
        order: PropTypes.object,
        data: PropTypes.object,
        terms: PropTypes.array,
        onSubmit: PropTypes.func,
        onClose: PropTypes.func,
        onPreview: PropTypes.func
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        const { data, terms } = nextProps;
        if (!isEqual(data, prevState.original)) {
            const isEdit = !isDataEmpty(data);
            return {
                original: { ...data },
                data: isEdit ? { ...data } : { ...data, date: terms[0] },
                isEdit
            };
        }

        return null;
    }

    constructor(props, context) {
        super(props, context);

        const data = { ...props.data };
        const isEdit = !isDataEmpty(data);
        this.state = {
            original: { ...data },
            data: isEdit ? { ...data } : { ...data, date: props.terms[0] },
            isEdit
        };
    }

    handleSubmit = () => {
        const { onSubmit } = this.props;
        if (onSubmit) {
            const { data } = this.state;
            onSubmit({
                ...data,
                pics: data.pics.map((img) => {
                    if (img.id && img.dataURL) {
                        return { ...img };
                    } else if (img.id) {
                        return img.id;
                    }

                    return { ...img };
                }),
                report: new Date().toISOString()
            });
        }
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ data: { ...this.state.data, [name]: value } });
    }

    handleImagesChange = (imgs) => {
        this.setState({ data: { ...this.state.data, pics: [...imgs] } });
    }

    render() {
        const { onClose, terms, order, onPreview } = this.props;
        const { isEdit, data } = this.state;
        let title = isEdit ? `编辑进度 （${data.date}）` : "汇报进度";
        if (order && order.id) {
            title = `订单${order.id} - ${title}`;
        }

        const submitButton = isEdit ? `提交修改` : "提交汇报";
        return (
            <Form action="/api/users/drivers" method="POST" onSubmit={this.handleSubmit}>
                <div className="box box-primary box-solid">
                    <div className="box-header with-border">
                        <h3 className="box-title">{title}</h3>
                        <div className="box-tools">
                            <Button primary flat xs onClick={onClose}>
                                返回
                        </Button>
                        </div>
                    </div>
                    <div className="box-body">
                        {!isEdit && (
                            <Dropdown id="date" name="date" label="行车日期"
                                defaultValue={data.date}
                                options={
                                    terms.map((item) => (
                                        { value: item, label: item }
                                    ))
                                }
                                onChange={this.handleInputChange}
                            />
                        )}
                        <FormInput type="number" id="milage" name="milage" label="里程（公里）" placeholder="里程"
                            message="请输入正确的里程数"
                            defaultValue={data.milage}
                            required
                            onChange={this.handleInputChange} />
                        <FormInput type="number" id="duration" name="duration" label="行车时间（小时）" placeholder="行车时间"
                            message="请输入正确的行车时间"
                            defaultValue={data.duration}
                            required
                            onChange={this.handleInputChange} />
                        <div className="row">
                            <div className="col-xs-6">
                                <FormInput type="number" id="fuelFee" name="fuelFee" label="油费" placeholder="油费"
                                    defaultValue={data.fuelFee}
                                    onChange={this.handleInputChange} />
                            </div>
                            <div className="col-xs-6">
                                <FormInput type="number" id="tollFee" name="tollFee" label="通行费" placeholder="通行费"
                                    defaultValue={data.tollFee}
                                    onChange={this.handleInputChange} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-6">
                                <FormInput type="number" id="parkingFee" name="parkingFee" label="停车费" placeholder="停车费"
                                    defaultValue={data.parkingFee}
                                    onChange={this.handleInputChange} />
                            </div>
                            <div className="col-xs-6">
                                <FormInput type="number" id="otherFee" name="otherFee" label="其他费用" placeholder="其他费用"
                                    defaultValue={data.otherFee}
                                    onChange={this.handleInputChange} />
                            </div>
                        </div>
                        <FormInput id="notes" name="notes" label="备注" placeholder="备注"
                            defaultValue={data.notes}
                            onChange={this.handleInputChange} />

                        <ImageLoader
                            imgs={data.pics}
                            onChange={this.handleImagesChange}
                            onPreview={onPreview}
                        />
                    </div>

                    <div className="box-footer">
                        <Button type="submit" flat primary right>{submitButton}</Button>
                    </div>
                </div>
            </Form>
        );
    }
}
