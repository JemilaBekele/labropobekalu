"use client";

import React, { useState } from 'react';
import ProfileForm from '../profile/ProfileForm';
import { ProfileData } from "@/app/types/profiletype";
import { sero_generatePdf } from './Sero_generatePdf';
import SeroTableDisplay from './SeraTableDisplay';
import TestFormselect from '../Tables/TestFormselect';  // Importing the TestFormmicro component
import TestFormReco from '../Tables/TestFormReco'; 
import RecomTableDisplay from '../Combine/Tablerecomend'
const Sero_CombinedForm: React.FC = () => {
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

  const handleCbcChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement| HTMLTextAreaElement>, item: string) => {
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

    sero_generatePdf(filteredData, profileData);
  };

  const RItaeems = [
    'SO', 'SH', 'RF', 'ASO'
  ];

  const negaItems = [
    'Will felix OX 19', 'HBsAg', 'HCV Ab', 'VDRL', 'H.pylori Ab', 'H.pylori Ag'
  ];
  const react = [
    'Non-Reactive','Reactive' 
  ];
  
  const postiv = [
    'Positive', 'Negative'
  ];
  const  recomende= ['Recommendation'];
  


  return (
    <div className="flex flex-col gap-6 w-full bg-white p-4">
      <h2 className="block mb-2 font-semibold text-2xl sm:text-3xl lg:text-4xl text-blue-400 antialiased leading-snug tracking-normal text-blue-gray-900">Client Identification</h2>
      <div className='p-4 border rounded-lg shadow-md'>
        <ProfileForm profileData={profileData} handleProfileChange={handleProfileChange} />
      </div>

      <h2 className="block mb-2 font-semibold text-2xl sm:text-3xl lg:text-4xl text-blue-400 antialiased leading-snug tracking-normal text-blue-gray-900">Serology Form</h2>

      <div className="flex flex-col gap-4">
        {/* Use the TestFormmicro component for Reactive/Non-Reactive tests */}
        <TestFormselect
          items={RItaeems}
          formData={formData}
          handleChange={handleCbcChange}
          title="Reactive/Non-Reactive Tests"
          resultOptions={react}
         
        />

        {/* Use the TestFormmicro component for Positive/Negative tests */}
        <TestFormselect
          items={negaItems}
          formData={formData}
          handleChange={handleCbcChange}
          title="Positive/Negative Tests"
          resultOptions={postiv}
          
        />
         <TestFormReco 
        items={recomende} 
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

      {showTable && <SeroTableDisplay data={Object.entries(formData)} />}
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

export default Sero_CombinedForm;
