// User roles
export const USER_ROLES = {
  STUDENT: 'student',
  FACULTY: 'faculty',
  ADMIN: 'admin',
  STAFF: 'staff',
}

// Attendance status
export const ATTENDANCE_STATUS = {
  PRESENT: 'present',
  ABSENT: 'absent',
  LATE: 'late',
  EXCUSED: 'excused',
}

// Class types
export const CLASS_TYPES = {
  LECTURE: 'lecture',
  LAB: 'lab',
  TUTORIAL: 'tutorial',
  SEMINAR: 'seminar',
}

// Days of the week
export const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

// Time slots
export const TIME_SLOTS = [
  '8:00 - 9:00',
  '9:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '12:00 - 13:00',
  '13:00 - 14:00',
  '14:00 - 15:00',
  '15:00 - 16:00',
  '16:00 - 17:00',
]

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
  },
  CLASSES: {
    BASE: '/classes',
    STUDENTS: '/classes/:id/students',
  },
  ATTENDANCE: {
    MARK: '/attendance/mark',
    SESSION: '/attendance/session/:sessionId',
    STUDENT: '/attendance/student/:studentId',
    CLASS_REPORT: '/attendance/class/:classId/report',
  },
  SESSIONS: {
    BASE: '/sessions',
  },
}

// Local storage keys
export const STORAGE_KEYS = {
  TOKEN: 'duty_token',
  USER: 'duty_user',
  THEME: 'duty_theme',
}

// Theme options
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
}

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
}

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Login successful!',
  LOGOUT: 'Logout successful!',
  PROFILE_UPDATE: 'Profile updated successfully!',
  ATTENDANCE_MARKED: 'Attendance marked successfully!',
  CLASS_CREATED: 'Class created successfully!',
  CLASS_UPDATED: 'Class updated successfully!',
}

export default {
  USER_ROLES,
  ATTENDANCE_STATUS,
  CLASS_TYPES,
  DAYS_OF_WEEK,
  TIME_SLOTS,
  API_ENDPOINTS,
  STORAGE_KEYS,
  THEMES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
}
