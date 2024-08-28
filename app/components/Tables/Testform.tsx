"use client";

import React from 'react';

interface TestFormProps {
  items: string[];
  formData: { [key: string]: { result: string; remark: string } };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, item: string) => void;
  title: string;
}

const TestForm: React.FC<TestFormProps> = ({ items, formData, handleChange, title }) => {
  return (
    <div className='p-4 border rounded-lg'>
      <h1 className='block mb-4 font-semibold text-2xl text-yellow-400'>{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item} className="flex flex-col">
            <label className="font-semibold mb-1" htmlFor={`${item}-result`}>{item} Result</label>
            <input
              type="text"
              id={`${item}-result`}
              name="result"
              value={formData[item]?.result || ''}
              className="w-full border-b border-slate-300 text-lg font-light tracking-wide text-gray-500 outline-none hover:border-gray-300 hover:shadow-sm focus:border-gray-300 focus:shadow-sm"
              onChange={(e) => handleChange(e, item)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestForm;
