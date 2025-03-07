import express from 'express';
import { addProducts, deleteProductById, getProducts, getProductsById, updateProductById } from '../Controllers/product.js';

const router = express.Router();

//! Add Product
router.post('/add', addProducts)

//! get all products
router.get('/all', getProducts)

//! get product by Id
router.get('/:id', getProductsById)

//! Update Product by id
router.put('/:id', updateProductById)

//! Delete Product by id
router.delete('/:id', deleteProductById)

export default router