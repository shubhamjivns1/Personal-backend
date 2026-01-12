import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// MySQL
import { db as mysqlDB } from "./config/db.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";


// Routes
import adminAuth from "./middleware/adminAuth.js";
import productRoutes from "./routes/ProductRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";



dotenv.config();

const app = express();

/* =======================
   MIDDLEWARES
======================= */
app.use(express.json());

app.use(
    cors({
        origin: [

            "http://localhost:5174",
            "http://localhost:5173",
            "https://vivensaa.com",
            "https://seller.vivensaa.com"
        ],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

/* =======================
   DATABASE CHECK
======================= */
// MySQL Test
mysqlDB
    .getConnection()
    .then((connection) => {
        console.log("✅ MySQL Database Connected");
        connection.release();
    })
    .catch((error) => {
        console.error("❌ MySQL DB Error:", error);
    });

/* =======================
   ROUTES
======================= */
// Admin (MongoDB)
app.use("/api/admin", adminAuth);

// Products (MongoDB / Shared)
app.use("/api/products", productRoutes);
// User Features (MySQL)
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
/* =======================
   HEALTH CHECK
======================= */
app.get("/", (req, res) => {
    res.send("🚀 Unified Backend Running (MySQL)");
});

/* =======================
   SERVER
======================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🔥 Server running on port ${PORT}`);
});