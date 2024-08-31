"use client";

import React, { useState } from 'react';
import ProfileForm from '../profile/ProfileForm';
import { ProfileData } from "@/app/types/profiletype";
import { Elec_generatePdf } from './Elec_generatePdf';
import ElecTableDisplay from './ELECTableDisplay';
import TestForm from '../Tables/Testform';
import TestFormReco from '../Tables/TestFormReco';
import RecomTableDisplay from '../Combine/Tablerecomend'
const Elec_CombinedForm: React.FC = () => {
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

  const getElectroRemark = (item: string, result: string): string => {
    const referenceRanges: { [key: string]: [number, number] } = {
      'Sodium(Na+)': [136, 146],
      'Calcium(Ca2+)': [1.08, 1.3],
      'Potassium': [3.5, 5],
      'Chlloride(Cl-)': [96, 106],
     
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
  const handleElecChange = (e: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>, item: string) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const remark = name === 'result' && ElecItems.includes(item)
        ? getElectroRemark(item, value)
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

    Elec_generatePdf(filteredData, profileData);
  };

  const ElecItems = [
    'Sodium(Na+)', 'Calcium(Ca2+)', 'Potassium', 'Chlloride(Cl-)'
  ];
  const  recomende= ['Recommendation'];
  return (
    <div className="flex flex-col gap-6 w-full p-4 bg-white">
      <h2 className="text-4xl font-semibold text-blue-400 antialiased leading-snug tracking-normal text-blue-gray-900">Client Identification</h2>
      <div className="p-4 border rounded-lg shadow-md">
        <ProfileForm profileData={profileData} handleProfileChange={handleProfileChange} />
      </div>

      <h2 className="text-4xl font-semibold text-blue-400 antialiased leading-snug tracking-normal">Electrolyte Form</h2>

      <TestForm items={ElecItems} formData={formData} handleChange={handleElecChange} title="Electrolyte Tests" />
      <TestFormReco 
        items={recomende} 
        formData={formData} 
        handleChange={handleElecChange} 
        title="" 
      />
      <button
        onClick={handleSubmit}
        className="self-center mt-4 py-2 px-6 rounded-lg bg-gray-900 text-white shadow-md hover:shadow-lg focus:opacity-85 active:opacity-85"
      >
        Show Table
      </button>

      {showTable && <ElecTableDisplay data={Object.entries(formData)} />}
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

export default Elec_CombinedForm;
