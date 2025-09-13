// In models/Class.js

const mongoose = require('mongoose')

const classSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: [true, 'Class name is required'],
      trim: true,
      maxlength: [100, 'Class name cannot exceed 100 characters'],
    },
    section: {
      type: String,
      required: [true, 'Section is required'],
      trim: true,
      maxlength: [10, 'Section cannot exceed 10 characters'],
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
      maxlength: [100, 'Subject cannot exceed 100 characters'],
    },
    courseCode: {
      type: String,
      required: [true, 'Course code is required'],
      trim: true,
      uppercase: true,
      maxlength: [20, 'Course code cannot exceed 20 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    assignedFaculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Assigned faculty is required'],
    },
    schedule: {
      days: [
        {
          type: String,
          enum: {
            values: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
            message: '{VALUE} is not a valid day',
          },
        },
      ],
      startTime: {
        type: String,
        validate: {
          validator: function (v) {
            return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v)
          },
          message: 'Start time must be in HH:MM format',
        },
      },
      endTime: {
        type: String,
        validate: {
          validator: function (v) {
            return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v)
          },
          message: 'End time must be in HH:MM format',
        },
      },
    },
  },
  {
    timestamps: true,
  }
)

// Compound index to ensure unique combination of className, section, and subject
classSchema.index({ className: 1, section: 1, subject: 1 }, { unique: true })

module.exports = mongoose.model('Class', classSchema)
