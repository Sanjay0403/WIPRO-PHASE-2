import React, { useEffect, useState } from 'react';
import BatchService from '../services/BatchService';

const BatchList = () => {
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    const fetchBatches = async () => {
      const data = await BatchService.getBatches();
      setBatches(data);
    };
    fetchBatches();
  }, []);

  return (
    <div>
      <h2>Batch Details</h2>
      <ul>
        {batches.map((batch) => (
          <li key={batch.id}>{batch.name} - {batch.startDate}</li>
        ))}
      </ul>
    </div>
  );
};

export default BatchList;
