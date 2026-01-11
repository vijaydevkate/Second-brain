import { JWT_PASSWORD } from './config.js';
import jwt from "jsonwebtoken";
export const userMiddleware = (req, res, next) => {
    const header = req.header("authorization");
    const decode = jwt.verify(header, JWT_PASSWORD);
    if (decode) {
        //@ts-ignore
        req.userId = decode.id;
        next();
    }
    else {
        res.status(300).json({
            message: "You are not logged in"
        });
    }
};
//# sourceMappingURL=middleware.js.map