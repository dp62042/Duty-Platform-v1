const express = require('express')
const {
  markAttendance,
  getSessionAttendance,
  getStudentAttendance,
  getClassAttendanceReport,
} = require('../controllers/attendanceController')
const { protect, authorize } = require('../middleware/auth')

const router = express.Router()

// Public route for students to mark attendance
router.post('/mark', markAttendance)

// Protected routes
router.use(protect)

router.get(
  '/session/:sessionId',
  authorize('faculty', 'admin'),
  getSessionAttendance
)
router.get(
  '/student/:studentId',
  authorize('faculty', 'admin'),
  getStudentAttendance
)
router.get(
  '/class/:classId/report',
  authorize('faculty', 'admin'),
  getClassAttendanceReport
)

module.exports = router
