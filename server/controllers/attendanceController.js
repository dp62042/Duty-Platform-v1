const Attendance = require('../models/Attendance')
const Session = require('../models/Session')
const Class = require('../models/Class')

// Mark attendance for a student
exports.markAttendance = async (req, res, next) => {
  try {
    const { sessionCode, registrationNumber, studentName } = req.body

    // Find active session
    const session = await Session.findOne({
      sessionCode,
      status: 'active',
    }).populate('class')

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found or not active',
      })
    }

    // Get the class with enrolled students
    const classInfo = await Class.findById(session.class._id).populate(
      'enrolledStudents',
      'name registrationNumber'
    )

    if (!classInfo) {
      return res.status(404).json({
        success: false,
        message: 'Class not found',
      })
    }

    // Check if student is enrolled in the class
    const isEnrolled = classInfo.enrolledStudents.some(
      (student) =>
        student.registrationNumber === registrationNumber &&
        student.name.toLowerCase() === studentName.toLowerCase()
    )

    if (!isEnrolled) {
      return res.status(403).json({
        success: false,
        message: 'Student not enrolled in this class or information mismatch',
      })
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
      return res.status(400).json({
        success: false,
        message: 'Attendance already marked for this session',
      })
    }

    // Create attendance record
    const attendance = await Attendance.create({
      session: session._id,
      student: student._id,
      registrationNumber,
      studentName: student.name, // Use the name from database for consistency
      status: 'present',
    })

    // Populate the attendance record with session and student info
    const populatedAttendance = await Attendance.findById(attendance._id)
      .populate('session', 'sessionCode startTime')
      .populate('student', 'name registrationNumber')

    res.status(201).json({
      success: true,
      message: 'Attendance marked successfully',
      data: populatedAttendance,
    })
  } catch (error) {
    next(error)
  }
}

// Mark attendance for a student
exports.markAttendance = async (req, res, next) => {
  try {
    const { sessionCode, registrationNumber, studentName } = req.body

    // Find active session
    const session = await Session.findOne({
      sessionCode,
      status: 'active',
    }).populate('class')

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found or not active',
      })
    }

    // Check if student is enrolled in the class
    const classInfo = await Class.findById(session.class._id).populate(
      'enrolledStudents'
    )
    const student = classInfo.enrolledStudents.find(
      (student) =>
        student.registrationNumber === registrationNumber &&
        student.name.toLowerCase() === studentName.toLowerCase()
    )

    if (!student) {
      return res.status(403).json({
        success: false,
        message: 'Student not enrolled in this class or information mismatch',
      })
    }

    // Check if attendance already marked
    const existingAttendance = await Attendance.findOne({
      session: session._id,
      student: student._id,
    })

    if (existingAttendance) {
      return res.status(400).json({
        success: false,
        message: 'Attendance already marked for this session',
      })
    }

    // Create attendance record
    const attendance = await Attendance.create({
      session: session._id,
      student: student._id,
      registrationNumber,
      studentName,
      status: 'present',
    })

    res.status(201).json({
      success: true,
      message: 'Attendance marked successfully',
      data: attendance,
    })
  } catch (error) {
    next(error)
  }
}

// Get attendance for a session
exports.getSessionAttendance = async (req, res, next) => {
  try {
    const { sessionId } = req.params

    const attendance = await Attendance.find({ session: sessionId })
      .populate('student', 'name registrationNumber')
      .populate({
        path: 'session',
        populate: {
          path: 'class',
          select: 'className section subject',
        },
      })

    res.json({
      success: true,
      count: attendance.length,
      data: attendance,
    })
  } catch (error) {
    next(error)
  }
}

// Get student attendance history
exports.getStudentAttendance = async (req, res, next) => {
  try {
    const { studentId } = req.params
    const { startDate, endDate } = req.query

    let query = { student: studentId }

    // Add date filter if provided
    if (startDate && endDate) {
      query.markedAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      }
    }

    const attendance = await Attendance.find(query)
      .populate({
        path: 'session',
        populate: {
          path: 'class',
          select: 'className section subject',
        },
      })
      .sort({ markedAt: -1 })

    res.json({
      success: true,
      count: attendance.length,
      data: attendance,
    })
  } catch (error) {
    next(error)
  }
}

// Get class attendance report
exports.getClassAttendanceReport = async (req, res, next) => {
  try {
    const { classId } = req.params
    const { startDate, endDate } = req.query

    // Find all sessions for this class in the date range
    let sessionQuery = { class: classId }

    if (startDate && endDate) {
      sessionQuery.startTime = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      }
    }

    const sessions = await Session.find(sessionQuery).select('_id')

    const sessionIds = sessions.map((session) => session._id)

    // Get attendance for these sessions
    const attendance = await Attendance.find({ session: { $in: sessionIds } })
      .populate('student', 'name registrationNumber')
      .populate({
        path: 'session',
        select: 'startTime',
      })

    // Group by student for report
    const report = {}
    attendance.forEach((record) => {
      const studentId = record.student._id.toString()
      if (!report[studentId]) {
        report[studentId] = {
          student: record.student,
          totalSessions: 0,
          attended: 0,
          attendance: [],
        }
      }

      report[studentId].totalSessions++
      if (record.status === 'present') {
        report[studentId].attended++
      }

      report[studentId].attendance.push({
        date: record.session.startTime,
        status: record.status,
      })
    })

    res.json({
      success: true,
      data: Object.values(report),
    })
  } catch (error) {
    next(error)
  }
}
