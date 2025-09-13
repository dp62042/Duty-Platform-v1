import React, { useState, useEffect } from 'react'
import { Download, Filter, BarChart3, Calendar, Users } from 'lucide-react'
import toast from 'react-hot-toast'

const AttendanceReport = () => {
  const [reports, setReports] = useState([])
  const [selectedClass, setSelectedClass] = useState('all')
  const [dateRange, setDateRange] = useState({
    start: '2023-09-01',
    end: '2023-09-15',
  })
  const [isLoading, setIsLoading] = useState(true)

  // Mock data - replace with API call
  useEffect(() => {
    const fetchReports = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          const mockReports = [
            {
              id: 1,
              className: 'Mathematics 101',
              date: '2023-09-15',
              totalStudents: 25,
              present: 20,
              absent: 5,
              percentage: 80,
            },
            {
              id: 2,
              className: 'Computer Science',
              date: '2023-09-14',
              totalStudents: 30,
              present: 28,
              absent: 2,
              percentage: 93.3,
            },
            {
              id: 3,
              className: 'Physics',
              date: '2023-09-13',
              totalStudents: 22,
              present: 18,
              absent: 4,
              percentage: 81.8,
            },
            {
              id: 4,
              className: 'Mathematics 101',
              date: '2023-09-12',
              totalStudents: 25,
              present: 22,
              absent: 3,
              percentage: 88,
            },
            {
              id: 5,
              className: 'Computer Science',
              date: '2023-09-11',
              totalStudents: 30,
              present: 25,
              absent: 5,
              percentage: 83.3,
            },
          ]
          setReports(mockReports)
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        toast.error('Failed to fetch attendance reports')
        console.log('Failed to fetch attendance reports', error)
        setIsLoading(false)
      }
    }

    fetchReports()
  }, [])

  const handleExport = () => {
    toast.success('Report exported successfully!')
    // In a real app, this would download a CSV or PDF
  }

  const handleFilter = () => {
    setIsLoading(true)
    // Simulate API call with filters
    setTimeout(() => {
      setIsLoading(false)
      toast.success('Filters applied')
    }, 800)
  }

  const getPercentageColor = (percentage) => {
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Attendance Reports</h1>
        <p className="text-gray-600">View and analyze class attendance data</p>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Class
            </label>
            <select
              className="input-field"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="all">All Classes</option>
              <option value="math">Mathematics 101</option>
              <option value="cs">Computer Science</option>
              <option value="physics">Physics</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              className="input-field"
              value={dateRange.start}
              onChange={(e) =>
                setDateRange({ ...dateRange, start: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              className="input-field"
              value={dateRange.end}
              onChange={(e) =>
                setDateRange({ ...dateRange, end: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handleFilter}
            className="btn-secondary flex items-center"
          >
            <Filter className="w-4 h-4 mr-2" />
            Apply Filters
          </button>

          <button
            onClick={handleExport}
            className="btn-primary flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full mr-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Sessions</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full mr-4">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Attendance</p>
              <p className="text-2xl font-bold">85.2%</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full mr-4">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Reporting Period</p>
              <p className="text-2xl font-bold">15 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="card">
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
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total Students
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
              {reports.map((report) => (
                <tr key={report.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {report.className}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.totalStudents}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.present}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.absent}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getPercentageColor(
                      report.percentage
                    )}`}
                  >
                    {report.percentage}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="card">
        <h2 className="text-lg font-medium mb-4">Attendance Trends</h2>
        <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
          <BarChart3 className="w-12 h-12 text-gray-400" />
          <p className="ml-2 text-gray-500">Attendance chart visualization</p>
        </div>
      </div>
    </div>
  )
}

export default AttendanceReport
