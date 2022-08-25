const Router = require('express').Router
const meetupController = require('../controllers/meetupController')

const router = new Router()

router.get('/', meetupController.getAll)
router.get('/:id', meetupController.getOne)
router.post('/', meetupController.createMeetup)
router.put('/:id', meetupController.update)
router.delete('/:id', meetupController.delete)

module.exports = router