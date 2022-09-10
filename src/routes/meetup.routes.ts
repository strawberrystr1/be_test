import { Router } from 'express'
import passport from 'passport'

import meetupController from '../meetup/controllers/meetup.controller'
import { roleMiddleware } from '../middleware/role.middleware'

const router = Router()

router.get('/', meetupController.getAll)
router.get('/:id', meetupController.getOne)
router.post('/', passport.authenticate('jwt', { session: false }), roleMiddleware, meetupController.createMeetup)
router.put('/:id', passport.authenticate('jwt', { session: false }), roleMiddleware,  meetupController.update)
router.delete('/:id', passport.authenticate('jwt', { session: false }), roleMiddleware,  meetupController.delete)
router.put('/:id/assign', passport.authenticate('jwt', { session: false }),  meetupController.assignToMeetup)



export default router