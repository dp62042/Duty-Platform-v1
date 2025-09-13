const { body, param } = require('express-validator')

// Validation for creating a class
exports.validateCreateClass = [
  body('className')
    .trim()
    .notEmpty()
    .withMessage('Class name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Class name must be between 2 and 100 characters'),

  body('section')
    .trim()
    .notEmpty()
    .withMessage('Section is required')
    .isLength({ max: 10 })
    .withMessage('Section must be at most 10 characters'),

  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Subject must be between 2 and 100 characters'),

  body('courseCode')
    .trim()
    .notEmpty()
    .withMessage('Course code is required')
    .isLength({ max: 20 })
    .withMessage('Course code must be at most 20 characters'),

  body('assignedFaculty')
    .isMongoId()
    .withMessage('Valid faculty ID is required'),

  body('schedule.days')
    .optional()
    .isArray()
    .withMessage('Schedule days must be an array'),

  body('schedule.days.*')
    .optional()
    .isIn([
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ])
    .withMessage('Invalid day in schedule'),

  body('schedule.startTime')
    .optional()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Start time must be in HH:MM format'),

  body('schedule.endTime')
    .optional()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('End time must be in HH:MM format'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must be at most 500 characters'),
]

// Validation rules for registration
exports.validateRegistration = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),

  body('registrationNumber')
    .trim()
    .notEmpty()
    .withMessage('Registration number is required'),

  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  body('role')
    .isIn(['student', 'faculty', 'staff', 'admin'])
    .withMessage('Invalid role selected'),
]

// Validation rules for login
exports.validateLogin = [
  body('emailOrRegNumber')
    .trim()
    .notEmpty()
    .withMessage('Email or registration number is required'),

  body('password').notEmpty().withMessage('Password is required'),
]

// Validation rules for profile update
exports.validateProfileUpdate = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),

  body('preferredTone')
    .optional()
    .isIn(['formal', 'informal', 'casual'])
    .withMessage('Invalid tone selection'),
]

// Validation for adding students to class
exports.validateAddStudents = [
  param('classId').isMongoId().withMessage('Invalid class ID'),

  body('studentIds')
    .optional()
    .isArray()
    .withMessage('studentIds must be an array'),

  body('studentIds.*')
    .optional()
    .isMongoId()
    .withMessage('Invalid student ID in array'),

  body('registrationNumbers')
    .optional()
    .isArray()
    .withMessage('registrationNumbers must be an array'),

  body('registrationNumbers.*')
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Registration numbers cannot be empty'),
]

// Validation for removing students from class
exports.validateRemoveStudents = [
  param('classId').isMongoId().withMessage('Invalid class ID'),

  body('studentIds').isArray().withMessage('studentIds must be an array'),

  body('studentIds.*').isMongoId().withMessage('Invalid student ID in array'),
]
