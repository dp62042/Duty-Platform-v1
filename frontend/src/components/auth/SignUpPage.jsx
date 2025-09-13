import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  UserPlus,
  BookOpen,
  GraduationCap,
  Briefcase,
  UserCog,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const SignUpPage = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    registrationNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    interests: [],
    goals: '',
    preferredTone: 'formal',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  // Options for the form
  const roleOptions = [
    { value: 'student', label: 'Student', icon: GraduationCap },
    { value: 'faculty', label: 'Faculty', icon: BookOpen },
    { value: 'staff', label: 'Staff', icon: Briefcase },
    { value: 'admin', label: 'Admin', icon: UserCog },
  ]

  const interestOptions = [
    'Technology',
    'Science',
    'Arts',
    'Sports',
    'Literature',
    'Mathematics',
    'History',
    'Geography',
    'Programming',
    'Design',
    'Business',
    'Music',
  ]

  const toneOptions = [
    { value: 'formal', label: 'Formal' },
    { value: 'informal', label: 'Informal' },
    { value: 'casual', label: 'Casual' },
  ]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (type === 'checkbox') {
      // Handle interests checkboxes
      if (checked) {
        setFormData((prev) => ({
          ...prev,
          interests: [...prev.interests, value],
        }))
      } else {
        setFormData((prev) => ({
          ...prev,
          interests: prev.interests.filter((interest) => interest !== value),
        }))
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }

    // Clear error when field is updated
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const validateStep1 = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.registrationNumber.trim())
      newErrors.registrationNumber = 'Registration number is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Email is invalid'
    if (!formData.role) newErrors.role = 'Please select a role'
    if (!formData.password) newErrors.password = 'Password is required'
    else if (formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters'
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors = {}

    if (formData.interests.length === 0)
      newErrors.interests = 'Select at least one interest'
    if (!formData.goals.trim()) newErrors.goals = 'Please share your goals'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRoleSelect = (role) => {
    setFormData((prev) => ({ ...prev, role }))
    if (errors.role) {
      setErrors((prev) => ({
        ...prev,
        role: '',
      }))
    }
  }

  const handleNext = () => {
    if (validateStep1()) {
      if (formData.role === 'student') {
        setCurrentStep(2)
      } else {
        handleSubmit()
      }
    }
  }

  const handleBack = () => {
    setCurrentStep(1)
  }

  const handleSubmit = async () => {
    if (currentStep === 2 && !validateStep2()) {
      return
    }

    setLoading(true)

    try {
      const result = await register(formData)

      if (result.success) {
        toast.success('Account created successfully!')
        navigate('/dashboard')
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error('An error occurred during registration')
      console.error('Registration error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-600 mt-2">Join the Duty platform</p>
        </div>

        {/* Progress indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div
              className={`flex-1 h-2 rounded-full ${
                currentStep >= 1 ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            ></div>
            <div className="mx-2 w-2 h-2 rounded-full bg-indigo-600"></div>
            <div
              className={`flex-1 h-2 rounded-full ${
                currentStep >= 2 ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Basic Info</span>
            <span>
              {formData.role === 'student' ? 'Interests' : 'Complete'}
            </span>
          </div>
        </div>

        {/* Form */}
        <div className="card">
          {currentStep === 1 ? (
            /* Step 1: Basic Information */
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="input-field"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="registrationNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Registration Number
                </label>
                <input
                  id="registrationNumber"
                  name="registrationNumber"
                  type="text"
                  required
                  className="input-field"
                  placeholder="Enter your registration number"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  disabled={loading}
                />
                {errors.registrationNumber && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.registrationNumber}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="input-field"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="input-field"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="input-field"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={loading}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Role
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {roleOptions.map((role) => {
                    const Icon = role.icon
                    return (
                      <button
                        key={role.value}
                        type="button"
                        onClick={() => handleRoleSelect(role.value)}
                        className={`p-3 border rounded-lg text-center transition-colors duration-200 ${
                          formData.role === role.value
                            ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                            : 'border-gray-300 hover:border-indigo-300'
                        }`}
                      >
                        <Icon className="w-5 h-5 mx-auto mb-1" />
                        <span className="text-sm font-medium">
                          {role.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
                {errors.role && (
                  <p className="mt-1 text-sm text-red-600">{errors.role}</p>
                )}
              </div>

              <button
                type="button"
                onClick={handleNext}
                disabled={loading}
                className="w-full flex justify-center items-center btn-primary py-2 px-4 text-sm font-medium rounded-md"
              >
                {formData.role === 'student' ? 'Continue' : 'Create Account'}
                <ChevronRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          ) : (
            /* Step 2: Student Interests */
            <div className="space-y-4">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Tell us about yourself
                </h3>
                <p className="text-gray-600 text-sm">
                  This helps us personalize your experience
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What are you interested in? (Select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {interestOptions.map((interest) => (
                    <label
                      key={interest}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                    >
                      <input
                        type="checkbox"
                        name="interests"
                        value={interest}
                        checked={formData.interests.includes(interest)}
                        onChange={handleChange}
                        className="rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-gray-700">{interest}</span>
                    </label>
                  ))}
                </div>
                {errors.interests && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.interests}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="goals"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  What are your academic or career goals?
                </label>
                <textarea
                  id="goals"
                  name="goals"
                  rows={3}
                  className="input-field"
                  placeholder="Share your aspirations and goals..."
                  value={formData.goals}
                  onChange={handleChange}
                  disabled={loading}
                />
                {errors.goals && (
                  <p className="mt-1 text-sm text-red-600">{errors.goals}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred communication tone
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {toneOptions.map((tone) => (
                    <button
                      key={tone.value}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          preferredTone: tone.value,
                        }))
                      }
                      className={`p-3 border rounded-lg text-center transition-colors duration-200 ${
                        formData.preferredTone === tone.value
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-gray-300 hover:border-indigo-300'
                      }`}
                    >
                      <span className="text-sm font-medium">{tone.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 btn-secondary py-2 px-4 text-sm font-medium rounded-md flex items-center justify-center"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 btn-primary py-2 px-4 text-sm font-medium rounded-md"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
