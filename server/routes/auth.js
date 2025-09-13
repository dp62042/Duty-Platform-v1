const express = require('express')
const {
  register,
  login,
  getProfile,
  updateProfile,
} = require('../controllers/authController')
const { protect } = require('../middleware/auth')
const {
  validateRegistration,
  validateLogin,
  validateProfileUpdate,
} = require('../middleware/validation')

const router = express.Router()

router.post('/register', validateRegistration, register)
router.post('/login', validateLogin, login)
router.get('/profile', protect, getProfile)
router.put('/profile', protect, validateProfileUpdate, updateProfile)

module.exports = router
