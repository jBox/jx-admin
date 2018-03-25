import { createSelector } from "reselect";

export default createSelector(
    (state) => state.manage.registers,
    (registers) => {
        return { registers };
    }
);
