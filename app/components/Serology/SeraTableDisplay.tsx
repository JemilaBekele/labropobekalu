import React from 'react';

interface TableDisplayProps {
  data: [string, { result: string; remark: string }][];
}

const SeroTableDisplay: React.FC<TableDisplayProps> = ({ data }) => {
  const Sero1Columns = ["Test Name", "Result", "Ref.Range", "Remark"];
  const Sero1Rows = [
    ["SO", "", "Non-Reactive", ""],
    ["SH", "", "Non-Reactive", ""],
    ["RF", "", "Non-Reactive", ""],
    ["ASO", "", "Non-Reactive", ""],
  ];

  // Populate Serology Test 1 rows with data
  data.forEach(([item, { result, remark }]) => {
    const row = Sero1Rows.find((r) => r[0] === item);
    if (row) {
      row[1] = result;
      row[3] = remark;
    }
  });

  const filteredSero1Rows = Sero1Rows.filter(row => row[1] !== "");

  const Sero2Columns = ["Test Name", "Result", "Ref.Range", "Remark"];
  const Sero2Rows = [
    ["Will felix OX 19", "", "Negative", ""],
    ["HBsAg", "", "Negative", ""],
    ["HCV Ab", "", "Negative", ""],
    ["VDRL", "", "Negative", ""],
    ["H.pylori Ab", "", "Negative", ""],
    ["H.pylori Ag", "", "Negative", ""],
  ];

  // Populate Serology Test 2 rows with data
  data.forEach(([item, { result, remark }]) => {
    const row = Sero2Rows.find((r) => r[0] === item);
    if (row) {
      row[1] = result;
      row[3] = remark;
    }
  });

  const filteredSero2Rows = Sero2Rows.filter(row => row[1] !== "");

  
  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold">Serology Test 1 Results</h2>
      {filteredSero1Rows.length > 0 ? (
        <table className="table-auto w-full mt-2">
          <thead>
            <tr>
              {Sero1Columns.map((col, idx) => (
                <th key={idx} className="border px-4 py-2 w-1/4">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredSero1Rows.map((row, idx) => (
              <tr key={idx}>
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="border px-4 py-2 w-1/4">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Serology Test 1 Results to display.</p>
      )}

      <h2 className="text-lg font-bold mt-4">Serology Test 2 Results</h2>
      {filteredSero2Rows.length > 0 ? (
        <table className="table-auto w-full mt-2">
          <thead>
            <tr>
              {Sero2Columns.map((col, idx) => (
                <th key={idx} className="border px-4 py-2 w-1/4">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredSero2Rows.map((row, idx) => (
              <tr key={idx}>
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="border px-4 py-2 w-1/4">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Serology Test 2 Results to display.</p>
      )}
      
    </div>
  );
};

export default SeroTableDisplay;
