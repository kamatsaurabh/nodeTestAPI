import { ApiFeatures } from '../middleware/apiFeature.js';
import { catchAsyncErrors } from '../middleware/catchAsyncErrors.js';
import { ErrorHandler } from '../middleware/error.js';
import Product from '../models/productModel.js';

// get all products
const getAllProducts = catchAsyncErrors(async (req, res) => {
    const resultPerPage = 8;
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter();

    const allProducts = await Product.find();

    const products = await apiFeature.query;

    res.status(200).json({ sucess: true, products, productCount });
})

// create a product
const createProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({ sucess: true, product: product });
})

// get a singleProduct details
const getSingleProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 406));
    }
    res.status(200).json({ sucess: true, product: product });
})

// update a product 
const updateProduct = catchAsyncErrors(async (req, res) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 500));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true, runValidators: true, useFindAndModify: false
    })
    res.status(200).json({ sucess: true, product });
})

// delete a product 
const deleteProduct = catchAsyncErrors(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 500));
    }

    product = await Product.deleteOne();

    res.status(200).json({ sucess: true, product });
})

export { getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProductDetails };