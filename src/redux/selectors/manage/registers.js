import { createSelector } from "reselect";

export default createSelector(
    (state) => state.manage.registers,
    (state) => state.manage.registerConfirmations,
    (registers, registerConfirmations) => {

        return {
            registers: registers.reduce((items, register) => {
                const confirmation = registerConfirmations[register.mobile] || "";
                return items.concat({ register, confirmation });
            }, [])
        };
    }
);
