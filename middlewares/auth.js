import { User } from "../models/userModel";
import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization; // Bearer <token>

        if (!authHeader) {
            return res.status(401).json({
                err: "authorization header not found",
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                err: "token not found",
            });
        }

        const decoded = jwt.verify(token, "SECRET MESSAGE");

        const user = await User.findOne({ where: { id: decoded.id } });
        if (!user) {
            return res.status(404).json({
                err: "user not found",
            });
        }
        req.user = user;

        // const a = {};
        // a.egg = 123;
        // a = { egg: 123 };

        next();
    } catch (error) {
        return res.status(500).send(e);
    }
};

const isSellor = async (req, res, next) => {
    if (req.user.dataValues.isSellor) {
        next();
    }
    else{
        res.status(401).json({err: "You are not a sellor"})
    }
};

export { isAuthenticated, isSellor };
