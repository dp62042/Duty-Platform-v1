const User = require('../models/User')
const { generateToken } = require('../utils/generateToken')
const { validationResult } = require('express-validator')

// Register new user
exports.register = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      })
    }

    const {
      name,
      registrationNumber,
      email,
      password,
      role,
      interests,
      goals,
      preferredTone,
    } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { registrationNumber }],
    })

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email or registration number',
      })
    }

    // Create new user
    const user = await User.create({
      name,
      registrationNumber,
      email,
      password,
      role,
      interests: interests || [],
      goals: goals || '',
      preferredTone: preferredTone || 'formal',
    })

    // Generate token
    const token = generateToken(user._id)

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      token,
      user,
    })
  } catch (error) {
    next(error)
  }
}

// Login user
exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      })
    }

    const { emailOrRegNumber, password } = req.body

    // Find user by email or registration number
    const user = await User.findOne({
      $or: [
        { email: emailOrRegNumber },
        { registrationNumber: emailOrRegNumber },
      ],
    })

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      })
    }

    // Generate token
    const token = generateToken(user._id)

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user,
    })
  } catch (error) {
    next(error)
  }
}

// Get current user profile
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    res.json({
      success: true,
      user,
    })
  } catch (error) {
    next(error)
  }
}

// Update user profile
exports.updateProfile = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      })
    }

    const { name, interests, goals, preferredTone } = req.body

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, interests, goals, preferredTone },
      { new: true, runValidators: true }
    )

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user,
    })
  } catch (error) {
    next(error)
  }
}
