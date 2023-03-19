import express from "express";
import { createProduct, deleteProduct, getAllProducts, getSingleProductDetails, updateProduct } from "../controller/productController.js";

const router = express.Router();

// Get all products list
router.route("/products").get(getAllProducts);

// Create a product
router.route("/products/new").post(createProduct);

// Get single Product , update single product and delete single product based on id 
router.route("/products/:id")
    .get(getSingleProductDetails)
    .put(updateProduct)
    .delete(deleteProduct);

export default router;