import express from 'express'
import { loginController, registerController, testController } from '../controllers/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

//router object

const router = express.Router()


//routing
//REGISTER || METHOD POST
router.route('/register').post(registerController);

//LOGIN POST 
router.route('/login').post(loginController);

//test routes
router.route('/test').get(isAdmin,requireSignIn,testController); //two middlewares present isAdmin and requireSignIn

export default router;