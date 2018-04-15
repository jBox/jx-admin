import { createSelector } from "reselect";

export default createSelector(
    (state) => state.manage.users,
    (state) => state.manage.roles,
    (state) => state.manage.status,
    (users, roles, status) => {

        return {
            users: users.map((user) => ({
                id: user.id,
                nickname: user.nickname,
                mobile: user.mobile,
                roles: user.roles.map((role) => (roles[role]))
            })),
            status: { ...(status[users] || {}) }
        };
    }
);
