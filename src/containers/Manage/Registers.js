import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RegisterItem from "../../components/Widgets/RegisterItem";

import manageRegistersSelector from "../../redux/selectors/manage/registers";
import { passRegister, rejectRegister, registersInitialLoad } from "../../redux/actions/manage";

const Register = (props) => (
    <div className="col-md-12">
        <RegisterItem {...props} />
    </div>
);

class Registers extends Component {
    static propTypes = {
        registers: PropTypes.array,
        passRegister: PropTypes.func,
        rejectRegister: PropTypes.func,
        registersInitialLoad: PropTypes.func
    }

    componentDidMount() {
        const { registersInitialLoad } = this.props;
        if (registersInitialLoad) {
            registersInitialLoad();
        }
    }

    handlePassRegister = (reg) => {
        return (roles) => {
            const { passRegister } = this.props;
            if (passRegister) {
                passRegister(reg.mobile, roles);
            }
        }
    }

    handleRejectRegister = (reg) => {
        return (reason) => {
            const { rejectRegister } = this.props;
            if (rejectRegister) {
                rejectRegister(reg.mobile, reason);
            }
        }
    }

    render() {
        const { registers } = this.props;
        return (<div className="row">
            {registers.map(({ register, confirmation }, index) => (
                <Register key={index}
                    data={register}
                    confirmation={confirmation}
                    onPass={this.handlePassRegister(register)}
                    onReject={this.handleRejectRegister(register)} />
            ))}
        </div>);
    }
}

export default connect(manageRegistersSelector, {
    passRegister,
    rejectRegister,
    registersInitialLoad
})(Registers);