import React from 'react';

interface TableDisplayProps {
  data: [string, { result: string; remark: string }][];
}

const UriTableDisplay: React.FC<TableDisplayProps> = ({ data }) => {
  const Uri1Columns = ["Test Name", "Result", "Ref.Range", "Remark"];
  const Uri1Rows = [
    ["Color", "", "Yellow", ""],
    ["Appearance", "", "Clear", ""],
    ["Specific Gravity", "", "1.005-1.030", ""],
    ["PH", "", "5-8", ""],
   
    ["Protein", "", "Negative", ""],
    ["Glucose", "", "Negative", ""],
    ["Bilirubin", "", "Negative", ""],
    ["Urobilinogen", "", "Normal", ""],
    ["Nitrite", "", "Negative", ""],
    ["Ketone", "", "Negative", ""],
    ["Blood", "", "Negative", ""],
    ["Leukocyte", "", "Negative", ""],
    ["HCG", "", "Negative", ""],
  ];

  // Populate CBC Test 1 rows with data
  data.forEach(([item, { result, remark }]) => {
    const row = Uri1Rows.find((r) => r[0] === item);
    if (row) {
      row[1] = result;
      row[3] = remark;
    }
  });

  const filteredUri1Rows = Uri1Rows.filter(row => row[1] !== "");

  const Uri2Columns = ["Test Name", "Result", "Ref.Range"];
  const Uri2Rows = [
    ["WBC", "", "0-4/HPF" ],
    ["RBC", "", "1-3/HPF" ],
    ["Epithelial", "", "2-4 LPF" ],
    ["WBC cast", "", "Negative" ],
    ["RBC cast", "", "Negative" ],
    ["Granular cast", "", "Negative" ],
    ["Hyaline cast", "", "Negative" ],
    ["Cal-Oxalet", "", "Negative" ],
    ["Cystal", "", "Negative"],
    ["Bacteria", "", "Negative" ],
    ["Parasite", "", "Negative" ],
  ];

  // Populate CBC Test 2 rows with data
  data.forEach(([item, { result}]) => {
    const row = Uri2Rows.find((r) => r[0] === item);
    if (row) {
      row[1] = result;
   
    }
  });

  const filteredUri2Rows = Uri2Rows.filter(row => row[1] !== "");

   
  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold">Urinalysis Test Results</h2>
      {filteredUri1Rows.length > 0 ? (
        <table className="table-auto w-full mt-2">
          <thead>
            <tr>
              {Uri1Columns.map((col, idx) => (
                <th key={idx} className="border px-4 py-2">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredUri1Rows.map((row, idx) => (
              <tr key={idx}>
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="border px-4 py-2">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No  Test 1 results to display.</p>
      )}

      <h2 className="text-lg font-bold mt-4">Microscopy Results</h2>
      {filteredUri2Rows.length > 0 ? (
        <table className="table-auto w-full mt-2">
          <thead>
            <tr>
              {Uri2Columns.map((col, idx) => (
                <th key={idx} className="border px-4 py-2">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredUri2Rows.map((row, idx) => (
              <tr key={idx}>
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="border px-4 py-2">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Microscopy Test results to display.</p>
      )}
      
    </div>
  );
};

export default UriTableDisplay;
