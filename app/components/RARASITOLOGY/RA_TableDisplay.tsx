import React from 'react';

interface TableDisplayProps {
  data: [string, { result: string; remark: string }][];
}

const RATableDisplay: React.FC<TableDisplayProps> = ({ data }) => {
  const RAColumns = ["Test Name", "Result", "Ref.Range", "Remark"];
  const RARows = [
    ["Stool Examination", "", "", ""],
    ["Color", "", "Brown", ""],
    ["Consistence", "", "Formed", ""],
    ["O/P", "", "No o/p", ""],
    ["Pus Cell", "", "", ""],
    ["Red Blood cell", "", "", ""],
    ["Bacteria", "", "", ""],
  ];

  // Populate CBC Test 1 rows with data
  data.forEach(([item, { result, remark }]) => {
    const row = RARows.find((r) => r[0] === item);
    if (row) {
      row[1] = result;
      row[3] = remark;
    }
  });

  const filteredRARows= RARows.filter(row => row[1] !== "");

  
  


  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold">Rarasitology Test Results</h2>
      {filteredRARows.length > 0 ? (
        <table className="table-auto w-full mt-2">
          <thead>
            <tr>
              {RAColumns.map((col, idx) => (
                <th key={idx} className="border px-4 py-2">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRARows.map((row, idx) => (
              <tr key={idx}>
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="border px-4 py-2">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Rarasitology Test results to display.</p>
      )}


    </div>
  );
};

export default RATableDisplay;
