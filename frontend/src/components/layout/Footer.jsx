import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Duty System. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-sm text-gray-600 hover:text-indigo-600">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-indigo-600">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-indigo-600">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
