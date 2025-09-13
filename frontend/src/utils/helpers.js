import {
  USER_ROLES,
  ATTENDANCE_STATUS,
  STORAGE_KEYS,
  ERROR_MESSAGES,
} from './constants'

// Format date to readable string
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }

  return new Date(date).toLocaleDateString(undefined, {
    ...defaultOptions,
    ...options,
  })
}

// Format time to readable string
export const formatTime = (date, options = {}) => {
  const defaultOptions = {
    hour: '2-digit',
    minute: '2-digit',
  }

  return new Date(date).toLocaleTimeString(undefined, {
    ...defaultOptions,
    ...options,
  })
}

// Get user role display name
export const getRoleDisplayName = (role) => {
  const roleMap = {
    [USER_ROLES.STUDENT]: 'Student',
    [USER_ROLES.FACULTY]: 'Faculty',
    [USER_ROLES.ADMIN]: 'Administrator',
    [USER_ROLES.STAFF]: 'Staff',
  }

  return roleMap[role] || 'Unknown Role'
}

// Check if user has required role
export const hasRole = (user, requiredRole) => {
  return user?.role === requiredRole
}

// Check if user has any of the required roles
export const hasAnyRole = (user, requiredRoles = []) => {
  return requiredRoles.includes(user?.role)
}

// Get initials from name
export const getInitials = (name) => {
  if (!name) return 'U'

  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2)
}

// Calculate attendance percentage
export const calculateAttendancePercentage = (attendanceRecords) => {
  if (!attendanceRecords || attendanceRecords.length === 0) return 0

  const presentCount = attendanceRecords.filter(
    (record) => record.status === ATTENDANCE_STATUS.PRESENT
  ).length

  return Math.round((presentCount / attendanceRecords.length) * 100)
}

// Get current semester based on current date
export const getCurrentSemester = () => {
  const now = new Date()
  const month = now.getMonth() + 1 // JavaScript months are 0-indexed
  const year = now.getFullYear()

  // Assuming semesters:
  // Spring: January - May (1-5)
  // Summer: June - July (6-7)
  // Fall: August - December (8-12)
  if (month >= 1 && month <= 5) {
    return `Spring ${year}`
  } else if (month >= 6 && month <= 7) {
    return `Summer ${year}`
  } else {
    return `Fall ${year}`
  }
}

// Debounce function for limiting API calls
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Get error message from API response
export const getErrorMessage = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message
  }

  if (error.code === 'NETWORK_ERROR') {
    return ERROR_MESSAGES.NETWORK_ERROR
  }

  if (error.response?.status === 401) {
    return ERROR_MESSAGES.UNAUTHORIZED
  }

  if (error.response?.status === 404) {
    return ERROR_MESSAGES.NOT_FOUND
  }

  if (error.response?.status >= 500) {
    return ERROR_MESSAGES.SERVER_ERROR
  }

  return error.message || 'An unexpected error occurred'
}

// Get user from local storage
export const getStoredUser = () => {
  try {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER)
    return userStr ? JSON.parse(userStr) : null
  } catch (error) {
    console.error('Error parsing stored user:', error)
    return null
  }
}

// Get token from local storage
export const getStoredToken = () => {
  return localStorage.getItem(STORAGE_KEYS.TOKEN)
}

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate registration number format (example: 2023-CS-101)
export const isValidRegNumber = (regNumber) => {
  const regNumberRegex = /^\d{4}-[A-Z]{2}-\d{3,5}$/
  return regNumberRegex.test(regNumber)
}

// Generate random color based on string input
export const stringToColor = (string) => {
  let hash = 0
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    color += ('00' + value.toString(16)).substr(-2)
  }

  return color
}

// Capitalize first letter of each word
export const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase())
}

export default {
  formatDate,
  formatTime,
  getRoleDisplayName,
  hasRole,
  hasAnyRole,
  getInitials,
  calculateAttendancePercentage,
  getCurrentSemester,
  debounce,
  getErrorMessage,
  getStoredUser,
  getStoredToken,
  isValidEmail,
  isValidRegNumber,
  stringToColor,
  capitalizeWords,
}
