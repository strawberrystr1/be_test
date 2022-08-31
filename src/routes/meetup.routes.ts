import { Router } from 'express'
import meetupController from '../meetup/controllers/meetup.controller'

const router = Router()

router.get('/', meetupController.getAll)
router.get('/:id', meetupController.getOne)
router.post('/', meetupController.createMeetup)
router.put('/:id', meetupController.update)
router.delete('/:id', meetupController.delete)

export default router