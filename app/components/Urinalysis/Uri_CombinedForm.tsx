"use client";

import React, { useState } from 'react';
import ProfileForm from '../profile/ProfileForm';
import { ProfileData } from "@/app/types/profiletype";
import { Uri_generatePdf } from './Uri_generatePdf';
import UriTableDisplay from './UriTableDisplay';
import TestForm from '../Tables/Testform';
import TestFormselect from '../Tables/TestFormselect'; 
import TestFormReco from '../Tables/TestFormReco';  
import RecomTableDisplay from '../Combine/Tablerecomend'
const Chme_CombinedForm: React.FC = () => {
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

    Uri_generatePdf(filteredData, profileData);
  };

  const URIItems = [
    'Color', 'Appearance', 'Specific Gravity', 'PH'
  ];
  const URINegItems = [
    'Protein', 'Glucose', 'Bilirubin','Urobilinogen','Nitrite', 'Ketone', 'Blood','Leukocyte', 'HCG'
  ];
  const MicroscopyItems = [
    'WBC', 'RBC', 'Epithelial'
  ];
  const MicroscopyNegItems = [
    'WBC cast','RBC cast', 'Granular cast','Hyaline cast','Cal-Oxalet','Cystal','Bacteria', 'Parasite'
  ];
  const postiv = [
    'Positive', 'Negative'
  ];
  const  recomende= ['Recommendation'];

  return (
    <div className="flex flex-col gap-6 w-full p-4 bg-white">
      <h2 className="block mb-2 font-semibold text-2xl sm:text-3xl md:text-4xl text-blue-400 antialiased leading-snug tracking-normal text-blue-gray-900">Client Identification</h2>
      <div className='p-4 border rounded-lg shadow-md'>
        <ProfileForm profileData={profileData} handleProfileChange={handleProfileChange} />
      </div>

      <h2 className="block mb-2 font-semibold text-2xl sm:text-3xl md:text-4xl text-blue-400 antialiased leading-snug tracking-normal text-blue-gray-900">Urinalysis Form</h2>

      <div className="flex flex-col gap-4">
      <TestForm 
        items={URIItems} 
        formData={formData} 
        handleChange={handleCbcChange} 
        title="" 
      />


         <TestFormselect
          items={URINegItems}
          formData={formData}
          handleChange={handleCbcChange}
          title=""
          resultOptions={postiv}
          
        />
      <TestForm 
        items={MicroscopyItems} 
        formData={formData} 
        handleChange={handleCbcChange} 
        title="Microscopy Tests" 
      />


         <TestFormselect
          items={MicroscopyNegItems}
          formData={formData}
          handleChange={handleCbcChange}
          title="Microscopy Tests"
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

      {showTable && <UriTableDisplay data={Object.entries(formData)} />}
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

export default Chme_CombinedForm;
