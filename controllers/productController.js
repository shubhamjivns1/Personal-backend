import * as ProductModel from "../models/productModel.js";

/* GET ALL PRODUCTS */
export const getProducts = async (req, res) => {
    try {
        const products = await ProductModel.getAllProducts();
        res.json(products);
    } catch (error) {
        console.error("Get Products Error:", error);
        res.status(500).json([]);
    }
};

/* GET PRODUCT BY ID */
export const getProductById = async (req, res) => {
    try {
        const product = await ProductModel.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        console.error("Get Product Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

/* ADD PRODUCT */
export const addProduct = async (req, res) => {
    try {
        const id = await ProductModel.createProduct(req.body);
        res.status(201).json({ message: "Product added", id });
    } catch (error) {
        console.error("Add Product Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

/* UPDATE PRODUCT */
export const updateProduct = async (req, res) => {
    try {
        const affected = await ProductModel.updateProduct(req.params.id, req.body);
        if (!affected) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Product updated" });
    } catch (error) {
        console.error("Update Product Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

/* DELETE PRODUCT */
export const deleteProduct = async (req, res) => {
    try {
        const affected = await ProductModel.deleteProduct(req.params.id);
        if (!affected) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Product deleted" });
    } catch (error) {
        console.error("Delete Product Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

/* PRODUCT COUNT */
export const getProductsCount = async (req, res) => {
    try {
        const total = await ProductModel.getProductsCount();
        res.json({ total });
    } catch (error) {
        console.error("Product Count Error:", error);
        res.status(500).json({ total: 0 });
    }
};
