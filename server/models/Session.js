// models/Session.js
const mongoose = require('mongoose')
const QRCode = require('qrcode')

const sessionSchema = new mongoose.Schema(
  {
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      required: true,
    },
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    startTime: {
      type: Date,
      default: Date.now,
    },
    endTime: Date,
    status: {
      type: String,
      enum: ['active', 'ended'],
      default: 'active',
    },
    sessionCode: {
      type: String,
      unique: true,
      required: false, // generated in pre-save
    },
    qrCode: {
      type: String, // Will store QR code as base64
      required: false, // generated in pre-save
    },
    qrCodeExpiry: {
      type: Date,
      required: false, // generated in pre-save
    },
    location: {
      type: String,
      default: 'Not specified',
    },
    connectedStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
)

// Generate session code and QR code before saving
sessionSchema.pre('save', async function (next) {
  if (this.isNew) {
    // Generate unique session code
    this.sessionCode = Math.random().toString(36).substring(2, 10).toUpperCase()

    // Generate QR code that expires in 15 minutes
    this.qrCodeExpiry = new Date(Date.now() + 15 * 60 * 1000)

    // Create QR code data
    const qrData = JSON.stringify({
      sessionCode: this.sessionCode,
      expiry: this.qrCodeExpiry,
      classId: this.class.toString(),
    })

    try {
      // Generate QR code as base64
      this.qrCode = await QRCode.toDataURL(qrData)
    } catch (error) {
      return next(error)
    }
  }
  next()
})

// Check if QR code is still valid
sessionSchema.methods.isQRValid = function () {
  return new Date() < this.qrCodeExpiry
}

// Refresh QR code
sessionSchema.methods.refreshQRCode = async function () {
  this.qrCodeExpiry = new Date(Date.now() + 15 * 60 * 1000)

  const qrData = JSON.stringify({
    sessionCode: this.sessionCode,
    expiry: this.qrCodeExpiry,
    classId: this.class.toString(),
  })

  this.qrCode = await QRCode.toDataURL(qrData)
  await this.save()
  return this.qrCode
}

module.exports = mongoose.model('Session', sessionSchema)
