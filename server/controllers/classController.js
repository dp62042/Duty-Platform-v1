const Class = require('../models/Class')
const User = require('../models/User')
const FacultyAssignment = require('../models/FacultyAssignment')

// Create a new class (admin only)
exports.createClass = async (req, res, next) => {
  try {
    const {
      className,
      section,
      subject,
      courseCode,
      assignedFaculty,
      schedule,
      description,
    } = req.body

    // Validate required fields
    if (!className || !section || !subject || !courseCode || !assignedFaculty) {
      return res.status(400).json({
        success: false,
        message:
          'ClassName, section, subject, courseCode, and assignedFaculty are required',
      })
    }

    // Check if faculty exists and is actually a faculty member
    const faculty = await User.findById(assignedFaculty)
    if (!faculty || faculty.role !== 'faculty') {
      return res.status(400).json({
        success: false,
        message: 'Assigned faculty must be a valid faculty member',
      })
    }

    // Check if class with same name, section and subject already exists
    const existingClass = await Class.findOne({
      className: className.trim(),
      section: section.trim(),
      subject: subject.trim(),
    })

    if (existingClass) {
      return res.status(409).json({
        success: false,
        message: 'Class with the same name, section and subject already exists',
      })
    }

    // Create the new class
    const newClass = await Class.create({
      className: className.trim(),
      section: section.trim(),
      subject: subject.trim(),
      courseCode: courseCode.trim(),
      assignedFaculty,
      schedule: schedule || {},
      description: description || '',
      enrolledStudents: [], // Start with empty student list
    })

    // Populate the faculty information in the response
    const populatedClass = await Class.findById(newClass._id).populate(
      'assignedFaculty',
      'name email'
    )

    res.status(201).json({
      success: true,
      message: 'Class created successfully',
      data: populatedClass,
    })
  } catch (error) {
    next(error)
  }
}

// Add students to a class (admin only)
exports.addStudentsToClass = async (req, res, next) => {
  try {
    const { classId } = req.params
    const { studentIds, registrationNumbers } = req.body

    // Check if class exists
    const classInfo = await Class.findById(classId)
    if (!classInfo) {
      return res.status(404).json({
        success: false,
        message: 'Class not found',
      })
    }

    let studentsToAdd = []

    // If student IDs are provided
    if (studentIds && studentIds.length > 0) {
      // Verify all students exist and are actually students
      const students = await User.find({
        _id: { $in: studentIds },
        role: 'student',
      })

      if (students.length !== studentIds.length) {
        return res.status(400).json({
          success: false,
          message: 'One or more student IDs are invalid or not students',
        })
      }

      studentsToAdd = [...studentsToAdd, ...studentIds]
    }

    // If registration numbers are provided
    if (registrationNumbers && registrationNumbers.length > 0) {
      // Find students by registration numbers
      const students = await User.find({
        registrationNumber: { $in: registrationNumbers },
        role: 'student',
      })

      if (students.length !== registrationNumbers.length) {
        return res.status(400).json({
          success: false,
          message:
            'One or more registration numbers are invalid or not students',
        })
      }

      const studentIdsFromReg = students.map((student) => student._id)
      studentsToAdd = [...studentsToAdd, ...studentIdsFromReg]
    }

    // Remove duplicates
    const uniqueStudentsToAdd = [
      ...new Set(studentsToAdd.map((id) => id.toString())),
    ]

    // Add students to class (using $addToSet to prevent duplicates)
    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      {
        $addToSet: {
          enrolledStudents: { $each: uniqueStudentsToAdd },
        },
      },
      { new: true, runValidators: true }
    ).populate('enrolledStudents', 'name registrationNumber email')

    res.json({
      success: true,
      message: 'Students added to class successfully',
      data: updatedClass,
    })
  } catch (error) {
    next(error)
  }
}

