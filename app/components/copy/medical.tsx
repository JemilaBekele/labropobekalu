"use client";

import React, { useState } from 'react';
import ProfileForm from '../profile/ProfileForm';
import { ProfileData } from "@/app/types/profiletype";
import { generateCombinedPdf } from './generateCombinedPdf'; // Import the combined PDF generation function
import ChemTableDisplay from '../Chemistry/ChemTableDisplay';
import ElecTableDisplay from '../Electrolyte/ELECTableDisplay';
import TableDisplay from '../hematologyfile/TableDisplay';
import HorTableDisplay from '../Hormon/HorTableDisplay';
import RATableDisplay from '../RARASITOLOGY/RA_TableDisplay';
import MicTableDisplay from '../MicroBiology/MicroTableDisplay';
import SeroTableDisplay from '../Serology/SeraTableDisplay';
import UriTableDisplay from '../Urinalysis/UriTableDisplay';
import TestForm from '../Tables/Testform';
import TestFormmicro from '../Tables/TestFormmiccro';
import TestFormselect from '../Tables/TestFormselect';

const CombinedForms: React.FC = () => {
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
  const [showSections, setShowSections] = useState<{ [key: string]: boolean }>({
    Chemistry: false,
    Hematology: false,
    Electrolyte: false,
    Hormone: false,
    Parasitology: false,
    Microbiology: false,
    Serology: false,
    Urinalysis: false,
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, item: string) => {
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
    // Additional logic when form is submitted if needed
  };

  const handleDownloadPdf = () => {
    const filteredData = Object.entries(formData).filter(
      ([_, data]) => data.result
    );
    generateCombinedPdf(filteredData, profileData); // Call the function to generate a combined PDF
  };

  const toggleSection = (section: string) => {
    setShowSections((prevSections) => ({
      ...prevSections,
      [section]: !prevSections[section],
    }));
  };

  const sections = {
    Chemistry: [
      'SGOT', 'SGPT', 'ALKPHOSE', 'T.Bilirubin', 'D.Bilirubin', 
      'BUN(UREA)', 'CREATININE', 'FBS(RBS)', 'URIC ACID', 
      'T.CHOLESTROL', 'Triglycerides', 'LDL', 'HDL', 'T.Cholesterol to HDL'
    ],
    Hematology: [
      'WBC', 'LYMP', 'MID#', 'GRAN#', 'LYMP%', 'MID%', 'GRAN%', 'RBC',
      'HGB', 'MCHC', 'MCH', 'MCV', 'RDW-CV', 'RDW-SD', 'HCT', 'PLT',
      'MPV', 'PDW', 'PCT', 'P-LCR', 
      'ESR', 'Blood Film', 'Blood Group'
    ],
    Electrolyte: ['Sodium(Na+)', 'Calcium(Ca2+)', 'Potassium', 'Chloride(Cl-)'],
    Hormone: [
      'TSH', 'Total T3', 'Total T4', 'HgbAIC', 'Troponin', 'PSA', 'Vitamin D', 'LH', 'FSH'
    ],
    Parasitology: [
      'Stool Examination', 'Color', 'Consistence', 'O/P', 'Pus Cell', 'Red Blood Cell', 'Bacteria'
    ],
    Microbiology: [
      'Acid fast stain', 'Wet smear', 'Gram stain', 'KOH'
    ],
    Serology: [
      'SO', 'SH', 'RF', 'ASO',
      'Will felix OX 19', 'HBsAg', 'HCV Ab', 'VDRL', 'H.pylori Ab', 'H.pylori Ag'
    ],
    Urinalysis: [
      'Color', 'Appearance', 'Specific Gravity', 'PH',
      
      
      'Protein', 'Glucose', 'Bilirubin',
      'Urobilinogen', 'Nitrite', 'Ketone', 'Blood', 'Leukocyte', 'HCG',
     
      'WBC', 'RBC', 'Epithelial',

      'WBC cast', 'RBC cast', 'Granular cast', 
      'Hyaline cast', 'Cal-Oxalet', 'Cystal', 'Bacteria', 'Parasite'
    ],
  };

  const resultOptions = {
    Serology: {
      Reactive: ['Non-Reactive', 'Reactive'],
      PositiveNegative: ['Positive', 'Negative']
    },
    Urinalysis: {
      PositiveNegative: ['Positive', 'Negative']
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full p-4 bg-white">
      <h2 className="block mb-2 font-semibold text-4xl text-blue-400 antialiased leading-snug tracking-normal text-blue-gray-900">Client Identification</h2>
      <div className="p-4 border rounded-lg shadow-md">
        <ProfileForm profileData={profileData} handleProfileChange={handleProfileChange} />
      </div>

      {Object.entries(sections).map(([sectionKey, items]) => (
        <div key={sectionKey} className="relative p-4 border rounded-lg shadow-md mb-4">
          <button
            onClick={() => toggleSection(sectionKey)}
            className="absolute top-2 right-2 py-1 px-3 text-sm font-semibold text-white bg-gray-800 rounded-lg shadow-md hover:shadow-lg"
          >
            {showSections[sectionKey] ? 'Hide' : 'Show'}
          </button>
          <h2 className={`block mb-2 font-semibold text-4xl'text-blue-400' antialiased leading-snug tracking-normal`}>
            {`${sectionKey} Form`}
          </h2>
          {showSections[sectionKey] && (
            sectionKey === 'Serology'
            ? (
              <>
                <TestFormselect
                  items={resultOptions.Serology ? sections[sectionKey].slice(0, 4) : []}
                  formData={formData}
                  handleChange={handleChange}
                  title="Reactive/Non-Reactive Tests"
                  resultOptions={resultOptions.Serology?.Reactive }
                />
                <TestFormselect
                  items={resultOptions.Serology ? sections[sectionKey].slice(4) : []}
                  formData={formData}
                  handleChange={handleChange}
                  title="Positive/Negative Tests"
                  resultOptions={resultOptions.Serology?.PositiveNegative }
                />
              </>
            ) : sectionKey === 'Urinalysis'
            ? (
              <>
                <TestForm
                  items={resultOptions.Urinalysis ? sections[sectionKey].slice(0, 4) : []}
                  formData={formData}
                  handleChange={handleChange}
                  title=""   
                />
                <TestFormselect
                  items={resultOptions.Serology ? sections[sectionKey].slice(4,13) : []}
                  formData={formData}
                  handleChange={handleChange}
                  title=""
                  resultOptions={resultOptions.Serology?.PositiveNegative }
                />
                <TestForm
                  items={resultOptions.Urinalysis ? sections[sectionKey].slice(13, 16) : []}
                  formData={formData}
                  handleChange={handleChange}
                  title="Microscopy Tests"   
                />
                <TestFormselect
                  items={resultOptions.Serology ? sections[sectionKey].slice(16) : []}
                  formData={formData}
                  handleChange={handleChange}
                  title="Microscopy Tests"
                  resultOptions={resultOptions.Serology?.PositiveNegative }
                />
              </>
            ):   sectionKey === 'Microbiology'
            ? (
              <>
                <TestFormmicro
                  items={items}
                  formData={formData}
                  handleChange={handleChange}
                  title=""   
                />
               
              </>
            ): sectionKey === 'Chemistry'
            ? (
              <>
                <TestForm
                  items={ sections[sectionKey].slice(0, 5) }
                  formData={formData}
                  handleChange={handleChange}
                  title="LFT Tests"  
                />
                
                <TestForm
                  items={sections[sectionKey].slice(5, 9) }
                  formData={formData}
                  handleChange={handleChange}
                  title="RFT Tests"  
                />
                <TestForm
                  items={sections[sectionKey].slice(9) }
                  formData={formData}
                  handleChange={handleChange}
                  title="Lipid Profile Tests"  
                />
               
              </>
            ): sectionKey === 'Hematology'
            ? (
              <>
                <TestForm
                  items={ sections[sectionKey].slice(0, 20) }
                  formData={formData}
                  handleChange={handleChange}
                  title="CBC Tests" 
                />
                
                <TestForm
                  items={sections[sectionKey].slice(20) }
                  formData={formData}
                  handleChange={handleChange}
                  title="Additional Tests"  
                />
                
               
              </>
            ):(
              <TestForm items={items} formData={formData} handleChange={handleChange} title={`${sectionKey} Tests`} />
            )
          )}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="self-center mt-4 py-2 px-6 rounded-lg bg-gray-900 text-white shadow-md hover:shadow-lg focus:opacity-85 active:opacity-85"
      >
        Show Table
      </button>

      {showSections['Chemistry'] && <ChemTableDisplay data={Object.entries(formData)} />}
      {showSections['Electrolyte'] && <ElecTableDisplay data={Object.entries(formData)} />}
      {showSections['Hematology'] && <TableDisplay data={Object.entries(formData)} />}
      {showSections['Hormone'] && <HorTableDisplay data={Object.entries(formData)} />}
      {showSections['Parasitology'] && <RATableDisplay data={Object.entries(formData)} />}
      {showSections['Microbiology'] && <MicTableDisplay data={Object.entries(formData)} />}
      {showSections['Serology'] && <SeroTableDisplay data={Object.entries(formData)} />}
      {showSections['Urinalysis'] && <UriTableDisplay data={Object.entries(formData)} />}

      {Object.values(showSections).some(show => show) && (
        <button
          onClick={handleDownloadPdf}
          className="self-center mt-4 py-2 px-6 rounded-lg bg-green-600 text-white shadow-md hover:shadow-lg focus:opacity-85 active:opacity-85"
        >
          Download PDF
        </button>
      )}
    </div>
  );
};

export default CombinedForms;
