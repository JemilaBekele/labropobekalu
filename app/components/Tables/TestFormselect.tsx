"use client";

import React from 'react';

interface TestFormselectProps {
  items: string[];
  formData: { [key: string]: { result: string; remark: string } };
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>, item: string) => void;
  title: string;
  resultOptions: string[];
}

const TestFormselect: React.FC<TestFormselectProps> = ({ items, formData, handleChange, title, resultOptions }) => {
  return (
    <div className='p-4 border rounded-lg shadow-md'>
      <h1 className='block mb-4 font-semibold text-2xl text-yellow-400'>{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-2">
            <label
              className="flex-shrink-0 w-1/4 font-semibold text-base"
              htmlFor={`${item}-result`}
            >
              {item} Result
            </label>
            <select
              id={`${item}-result`}
              name="result"
              value={formData[item]?.result || ''}
              className="flex-grow border border-slate-100 text-lg font-light tracking-wide text-gray-500 outline-none  rounded-md  "
              onChange={(e) => handleChange(e, item)}
            >
              <option value="">Select</option>
              {resultOptions.map((option, idx) => (
                <option key={idx} value={option}>{option}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestFormselect;
