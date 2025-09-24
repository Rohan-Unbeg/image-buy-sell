import { express } from "express";
import { isAuthenticated, isSellor } from "../middlewares/auth";

const router = express.Router();

router.post("/create", isAuthenticated, isSellor, (req, res) => {
     
});

export default router;
