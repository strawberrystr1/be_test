import { Router } from 'express'
import userController from '../user/controllers/user.controller'

const router = Router()

router.post('/signup', userController.sigup)
router.post('/signin',userController.signin)

export default router