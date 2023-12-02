import express from 'express'
import { registerController } from '../controllers/authController.js'

//router object

const router = express.Router()


//routing
//REGISTER || METHOD POST
router.route('/register').post(registerController);

export default router