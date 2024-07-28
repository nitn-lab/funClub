import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ label, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onSelect) onSelect(option); // Notify parent about the selection
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left w-full" ref={dropdownRef}>
      <label className="text-lg font-medium text-white">{label}</label>
      <div>
        <button
          type="button"
          className="inline-flex justify-between w-full rounded-lg border-2 xs:border-0  p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 text-black bg-white"
          onClick={handleToggle}
        >
          {selectedOption}
          <svg
            className={`w-5 h-5 ml-2 -mr-1 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06-.02l3.22 3.1 3.22-3.1a.75.75 0 111.04 1.08l-3.75 3.6a.75.75 0 01-1.04 0l-3.75-3.6a.75.75 0 01-.02-1.06z" clipRule="evenodd" />
          </svg>
        </button>
        {isOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5  z-20">
            <div className="py-1 h-36 xs:h-24 overflow-auto">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={`block px-4 py-2 xs:py-1 text-lg xs:text-sm font-semibold xs:font-normal w-full text-left hover:bg-[#cda5e6]   focus:bg-gray-100 ${
                    option === selectedOption ? 'bg-[#c493e2]' : 'text-black'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;