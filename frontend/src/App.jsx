import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// Context
import { AuthProvider, useAuth } from './context/AuthContext'

// Layout Components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Sidebar from './components/layout/Sidebar'

// Auth Components
import LoginPage from './components/auth/LoginPage'
import SignUpPage from './components/auth/SignUpPage'

// Dashboard Components
import DashboardRouter from './components/dashboard/DashboardRouter'

// Class Components
import ClassManagement from './components/classes/ClassManagement'
import ClassDetails from './components/classes/ClassDetails'
import CreateClass from './components/classes/CreateClass'

// Attendance Components
import AttendancePage from './components/attendance/AttendancePage'
import SessionManagement from './components/attendance/SessionManagement'
import AttendanceReport from './components/attendance/AttendanceReport'

// User Management Components
import UserManagement from './components/admin/UserManagement'
import Profile from './components/user/Profile'

// Common Components
import Loader from './components/common/Loader'
import NotFound from './components/common/NotFound'
import Unauthorized from './components/common/Unauthorized'

// Protected Route Component
const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <Loader text="Checking authentication..." />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    return <Unauthorized />
  }

  return children
}

// Dashboard Layout Component
const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="container mx-auto px-6 py-8">{children}</div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

// Main App Component
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#4ade80',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />

          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            {/* Protected Dashboard Route - Role-based */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <DashboardRouter />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Student Routes */}
            <Route
              path="/attendance"
              element={
                <ProtectedRoute requiredRoles={['student']}>
                  <DashboardLayout>
                    <AttendancePage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Faculty Routes */}
            <Route
              path="/classes"
              element={
                <ProtectedRoute requiredRoles={['faculty']}>
                  <DashboardLayout>
                    <ClassManagement />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/classes/:id"
              element={
                <ProtectedRoute requiredRoles={['faculty']}>
                  <DashboardLayout>
                    <ClassDetails />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/sessions"
              element={
                <ProtectedRoute requiredRoles={['faculty']}>
                  <DashboardLayout>
                    <SessionManagement />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/classes"
              element={
                <ProtectedRoute requiredRoles={['admin']}>
                  <DashboardLayout>
                    <ClassManagement />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/classes/create"
              element={
                <ProtectedRoute requiredRoles={['admin']}>
                  <DashboardLayout>
                    <CreateClass />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/users"
              element={
                <ProtectedRoute requiredRoles={['admin']}>
                  <DashboardLayout>
                    <UserManagement />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/attendance-reports"
              element={
                <ProtectedRoute requiredRoles={['admin']}>
                  <DashboardLayout>
                    <AttendanceReport />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Staff Routes */}
            <Route
              path="/staff/attendance"
              element={
                <ProtectedRoute requiredRoles={['staff']}>
                  <DashboardLayout>
                    <AttendanceReport />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Common Routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Profile />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Error Routes */}
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Default Routes */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
