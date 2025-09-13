# Duty System - Attendance Management Application

A comprehensive web application for managing class attendance, designed for educational institutions with support for multiple user roles including students, faculty, and administrators.

## Features

### 🔐 Authentication & Authorization
- Multi-role login system (Student, Faculty, Admin, Staff)
- Secure JWT-based authentication
- Role-based access control
- Password visibility toggle

### 👨‍🎓 Student Features
- Mark attendance for classes
- View personal attendance history
- Check attendance statistics

### 👨‍🏫 Faculty Features
- Create and manage classes
- Generate attendance sessions
- View attendance reports for classes
- Monitor student attendance patterns

### 👨‍💼 Admin Features
- User management (CRUD operations)
- System-wide analytics and reporting
- Class and course management
- Advanced reporting capabilities

### 📊 Attendance Management
- Real-time attendance tracking
- Detailed attendance reports
- Session-based attendance system
- Export functionality for reports

## Technology Stack

### Frontend
- **React** - UI framework
- **React Router** - Navigation and routing
- **Tailwind CSS** - Styling and responsive design
- **Lucide React** - Icon library
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **JWT** - Authentication tokens
- **MongoDB** (assumed) - Database

### Development Tools
- **Axios** - HTTP client
- **Local Storage API** - Client-side data persistence

## Project Structure

```
duty-frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── auth/          # Authentication components
│   │   ├── dashboard/     # Role-specific dashboards
│   │   ├── classes/       # Class management components
│   │   ├── attendance/    # Attendance-related components
│   │   ├── admin/         # Admin-specific components
│   │   ├── user/          # User profile components
│   │   ├── layout/        # Layout components (Navbar, Footer, etc.)
│   │   └── common/        # Common UI components
│   ├── context/           # React Context providers
│   │   └── AuthContext.jsx # Authentication state management
│   ├── hooks/             # Custom React hooks
│   │   ├── useAuth.js     # Authentication hook
│   │   └── useLocalStorage.js # Local storage hook
│   ├── services/          # API service layers
│   │   ├── api.js         # Axios configuration
│   │   ├── auth.js        # Authentication services
│   │   ├── classes.js     # Class-related services
│   │   └── attendance.js  # Attendance-related services
│   ├── utils/             # Utility functions and constants
│   │   ├── constants.js   # Application constants
│   │   └── helpers.js     # Helper functions
│   ├── App.jsx            # Main application component
│   └── index.js           # Application entry point
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
└── README.md              # Project documentation
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation Steps

1. Clone the repository:
```bash
git clone <repository-url>
cd duty-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENVIRONMENT=development
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

5. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## API Routes

### Authentication Routes
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/logout` - User logout

### Attendance Routes
- `POST /api/attendance/mark` - Mark attendance (public)
- `GET /api/attendance/session/:sessionId` - Get session attendance (protected)
- `GET /api/attendance/student/:studentId` - Get student attendance (protected)
- `GET /api/attendance/class/:classId/report` - Get class attendance report (protected)

### Class Routes
- `GET /api/classes` - Get all classes
- `POST /api/classes` - Create a new class
- `GET /api/classes/:id` - Get a specific class
- `PUT /api/classes/:id` - Update a class
- `DELETE /api/classes/:id` - Delete a class
- `GET /api/classes/:id/students` - Get students in a class
- `POST /api/classes/:id/students` - Add student to class
- `DELETE /api/classes/:id/students/:studentId` - Remove student from class

### Session Routes
- `GET /api/sessions` - Get all sessions
- `POST /api/sessions` - Create a new session
- `GET /api/sessions/:id` - Get a specific session
- `PUT /api/sessions/:id` - Update a session
- `DELETE /api/sessions/:id` - Delete a session

## Demo Credentials

For testing purposes, you can use the following demo accounts:

- **Admin Account**: 
  - Email: `admin@example.com`
  - Password: `password123`

- **Faculty Account**: 
  - Email: `faculty@example.com`
  - Password: `password123`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please email support@dutysystem.com or create an issue in the GitHub repository.

## Acknowledgments

- Icons by [Lucide](https://lucide.dev)
- UI components built with [Tailwind CSS](https://tailwindcss.com)
- Toast notifications by [React Hot Toast](https://react-hot-toast.com)
