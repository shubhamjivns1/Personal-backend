import { db } from "../config/db.js";

export const placeOrder = async (req, res) => {
    const { cart, address, paymentId, amount, razorpayOrderId } = req.body;

    try {
        // 1️⃣ Insert order
        const [orderResult] = await db.query(
            "INSERT INTO orders (payment_id, razorpay_order_id, amount) VALUES (?, ?, ?)",
            [paymentId, razorpayOrderId, amount]
        );

        const orderId = orderResult.insertId;

        // 2️⃣ Insert address
        await db.query(
            `INSERT INTO order_address 
      (order_id, name, phone, email, address, city, pincode)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                orderId,
                address.name,
                address.phone,
                address.email,
                address.address,
                address.city,
                address.pincode,
            ]
        );

        // 3️⃣ Insert items
        for (let item of cart) {
            await db.query(
                `INSERT INTO order_items 
        (order_id, product_id, name, price, quantity)
        VALUES (?, ?, ?, ?, ?)`,
                [
                    orderId,
                    item.product_id || item.id,
                    item.name,
                    item.price,
                    item.quantity,
                ]
            );
        }

        res.json({ message: "Order stored successfully", orderId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Order save failed" });
    }
};
