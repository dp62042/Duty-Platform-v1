// server.js (updated)
const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const dotenv = require('dotenv')
const QRCode = require('qrcode')

// Load env vars
dotenv.config()

// Import routes and middleware
const authRoutes = require('./routes/auth')
const attendanceRoutes = require('./routes/attendance')
const classRoutes = require('./routes/classes')
const sessionRoutes = require('./routes/sessions')
const errorHandler = require('./middleware/errorHandler')
const connectDB = require('./config/database')

// Import models
const Session = require('./models/Session')
const Class = require('./models/Class')
const Attendance = require('./models/Attendance')
const User = require('./models/User')

// Connect to database
connectDB()

const app = express()
const server = http.createServer(app)
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

// Security middleware
app.use(helmet())

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
})
app.use(limiter)

// Body parser middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Enable CORS
app.use(cors())

// Mount routes
app.use('/api/auth', authRoutes)
app.use('/api/attendance', attendanceRoutes)
app.use('/api/classes', classRoutes)
app.use('/api/sessions', sessionRoutes)

// Basic route for health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Duty API is running',
    timestamp: new Date().toISOString(),
  })
})

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  // Join a class session
  socket.on('join-session', async (data) => {
    try {
      const { sessionCode, registrationNumber, studentName } = data

      // Find active session
      const session = await Session.findOne({
        sessionCode,
        status: 'active',
      }).populate('class')

      if (!session) {
        socket.emit('join-error', {
          message: 'Session not found or not active',
        })
        return
      }

      // Get the class with enrolled students
      const classInfo = await Class.findById(session.class._id).populate(
        'enrolledStudents',
        'name registrationNumber'
      )

      if (!classInfo) {
        socket.emit('join-error', { message: 'Class not found' })
        return
      }

      // Check if student is enrolled in the class
      const isEnrolled = classInfo.enrolledStudents.some(
        (student) =>
          student.registrationNumber === registrationNumber &&
          student.name.toLowerCase() === studentName.toLowerCase()
      )

      if (!isEnrolled) {
        socket.emit('join-error', {
          message: 'Student not enrolled in this class or information mismatch',
        })
        return
      }

      // Find the student object
      const student = classInfo.enrolledStudents.find(
        (student) =>
          student.registrationNumber === registrationNumber &&
          student.name.toLowerCase() === studentName.toLowerCase()
      )

      // Check if attendance already marked
      const existingAttendance = await Attendance.findOne({
        session: session._id,
        student: student._id,
      })

      if (existingAttendance) {
        socket.emit('join-error', {
          message: 'Attendance already marked for this session',
        })
        return
      }

      // Create attendance record
      const attendance = await Attendance.create({
        session: session._id,
        student: student._id,
        registrationNumber,
        studentName: student.name,
        status: 'present',
      })

      // Add student to session's connected students
      session.connectedStudents.push(student._id)
      await session.save()

      // Join the socket room for this session
      socket.join(sessionCode)

      // Notify student of successful join
      socket.emit('join-success', {
        message: 'Attendance marked successfully',
        attendance,
      })

      // Notify faculty that a student has joined
      socket.to(sessionCode).emit('student-joined', {
        student: {
          name: student.name,
          registrationNumber: student.registrationNumber,
          joinedAt: new Date(),
        },
      })
    } catch (error) {
      console.error('Error joining session:', error)
      socket.emit('join-error', { message: 'Server error joining session' })
    }
  })

  // Handle QR code join request
  socket.on('qr-join', async (data) => {
    try {
      const { qrData } = data

      // Parse QR code data
      const { sessionCode, registrationNumber, studentName } =
        JSON.parse(qrData)

      // Find active session
      const session = await Session.findOne({
        sessionCode,
        status: 'active',
      }).populate('class')

      if (!session) {
        socket.emit('qr-join-error', {
          message: 'Session not found or not active',
        })
        return
      }

      // Get the class with enrolled students
      const classInfo = await Class.findById(session.class._id).populate(
        'enrolledStudents',
        'name registrationNumber'
      )

      if (!classInfo) {
        socket.emit('qr-join-error', { message: 'Class not found' })
        return
      }

      // Check if student is enrolled in the class
      const isEnrolled = classInfo.enrolledStudents.some(
        (student) =>
          student.registrationNumber === registrationNumber &&
          student.name.toLowerCase() === studentName.toLowerCase()
      )

      if (!isEnrolled) {
        socket.emit('qr-join-error', {
          message: 'Student not enrolled in this class or information mismatch',
        })
        return
      }

      // Find the student object
      const student = classInfo.enrolledStudents.find(
        (student) =>
          student.registrationNumber === registrationNumber &&
          student.name.toLowerCase() === studentName.toLowerCase()
      )

      // Check if attendance already marked
      const existingAttendance = await Attendance.findOne({
        session: session._id,
        student: student._id,
      })

      if (existingAttendance) {
        socket.emit('qr-join-error', {
          message: 'Attendance already marked for this session',
        })
        return
      }

      // Create attendance record
      const attendance = await Attendance.create({
        session: session._id,
        student: student._id,
        registrationNumber,
        studentName: student.name,
        status: 'present',
        joinedVia: 'qr_code', // Mark as joined via QR code
      })

      // Add student to session's connected students
      session.connectedStudents.push(student._id)
      await session.save()

      // Join the socket room for this session
      socket.join(sessionCode)

      // Notify student of successful join
      socket.emit('qr-join-success', {
        message: 'Attendance marked successfully via QR code',
        attendance,
      })

      // Notify faculty that a student has joined via QR code
      socket.to(sessionCode).emit('student-joined-qr', {
        student: {
          name: student.name,
          registrationNumber: student.registrationNumber,
          joinedAt: new Date(),
        },
      })
    } catch (error) {
      console.error('Error with QR join:', error)
      socket.emit('qr-join-error', {
        message: 'Server error processing QR join',
      })
    }
  })

  // Handle session ending
  socket.on('end-session', async (data) => {
    try {
      const { sessionCode } = data

      // Find and end the session
      const session = await Session.findOne({ sessionCode })

      if (!session) {
        socket.emit('end-session-error', { message: 'Session not found' })
        return
      }

      session.status = 'ended'
      session.endTime = new Date()
      await session.save()

      // Notify all connected students
      io.to(sessionCode).emit('session-ended', {
        message: 'Session has ended',
        endedAt: session.endTime,
      })

      // Leave the session room
      socket.leave(sessionCode)

      socket.emit('end-session-success', {
        message: 'Session ended successfully',
      })
    } catch (error) {
      console.error('Error ending session:', error)
      socket.emit('end-session-error', {
        message: 'Server error ending session',
      })
    }
  })

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

// Handle undefined routes (works in Express v4 and v5)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  })
})
// Error handler middleware (should be last)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`)
  // Close server & exit process
  server.close(() => {
    process.exit(1)
  })
})
