import express from "express";
import {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductsCount
} from "../controllers/productController.js";

const router = express.Router();

/* =======================
   PUBLIC ROUTES
======================= */

// GET ALL PRODUCTS
router.get("/", getProducts);

// PRODUCT COUNT
router.get("/count/all", getProductsCount);

// GET SINGLE PRODUCT
router.get("/:id", getProductById);

/* =======================
   ADMIN ROUTES
======================= */

// ADD PRODUCT
router.post("/", addProduct);

// UPDATE PRODUCT
router.put("/:id", updateProduct);

// DELETE PRODUCT
router.delete("/:id", deleteProduct);

export default router;
