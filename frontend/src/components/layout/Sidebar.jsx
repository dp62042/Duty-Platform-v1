import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Home,
  BookOpen,
  ClipboardCheck,
  Users,
  Settings,
  BarChart3,
  FileText,
  LogOut,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const Sidebar = () => {
  const { user, logout } = useAuth()
  const location = useLocation()

  const navigationItems = {
    student: [
      { path: '/dashboard', label: 'Overview', icon: Home },
      { path: '/attendance', label: 'Attendance', icon: ClipboardCheck },
    ],
    faculty: [
      { path: '/dashboard', label: 'Overview', icon: Home },
      { path: '/classes', label: 'My Classes', icon: BookOpen },
      { path: '/sessions', label: 'Sessions', icon: ClipboardCheck },
    ],
    admin: [
      { path: '/dashboard', label: 'Overview', icon: Home },
      { path: '/admin/classes', label: 'Class Management', icon: BookOpen },
      { path: '/admin/users', label: 'User Management', icon: Users },
      { path: '/admin/attendance-reports', label: 'Reports', icon: BarChart3 },
    ],
    staff: [
      { path: '/dashboard', label: 'Overview', icon: Home },
      { path: '/staff/attendance', label: 'Attendance', icon: ClipboardCheck },
      { path: '/admin/attendance-reports', label: 'Reports', icon: BarChart3 },
    ],
  }

  const items = navigationItems[user?.role] || []

  return (
    <div className="w-64 bg-white shadow-md">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-center h-16 shadow-sm">
          <h1 className="text-xl font-bold text-indigo-600">Duty System</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="space-y-2">
            {items.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="ml-3">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </nav>

        {/* User section */}
        <div className="px-4 py-4 border-t border-gray-200">
          <Link
            to="/profile"
            className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
          >
            <Settings className="w-5 h-5" />
            <span className="ml-3">Settings</span>
          </Link>
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="ml-3">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
