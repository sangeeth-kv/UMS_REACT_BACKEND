import React from 'react'

function AuthFormButton(props) {
  return (
    <button
        className="w-full mt-4 py-2 rounded-lg 
                   bg-blue-600 hover:bg-blue-700 
                   text-white font-semibold transition 
                   dark:bg-blue-500 dark:hover:bg-blue-600"
    >
        {props.title}
    </button>
  )
}

export default AuthFormButton