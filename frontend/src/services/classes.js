import api from './api'

export const classes = {
  // Get all classes
  getClasses: async () => {
    try {
      const response = await api.get('/classes')
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Get a specific class
  getClass: async (classId) => {
    try {
      const response = await api.get(`/classes/${classId}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Create a new class (admin/faculty only)
  createClass: async (classData) => {
    try {
      const response = await api.post('/classes', classData)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Update a class (admin/faculty only)
  updateClass: async (classId, classData) => {
    try {
      const response = await api.put(`/classes/${classId}`, classData)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Delete a class (admin only)
  deleteClass: async (classId) => {
    try {
      const response = await api.delete(`/classes/${classId}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Get students in a class
  getClassStudents: async (classId) => {
    try {
      const response = await api.get(`/classes/${classId}/students`)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Add student to class (admin/faculty only)
  addStudentToClass: async (classId, studentId) => {
    try {
      const response = await api.post(`/classes/${classId}/students`, {
        studentId,
      })
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Remove student from class (admin/faculty only)
  removeStudentFromClass: async (classId, studentId) => {
    try {
      const response = await api.delete(
        `/classes/${classId}/students/${studentId}`
      )
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },
}

export default classes
