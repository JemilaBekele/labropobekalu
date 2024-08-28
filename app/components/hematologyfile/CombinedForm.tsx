"use client";

import React, { useState } from 'react';
import ProfileForm from '../profile/ProfileForm';
import { ProfileData } from "@/app/types/profiletype";
import { generatePdf } from './generatePdf';
import TableDisplay from './TableDisplay';
import TestForm from '../Tables/Testform';
import TestFormReco from '../Tables/TestFormReco';
import RecomTableDisplay from '../Combine/Tablerecomend';

const CombinedForm: React.FC = () => {
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

  const getHematologyRemark = (item: string, result: string): string => {
    const referenceRanges: { [key: string]: [number, number] } = {
      'WBC': [4, 11],
      'LYMP': [0.6, 4.1],
      'MID#': [0.1, 0.9],
      'GRAN#': [2.7, 8.5],
      'LYMP%': [20, 50],
      'MID%': [3, 10],
      'GRAN%': [40, 70],
      'RBC': [3.8, 5.8],
      'HGB': [11, 18],
      'MCHC': [330, 360],
      'MCH': [26.5, 33.5],
      'MCV': [80, 99],
      'RDW-CV': [10, 15],
      'RDW-SD': [35, 56],
      'HCT': [35, 54],
      'PLT': [150, 450],
      'MPV': [7, 11],
      'PDW': [10, 18],
      'PCT': [0.1, 0.5],
      'P-LCR': [13, 43],
      'ESR': [0, 20],
    };

    if (item === 'Blood Film' || item === 'Blood Group') {
      return '';
    }

    const [low, high] = referenceRanges[item] || [0, 0];
    const resultValue = parseFloat(result);

    if (isNaN(resultValue)) {
      return '';
    }

    if (resultValue < low) {
      return 'L';
    } else if (resultValue > high) {
      return 'H';
    } else {
      return '';
    }
  };

  const handleCbcChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, item: string) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const remark = name === 'result' && cbcItems.includes(item)
        ? getHematologyRemark(item, value)
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

    generatePdf(filteredData, profileData);
  };

  const cbcItems = [
    'WBC', 'LYMP', 'MID#', 'GRAN#', 'LYMP%', 'MID%',
    'GRAN%', 'RBC', 'HGB', 'MCHC', 'MCH', 'MCV', 'RDW-CV', 'RDW-SD',
    'HCT', 'PLT', 'MPV', 'PDW', 'PCT', 'P-LCR'
  ];

  const additionalTestsItems = [
   'ESR', 'Blood Film', 'Blood Group'
  ];

  const recommendationItems = [
    'Recommendation'
  ];

  return (
    <div className="flex flex-col gap-6 w-full p-4 bg-white">
      <h2 className="mb-2 font-semibold text-4xl text-blue-400 antialiased leading-snug tracking-normal text-blue-gray-900">Client Identification</h2>
      <div className="p-4 border rounded-lg shadow-md">
        <ProfileForm profileData={profileData} handleProfileChange={handleProfileChange} />
      </div>

      <h2 className="mb-2 font-semibold text-4xl text-blue-400 antialiased leading-snug tracking-normal text-blue-gray-900">Hematology Form</h2>

      
      <div className="flex flex-col gap-4">
        <TestForm 
          items={cbcItems} 
          formData={formData} 
          handleChange={handleCbcChange} 
          title="CBC Tests" 
        />
      
        <TestForm 
          items={additionalTestsItems} 
          formData={formData} 
          handleChange={handleCbcChange} 
          title="Additional Tests" 
        />
      

      <TestFormReco 
        items={recommendationItems} 
        formData={formData} 
        handleChange={handleCbcChange} 
        title="" 
      />
</div>
      <button
        onClick={handleSubmit}
        className="self-center mt-4 py-2 px-6 rounded-lg bg-gray-900 text-white shadow-md hover:shadow-lg focus:opacity-85 active:opacity-85"
      >
        Show Table
      </button>

      {showTable && <TableDisplay data={Object.entries(formData)} />}
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

export default CombinedForm;
