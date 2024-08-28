import React from 'react';

interface TableDisplayProps {
  data: [string, { result: string; remark: string }][];
}

const TableDisplay: React.FC<TableDisplayProps> = ({ data }) => {
  const cbc1Columns = ["Test Name", "Result", "Ref.Range", "Remark"];
  const cbc1Rows = [
    ["WBC", "", "4-11", ""],
    ["LYMP", "", "0.6-4.1", ""],
    ["MID#", "", "0.1-0.9", ""],
    ["GRAN#", "", "2.7-8.5", ""],
    ["LYMP%", "", "20-50", ""],
    ["MID%", "", "3-10", ""],
    ["GRAN%", "", "40-70", ""],
    ["RBC", "", "3.8-5.8", ""],
    ["HGB", "", "11-18", ""],
    ["MCHC", "", "330-360", ""],
    ["MCH", "", "26.5-33.5", ""],
    ["MCV", "", "80-99", ""],
    ["RDW-CV", "", "10-15", ""],
    ["RDW-SD", "", "35-56", ""],
    ["HCT", "", "35-54", ""],
    ["PLT", "", "150-450", ""],
    ["MPV", "", "7-11", ""],
    ["PDW", "", "10-18", ""],
    ["PCT", "", "0.1-0.5", ""],
    ["P-LCR", "", "13-43", ""],
  ];

  // Populate CBC Test 1 rows with data
  data.forEach(([item, { result, remark }]) => {
    const row = cbc1Rows.find((r) => r[0] === item);
    if (row) {
      row[1] = result;
      row[3] = remark;
    }
  });

  const filteredCbc1Rows = cbc1Rows.filter(row => row[1] !== "");

  const cbc2Columns = ["Test Name", "Result", "Ref.Range", "Remark"];
  const cbc2Rows = [
    ["ESR", "", "0-20 mm/hr", ""],
    ["Blood Film", "", "none, homo, parasite", ""],
    ["Blood Group", "", "RH factor", ""],
  ];

  // Populate CBC Test 2 rows with data
  data.forEach(([item, { result, remark }]) => {
    const row = cbc2Rows.find((r) => r[0] === item);
    if (row) {
      row[1] = result;
      row[3] = remark;
    }
  });

  const filteredCbc2Rows = cbc2Rows.filter(row => row[1] !== "");
   // Extract recommendation data
 
  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold">CBC Test 1 Results</h2>
      {filteredCbc1Rows.length > 0 ? (
        <table className="table-auto w-full mt-2">
          <thead>
            <tr>
              {cbc1Columns.map((col, idx) => (
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
        <p>No CBC Test 1 results to display.</p>
      )}

      <h2 className="text-lg font-bold mt-4">CBC Test 2 Results</h2>
      {filteredCbc2Rows.length > 0 ? (
        <table className="table-auto w-full mt-2">
          <thead>
            <tr>
              {cbc2Columns.map((col, idx) => (
                <th key={idx} className="border px-4 py-2">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredCbc2Rows.map((row, idx) => (
              <tr key={idx}>
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="border px-4 py-2">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No CBC Test 2 results to display.</p>
      )}
     
    </div>
  );
};

export default TableDisplay;
