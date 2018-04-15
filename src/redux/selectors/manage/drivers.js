import { createSelector } from "reselect";

export default createSelector(
    (state) => state.manage.drivers,
    (drivers) => {
        const { data, status } = drivers;
        return {
            drivers: data.map((driver) => (
                {
                    ...driver,
                    status: status[driver.mobile] ? status[driver.mobile] : "init"
                }
            ))
        };
    }
);
