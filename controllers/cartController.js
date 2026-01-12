import { db } from "../config/db.js";

/* ================= ADD TO CART ================= */
export const addToCart = async (req, res) => {
    const { productId, quantity = 1 } = req.body;
    const userId = req.userId;

    try {
        // Check if product already in cart
        const [existing] = await db.query(
            "SELECT * FROM cart WHERE user_id = ? AND product_id = ?",
            [userId, productId]
        );

        if (existing.length) {
            // Update quantity
            await db.query(
                "UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?",
                [quantity, userId, productId]
            );
        } else {
            // Insert new
            await db.query(
                "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)",
                [userId, productId, quantity]
            );
        }

        res.json({ message: "Added to cart" });
    } catch (err) {
        console.error("Add to cart error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

/* ================= GET CART ================= */
export const getCart = async (req, res) => {
    const userId = req.userId;

    try {
        const [cartItems] = await db.query(
            `
      SELECT 
        c.id AS cartId,
        c.quantity,
        p.id,
        p.name,
        p.price,
        p.image
      FROM cart c
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = ?
      `,
            [userId]
        );

        res.json(cartItems);
    } catch (err) {
        console.error("Get cart error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

/* ================= REMOVE FROM CART ================= */
export const removeFromCart = async (req, res) => {
    const userId = req.userId;
    const { productId } = req.params;

    try {
        await db.query(
            "DELETE FROM cart WHERE user_id = ? AND product_id = ?",
            [userId, productId]
        );

        res.json({ message: "Item removed" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
