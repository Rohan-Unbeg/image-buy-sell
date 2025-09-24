import express from "express";
import { isAuthenticated, isSellor } from "../middlewares/auth.js";
import { upload } from "../utils/fileUpload.js";

const router = express.Router();

router.post("/create", isAuthenticated, isSellor, (req, res) => {
    upload(req, res, async (err) => {
        try {
            if (err) {
                return res.status(500).send(err);
            }
            const { name, price } = req.body;
            if (!name || !price || !req.file) {
                return res.status(400).json({
                    err: "all fields are required all 3",
                });
            }
            const parsedPrice = parseFloat(price);
            if (isNaN(parsedPrice)) {
                return res.status(400).json({
                    err: "price should be number",
                });
            }
            let productDetails = {
                name,
                price,
                content: req.file.path,
            };
            return res.status(200).json({
                staus: "ok",
                productDetails,
            });
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    });
});

export default router;
