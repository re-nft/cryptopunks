import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

const Select = ({ options, value, onChange, label }) => {
  const handleChange = useCallback(
    (key) => {
      onChange(key);
    },
    [onChange]
  );

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          {label}
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          onChange={(ev) => handleChange(ev.target.value)}
        >
          {Object.keys(options).map((key) => (
            <option value={key} key={key} selected={key === value}>
              {options[key]}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {/* Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200" */}
            {Object.keys(options).map((key) => (
              <a
                href="#"
                className={`whitespace-nowrap border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 py-4 px-1 border-b-2 font-medium text-sm transition-all transition-all duration-300 ${
                  key === value ? 'border-indigo-500 text-indigo-600' : ''
                }`}
                key={key}
                onClick={() => handleChange(key)}
              >
                {options[key]}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.any.isRequired,
  value: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Select;
