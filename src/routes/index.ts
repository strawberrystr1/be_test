import { Router } from 'express'
import passport from 'passport'
import meetupRoutes from './meetup.routes'
import userRoutes from './user.routes'

const router = Router()

router.use('/meetup', meetupRoutes)
router.use('/user', userRoutes)

export default router