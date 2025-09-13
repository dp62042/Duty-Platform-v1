import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Users,
  Calendar,
  Clock,
  MapPin,
  BookOpen,
  BarChart3,
  Download,
  User,
  Mail,
  Phone,
  ClipboardCheck,
  ChevronLeft,
  Eye,
} from 'lucide-react'
import toast from 'react-hot-toast'

const ClassDetails = () => {
  const { id } = useParams()
  const [classInfo, setClassInfo] = useState(null)
  const [attendanceData, setAttendanceData] = useState([])
  const [activeTab, setActiveTab] = useState('students')
  const [isLoading, setIsLoading] = useState(true)

  // Mock data - replace with API calls
  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          // Mock class data
          const mockClassInfo = {
            id: id,
            className: 'Mathematics 101',
            section: 'B',
            subject: 'Computer Science',
            courseCode: 'CSC301',
            description:
              'Object-oriented programming in Java, covering syntax, collections, threads and basic web services.',
            enrolledStudents: 25,
            assignedFaculty: 'Dr. Sarah Johnson',
            schedule: {
              days: ['Tuesday', 'Thursday'],
              startTime: '11:00',
              endTime: '12:30',
            },
            location: 'Room 301, Block A',
            createdAt: '2023-05-15',
          }

          // Mock student data
          const mockStudents = [
            {
              id: 1,
              name: 'John Doe',
              email: 'john@example.com',
              registrationNumber: 'STU001',
              attendance: '92%',
              lastActive: '2023-09-12',
            },
            {
              id: 2,
              name: 'Jane Smith',
              email: 'jane@example.com',
              registrationNumber: 'STU002',
              attendance: '88%',
              lastActive: '2023-09-12',
            },
            {
              id: 3,
              name: 'Robert Johnson',
              email: 'robert@example.com',
              registrationNumber: 'STU003',
              attendance: '95%',
              lastActive: '2023-09-11',
            },
            {
              id: 4,
              name: 'Emily Davis',
              email: 'emily@example.com',
              registrationNumber: 'STU004',
              attendance: '78%',
              lastActive: '2023-09-10',
            },
            {
              id: 5,
              name: 'Michael Wilson',
              email: 'michael@example.com',
              registrationNumber: 'STU005',
              attendance: '85%',
              lastActive: '2023-09-12',
            },
          ]

          // Mock attendance data
          const mockAttendanceData = [
            {
              id: 1,
              date: '2023-09-12',
              topic: 'Introduction to Java Collections',
              present: 22,
              absent: 3,
              percentage: 88,
            },
            {
              id: 2,
              date: '2023-09-07',
              topic: 'Object-Oriented Principles',
              present: 24,
              absent: 1,
              percentage: 96,
            },
            {
              id: 3,
              date: '2023-09-05',
              topic: 'Java Syntax Basics',
              present: 20,
              absent: 5,
              percentage: 80,
            },
            {
              id: 4,
              date: '2023-08-31',
              topic: 'Course Introduction',
              present: 25,
              absent: 0,
              percentage: 100,
            },
          ]

          setClassInfo(mockClassInfo)
          setAttendanceData(mockAttendanceData)
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        toast.error('Failed to fetch class details')
        console.log('Failed to fetch class details', error)
        setIsLoading(false)
      }
    }

    fetchClassDetails()
  }, [id])

  const handleExportData = () => {
    toast.success('Data exported successfully')
    // In a real app, this would export the data as CSV or PDF
  }

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600'
    if (percentage >= 75) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (!classInfo) {
    return (
      <div className="text-center py-12">
        <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          Class not found
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          The requested class could not be found.
        </p>
        <div className="mt-6">
          <Link to="/classes" className="btn-primary inline-flex items-center">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Classes
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Link
            to="/classes"
            className="btn-secondary inline-flex items-center mb-2"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Classes
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">
            {classInfo.className}
          </h1>
          <p className="text-gray-600">
            {classInfo.courseCode} • Section {classInfo.section}
          </p>
        </div>
        <button
          onClick={handleExportData}
          className="btn-secondary flex items-center"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </button>
      </div>

      {/* Class Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full mr-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Enrolled Students</p>
              <p className="text-2xl font-bold">{classInfo.enrolledStudents}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full mr-4">
              <ClipboardCheck className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Attendance</p>
              <p className="text-2xl font-bold">89%</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full mr-4">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Schedule</p>
              <p className="text-sm font-medium">
                {classInfo.schedule.days.join(', ')}
                <br />
                {classInfo.schedule.startTime} - {classInfo.schedule.endTime}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-full mr-4">
              <MapPin className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Location</p>
              <p className="text-sm font-medium">{classInfo.location}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Class Description */}
      <div className="card">
        <h2 className="text-lg font-medium mb-2">Class Description</h2>
        <p className="text-gray-600">{classInfo.description}</p>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Faculty:</span>{' '}
            {classInfo.assignedFaculty}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Created:</span> {classInfo.createdAt}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('students')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'students'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Users className="w-4 h-4 inline mr-2" />
            Enrolled Students ({classInfo.enrolledStudents})
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'attendance'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <ClipboardCheck className="w-4 h-4 inline mr-2" />
            Attendance Records
          </button>
          <button
            onClick={() => setActiveTab('sessions')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'sessions'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Calendar className="w-4 h-4 inline mr-2" />
            Session History
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'students' && (
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium">Enrolled Students</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search students..."
                className="input-field pl-9 pr-4 py-2 w-64"
              />
              <User className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
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
                    Contact
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Attendance
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Last Active
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  {
                    id: 1,
                    name: 'John Doe',
                    email: 'john@example.com',
                    registrationNumber: 'STU001',
                    attendance: '92%',
                    lastActive: '2023-09-12',
                  },
                  {
                    id: 2,
                    name: 'Jane Smith',
                    email: 'jane@example.com',
                    registrationNumber: 'STU002',
                    attendance: '88%',
                    lastActive: '2023-09-12',
                  },
                  {
                    id: 3,
                    name: 'Robert Johnson',
                    email: 'robert@example.com',
                    registrationNumber: 'STU003',
                    attendance: '95%',
                    lastActive: '2023-09-11',
                  },
                  {
                    id: 4,
                    name: 'Emily Davis',
                    email: 'emily@example.com',
                    registrationNumber: 'STU004',
                    attendance: '78%',
                    lastActive: '2023-09-10',
                  },
                  {
                    id: 5,
                    name: 'Michael Wilson',
                    email: 'michael@example.com',
                    registrationNumber: 'STU005',
                    attendance: '85%',
                    lastActive: '2023-09-12',
                  },
                ].map((student) => (
                  <tr key={student.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-medium mr-3">
                          {student.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {student.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {student.registrationNumber}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {student.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`text-sm font-medium ${getAttendanceColor(
                          parseInt(student.attendance)
                        )}`}
                      >
                        {student.attendance}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.lastActive}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'attendance' && (
        <div className="card">
          <h2 className="text-lg font-medium mb-6">Attendance Records</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600">Total Sessions</p>
              <p className="text-2xl font-bold">15</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600">Average Attendance</p>
              <p className="text-2xl font-bold">89%</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-yellow-600">Lowest Attendance</p>
              <p className="text-2xl font-bold">75%</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-600">Highest Attendance</p>
              <p className="text-2xl font-bold">100%</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
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
                    Topic
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Present
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Absent
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Attendance %
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendanceData.map((record) => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.topic}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.present}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.absent}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`text-sm font-medium ${getAttendanceColor(
                          record.percentage
                        )}`}
                      >
                        {record.percentage}%
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'sessions' && (
        <div className="card">
          <h2 className="text-lg font-medium mb-6">Session History</h2>

          <div className="space-y-4">
            {[
              {
                id: 1,
                date: '2023-09-12',
                time: '11:00 - 12:30',
                topic: 'Introduction to Java Collections',
                attendance: '22/25 (88%)',
                location: 'Room 301',
              },
              {
                id: 2,
                date: '2023-09-07',
                time: '11:00 - 12:30',
                topic: 'Object-Oriented Principles',
                attendance: '24/25 (96%)',
                location: 'Room 301',
              },
              {
                id: 3,
                date: '2023-09-05',
                time: '11:00 - 12:30',
                topic: 'Java Syntax Basics',
                attendance: '20/25 (80%)',
                location: 'Room 301',
              },
              {
                id: 4,
                date: '2023-08-31',
                time: '11:00 - 12:30',
                topic: 'Course Introduction',
                attendance: '25/25 (100%)',
                location: 'Room 301',
              },
            ].map((session) => (
              <div
                key={session.id}
                className="border rounded-lg p-4 hover:bg-gray-50"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{session.topic}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {session.date} • {session.time} • {session.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{session.attendance}</p>
                    <button className="text-indigo-600 text-sm mt-1">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ClassDetails
