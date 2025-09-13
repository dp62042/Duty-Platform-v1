// In routes/classes.js

const express = require('express')
const {
  getClasses,
  getClass,
  createClass,
  updateClass,
  addStudentsToClass,
  removeStudentsFromClass,
  getEnrolledStudents,
  assignProxyFaculty,
} = require('../controllers/classController')
const { protect, authorize } = require('../middleware/auth')
const { validateCreateClass } = require('../middleware/validation') // Import the validation

const router = express.Router()

router.use(protect)

router.get('/', getClasses)
router.get('/:classId', getClass)
router.post('/', authorize('admin'), validateCreateClass, createClass) // Add validation middleware
router.put('/:classId', authorize('admin'), updateClass)

// Student management routes
router.post('/:classId/students', authorize('admin'), addStudentsToClass)
router.delete('/:classId/students', authorize('admin'), removeStudentsFromClass)
router.get(
  '/:classId/students',
  authorize('admin', 'faculty'),
  getEnrolledStudents
)

// Proxy faculty assignment
router.post('/:classId/proxy', authorize('admin'), assignProxyFaculty)

module.exports = router
