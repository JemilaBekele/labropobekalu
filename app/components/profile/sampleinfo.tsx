"use client";

import React from 'react';
import { ProfileData } from '@/app/types/profiletype';

interface ProfileFormProps {
  profileData: ProfileData;
  handleProfileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ profileData, handleProfileChange }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex grow items-center gap-2">
          <label className="block w-40 border-b border-transparent text-lg font-semibold tracking-wide text-gray-900 outline-none focus:border-gray-300 focus:shadow-sm" htmlFor="client-name">Patient Name:</label>
          <input
            type="text"
            id="client-name"
            name="clientName"
            className="block w-100 border-b border-transparent text-lg font-light tracking-wide text-gray-900 bg-blue-80 outline-none hover:border-gray-300 hover:shadow-sm focus:border-gray-300 focus:shadow-sm"
            value={profileData.clientName}
            onChange={handleProfileChange}
            placeholder="Enter client name"
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex grow items-center gap-2">
          <label className="block w-40 border-b border-transparent text-lg font-semibold tracking-wide text-gray-900 outline-none focus:border-gray-300 focus:shadow-sm" htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            className="block w-100 border-b border-transparent text-lg font-light tracking-wide text-gray-900 bg-blue-80  outline-none hover:border-gray-300 hover:shadow-sm focus:border-gray-300 focus:shadow-sm"
            value={profileData.age}
            onChange={handleProfileChange}
            placeholder="Enter age"
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex grow items-center gap-2">
          <label className="block w-40 border-b border-transparent text-lg font-semibold tracking-wide text-gray-900 outline-none focus:border-gray-300 focus:shadow-sm" htmlFor="report-date">Report Date & Time</label>
          <input
            type="datetime-local"
            id="report-date"
            name="reportDate"
            className="block w-100 border-b border-transparent text-lg font-light tracking-wide text-gray-900 bg-blue-80  outline-none hover:border-gray-300 hover:shadow-sm focus:border-gray-300 focus:shadow-sm"
            value={profileData.reportDate}
            onChange={handleProfileChange}
            placeholder="Enter report date and time"
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex grow items-center gap-2">
          <label className="block w-40 border-b border-transparent text-lg font-semibold tracking-wide text-gray-900 outline-none focus:border-gray-300 focus:shadow-sm" htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            className="block w-100 border-b border-transparent text-lg font-light tracking-wide text-gray-900 bg-blue-80 outline-none hover:border-gray-300 hover:shadow-sm focus:border-gray-300 focus:shadow-sm"
            value={profileData.location}
            onChange={handleProfileChange}
            placeholder="Enter location"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
