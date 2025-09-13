export const mockData = {
  student: {
    upcomingClasses: [
      { id: 1, name: 'Mathematics', time: '09:00 AM', location: 'Room 101' },
      {
        id: 2,
        name: 'Computer Science',
        time: '11:00 AM',
        location: 'Room 203',
      },
      { id: 3, name: 'Physics', time: '02:00 PM', location: 'Room 305' },
    ],
    attendance: { present: 45, absent: 5, percentage: 90 },
    recentActivity: [
      {
        id: 1,
        course: 'Mathematics',
        action: 'Assignment submitted',
        time: '2 hours ago',
      },
      {
        id: 2,
        course: 'Computer Science',
        action: 'Attendance marked',
        time: 'Yesterday',
      },
      { id: 3, course: 'Physics', action: 'Grade updated', time: '2 days ago' },
    ],
  },
  faculty: {
    todayClasses: [
      { id: 1, name: 'Mathematics 101', time: '09:00 - 10:30', section: 'A' },
      { id: 2, name: 'Advanced Calculus', time: '11:00 - 12:30', section: 'B' },
    ],
    attendanceStats: { totalStudents: 120, presentToday: 95, percentage: 79 },
    pendingTasks: [
      {
        id: 1,
        task: 'Grade Assignment 3',
        course: 'Mathematics 101',
        due: 'Tomorrow',
      },
      {
        id: 2,
        task: 'Prepare lesson plan',
        course: 'Advanced Calculus',
        due: 'Friday',
      },
    ],
  },
  admin: {
    systemStats: { totalUsers: 1245, activeSessions: 23, pendingApprovals: 7 },
    recentActivity: [
      { id: 1, action: 'New faculty account created', time: '30 minutes ago' },
      { id: 2, action: 'Class schedule updated', time: '2 hours ago' },
      { id: 3, action: 'System maintenance scheduled', time: 'Yesterday' },
    ],
    quickActions: [
      { id: 1, action: 'Create User' },
      { id: 2, action: 'Generate Reports' },
      { id: 3, action: 'Manage Classes' },
      { id: 4, action: 'System Settings' },
    ],
  },
  staff: {
    tasks: [
      {
        id: 1,
        task: 'Process registration forms',
        status: 'Pending',
        priority: 'High',
      },
      {
        id: 2,
        task: 'Update student records',
        status: 'In Progress',
        priority: 'Medium',
      },
      {
        id: 3,
        task: 'Prepare attendance reports',
        status: 'Completed',
        priority: 'Low',
      },
    ],
    announcements: [
      {
        id: 1,
        title: 'Semester Break',
        content: 'College closed Dec 20 - Jan 5',
        date: 'Dec 15, 2023',
      },
      {
        id: 2,
        title: 'Fee Submission',
        content: 'Last date Jan 15, 2024',
        date: 'Dec 10, 2023',
      },
    ],
  },
}
