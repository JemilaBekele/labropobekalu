"use client";

import React, { useState } from 'react';

interface TestFormmicroProps {
  items: string[];
  formData: { [key: string]: { result: string; remark: string } };
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>, item: string) => void;
  title: string;
}

const TestFormReco: React.FC<TestFormmicroProps> = ({ items, formData, handleChange, title }) => {
  

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>, item: string) => {
    const words = e.target.value.trim().split(/\s+/);
    const wordCount = words.length;

    if (wordCount <= 67) {
      
      handleChange(e, item);
    }
  };

  return (
    <div className='p-4'>
      {items.map((item) => (
        <div key={item} className="flex flex-col md:flex-row items-start gap-4 mb-4">
          <label
            className="flex-shrink-0 w-1/8 font-semibold text-lg"
            htmlFor={`${item}-result`}
          >
            {item} 
          </label>
          <div className="flex-grow">
            <textarea
              id={`${item}-result`}
              name="result"
              value={formData[item]?.result || ''}
              className="w-full resize-none border rounded-md border-slate-200 bg-white text-lg font-light tracking-wide text-gray-500 outline-none p-2 hover:border-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-300"
              rows={4}
              onChange={(e) => handleInputChange(e, item)}
            />
            <div className="text-sm text-gray-500 text-right">
               Maximunm 67 words 
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestFormReco;
