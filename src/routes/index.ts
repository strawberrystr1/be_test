import { Router } from 'express'
import meetupRoutes from './meetup.routes'

const router = Router()

router.use('/meetup', meetupRoutes)

export default router