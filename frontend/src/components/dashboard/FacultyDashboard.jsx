import React, { useState, useEffect } from 'react'
import {
  BarChart3,
  Users,
  Calendar,
  BookOpen,
  ClipboardCheck,
  Clock,
  Bell,
  Settings,
  LogOut,
  User,
  Plus,
  Play,
  StopCircle,
  QrCode,
  Download,
  Filter,
  Search,
  Mail,
  FileText,
  TrendingUp,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react'

const FacultyDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [todayClasses, setTodayClasses] = useState([
    {
      id: 1,
      name: 'Mathematics 101',
      time: '09:00 - 10:30',
      section: 'A',
      room: 'Room 101',
      status: 'upcoming',
    },
    {
      id: 2,
      name: 'Advanced Calculus',
      time: '11:00 - 12:30',
      section: 'B',
      room: 'Room 203',
      status: 'upcoming',
    },
    {
      id: 3,
      name: 'Statistics',
      time: '14:00 - 15:30',
      section: 'C',
      room: 'Room 305',
      status: 'upcoming',
    },
  ])
  const [attendanceStats, setAttendanceStats] = useState({
    totalStudents: 120,
    presentToday: 95,
    percentage: 79.2,
  })
  const [pendingTasks, setPendingTasks] = useState([
    {
      id: 1,
      task: 'Grade Assignment 3',
      course: 'Mathematics 101',
      due: 'Tomorrow',
      priority: 'high',
    },
    {
      id: 2,
      task: 'Prepare lesson plan',
      course: 'Advanced Calculus',
      due: 'Friday',
      priority: 'medium',
    },
    {
      id: 3,
      task: 'Submit final grades',
      course: 'Statistics',
      due: 'Next Monday',
      priority: 'high',
    },
  ])
  const [recentActivity, setRecentActivity] = useState([
    { id: 1, action: 'Started Mathematics 101 class', time: '2 hours ago' },
    {
      id: 2,
      action: 'Marked attendance for Advanced Calculus',
      time: 'Yesterday',
    },
    { id: 3, action: 'Uploaded assignment materials', time: '2 days ago' },
  ])
  const [upcomingClasses, setUpcomingClasses] = useState([
    { id: 1, name: 'Mathematics 101', date: 'Tomorrow', time: '09:00 AM' },
    { id: 2, name: 'Advanced Calculus', date: 'Tomorrow', time: '11:00 AM' },
    { id: 3, name: 'Statistics', date: 'Day after tomorrow', time: '02:00 PM' },
  ])
  const [notifications, setNotifications] = useState(3)

  const handleStartClass = (classId) => {
    // In a real app, this would connect to the backend and start a session
    setTodayClasses((classes) =>
      classes.map((cls) =>
        cls.id === classId ? { ...cls, status: 'in-progress' } : cls
      )
    )
    alert(`Starting class session for ID: ${classId}`)
  }

  const handleEndClass = (classId) => {
    // In a real app, this would end the session
    setTodayClasses((classes) =>
      classes.map((cls) =>
        cls.id === classId ? { ...cls, status: 'completed' } : cls
      )
    )
    alert(`Ending class session for ID: ${classId}`)
  }

  const handleGenerateQR = (classId) => {
    // In a real app, this would generate a QR code for attendance
    alert(`Generating QR code for class ID: ${classId}`)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">
                      Total Students
                    </h3>
                    <p className="text-2xl font-bold">
                      {attendanceStats.totalStudents}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-full">
                    <ClipboardCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">
                      Today's Attendance
                    </h3>
                    <p className="text-2xl font-bold">
                      {attendanceStats.percentage}%
                    </p>
                    <p className="text-sm text-gray-500">
                      {attendanceStats.presentToday} present
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">
                      Active Courses
                    </h3>
                    <p className="text-2xl font-bold">3</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Today's Classes</h3>
                  <span className="text-sm text-gray-500">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
                <div className="space-y-4">
                  {todayClasses.map((classItem) => (
                    <div
                      key={classItem.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{classItem.name}</h4>
                        <p className="text-sm text-gray-500">
                          Section {classItem.section} • {classItem.time} •{' '}
                          {classItem.room}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        {classItem.status === 'upcoming' && (
                          <button
                            onClick={() => handleStartClass(classItem.id)}
                            className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 flex items-center"
                          >
                            <Play className="w-4 h-4 mr-1" />
                            Start
                          </button>
                        )}
                        {classItem.status === 'in-progress' && (
                          <>
                            <button
                              onClick={() => handleEndClass(classItem.id)}
                              className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 flex items-center"
                            >
                              <StopCircle className="w-4 h-4 mr-1" />
                              End
                            </button>
                            <button
                              onClick={() => handleGenerateQR(classItem.id)}
                              className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 flex items-center"
                            >
                              <QrCode className="w-4 h-4 mr-1" />
                              QR Code
                            </button>
                          </>
                        )}
                        {classItem.status === 'completed' && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-md">
                            Completed
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium mb-4">Pending Tasks</h3>
                <div className="space-y-4">
                  {pendingTasks.map((task) => (
                    <div key={task.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{task.task}</h4>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            task.priority === 'high'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>{task.course}</span>
                        <span>Due: {task.due}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium mb-4">Upcoming Classes</h3>
                <div className="space-y-4">
                  {upcomingClasses.map((classItem) => (
                    <div
                      key={classItem.id}
                      className="flex items-center p-3 border rounded-lg"
                    >
                      <div className="p-2 bg-blue-100 rounded-lg mr-3">
                        <Clock className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{classItem.name}</h4>
                        <p className="text-sm text-gray-500">
                          {classItem.date} at {classItem.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3"></div>
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )

      case 'classes':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">My Classes</h3>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                New Class
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'Mathematics 101',
                'Advanced Calculus',
                'Statistics',
                'Linear Algebra',
                'Discrete Mathematics',
              ].map((course, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-3">
                    <BookOpen className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h4 className="font-medium">{course}</h4>
                  <p className="text-sm text-gray-500">Dr. Smith</p>
                  <div className="mt-3 flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-1" />
                    <span>42 students</span>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <ClipboardCheck className="w-4 h-4 mr-1" />
                    <span>88% attendance</span>
                  </div>
                  <button className="mt-4 w-full py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 text-sm">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        )

      case 'attendance':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">Attendance Records</h3>
              <div className="flex space-x-2">
                <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
              </div>
            </div>

            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
              <div className="relative w-full md:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>All Courses</option>
                <option>Mathematics 101</option>
                <option>Advanced Calculus</option>
                <option>Statistics</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Student
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Course
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    {
                      id: 1,
                      name: 'John Doe',
                      course: 'Mathematics 101',
                      date: '2023-05-15',
                      status: 'Present',
                    },
                    {
                      id: 2,
                      name: 'Jane Smith',
                      course: 'Mathematics 101',
                      date: '2023-05-15',
                      status: 'Present',
                    },
                    {
                      id: 3,
                      name: 'Robert Johnson',
                      course: 'Advanced Calculus',
                      date: '2023-05-14',
                      status: 'Absent',
                    },
                    {
                      id: 4,
                      name: 'Emily Davis',
                      course: 'Statistics',
                      date: '2023-05-14',
                      status: 'Present',
                    },
                    {
                      id: 5,
                      name: 'Michael Wilson',
                      course: 'Statistics',
                      date: '2023-05-14',
                      status: 'Late',
                    },
                  ].map((record) => (
                    <tr key={record.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-medium mr-3">
                            {record.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {record.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {record.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.course}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            record.status === 'Present'
                              ? 'bg-green-100 text-green-800'
                              : record.status === 'Absent'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )

      case 'students':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">Student Management</h3>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Add Students
              </button>
            </div>

            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
              <div className="relative w-full md:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>All Courses</option>
                <option>Mathematics 101</option>
                <option>Advanced Calculus</option>
                <option>Statistics</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  id: 1,
                  name: 'John Doe',
                  course: 'Mathematics 101',
                  attendance: '95%',
                  grade: 'A',
                },
                {
                  id: 2,
                  name: 'Jane Smith',
                  course: 'Mathematics 101',
                  attendance: '92%',
                  grade: 'A-',
                },
                {
                  id: 3,
                  name: 'Robert Johnson',
                  course: 'Advanced Calculus',
                  attendance: '88%',
                  grade: 'B+',
                },
                {
                  id: 4,
                  name: 'Emily Davis',
                  course: 'Statistics',
                  attendance: '96%',
                  grade: 'A',
                },
                {
                  id: 5,
                  name: 'Michael Wilson',
                  course: 'Statistics',
                  attendance: '79%',
                  grade: 'C+',
                },
                {
                  id: 6,
                  name: 'Sarah Brown',
                  course: 'Advanced Calculus',
                  attendance: '91%',
                  grade: 'A-',
                },
              ].map((student) => (
                <div
                  key={student.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-medium mr-3">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-medium">{student.name}</h4>
                      <p className="text-sm text-gray-500">ID: {student.id}</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm text-gray-500">
                      Course: {student.course}
                    </p>
                  </div>

                  <div className="flex justify-between text-sm mb-3">
                    <div>
                      <span className="text-gray-500">Attendance:</span>
                      <span className="font-medium ml-1">
                        {student.attendance}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Grade:</span>
                      <span className="font-medium ml-1">{student.grade}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 text-sm">
                      View Profile
                    </button>
                    <button className="flex-1 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm">
                      Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return <div>Select a tab</div>
    }
  }

  // Mobile sidebar toggle
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md bg-indigo-600 text-white"
        >
          {sidebarOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:relative z-40 w-64 bg-indigo-800 text-white transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Duty System</h1>
        </div>

        <div className="p-4 flex items-center border-b border-indigo-700 pb-4">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
            DS
          </div>
          <div>
            <p className="text-sm font-medium">Dr. Sarah Johnson</p>
            <p className="text-xs text-indigo-300">Faculty</p>
          </div>
        </div>

        <nav className="mt-6">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'classes', label: 'My Classes', icon: BookOpen },
            { id: 'attendance', label: 'Attendance', icon: ClipboardCheck },
            { id: 'students', label: 'Students', icon: Users },
          ].map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  if (window.innerWidth < 768) setSidebarOpen(false)
                }}
                className={`w-full flex items-center px-4 py-3 transition-colors duration-200 ${
                  activeTab === item.id
                    ? 'bg-indigo-700'
                    : 'hover:bg-indigo-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="ml-3">{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="absolute bottom-0 w-64 p-4 border-t border-indigo-700">
          <button className="flex items-center text-indigo-300 hover:text-white">
            <Settings className="w-5 h-5" />
            <span className="ml-3">Settings</span>
          </button>
          <button className="flex items-center text-indigo-300 hover:text-white mt-2">
            <LogOut className="w-5 h-5" />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-6 py-3">
            <h2 className="text-xl font-semibold text-gray-800">
              Faculty Dashboard
            </h2>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 rounded-full hover:bg-gray-100">
                <Bell className="w-5 h-5 text-gray-600" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>

              <div className="flex items-center space-x-2">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-medium">Dr. Sarah Johnson</p>
                  <p className="text-xs text-gray-500">
                    sarah.j@university.edu
                  </p>
                </div>
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                  SJ
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          {renderTabContent()}
        </main>
      </div>
    </div>
  )
}

export default FacultyDashboard
