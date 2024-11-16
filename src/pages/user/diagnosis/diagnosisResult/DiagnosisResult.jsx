import React, { useState, useEffect } from 'react';
import './DiagnosisResult.scss';

const DiagnosisResult = () => {
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!diagnosisResult) {
      const diagnosisID = sessionStorage.getItem('diagnosisID');
      if (diagnosisID) {
        const url = `http://localhost:8080/diagnosis/${diagnosisID}`;
        console.log("Diagnosis Records URL: " + url);
        
        fetch(url, {
          method: 'GET',
          credentials: 'include'
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            console.error('Error fetching diagnosis:', response.statusText);
            throw new Error('Failed to fetch diagnosis');
          }
        })
        .then(parsedDiagnosisResult => {
          setDiagnosisResult(parsedDiagnosisResult);
          console.log('- Pet Diagnosis Result Successfully Loaded -');
          console.log("Diagnosis Result:", parsedDiagnosisResult);
        })
        .catch(error => {
          setError(error.message);
          console.error('Error loading diagnosis result:', error);
        });
      }
    }
  }, []);

  if (error) {
    return <div className='diagnosisResult'>Error: {error}</div>;
  }

  if (!diagnosisResult) {
    return <div className='diagnosisResult'>Loading...</div>;
  }

  return (
    <div className='diagnosisResult'>
      <h1>Diagnosis Result</h1>
      <p>Pet Name: {diagnosisResult.pet.name}</p>
      <p>Species: {diagnosisResult.species}</p>
      <p>Diagnosed Part: {diagnosisResult.part}</p>
      <img src={diagnosisResult.image_url} alt="Diagnosis" />
      <h2>Disease:</h2>
      {diagnosisResult.disease ? 
      <p>{diagnosisResult.disease.name}: {diagnosisResult.disease.symptoms} - {diagnosisResult.disease.description}</p> :
      <p>No disease.</p>}
    </div>
  );
}

export default DiagnosisResult;