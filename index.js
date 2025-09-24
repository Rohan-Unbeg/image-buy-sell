import express from "express";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";

const app = express();
// (Request logger removed for production cleanliness)

// middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("content"));

const PORT = 1338;

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);

// Catch-all for unhandled routes (should be last)
app.use((req, res, next) => {
    res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT);
    connectDB();
});
