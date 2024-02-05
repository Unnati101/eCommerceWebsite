import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import { createProductController, deleteProductController, getProductController, getSingleProductController, productPhotoController, updateProductController } from '../controllers/productController.js';
import formidable from 'express-formidable'


const router =  express.Router()


//routes
router.route('/create-product')
.post(requireSignIn,
 isAdmin, formidable(),
  createProductController);

  router.route('/update-product/:pid')
.put(requireSignIn,
 isAdmin, formidable(),
  updateProductController);

//get products
router.route('/get-product' ).get(getProductController);

//get singlr product
router.route('/get-product/:slug').get(getSingleProductController);

//get photo
router.route('/product-photo/:pid').get(productPhotoController);

//delete product
router.route('/product/:pid').delete(deleteProductController);

export default router;