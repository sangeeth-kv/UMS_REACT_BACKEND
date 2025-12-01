import React from 'react'

function FormInputField(props) {
  
  return (
          <div className="flex flex-col mb-4">
            <label className="mb-1 font-medium">{props.title}</label>

            <div className="relative w-full">
              <input
                type={props.type}
                {...props.register}
                placeholder= {`Enter your ${props.title.toLowerCase()}`}
                className="
            block w-full px-3 py-2 pr-10 rounded-lg border border-blue-300 
            dark:border-gray-700
            bg-white dark:bg-gray-700
            text-blue-900 dark:text-white
            placeholder:text-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-500 
            transition
          "
              />

              {props.icon &&(
                <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center text-gray-500 dark:text-gray-300"
              >
               {props.icon}
              </button>
              )}
            </div>
             {props.error && <p className="text-red-500 text-sm mt-1">{props.error}</p>}
          </div>
  )
}

export default FormInputField