import Jwt from "./Jwt";

module.exports.authenticate = () => {
    const token = Jwt.verify();
    if (token) {
        return { verified: true };
    }

    return { redirect: "/login" };
};