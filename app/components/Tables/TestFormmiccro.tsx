"use client";

import React from 'react';

interface TestFormmicroProps {
  items: string[];
  formData: { [key: string]: { result: string; remark: string } };
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>, item: string) => void;
  title: string;
}

const TestFormmicro: React.FC<TestFormmicroProps> = ({ items, formData, handleChange, title }) => {
  return (
    <div className='p-4 border rounded-lg shadow-md'>
      <h1 className='block mb-4 font-semibold text-2xl text-yellow-400'>{title}</h1>
      {items.map((item) => (
        <div key={item} className="flex flex-col md:flex-row items-start gap-4 mb-4">
          <label
            className="flex-shrink-0 w-1/6 font-semibold text-lg"
            htmlFor={`${item}-result`}
          >
            {item} Result:
          </label>
          <textarea
            id={`${item}-result`}
            name="result"
            value={formData[item]?.result || ''}
            className="flex-grow resize-none border rounded-md border-slate-200 bg-white text-lg font-light tracking-wide text-gray-500 outline-none p-2 hover:border-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-300"
            rows={2}
            onChange={(e) => handleChange(e, item)}
          />
        </div>
      ))}
    </div>
  );
};

export default TestFormmicro;
