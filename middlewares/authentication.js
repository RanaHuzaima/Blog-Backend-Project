import { validateToken } from "../utils/authentication.js";

function checkForAuthenticationByCookie(cookieName) {
    return (req, res, next) => {
        const cookieToken = req.cookies[cookieName];
        if (!cookieToken) {
            return next();
        }

        try {
            const userPayload = validateToken(cookieToken);
            req.user = userPayload;
        } catch (error) {
            console.error("Token validation error:", error);
        }
        next();
    };
}

export {
    checkForAuthenticationByCookie
};
