import express from "express";
import { getAllProducts, createProduct, deleteProduct, updateProduct, getProductById } from "../controller/product.controller.js";
const router = express.Router();

router.get("/", getAllProducts);

router.post("/", createProduct);

router.delete("/:id", deleteProduct);

router.put("/:id", updateProduct);

router.get("/:id", getProductById);
export default router;
