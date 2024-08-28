"use client";

import React, { useState } from 'react';
import ProfileForm from '../profile/ProfileForm';
import { ProfileData } from "@/app/types/profiletype";
import { mic_generatePdf } from './Mic_generatePdf';
import MicTableDisplay from './MicroTableDisplay';
import TestFormmicro from '../Tables/TestFormmiccro'; // Import the TestForm component
import TestFormReco from '../Tables/TestFormReco'; 
import RecomTableDisplay from '../Combine/Tablerecomend'
const Micro_CombinedForm: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    clientName: '',
    SampleId: '',
    age: '',
    reportDate: '',
    location: '',
    phoneNumber: '',
    sex: '',
    CRN: '',
    MRN: ''
  });

  const [formData, setFormData] = useState<{ [key: string]: { result: string; remark: string } }>({});
  const [showTable, setShowTable] = useState(false);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Update handleCbcChange to accept both input and textarea events
  const handleCbcChange = (e: React.ChangeEvent< HTMLTextAreaElement>, item: string) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [item]: {
        ...prevData[item],
        [name]: value,
      },
    }));
  };

  const handleSubmit = () => {
    setShowTable(true);
  };

  const handleDownloadPdf = () => {
    const filteredData = Object.entries(formData).filter(
      ([_, data]) => data.result
    );

    mic_generatePdf(filteredData, profileData);
  };

  const micItems = [
    'Acid fast stain', 'Wet smear', 'Gram stain', 'KOH'
  ];
  const  recomende= ['Recommendation'];

  return (
    <div className="flex flex-col gap-6 w-full p-4 bg-white">
      <h2 className="block mb-2 font-semibold text-4xl text-blue-400  antialiased leading-snug tracking-normal text-blue-gray-900">Client Identification</h2>
      <div className="p-4 border rounded-lg shadow-md">
        <ProfileForm profileData={profileData} handleProfileChange={handleProfileChange} />
      </div>

      <h2 className="block mb-2 font-semibold text-4xl text-blue-400 antialiased leading-snug tracking-normal">MicroBiology Form</h2>

      <TestFormmicro 
        items={micItems} 
        formData={formData} 
        handleChange={handleCbcChange} 
        title="" 
      />
       <TestFormReco 
        items={recomende} 
        formData={formData} 
        handleChange={handleCbcChange} 
        title="" 
      />

      <button
        onClick={handleSubmit}
        className="self-center mt-4 py-2 px-6 rounded-lg bg-gray-900 text-white shadow-md hover:shadow-lg focus:opacity-85 active:opacity-85"
      >
        Show Table
      </button>

      {showTable && <MicTableDisplay data={Object.entries(formData)} />}
      {showTable && <RecomTableDisplay data={Object.entries(formData)} />}
      {showTable && (
        <button
          onClick={handleDownloadPdf}
          className="self-center mt-4 py-2 px-6 rounded-lg bg-green-900 text-white shadow-md hover:shadow-lg focus:opacity-85 active:opacity-85"
        >
          Download PDF
        </button>
      )}
    </div>
  );
};

export default Micro_CombinedForm;
