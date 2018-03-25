import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RegisterItem from "../../components/Widgets/RegisterItem";

import manageRegistersSelector from "../../redux/selectors/manage/registers";
import { confirmRegister, registersInitialLoad } from "../../redux/actions/manage";

const Register = (props) => (
    <div className="col-md-12">
        <RegisterItem {...props} />
    </div>
);

class Registers extends Component {
    static propTypes = {
        registers: PropTypes.array,
        confirmRegister: PropTypes.func,
        registersInitialLoad: PropTypes.func
    }

    componentDidMount() {
        const { registersInitialLoad } = this.props;
        if (registersInitialLoad) {
            registersInitialLoad();
        }
    }

    handleConfirmRegister = (reg, action) => {
        return (data) => {
            const { confirmRegister } = this.props;
            if (confirmRegister) {
                confirmRegister(action, reg.mobile, data);
            }
        }
    }

    render() {
        const { registers } = this.props;
        return (<div className="row">
            {registers.map((reg, index) => (<Register key={index} data={reg}
                onPass={this.handleConfirmRegister(reg, "pass")}
                onReject={this.handleConfirmRegister(reg, "reject")} />))}
        </div>);
    }
}

export default connect(manageRegistersSelector, {
    confirmRegister,
    registersInitialLoad
})(Registers);