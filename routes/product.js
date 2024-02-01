const express = require("express");
const router = express.Router();
const productController = require('../controllers/products');
const {auth } =require('../controllers/auth')

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/',auth ,productController.postProduct);
router.put('/:id',auth ,productController.updateProduct);
router.delete('/:id', auth,productController.deleteProduct);


module.exports = router;