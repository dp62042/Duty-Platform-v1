import React, { useState, useEffect } from 'react'
import {
  Users,
  BookOpen,
  ClipboardCheck,
  BarChart3,
  Calendar,
  TrendingUp,
  AlertCircle,
  Clock,
  Download,
  Plus,
  UserPlus,
  Settings,
  Eye,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
  const [stats, setStats] = useState({})
  const [recentActivity, setRecentActivity] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Mock data - replace with API calls
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          setStats({
            totalUsers: 1245,
            totalClasses: 42,
            activeSessions: 8,
            attendanceRate: 87.3,
            pendingApprovals: 7,
            systemHealth: 'Good',
          })

          setRecentActivity([
            {
              id: 1,
              action: 'New class created',
              details: 'Mathematics 101 by Dr. Johnson',
              timestamp: '2 minutes ago',
              type: 'class',
            },
            {
              id: 2,
              action: 'User registered',
              details: 'Jane Smith (Student)',
              timestamp: '15 minutes ago',
              type: 'user',
            },
            {
              id: 3,
              action: 'Attendance marked',
              details: 'Physics class - 85% attendance',
              timestamp: '30 minutes ago',
              type: 'attendance',
            },
            {
              id: 4,
              action: 'System update',
              details: 'Applied security patches',
              timestamp: '1 hour ago',
              type: 'system',
            },
            {
              id: 5,
              action: 'Faculty assigned',
              details: 'Dr. Chen to Data Structures class',
              timestamp: '2 hours ago',
              type: 'assignment',
            },
          ])

          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600">System overview and analytics</p>
        </div>
        <div className="flex space-x-2">
          <button className="btn-secondary flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
          <Link
            to="/admin/settings"
            className="btn-secondary flex items-center"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full mr-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold">{stats.totalUsers}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+12% from last week</span>
          </div>
        </div>

        {/* Total Classes */}
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full mr-4">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Classes</p>
              <p className="text-2xl font-bold">{stats.totalClasses}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+3 new this week</span>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full mr-4">
              <ClipboardCheck className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Sessions</p>
              <p className="text-2xl font-bold">{stats.activeSessions}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            <span>Live classes in progress</span>
          </div>
        </div>

        {/* Attendance Rate */}
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-full mr-4">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Attendance Rate</p>
              <p className="text-2xl font-bold">{stats.attendanceRate}%</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+5.2% from last week</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Quick Actions & System Status */}
        <div className="lg:col-span-1 space-y-6">
          {/* Quick Actions */}
          <div className="card">
            <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                to="/admin/users/create"
                className="flex items-center p-3 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors duration-200"
              >
                <UserPlus className="w-5 h-5 mr-3" />
                <span>Create New User</span>
              </Link>
              <Link
                to="/admin/classes/create"
                className="flex items-center p-3 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors duration-200"
              >
                <Plus className="w-5 h-5 mr-3" />
                <span>Create New Class</span>
              </Link>
              <Link
                to="/admin/approvals"
                className="flex items-center p-3 rounded-lg bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition-colors duration-200"
              >
                <AlertCircle className="w-5 h-5 mr-3" />
                <span>Review Approvals ({stats.pendingApprovals})</span>
              </Link>
              <Link
                to="/admin/reports"
                className="flex items-center p-3 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors duration-200"
              >
                <BarChart3 className="w-5 h-5 mr-3" />
                <span>Generate Reports</span>
              </Link>
            </div>
          </div>

          {/* System Status */}
          <div className="card">
            <h2 className="text-lg font-medium mb-4">System Status</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Overall Status</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    stats.systemHealth === 'Good'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {stats.systemHealth}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">API Response</span>
                <span className="text-sm text-green-600">Normal</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Database</span>
                <span className="text-sm text-green-600">Connected</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Uptime</span>
                <span className="text-sm text-gray-600">99.98%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Recent Activity & Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Activity */}
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium">Recent Activity</h2>
              <Link
                to="/admin/activity"
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === 'user'
                          ? 'bg-blue-100'
                          : activity.type === 'class'
                          ? 'bg-green-100'
                          : activity.type === 'attendance'
                          ? 'bg-purple-100'
                          : activity.type === 'system'
                          ? 'bg-gray-100'
                          : 'bg-yellow-100'
                      }`}
                    >
                      {activity.type === 'user' && (
                        <Users className="w-4 h-4 text-blue-600" />
                      )}
                      {activity.type === 'class' && (
                        <BookOpen className="w-4 h-4 text-green-600" />
                      )}
                      {activity.type === 'attendance' && (
                        <ClipboardCheck className="w-4 h-4 text-purple-600" />
                      )}
                      {activity.type === 'system' && (
                        <Settings className="w-4 h-4 text-gray-600" />
                      )}
                      {activity.type === 'assignment' && (
                        <UserPlus className="w-4 h-4 text-yellow-600" />
                      )}
                    </div>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-500">{activity.details}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {activity.timestamp}
                    </p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Attendance Trend */}
            <div className="card">
              <h2 className="text-lg font-medium mb-4">Attendance Trend</h2>
              <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
                <BarChart3 className="w-12 h-12 text-gray-400" />
                <p className="ml-2 text-gray-500">
                  Attendance chart visualization
                </p>
              </div>
            </div>

            {/* User Growth */}
            <div className="card">
              <h2 className="text-lg font-medium mb-4">User Growth</h2>
              <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
                <TrendingUp className="w-12 h-12 text-gray-400" />
                <p className="ml-2 text-gray-500">
                  User growth chart visualization
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Alerts (if any) */}
      <div className="card bg-yellow-50 border-yellow-200">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-medium text-yellow-800">
              System Notice
            </h3>
            <p className="text-yellow-700">
              Scheduled maintenance this weekend. The system will be unavailable
              from Saturday 10:00 PM to Sunday 2:00 AM.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
