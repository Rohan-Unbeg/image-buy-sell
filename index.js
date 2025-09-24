import express from "express";
import { connectDB } from "./config/db.js";
import { userRoutes } from "./routes/user.js";

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("content"));

const PORT = 1338;

app.use("api/v1/user", userRoutes);

app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT);
    connectDB();
});
