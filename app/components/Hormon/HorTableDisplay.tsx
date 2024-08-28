import React from 'react';

interface TableDisplayProps {
  data: [string, { result: string; remark: string }][];
}

const HorTableDisplay: React.FC<TableDisplayProps> = ({ data }) => {
  const Hor1Columns = ["Test Name", "Result", "Ref.Range", "Remark"];
  const Hor1Rows = [
    ["TSH", "", "0.3-4.2 nmmol/L", ""],
    ["Total T3", "", "1.23-3.07 nmmol/L", ""],
    ["Total T4", "", "66-181 nmmol/L", ""],
    ["HgbAIC", "", "4.0-6.0 %", ""],
    ["Troponin", "", "0-0.3 ng/ml", ""],
    ["PSA", "", "0-4 ng/ml", ""],
    ["Vitamin D", "", "30-100 ng/ml", ""],
    ["LH", "", "2.95-13.65 mIu/mL", ""],
    ["FSH", "", "4.46-12.43 mIu/mL", ""],
  ];

  // Populate CBC Test 1 rows with data
  data.forEach(([item, { result, remark }]) => {
    const row = Hor1Rows.find((r) => r[0] === item);
    if (row) {
      row[1] = result;
      row[3] = remark;
    }
  });

  const filteredHor1Rows = Hor1Rows.filter(row => row[1] !== "");

   


  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold">Hormon Test Results</h2>
      {filteredHor1Rows.length > 0 ? (
        <table className="table-auto w-full mt-2">
          <thead>
            <tr>
              {Hor1Columns.map((col, idx) => (
                <th key={idx} className="border px-4 py-2">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredHor1Rows.map((row, idx) => (
              <tr key={idx}>
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="border px-4 py-2">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Hormon Test results to display.</p>
      )}

      
    </div>
  );
};

export default HorTableDisplay;
