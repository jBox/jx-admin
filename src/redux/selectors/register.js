import { createSelector } from "reselect";

export default createSelector(
    (state) => state.register,
    (register) => {
        return { ...register };
    }
);
