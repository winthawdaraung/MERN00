import express from "express";
import { getAllProducts, createProduct, deleteProduct, updateProduct, getProductById } from "../controller/product.controller.js";
const router = express.Router();

router.get("/", getAllProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/:id", getProductById);

export default router;
