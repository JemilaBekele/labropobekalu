import React from 'react';

interface TableDisplayProps {
  data: [string, { result: string; remark: string }][];
}

const RecomTableDisplay: React.FC<TableDisplayProps> = ({ data }) => {
  

  
  const recommenda= data.find(([item]) => item === 'Recommendation')?.[1].result || '';
  


  return (
    <div className="mt-6">
     
<h2 className="text-lg font-bold mt-4">Recommendations</h2>
      {recommenda ? (
        <p className="border px-4 py-2">{recommenda}</p>
      ) : (
        <p>No recommendations to display.</p>
      )}
    </div>
  );
};

export default RecomTableDisplay;
