"use client";

import React, { useState } from 'react';
import ProfileForm from '../profile/ProfileForm';
import { ProfileData } from "@/app/types/profiletype";
import { Hor_generatePdf } from './Hor_generatePdf';
import HorTableDisplay from './HorTableDisplay';
import TestForm from '../Tables/Testform'; // Import the TestForm component
import TestFormReco from '../Tables/TestFormReco';
import RecomTableDisplay from '../Combine/Tablerecomend'
const Hor_CombinedForm: React.FC = () => {
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
  const getHormRemark = (item: string, result: string): string => {
    const referenceRanges: { [key: string]: [number, number] } = {
      'TSH': [0.3, 4.2],
      'Total T3': [1.23, 3.07],
      'Total T4': [66, 181],
      'HgbAIC': [4.0, 6.0],
      'Troponin': [0, 0.3],
      'PSA': [0, 4],
      'Vitamin D': [30, 100],
      'LH': [2.95, 13.65],
      'FSH': [4.46, 12.43],
     
    };

    const [low, high] = referenceRanges[item] || [0, 0];
    const resultValue = parseFloat(result);

    if (resultValue < low) {
      return 'L';
    } else if (resultValue > high) {
      return 'H';
    } else {
      return '';
    }
  };
  const handleCbcChange = (e: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>, item: string) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const remark = name === 'result' && HorItems.includes(item)
        ? getHormRemark(item, value)
        : prevData[item]?.remark || '';

      return {
        ...prevData,
        [item]: {
          ...prevData[item],
          [name]: value,
          remark: name === 'result' ? remark : prevData[item]?.remark || '',
        },
      };
    });
  };

  const handleSubmit = () => {
    setShowTable(true);
  };

  const handleDownloadPdf = () => {
    const filteredData = Object.entries(formData).filter(
      ([_, data]) => data.result
    );

    Hor_generatePdf(filteredData, profileData);
  };

  const HorItems = [
    'TSH', 'Total T3', 'Total T4', 'HgbAIC', 'Troponin', 'PSA', 'Vitamin D', 'LH', 'FSH'
  ];
  const  recomende= ['Recommendation'];

  return (
    <div className="flex flex-col gap-6 w-full p-4 bg-white">
      <h2 className="block mb-2 font-semibold text-4xl text-blue-400 antialiased leading-snug tracking-normal text-blue-gray-900">Client Identification</h2>
      <div className="p-4 border rounded-lg shadow-md">
        <ProfileForm profileData={profileData} handleProfileChange={handleProfileChange} />
      </div>

      <h2 className="block mb-2 font-semibold text-4xl text-blue-400  antialiased leading-snug tracking-normal">Hormone Form</h2>

      <TestForm 
        items={HorItems} 
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

      {showTable && <HorTableDisplay data={Object.entries(formData)} />}
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

export default Hor_CombinedForm;
