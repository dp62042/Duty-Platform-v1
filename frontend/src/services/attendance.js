import api from './api'

export const attendance = {
  // Mark attendance (public route)
  markAttendance: async (attendanceData) => {
    try {
      const response = await api.post('/attendance/mark', attendanceData)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Get attendance for a specific session (protected - faculty/admin)
  getSessionAttendance: async (sessionId) => {
    try {
      const response = await api.get(`/attendance/session/${sessionId}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Get attendance for a specific student (protected - faculty/admin)
  getStudentAttendance: async (studentId) => {
    try {
      const response = await api.get(`/attendance/student/${studentId}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Get attendance report for a class (protected - faculty/admin)
  getClassAttendanceReport: async (classId) => {
    try {
      const response = await api.get(`/attendance/class/${classId}/report`)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },
}

export default attendance
