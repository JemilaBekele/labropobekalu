import React from 'react';

interface TableDisplayProps {
  data: [string, { result: string; remark: string }][];
}

const ElecTableDisplay: React.FC<TableDisplayProps> = ({ data }) => {
  const Ece1Columns = ["Test Name", "Result", "Ref.Range", "Remark"];
  const Ece1Rows = [
    
    ["Sodium(Na+)", "", "136-146 mmol/L", ""],
    ["Calcium(Ca2+)", "", "1.08-1.3 mmol/L", ""],
    ["Potassium", "", "3.5-5 mmol/L", ""],
    ["Chlloride(Cl-)", "", "96-106 mmol/L", ""],
  ];

  // Populate CBC Test 1 rows with data
  data.forEach(([item, { result, remark }]) => {
    const row = Ece1Rows.find((r) => r[0] === item);
    if (row) {
      row[1] = result;
      row[3] = remark;
    }
  });

  const filteredCbc1Rows = Ece1Rows.filter(row => row[1] !== "");
 


  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold">Electrolyte Test Results</h2>
      {filteredCbc1Rows.length > 0 ? (
        <table className="table-auto w-full mt-2">
          <thead>
            <tr>
              {Ece1Columns.map((col, idx) => (
                <th key={idx} className="border px-4 py-2">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredCbc1Rows.map((row, idx) => (
              <tr key={idx}>
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="border px-4 py-2">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Electrolyte Test results to display.</p>
      )}


    </div>
  );
};

export default ElecTableDisplay;
