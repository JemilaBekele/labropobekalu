import React from 'react';

interface TableDisplayProps {
  data: [string, { result: string; remark: string }][];
}

const ChemTableDisplay: React.FC<TableDisplayProps> = ({ data }) => {
  const Chem1Columns = ["Test Name", "Result", "Ref.Range", "Remark"];
  const Chem1Rows = [
    ["SGOT", "", "<45 U/L", ""],
    ["SGPT", "", "<40 U/L", ""],
    ["ALKPHOSE", "", "<90-300 U/L", ""],
    ["T.Bilirubin", "", "0.2-1.0 mg/dl", ""],
    ["D.Bilirubin", "", "0.0-0.2 mg/dl", ""],
  ];

  const Chem2Columns = ["Test Name", "Result", "Ref.Range", "Remark"];
  const Chem2Rows = [
    ["BUN(UREA)", "", "10-40 mg/dl", ""],
    ["CREATININE", "", "0.6-1.2 mg/dl", ""],
    ["FBS(RBS)", "", "70-104 mg/dl", ""],
    ["URIC ACID", "", "3-7 mg/dl", ""],
  ];

  const Chem3Columns = ["Test Name", "Result", "Ref.Range", "Remark"];
  const Chem3Rows = [
    ["T.CHOLESTROL", "", "<200 mg/dl", ""],
    ["Triglycerides", "", "<190 mg/dl", ""],
    ["LDL", "", "<100 mg/dl", ""],
    ["HDL", "", ">60 mg/dl", ""],
    ["T.Cholesterol to HDL", "", "<5:1", ""]
  ];

  // Populate rows with data
  const updateRowsWithData = (rows: string[][]) => {
    data.forEach(([item, { result, remark }]) => {
      const row = rows.find((r) => r[0] === item);
      if (row) {
        row[1] = result;
        row[3] = remark;
      }
    });
    return rows.filter(row => row[1] !== "");
  };

  const filteredChem1Rows = updateRowsWithData(Chem1Rows);
  const filteredChem2Rows = updateRowsWithData(Chem2Rows);
  const filteredChem3Rows = updateRowsWithData(Chem3Rows);



  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold">LFT Test Results</h2>
      {filteredChem1Rows.length > 0 ? (
        <table className="table-auto w-full mt-2">
          <thead>
            <tr>
              {Chem1Columns.map((col, idx) => (
                <th key={idx} className="border px-4 py-2 w-1/4">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredChem1Rows.map((row, idx) => (
              <tr key={idx}>
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="border px-4 py-2">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No LFT Test results to display.</p>
      )}

      <h2 className="text-lg font-bold mt-4">RFT Test Results</h2>
      {filteredChem2Rows.length > 0 ? (
        <table className="table-auto w-full mt-2">
          <thead>
            <tr>
              {Chem2Columns.map((col, idx) => (
                <th key={idx} className="border px-4 py-2 w-1/4">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredChem2Rows.map((row, idx) => (
              <tr key={idx}>
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="border px-4 py-2">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No RFT Test results to display.</p>
      )}

      <h2 className="text-lg font-bold mt-4">Lipid Profile Test Results</h2>
      {filteredChem3Rows.length > 0 ? (
        <table className="table-auto w-full mt-2">
          <thead>
            <tr>
              {Chem3Columns.map((col, idx) => (
                <th key={idx} className="border px-4 py-2 w-1/5">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredChem3Rows.map((row, idx) => (
              <tr key={idx}>
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="border px-4 py-2">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Lipid Profile Test results to display.</p>
      )}

      
    </div>
  );
};

export default ChemTableDisplay;
