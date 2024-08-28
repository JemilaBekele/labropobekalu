"use client";

import React from 'react';
import { ProfileData } from '@/app/types/profiletype';

interface ProfileFormProps {
  profileData: ProfileData;
  handleProfileChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ profileData, handleProfileChange }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="flex items-center gap-2">
        <label
          className="block w-20 border-b border-transparent text-base font-semibold tracking-wide text-gray-900 outline-none focus:border-gray-300 focus:shadow-sm"
          htmlFor="client-name"
        >
          Patient Name:
        </label>
        <input
          type="text"
          id="client-name"
          name="clientName"
          className="block w-full border-b border-transparent text-base font-light tracking-wide text-gray-900 bg-blue-80 outline-none hover:border-gray-300 hover:shadow-sm focus:border-gray-300 focus:shadow-sm"
          value={profileData.clientName}
          onChange={handleProfileChange}
          placeholder="Enter client name"
        />
      </div>
      <div className="flex items-center gap-2">
        <label
          className="block  w-20 border-b border-transparent text-base font-semibold tracking-wide text-gray-900 outline-none focus:border-gray-300 focus:shadow-sm"
          htmlFor="SampleId"
        >
          Sample Id
        </label>
        <input
          type="number"
          id="SampleId"
          name="SampleId"
          className="block w-full border-b border-transparent text-base font-light tracking-wide text-gray-900 bg-blue-80 outline-none hover:border-gray-300 hover:shadow-sm focus:border-gray-300 focus:shadow-sm"
          value={profileData.SampleId}
          onChange={handleProfileChange}
          placeholder="Enter SampleId"
        />
      </div>
      <div className="flex items-center gap-2">
        <label
          className="block  w-20 border-b border-transparent text-base font-semibold tracking-wide text-gray-900 outline-none focus:border-gray-300 focus:shadow-sm"
          htmlFor="client-name"
        >
          CRN
        </label>
        <input
          type="text"
          id="CRN"
          name="CRN"
          className="block w-full border-b border-transparent text-base font-light tracking-wide text-gray-900 bg-blue-80 outline-none hover:border-gray-300 hover:shadow-sm focus:border-gray-300 focus:shadow-sm"
          value={profileData.CRN}
          onChange={handleProfileChange}
          placeholder="Enter CRN"
        />
      </div>
     
      <div className="flex items-center gap-2">
        <label
          className="block  w-20 border-b border-transparent text-base font-semibold tracking-wide text-gray-900 outline-none focus:border-gray-300 focus:shadow-sm"
          htmlFor="location"
        >
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          className="block w-full border-b border-transparent text-base font-light tracking-wide text-gray-900 bg-blue-80 outline-none hover:border-gray-300 hover:shadow-sm focus:border-gray-300 focus:shadow-sm"
          value={profileData.location}
          onChange={handleProfileChange}
          placeholder="Enter location"
        />
      </div>
      <div className="flex items-center gap-2">
        <label
          className="block  w-20 border-b border-transparent text-base font-semibold tracking-wide text-gray-900 outline-none focus:border-gray-300 focus:shadow-sm"
          htmlFor="client-name"
        >
          MRN
        </label>
        <input
          type="text"
          id="MRN"
          name="MRN"
          className="block w-full border-b border-transparent text-base font-light tracking-wide text-gray-900 bg-blue-80 outline-none hover:border-gray-300 hover:shadow-sm focus:border-gray-300 focus:shadow-sm"
          value={profileData.MRN}
          onChange={handleProfileChange}
          placeholder="Enter MRN"
        />
      </div>
      <div className="flex items-center gap-2">
        <label
          className="block  w-20 border-b border-transparent text-base font-semibold tracking-wide text-gray-900 outline-none focus:border-gray-300 focus:shadow-sm"
          htmlFor="report-date"
        >
          Report Date & Time
        </label>
        <input
          type="datetime-local"
          id="report-date"
          name="reportDate"
          className="block w-full border-b border-transparent text-base font-light tracking-wide text-gray-900 bg-blue-80 outline-none hover:border-gray-300 hover:shadow-sm focus:border-gray-300 focus:shadow-sm"
          value={profileData.reportDate}
          onChange={handleProfileChange}
          placeholder="Enter report date and time"
        />
      </div>
      <div className="flex items-center gap-2">
        <label
          className="block  w-20 border-b border-transparent text-base font-semibold tracking-wide text-gray-900 outline-none focus:border-gray-300 focus:shadow-sm"
          htmlFor="age"
        >
          Age
        </label>
        <input
          type="number"
          id="age"
          name="age"
          className="block w-full border-b border-transparent text-base font-light tracking-wide text-gray-900 bg-blue-80 outline-none hover:border-gray-300 hover:shadow-sm focus:border-gray-300 focus:shadow-sm"
          value={profileData.age}
          onChange={handleProfileChange}
          placeholder="Enter age"
        />
      </div>

      

      <div className="flex items-center gap-2">
        <label
          className="block  w-20 border-b border-transparent text-base font-semibold tracking-wide text-gray-900 outline-none focus:border-gray-300 focus:shadow-sm"
          htmlFor="sex"
        >
          Sex
        </label>
        <select
          id="sex"
          name="sex"
          className="block w-full border-b border-transparent text-base font-light tracking-wide text-gray-900 bg-blue-80 outline-none hover:border-gray-300 hover:shadow-sm focus:border-gray-300 focus:shadow-sm"
          value={profileData.sex}
          onChange={handleProfileChange}
        >
          <option value="">Select sex</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label
          className="block  w-20 border-b border-transparent text-base font-semibold tracking-wide text-gray-900 outline-none focus:border-gray-300 focus:shadow-sm"
          htmlFor="phoneNumber"
        >
          Phone Number
        </label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          className="block w-full border-b border-transparent text-base font-light tracking-wide text-gray-900 bg-blue-80 outline-none hover:border-gray-300 hover:shadow-sm focus:border-gray-300 focus:shadow-sm"
          value={profileData.phoneNumber}
          onChange={handleProfileChange}
          placeholder="Enter phone number"
        />
      </div>
    </div>
  );
};

export default ProfileForm;
