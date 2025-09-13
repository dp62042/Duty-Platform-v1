import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Save,
  X,
  BookOpen,
  Users,
  Calendar,
  Clock,
  MapPin,
  User,
  Plus,
  Trash2,
} from 'lucide-react'
import toast from 'react-hot-toast'

const CreateClass = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [facultyList, setFacultyList] = useState([])
  const [formData, setFormData] = useState({
    className: '',
    section: '',
    subject: '',
    courseCode: '',
    description: '',
    assignedFaculty: '',
    schedule: {
      days: [],
      startTime: '',
      endTime: '',
    },
    location: '',
  })

  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]

  // Mock faculty data - replace with API call
  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          const mockFaculty = [
            { id: 1, name: 'Dr. Sarah Johnson', email: 'sarah@example.com' },
            { id: 2, name: 'Dr. Michael Chen', email: 'michael@example.com' },
            { id: 3, name: 'Dr. Emily Roberts', email: 'emily@example.com' },
            { id: 4, name: 'Dr. James Wilson', email: 'james@example.com' },
            { id: 5, name: 'Dr. Lisa Anderson', email: 'lisa@example.com' },
          ]
          setFacultyList(mockFaculty)
        }, 500)
      } catch (error) {
        toast.error('Failed to fetch faculty data')
        console.log('failed to fetch faculty data', error)
      }
    }

    fetchFaculty()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleScheduleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [name]: value,
      },
    }))
  }

  const handleDayToggle = (day) => {
    setFormData((prev) => {
      const days = prev.schedule.days.includes(day)
        ? prev.schedule.days.filter((d) => d !== day)
        : [...prev.schedule.days, day]

      return {
        ...prev,
        schedule: {
          ...prev.schedule,
          days,
        },
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Basic validation
    if (
      !formData.className ||
      !formData.section ||
      !formData.subject ||
      !formData.courseCode
    ) {
      toast.error('Please fill in all required fields')
      setIsLoading(false)
      return
    }

    if (formData.schedule.days.length === 0) {
      toast.error('Please select at least one day for the schedule')
      setIsLoading(false)
      return
    }

    if (!formData.schedule.startTime || !formData.schedule.endTime) {
      toast.error('Please set both start and end times')
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call
      setTimeout(() => {
        toast.success('Class created successfully!')
        setIsLoading(false)
        navigate('/admin/classes') // Redirect to classes list
      }, 1500)
    } catch (error) {
      toast.error('Failed to create class')
      console.log('Failed to create class', error)
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/admin/classes')
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Create New Class</h1>
          <p className="text-gray-600">Add a new class to the system</p>
        </div>
        <button
          onClick={handleCancel}
          className="btn-secondary flex items-center"
        >
          <X className="w-4 h-4 mr-2" />
          Cancel
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="card space-y-6">
        {/* Basic Information */}
        <div>
          <h2 className="text-lg font-medium mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Class Name *
              </label>
              <input
                type="text"
                name="className"
                className="input-field"
                placeholder="e.g., Mathematics 101"
                value={formData.className}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section *
              </label>
              <input
                type="text"
                name="section"
                className="input-field"
                placeholder="e.g., A, B, C"
                value={formData.section}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject *
              </label>
              <input
                type="text"
                name="subject"
                className="input-field"
                placeholder="e.g., Computer Science"
                value={formData.subject}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Code *
              </label>
              <input
                type="text"
                name="courseCode"
                className="input-field"
                placeholder="e.g., CSC301"
                value={formData.courseCode}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            rows={3}
            className="input-field"
            placeholder="Describe the class content, objectives, etc."
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

        {/* Faculty Assignment */}
        <div>
          <h2 className="text-lg font-medium mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-indigo-600" />
            Faculty Assignment
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assign Faculty *
            </label>
            <select
              name="assignedFaculty"
              className="input-field"
              value={formData.assignedFaculty}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a faculty member</option>
              {facultyList.map((faculty) => (
                <option key={faculty.id} value={faculty.id}>
                  {faculty.name} ({faculty.email})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Schedule */}
        <div>
          <h2 className="text-lg font-medium mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
            Schedule
          </h2>

          {/* Days Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Class Days *
            </label>
            <div className="flex flex-wrap gap-2">
              {daysOfWeek.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleDayToggle(day)}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    formData.schedule.days.includes(day)
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {day.substring(0, 3)}
                </button>
              ))}
            </div>
            {formData.schedule.days.length > 0 && (
              <p className="text-sm text-gray-500 mt-2">
                Selected: {formData.schedule.days.join(', ')}
              </p>
            )}
          </div>

          {/* Time Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time *
              </label>
              <input
                type="time"
                name="startTime"
                className="input-field"
                value={formData.schedule.startTime}
                onChange={handleScheduleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time *
              </label>
              <input
                type="time"
                name="endTime"
                className="input-field"
                value={formData.schedule.endTime}
                onChange={handleScheduleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div>
          <h2 className="text-lg font-medium mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-indigo-600" />
            Location
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Class Location
            </label>
            <input
              type="text"
              name="location"
              className="input-field"
              placeholder="e.g., Room 301, Block A"
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handleCancel}
            className="btn-secondary"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary flex items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Create Class
              </>
            )}
          </button>
        </div>
      </form>

      {/* Demo Note */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-sm font-medium text-blue-800 mb-2">Demo Note</h3>
        <p className="text-xs text-blue-600">
          This is a demo form. In a real application, this would connect to your
          backend API to create a new class in the database. All validation
          would be handled both client-side and server-side.
        </p>
      </div>
    </div>
  )
}

export default CreateClass
