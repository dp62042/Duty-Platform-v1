// components/dashboard/DashboardRouter.jsx
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

// Dashboards
import StudentDashboard from './StudentDashboard'
import FacultyDashboard from './FacultyDashboard'
import AdminDashboard from './AdminDashboard'
import StaffDashboard from './StaffDashboard'

const DashboardRouter = () => {
  const { user, loading } = useAuth()

  if (loading) return <p>Loading...</p>

  if (!user) return <Navigate to="/login" replace />

  switch (user.role) {
    case 'student':
      return <StudentDashboard />
    case 'faculty':
      return <FacultyDashboard />
    case 'admin':
      return <AdminDashboard />
    case 'staff':
      return <StaffDashboard />
    default:
      return <Navigate to="/login" replace />
  }
}

export default DashboardRouter
