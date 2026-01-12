import express from "express";
import {
    addToCart,
    getCart,
    removeFromCart
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addToCart);
router.get("/", protect, getCart);
router.delete("/:productId", protect, removeFromCart);

router.get("/guest", (req, res) => {
    res.json([]);
});


export default router;
