import React from 'react'

const Loader = ({ size = 'medium', text = '', className = '' }) => {
  // Size classes
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12',
  }

  // Text size classes
  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-b-2 border-indigo-600 ${sizeClasses[size]}`}
      ></div>
      {text && (
        <p className={`mt-2 text-gray-600 ${textSizeClasses[size]}`}>{text}</p>
      )}
    </div>
  )
}

// Inline loader for use within buttons or small spaces
export const InlineLoader = ({ size = 'small' }) => {
  const sizeClasses = {
    small: 'h-3 w-3',
    medium: 'h-4 w-4',
    large: 'h-5 w-5',
  }

  return (
    <div
      className={`animate-spin rounded-full border-b-2 border-current ${sizeClasses[size]}`}
    ></div>
  )
}

export default Loader
