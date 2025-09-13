import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Users,
  Calendar,
  BookOpen,
  Clock,
  MapPin,
  Download,
  MoreVertical,
  GraduationCap,
  UserCog,
  Briefcase,
} from 'lucide-react'
import toast from 'react-hot-toast'

const ClassManagement = () => {
  const [classes, setClasses] = useState([])
  const [filteredClasses, setFilteredClasses] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [roleFilter, setRoleFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [classToDelete, setClassToDelete] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const classesPerPage = 8

  // Mock data - replace with API call
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          const mockClasses = [
            {
              id: 1,
              className: 'Mathematics 101',
              section: 'B',
              subject: 'Computer Science',
              courseCode: 'CSC301',
              enrolledStudents: 25,
              assignedFaculty: 'Dr. Sarah Johnson',
              schedule: {
                days: ['Tuesday', 'Thursday'],
                startTime: '11:00',
                endTime: '12:30',
              },
              location: 'Room 301, Block A',
              status: 'active',
            },
            {
              id: 2,
              className: 'Data Structures',
              section: 'A',
              subject: 'Computer Science',
              courseCode: 'CSC302',
              enrolledStudents: 30,
              assignedFaculty: 'Dr. Michael Chen',
              schedule: {
                days: ['Monday', 'Wednesday', 'Friday'],
                startTime: '09:00',
                endTime: '10:30',
              },
              location: 'Lab 5, CS Building',
              status: 'active',
            },
            {
              id: 3,
              className: 'Physics I',
              section: 'C',
              subject: 'Physics',
              courseCode: 'PHY101',
              enrolledStudents: 22,
              assignedFaculty: 'Dr. Emily Roberts',
              schedule: {
                days: ['Tuesday', 'Thursday'],
                startTime: '14:00',
                endTime: '15:30',
              },
              location: 'Room 204, Science Wing',
              status: 'active',
            },
            {
              id: 4,
              className: 'Calculus II',
              section: 'D',
              subject: 'Mathematics',
              courseCode: 'MATH202',
              enrolledStudents: 28,
              assignedFaculty: 'Dr. James Wilson',
              schedule: {
                days: ['Monday', 'Wednesday'],
                startTime: '13:00',
                endTime: '14:30',
              },
              location: 'Room 105, Math Building',
              status: 'inactive',
            },
            {
              id: 5,
              className: 'Organic Chemistry',
              section: 'B',
              subject: 'Chemistry',
              courseCode: 'CHEM201',
              enrolledStudents: 20,
              assignedFaculty: 'Dr. Lisa Anderson',
              schedule: {
                days: ['Tuesday', 'Thursday'],
                startTime: '10:00',
                endTime: '11:30',
              },
              location: 'Lab 3, Chemistry Wing',
              status: 'active',
            },
            {
              id: 6,
              className: 'English Literature',
              section: 'A',
              subject: 'English',
              courseCode: 'ENG101',
              enrolledStudents: 35,
              assignedFaculty: 'Dr. Robert Smith',
              schedule: {
                days: ['Monday', 'Wednesday', 'Friday'],
                startTime: '11:00',
                endTime: '12:00',
              },
              location: 'Room 401, Humanities Building',
              status: 'active',
            },
          ]
          setClasses(mockClasses)
          setFilteredClasses(mockClasses)
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        toast.error('Failed to fetch classes')
        console.log('Failed to fetch classes', error)
        setIsLoading(false)
      }
    }

    fetchClasses()
  }, [])

  // Filter classes based on search term and filters
  useEffect(() => {
    let result = classes

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (cls) =>
          cls.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cls.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cls.subject.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter((cls) => cls.status === statusFilter)
    }

    // Apply role filter (if needed)
    // This would be more relevant if we had different types of classes

    setFilteredClasses(result)
  }, [searchTerm, statusFilter, roleFilter, classes])

  // Pagination
  const indexOfLastClass = currentPage * classesPerPage
  const indexOfFirstClass = indexOfLastClass - classesPerPage
  const currentClasses = filteredClasses.slice(
    indexOfFirstClass,
    indexOfLastClass
  )
  const totalPages = Math.ceil(filteredClasses.length / classesPerPage)

  const handleDeleteClick = (cls) => {
    setClassToDelete(cls)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = () => {
    // In a real app, you would make an API call here
    setClasses(classes.filter((cls) => cls.id !== classToDelete.id))
    setIsDeleteModalOpen(false)
    setClassToDelete(null)
    toast.success('Class deleted successfully')
  }

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false)
    setClassToDelete(null)
  }

  const handleExport = () => {
    toast.success('Class data exported successfully')
    // In a real app, this would generate a CSV or PDF
  }

  const getStatusBadge = (status) => {
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs ${
          status === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const getSubjectIcon = (subject) => {
    switch (subject.toLowerCase()) {
      case 'computer science':
        return <UserCog className="w-5 h-5 text-blue-600" />
      case 'mathematics':
        return <BookOpen className="w-5 h-5 text-purple-600" />
      case 'physics':
        return <GraduationCap className="w-5 h-5 text-red-600" />
      case 'chemistry':
        return <Briefcase className="w-5 h-5 text-green-600" />
      default:
        return <BookOpen className="w-5 h-5 text-gray-600" />
    }
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Class Management</h1>
          <p className="text-gray-600">Manage all classes in the system</p>
        </div>
        <Link
          to="/admin/classes/create"
          className="btn-primary flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Class
        </Link>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search classes..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              className="input-field"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <select
              className="input-field"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All Subjects</option>
              <option value="computer science">Computer Science</option>
              <option value="mathematics">Mathematics</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
              <option value="english">English</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Showing {filteredClasses.length} of {classes.length} classes
          </p>
          <button
            onClick={handleExport}
            className="btn-secondary flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentClasses.length > 0 ? (
          currentClasses.map((cls) => (
            <div
              key={cls.id}
              className="card hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="p-2 bg-gray-100 rounded-lg mr-3">
                    {getSubjectIcon(cls.subject)}
                  </div>
                  <div>
                    <h3 className="font-medium">{cls.className}</h3>
                    <p className="text-sm text-gray-500">{cls.courseCode}</p>
                  </div>
                </div>
                {getStatusBadge(cls.status)}
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{cls.enrolledStudents} students enrolled</span>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{cls.schedule.days.join(', ')}</span>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>
                    {cls.schedule.startTime} - {cls.schedule.endTime}
                  </span>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{cls.location}</span>
                </div>

                <div className="text-sm text-gray-600">
                  <span className="font-medium">Faculty: </span>
                  {cls.assignedFaculty}
                </div>
              </div>

              <div className="flex space-x-2 pt-4 border-t border-gray-200">
                <Link
                  to={`/classes/${cls.id}`}
                  className="flex-1 btn-secondary flex items-center justify-center"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Link>
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteClick(cls)}
                  className="p-2 text-gray-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No classes found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8">
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="btn-secondary disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-md ${
                  currentPage === page
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="btn-secondary disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the class "
              {classToDelete?.className}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button onClick={handleDeleteCancel} className="btn-secondary">
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="btn-primary bg-red-600 hover:bg-red-700"
              >
                Delete Class
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ClassManagement
