
import React from 'react'

function DetailsRow({label,value
    
}) {
  return (
    <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
      <span className="text-gray-600 dark:text-gray-400">{label}</span>
      <span className="font-medium text-gray-800 dark:text-white">
        {value}
      </span>
    </div>
  )
}

export default DetailsRow