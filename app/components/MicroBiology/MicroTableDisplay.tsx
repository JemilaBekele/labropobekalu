import React from 'react';

interface TableDisplayProps {
  data: [string, { result: string; remark: string }][];
}

const MicTableDisplay: React.FC<TableDisplayProps> = ({ data }) => {
  const MicroColumns = ["Test Name", "Result"];
  const MicroRows = [
    ["Acid fast stain", ""],
    ["Wet smear", ""],
    ["Gram stain", ""],
    ["KOH", ""]
  ];

  // Populate CBC Test 1 rows with data
  data.forEach(([item, { result }]) => {
    const row = MicroRows.find((r) => r[0] === item);
    if (row) {
      row[1] = result;
      
    }
  });

  const filteredMicroRows = MicroRows.filter(row => row[1] !== "");

  
  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold">Microbiology Test Results</h2>
      {filteredMicroRows.length > 0 ? (
        <table className="table-auto w-full mt-2">
          <thead>
            <tr>
              {MicroColumns.map((col, idx) => (
                <th key={idx} className="border px-4 py-2">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredMicroRows.map((row, idx) => (
              <tr key={idx}>
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="border px-4 py-2">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Microbiology Test results to display.</p>
      )}
      
    
    </div>
  );
};

export default MicTableDisplay;
