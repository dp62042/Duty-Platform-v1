import React, { useState } from 'react'

import { ClipboardCheck, BookOpen, Award, Clock } from 'lucide-react'
import { mockData } from '../../data/mockData'

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-full">
                  <ClipboardCheck className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Attendance
                  </h3>
                  <p className="text-2xl font-bold">
                    {mockData.student.attendance.percentage}%
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-full">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Enrolled Courses
                  </h3>
                  <p className="text-2xl font-bold">5</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">GPA</h3>
                  <p className="text-2xl font-bold">3.8</p>
                </div>
              </div>
            </div>
          </div>
        )
      case 'classes':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium mb-4">My Classes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'Mathematics',
                'Physics',
                'Computer Science',
                'English',
                'History',
              ].map((subject, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-3">
                    <BookOpen className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h4 className="font-medium">{subject}</h4>
                  <p className="text-sm text-gray-500">Dr. Smith</p>
                  <div className="mt-3 flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Mon, Wed, Fri</span>
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

  return (
    <DashboardLayout
      role="student"
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      {renderTabContent()}
    </DashboardLayout>
  )
}

export default StudentDashboard
