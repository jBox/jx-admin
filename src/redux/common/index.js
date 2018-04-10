import Jwt from "./Jwt";

export const authenticate = () => {
    const token = Jwt.verify();
    if (token) {
        return { verified: true };
    }

    return { redirect: "/landing?returnUrl={0}" };
};