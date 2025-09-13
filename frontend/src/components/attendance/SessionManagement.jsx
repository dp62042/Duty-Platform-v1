import React, { useState, useEffect } from 'react'
import {
  Play,
  Square,
  QrCode,
  Clock,
  Users,
  Copy,
  Download,
  Calendar,
  MapPin,
} from 'lucide-react'
import toast from 'react-hot-toast'

const SessionManagement = () => {
  const [sessions, setSessions] = useState([])
  const [activeSessions, setActiveSessions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isStartingSession, setIsStartingSession] = useState(false)
  const [selectedClass, setSelectedClass] = useState('')
  const [location, setLocation] = useState('')

  // Mock data - replace with API call
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          const mockSessions = [
            {
              id: 1,
              className: 'Mathematics 101',
              date: '2023-09-15',
              startTime: '09:00',
              endTime: '10:30',
              status: 'completed',
              attendance: 20,
              totalStudents: 25,
              sessionCode: 'MATH-ABC123',
              location: 'Room 301',
            },
            {
              id: 2,
              className: 'Computer Science',
              date: '2023-09-14',
              startTime: '11:00',
              endTime: '12:30',
              status: 'completed',
              attendance: 28,
              totalStudents: 30,
              sessionCode: 'CS-DEF456',
              location: 'Lab 5',
            },
            {
              id: 3,
              className: 'Physics',
              date: '2023-09-13',
              startTime: '14:00',
              endTime: '15:30',
              status: 'completed',
              attendance: 18,
              totalStudents: 22,
              sessionCode: 'PHY-GHI789',
              location: 'Room 204',
            },
          ]
          setSessions(mockSessions)
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        toast.error('Failed to fetch session data')
        console.log('Failed to fetch session data', error)
        setIsLoading(false)
      }
    }

    fetchSessions()
  }, [])

  const startSession = async () => {
    if (!selectedClass) {
      toast.error('Please select a class')
      return
    }

    setIsStartingSession(true)
    try {
      // Simulate API call
      setTimeout(() => {
        const newSession = {
          id: Date.now(),
          className: selectedClass,
          date: new Date().toISOString().split('T')[0],
          startTime: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          endTime: '',
          status: 'active',
          attendance: 0,
          totalStudents: 25,
          sessionCode:
            selectedClass.substring(0, 3).toUpperCase() +
            '-' +
            Math.random().toString(36).substring(2, 7).toUpperCase(),
          qrCode: 'data:image/png;base64,...', // This would be a real base64 QR code
          location: location || 'Not specified',
        }

        setActiveSessions([...activeSessions, newSession])
        setIsStartingSession(false)
        setSelectedClass('')
        setLocation('')
        toast.success('Session started successfully!')
      }, 1500)
    } catch (error) {
      toast.error('Failed to start session')
      console.log('failed to start session', error)
      setIsStartingSession(false)
    }
  }

  const endSession = async (sessionId) => {
    try {
      // Simulate API call
      setTimeout(() => {
        setActiveSessions(
          activeSessions.filter((session) => session.id !== sessionId)
        )

        // Add to completed sessions
        const endedSession = activeSessions.find((s) => s.id === sessionId)
        if (endedSession) {
          endedSession.status = 'completed'
          endedSession.endTime = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })
          endedSession.attendance = Math.floor(Math.random() * 25) + 1 // Random attendance for demo
          setSessions([endedSession, ...sessions])
        }

        toast.success('Session ended successfully!')
      }, 1000)
    } catch (error) {
      toast.error('Failed to end session')
      console.log('Failed to end session', error)
    }
  }

  const copySessionCode = (sessionCode) => {
    navigator.clipboard.writeText(sessionCode)
    toast.success('Session code copied to clipboard!')
  }

  const downloadQRCode = (sessionCode) => {
    toast.success(`QR code for ${sessionCode} downloaded`)
    // In a real app, this would download the QR code image
  }

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800',
    }

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs ${statusClasses[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const getAttendancePercentage = (attendance, total) => {
    return Math.round((attendance / total) * 100)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Session Management</h1>
        <p className="text-gray-600">Start and manage class sessions</p>
      </div>

      {/* Start New Session */}
      <div className="card">
        <h2 className="text-lg font-medium mb-4">Start New Session</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Class
            </label>
            <select
              className="input-field"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              disabled={isStartingSession}
            >
              <option value="">Choose a class</option>
              <option value="Mathematics 101">Mathematics 101</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location (Optional)
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g., Room 301, Lab 5"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={isStartingSession}
            />
          </div>
        </div>

        <button
          onClick={startSession}
          disabled={isStartingSession || !selectedClass}
          className="btn-primary flex items-center justify-center"
        >
          {isStartingSession ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Starting Session...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Start Session
            </>
          )}
        </button>
      </div>

      {/* Active Sessions */}
      {activeSessions.length > 0 && (
        <div className="card">
          <h2 className="text-lg font-medium mb-4">Active Sessions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeSessions.map((session) => (
              <div
                key={session.id}
                className="border rounded-lg p-4 bg-blue-50 border-blue-200"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium">{session.className}</h3>
                  {getStatusBadge(session.status)}
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Started at {session.startTime}</span>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{session.location}</span>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{session.attendance} students joined</span>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Session Code
                  </label>
                  <div className="flex items-center">
                    <code className="bg-white px-3 py-1 rounded border text-sm font-mono flex-1">
                      {session.sessionCode}
                    </code>
                    <button
                      onClick={() => copySessionCode(session.sessionCode)}
                      className="ml-2 p-1 text-gray-500 hover:text-gray-700"
                      title="Copy session code"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => downloadQRCode(session.sessionCode)}
                    className="btn-secondary flex items-center flex-1 justify-center"
                  >
                    <QrCode className="w-4 h-4 mr-1" />
                    QR Code
                  </button>
                  <button
                    onClick={() => endSession(session.id)}
                    className="btn-primary flex items-center flex-1 justify-center"
                  >
                    <Square className="w-4 h-4 mr-1" />
                    End Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Session History */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">Session History</h2>
          <button className="btn-secondary flex items-center">
            <Download className="w-4 h-4 mr-1" />
            Export
          </button>
        </div>

        {sessions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Class
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date & Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Location
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
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Session Code
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sessions.map((session) => (
                  <tr key={session.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {session.className}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {session.date}
                      </div>
                      <div className="text-sm text-gray-500">
                        {session.startTime} - {session.endTime || 'Ongoing'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {session.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {session.attendance}/{session.totalStudents}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{
                            width: `${getAttendancePercentage(
                              session.attendance,
                              session.totalStudents
                            )}%`,
                          }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {getAttendancePercentage(
                          session.attendance,
                          session.totalStudents
                        )}
                        %
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(session.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">
                      {session.sessionCode}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No sessions yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating your first session.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SessionManagement
