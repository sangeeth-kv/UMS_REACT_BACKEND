import {useState} from "react"

export default function SearchBar({ setSeachQuery }) {

    const [query,setValue]=useState("")

  const handleChange = (e) => {
    const value = e.target.value;
    setValue(value)
    setSeachQuery(value)
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative">
        {/* Search Icon */}
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
          />
        </svg>

        {/* Input */}
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search..."
          className="
            w-full pl-10 pr-4 py-2 rounded-xl
            bg-white dark:bg-gray-900
            text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-500
            border border-gray-300 dark:border-gray-700
            focus:outline-none focus:ring-2
            focus:ring-blue-500 dark:focus:ring-blue-400
            transition
          "
        />
      </div>
    </div>
  );
}
