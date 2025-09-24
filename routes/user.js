import { express } from "express";
import { bcrypt } from "bcrypt";

const router = express.Router();

import {
    validateEmail,
    validateName,
    validatePassword,
} from "../utils/validators.js";
import { User } from "../models/userModel.js";

router.post("/signup", async (req, res) => {
    try {
        const { name, email, password, isSellor } = req.body;

        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(403).json({ err: "User already exists" });
        }

        if (!validateName(name)) {
            return res.status(400).json({ err: "Name validation failed" });
        }
        if (!validateEmail(email)) {
            return res.status(400).json({ err: "Name validation failed" });
        }
        if (!validatePassword(password)) {
            return res.status(400).json({ err: "Name validation failed" });
        }

        // const hashedPassword = await bcrypt.hash(password, (saltOrRounds=10));
        const hashedPassword = await bcrypt.hash(password);

        const user = {
            email,
            name,
            isSellor,
            password: hashedPassword,
        };

        const createdUser = await User.create(user);

        return res.status(201).json({
            message: `Welcome ${createdUser.name}`,
        });
    } catch (error) {
        return res.status(500).send(e);
    }
});

export default router;
