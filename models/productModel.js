// productModel.js
import { db } from "../config/db.js";

/* ===== Create Product ===== */
export const createProduct = async (data) => {
    const {
        name,
        brand,
        price,
        mrp,
        discount,
        category,
        stock,
        description,
        image,
        images,
        specs,
    } = data;

    const [result] = await db.query(
        `INSERT INTO products 
    (name, brand, price, mrp, discount, category, stock, description, image, images, specs)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            name,
            brand,
            price,
            mrp,
            discount,
            category,
            stock,
            description,
            image,
            JSON.stringify(images || []),
            JSON.stringify(specs || {}),
        ]
    );

    return result.insertId;
};

/* ===== Get Products Count ===== */
export const getProductsCount = async () => {
    const [rows] = await db.query(`SELECT COUNT(*) AS total FROM products`);
    return rows[0].total;
};


/* ===== Get All Products ===== */
export const getAllProducts = async () => {
    const [rows] = await db.query(`SELECT * FROM products`);

    return rows.map((row) => {
        let images = [];
        let specs = {};

        try {
            images = row.images ? JSON.parse(row.images) : [];
        } catch (e) {
            images = [];
        }

        try {
            specs = row.specs ? JSON.parse(row.specs) : {};
        } catch (e) {
            specs = {};
        }

        return {
            ...row,
            images,
            specs,
        };
    });
};



/* ===== Get Product by ID ===== */
export const getProductById = async (id) => {
    const [rows] = await db.query(
        `SELECT * FROM products WHERE id = ?`,
        [id]
    );

    if (!rows.length) return null;

    const product = rows[0];

    let images = [];
    let specs = {};

    try {
        images = product.images ? JSON.parse(product.images) : [];
    } catch { }
    try {
        specs = product.specs ? JSON.parse(product.specs) : {};
    } catch { }

    return {
        ...product,
        images,
        specs,
    };
};


/* ===== Update Product ===== */
export const updateProduct = async (id, data) => {
    const {
        name,
        brand,
        price,
        mrp,
        discount,
        category,
        stock,
        description,
        image,
        images,
        specs,
    } = data;

    const [result] = await db.query(
        `UPDATE products SET
      name=?,
      brand=?,
      price=?,
      mrp=?,
      discount=?,
      category=?,
      stock=?,
      description=?,
      image=?,
      images=?,
      specs=?
     WHERE id=?`,
        [
            name,
            brand,
            price,
            mrp,
            discount,
            category,
            stock,
            description,
            image,
            JSON.stringify(images || []),
            JSON.stringify(specs || {}),
            id,
        ]
    );

    return result.affectedRows;
};

/* ===== Delete Product ===== */
export const deleteProduct = async (id) => {
    const [result] = await db.query(
        `DELETE FROM products WHERE id = ?`,
        [id]
    );
    return result.affectedRows;
};