// Remove students from a class (admin only)
exports.removeStudentsFromClass = async (req, res, next) => {
  try {
    const { classId } = req.params
    const { studentIds } = req.body

    // Check if class exists
    const classInfo = await Class.findById(classId)
    if (!classInfo) {
      return res.status(404).json({
        success: false,
        message: 'Class not found',
      })
    }

    // Remove students from class
    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      {
        $pull: {
          enrolledStudents: { $in: studentIds },
        },
      },
      { new: true, runValidators: true }
    ).populate('enrolledStudents', 'name registrationNumber email')

    res.json({
      success: true,
      message: 'Students removed from class successfully',
      data: updatedClass,
    })
  } catch (error) {
    next(error)
  }
}

// Get enrolled students in a class
exports.getEnrolledStudents = async (req, res, next) => {
  try {
    const { classId } = req.params

    const classInfo = await Class.findById(classId)
      .populate('enrolledStudents', 'name registrationNumber email')
      .select('enrolledStudents className section')

    if (!classInfo) {
      return res.status(404).json({
        success: false,
        message: 'Class not found',
      })
    }

    res.json({
      success: true,
      data: {
        class: {
          _id: classInfo._id,
          className: classInfo.className,
          section: classInfo.section,
        },
        students: classInfo.enrolledStudents,
      },
    })
  } catch (error) {
    next(error)
  }
}

// Get all classes
exports.getClasses = async (req, res, next) => {
  try {
    const { facultyId } = req.query

    let query = {}

    if (facultyId) {
      query.assignedFaculty = facultyId
    }

    const classes = await Class.find(query)
      .populate('assignedFaculty', 'name email')
      .populate('enrolledStudents', 'name registrationNumber')

    res.json({
      success: true,
      count: classes.length,
      data: classes,
    })
  } catch (error) {
    next(error)
  }
}

// Get class by ID
exports.getClass = async (req, res, next) => {
  try {
    const { classId } = req.params

    const classInfo = await Class.findById(classId)
      .populate('assignedFaculty', 'name email')
      .populate('enrolledStudents', 'name registrationNumber')

    if (!classInfo) {
      return res.status(404).json({
        success: false,
        message: 'Class not found',
      })
    }

    res.json({
      success: true,
      data: classInfo,
    })
  } catch (error) {
    next(error)
  }
}

// Update a class
exports.updateClass = async (req, res, next) => {
  try {
    const { classId } = req.params

    const classInfo = await Class.findByIdAndUpdate(classId, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('assignedFaculty', 'name email')
      .populate('enrolledStudents', 'name registrationNumber')

    if (!classInfo) {
      return res.status(404).json({
        success: false,
        message: 'Class not found',
      })
    }

    res.json({
      success: true,
      message: 'Class updated successfully',
      data: classInfo,
    })
  } catch (error) {
    next(error)
  }
}

// Assign proxy faculty
exports.assignProxyFaculty = async (req, res, next) => {
  try {
    const { classId } = req.params
    const { proxyFacultyId, date, reason } = req.body
    const assignedBy = req.user.id

    // Check if class exists
    const classInfo = await Class.findById(classId)

    if (!classInfo) {
      return res.status(404).json({
        success: false,
        message: 'Class not found',
      })
    }

    // Check if proxy assignment already exists for this date
    const existingAssignment = await FacultyAssignment.findOne({
      class: classId,
      date: new Date(date),
    })

    if (existingAssignment) {
      return res.status(400).json({
        success: false,
        message: 'Proxy faculty already assigned for this date',
      })
    }

    const assignment = await FacultyAssignment.create({
      class: classId,
      originalFaculty: classInfo.assignedFaculty,
      proxyFaculty: proxyFacultyId,
      assignedBy,
      date: new Date(date),
      reason,
    })

    res.status(201).json({
      success: true,
      message: 'Proxy faculty assigned successfully',
      data: assignment,
    })
  } catch (error) {
    next(error)
  }
}
