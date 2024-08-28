"use client";
import React, { useState } from 'react';
import ProfileForm from '../profile/ProfileForm';
import { ProfileData } from "@/app/types/profiletype";
import { generateCombinedPdf } from './generateCombinedPdf'; 
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
import Recoinput from './Recoinput'; 
import RecomTableDisplay from './Tablerecomend';

const CombinedForms: React.FC = () => {
  const initialProfileData: ProfileData = {
    clientName: '',
    SampleId: '',
    age: '',
    reportDate: '',
    location: '',
    phoneNumber: '',
    sex: '',
    CRN: '',
    MRN: ''
  };

  const initialShowTable = {
    Chemistry: false,
    Hematology: false,
    Electrolyte: false,
    Hormone: false,
    Rarasitology: false,
    Microbiology: false,
    Serology: false,
    Urinalysis: false,
    Recommendation: false
  };

  const initialShowSections = {
    Chemistry: false,
    Hematology: false,
    Electrolyte: false,
    Hormone: false,
    Rarasitology: false,
    Microbiology: false,
    Serology: false,
    Urinalysis: false,
    Recommendation: false
  };

  const [profileData, setProfileData] = useState<ProfileData>(initialProfileData);
  const [showTable, setShowTable] = useState<{ [key: string]: boolean }>(initialShowTable);
  const [formData, setFormData] = useState<{ [key: string]: { result: string; remark: string } }>({});
  const [showSections, setShowSections] = useState<{ [key: string]: boolean }>(initialShowSections);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, item: string) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const remark = name === 'result' && sections.Hematology.includes(item)
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
    setShowTable((prevState) => ({
      ...prevState,
      Chemistry: showSections.Chemistry,
      Hematology: showSections.Hematology,
      Electrolyte: showSections.Electrolyte,
      Hormone: showSections.Hormone,
      Rarasitology: showSections.Rarasitology,
      Microbiology: showSections.Microbiology,
      Serology: showSections.Serology,
      Urinalysis: showSections.Urinalysis,
      Recommendation: showSections.Recommendation,
    }));
    // Additional logic when form is submitted if needed
  };

  const handleDownloadPdf = () => {
    const filteredData = Object.entries(formData).filter(
      ([_, data]) => data.result
    );
    generateCombinedPdf(filteredData, profileData); 
  };

  const handleReset = () => {
    setProfileData(initialProfileData);
    setFormData({});
    setShowTable(initialShowTable);
    setShowSections(initialShowSections);
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
    Rarasitology: [
      'Stool Examination', 'color', 'Consistence', 'O/P', 'Pus Cell', 'Red Blood cell', 'Bacteria'
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
    Recommendation: [
      'Recommendation'
    ]
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
          <h2 className={`block mb-2 font-semibold text-xl text-blue-400 antialiased leading-snug tracking-normal`}>
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
                  resultOptions={resultOptions.Serology.Reactive}
                />
                <TestFormselect
                  items={resultOptions.Serology ? sections[sectionKey].slice(4) : []}
                  formData={formData}
                  handleChange={handleChange}
                  title="Positive/Negative Tests"
                  resultOptions={resultOptions.Serology.PositiveNegative}
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
                  items={resultOptions.Urinalysis ? sections[sectionKey].slice(4, 13) : []}
                  formData={formData}
                  handleChange={handleChange}
                  title=""
                  resultOptions={resultOptions.Urinalysis.PositiveNegative}
                />
                <TestForm
                  items={resultOptions.Urinalysis ? sections[sectionKey].slice(13, 16) : []}
                  formData={formData}
                  handleChange={handleChange}
                  title="Microscopy Tests"   
                />
                <TestFormselect
                  items={resultOptions.Urinalysis ? sections[sectionKey].slice(16) : []}
                  formData={formData}
                  handleChange={handleChange}
                  title="Microscopy Tests"
                  resultOptions={resultOptions.Urinalysis.PositiveNegative}
                />
              </>
            ): sectionKey === 'Microbiology'
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
                  items={sections[sectionKey].slice(0, 5)}
                  formData={formData}
                  handleChange={handleChange}
                  title="LFT Tests"  
                />
                <TestForm
                  items={sections[sectionKey].slice(5, 9)}
                  formData={formData}
                  handleChange={handleChange}
                  title="RFT Tests"  
                />
                <TestForm
                  items={sections[sectionKey].slice(9)}
                  formData={formData}
                  handleChange={handleChange}
                  title="Lipid Profile Tests"  
                />
              </>
            ): sectionKey === 'Hematology'
            ? (
              <>
                <TestForm
                  items={sections[sectionKey].slice(0, 20)}
                  formData={formData}
                  handleChange={handleChange}
                  title="CBC Tests" 
                />
                <TestForm
                  items={sections[sectionKey].slice(20)}
                  formData={formData}
                  handleChange={handleChange}
                  title="Additional Tests"  
                />
              </>
            ):sectionKey === 'Recommendation'
            ? (
              <>
                <Recoinput
                  items={sections[sectionKey].slice(0, 20)}
                  formData={formData}
                  handleChange={handleChange}
                  title="" 
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

    

      {showTable.Chemistry && <ChemTableDisplay data={Object.entries(formData)} />}
      {showTable.Electrolyte && <ElecTableDisplay data={Object.entries(formData)} />}
      {showTable.Hematology && <TableDisplay data={Object.entries(formData)} />}
      {showTable.Hormone && <HorTableDisplay data={Object.entries(formData)} />}
      {showTable.Rarasitology && <RATableDisplay data={Object.entries(formData)} />}
      {showTable.Microbiology && <MicTableDisplay data={Object.entries(formData)} />}
      {showTable.Serology && <SeroTableDisplay data={Object.entries(formData)} />}
      {showTable.Urinalysis && <UriTableDisplay data={Object.entries(formData)} />}
      {showTable.Recommendation && <RecomTableDisplay data={Object.entries(formData)} />}

      {Object.values(showSections).some(show => show) && (
        <button
          onClick={handleDownloadPdf}
          className="self-center mt-4 py-2 px-6 rounded-lg bg-green-600 text-white shadow-md hover:shadow-lg focus:opacity-85 active:opacity-85"
        >
          Download PDF
        </button>

        
      )}
        <button
        onClick={handleReset}
        className="self-center mt-4 py-2 px-6 rounded-lg bg-red-600 text-white shadow-md hover:shadow-lg focus:opacity-85 active:opacity-85"
      >
        Reset
      </button>
    </div>
  );
};

export default CombinedForms;
