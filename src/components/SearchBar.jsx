import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [debounceTimer, setDebounceTimer] = useState(null);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    const newTimer = setTimeout(() => {
      onSearch(query);
    }, 300);
    setDebounceTimer(newTimer);

    return () => {
      clearTimeout(newTimer);
    };
  }, [query, onSearch]);

  return (
    <div className="p-4 flex justify-center items-center bg-gray-100">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search users..."
          value={query}
          onChange={handleChange}
          className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-full px-4 py-2 w-full text-base text-black placeholder-gray-600 shadow-md outline-none transition-all duration-300 ease-in-out"
        />
        <div className="absolute inset-y-0 right-3 flex items-center">
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 1 0-10.6 0 7.5 7.5 0 0 0 10.6 0z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
