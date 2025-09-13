const express = require('express')
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController')
const { protect, authorize } = require('../middleware/auth')

const router = express.Router()

router.use(protect)
router.use(authorize('admin'))

router.route('/').get(getAllUsers)

router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser)

module.exports = router
