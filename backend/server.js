import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import path from "path";

import productRouter from "./routes/product.route.js";
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

const __dirname = path.resolve();
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/build")));
    app.get("*", (req, res) => {    
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    });
} else {
    app.get("/", (req, res) => {
        res.send("API is running...");
    });
}

app.use("/api/products", productRouter);
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running at http://localhost:${PORT}`);
});
