const express = require('express')
const {
  startSession,
  endSession,
  getFacultySessions,
  getSession,
} = require('../controllers/sessionController')
const { protect, authorize } = require('../middleware/auth')

const router = express.Router()

router.use(protect)

router.post('/start', authorize('faculty', 'admin'), startSession)
router.put('/end/:sessionId', authorize('faculty', 'admin'), endSession)
router.get('/faculty', authorize('faculty', 'admin'), getFacultySessions)
router.get('/:sessionId', authorize('faculty', 'admin'), getSession)

module.exports = router
