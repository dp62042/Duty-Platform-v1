// models/Attendance.js
const mongoose = require('mongoose')

const attendanceSchema = new mongoose.Schema(
  {
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Session',
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    registrationNumber: {
      type: String,
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    markedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['present', 'absent', 'late'],
      default: 'present',
    },
    joinedVia: {
      type: String,
      enum: ['direct', 'qr_code'],
      default: 'direct',
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

// Compound index to prevent duplicate attendance records
attendanceSchema.index({ session: 1, student: 1 }, { unique: true })

module.exports = mongoose.model('Attendance', attendanceSchema)
