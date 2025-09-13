import React, { useState, useEffect } from 'react'
import { QrCode, ClipboardCheck, Clock, Camera } from 'lucide-react'
import toast from 'react-hot-toast'

const AttendancePage = () => {
  const [attendanceData, setAttendanceData] = useState([])
  const [sessionCode, setSessionCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showQRScanner, setShowQRScanner] = useState(false)

  // Mock data - replace with API call
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          const mockData = [
            {
              id: 1,
              date: '2023-09-10',
              className: 'Mathematics 101',
              status: 'present',
              sessionCode: 'MATH101-0910',
            },
            {
              id: 2,
              date: '2023-09-08',
              className: 'Computer Science',
              status: 'present',
              sessionCode: 'CS-0908',
            },
            {
              id: 3,
              date: '2023-09-05',
              className: 'Physics',
              status: 'late',
              sessionCode: 'PHY-0905',
            },
            {
              id: 4,
              date: '2023-09-03',
              className: 'Mathematics 101',
              status: 'absent',
              sessionCode: 'MATH101-0903',
            },
          ]
          setAttendanceData(mockData)
        }, 1000)
      } catch (error) {
        toast.error('Failed to fetch attendance data')
        console.log('Failed to fetch attendance data', error)
      }
    }

    fetchAttendance()
  }, [])

  const handleManualAttendance = async (e) => {
    e.preventDefault()
    if (!sessionCode) {
      toast.error('Please enter a session code')
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      setTimeout(() => {
        toast.success('Attendance marked successfully!')
        setSessionCode('')
        setIsLoading(false)

        // Add to attendance data
        const newEntry = {
          id: Date.now(),
          date: new Date().toISOString().split('T')[0],
          className: 'New Session',
          status: 'present',
          sessionCode: sessionCode,
        }
        setAttendanceData((prev) => [newEntry, ...prev])
      }, 1500)
    } catch (error) {
      toast.error('Failed to mark attendance')

      console.log('Failed to mark attendance', error)
      setIsLoading(false)
    }
  }

  const handleQRScan = () => {
    setShowQRScanner(true)
    // In a real app, this would open a camera view for QR scanning
    toast.success('QR scanner activated. Point your camera at the QR code.')

    // Simulate QR scan after 2 seconds
    setTimeout(() => {
      setShowQRScanner(false)
      toast.success('QR code scanned successfully! Attendance marked.')

      // Add to attendance data
      const newEntry = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        className: 'QR Session',
        status: 'present',
        sessionCode: 'QR-CODE-123',
      }
      setAttendanceData((prev) => [newEntry, ...prev])
    }, 2000)
  }

  const getStatusBadge = (status) => {
    const statusClasses = {
      present: 'bg-green-100 text-green-800',
      absent: 'bg-red-100 text-red-800',
      late: 'bg-yellow-100 text-yellow-800',
    }

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs ${statusClasses[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Attendance</h1>
        <p className="text-gray-600">Mark your attendance for class sessions</p>
      </div>

      {/* Attendance Marking Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Manual Entry Card */}
        <div className="card">
          <div className="flex items-center mb-4">
            <ClipboardCheck className="w-6 h-6 text-indigo-600 mr-2" />
            <h2 className="text-lg font-medium">Manual Attendance</h2>
          </div>

          <form onSubmit={handleManualAttendance} className="space-y-4">
            <div>
              <label
                htmlFor="sessionCode"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Session Code
              </label>
              <input
                id="sessionCode"
                type="text"
                className="input-field"
                placeholder="Enter session code provided by your faculty"
                value={sessionCode}
                onChange={(e) => setSessionCode(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Marking Attendance...
                </>
              ) : (
                'Mark Attendance'
              )}
            </button>
          </form>
        </div>

        {/* QR Code Card */}
        <div className="card">
          <div className="flex items-center mb-4">
            <QrCode className="w-6 h-6 text-indigo-600 mr-2" />
            <h2 className="text-lg font-medium">QR Code Attendance</h2>
          </div>

          <div className="text-center">
            {showQRScanner ? (
              <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 border-4 border-dashed border-indigo-400 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <Camera className="w-8 h-8 text-indigo-400" />
                  </div>
                  <p className="text-sm text-gray-600">Scanning QR code...</p>
                </div>
              </div>
            ) : (
              <>
                <div className="bg-gray-100 rounded-lg p-8 mb-4">
                  <QrCode className="w-32 h-32 text-gray-400 mx-auto" />
                </div>
                <button
                  onClick={handleQRScan}
                  className="w-full btn-secondary flex items-center justify-center"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Scan QR Code
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Attendance History */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium">Attendance History</h2>
          <span className="text-sm text-gray-500">Last 30 days</span>
        </div>

        {attendanceData.length > 0 ? (
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
                    Class
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Session Code
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
                {attendanceData.map((record) => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.className}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.sessionCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(record.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <ClipboardCheck className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No attendance records
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Your attendance history will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AttendancePage
