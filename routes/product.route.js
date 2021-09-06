const express = require('express');
const productController = require('../controllers/product.controller');

const router = express.Router();

router.get('/', productController.getAllProducts);
router.post('/', productController.setProduct);

module.exports = router;
