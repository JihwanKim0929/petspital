import React, { useState, useEffect } from 'react';
import './DiagnosisResult.scss';

const DiagnosisResult = () => {
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const petToDiagnose = sessionStorage.getItem('petToDiagnose');
    if (petToDiagnose) {
      const url = `http://localhost:8080/pet/${petToDiagnose}/diagnosis`;
      console.log("Diagnosis Records URL: " + url);
      fetch(url, {
        method: 'GET',
        credentials: 'include'
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Error fetching records:', response.statusText);
          throw new Error('Failed to fetch records');
        }
      })
      .then(parsedRecordsData => {
        if (Array.isArray(parsedRecordsData) && parsedRecordsData.length > 0) {
          const lastItem = parsedRecordsData[parsedRecordsData.length - 1];
          const lastDiagnosisID = lastItem.id;
          
          const url = `http://localhost:8080/diagnosis/${lastDiagnosisID}`;
          console.log("Diagnosis Results URL: " + url);
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
      })
      .catch(error => {
        setError(error.message);
        console.error('Error loading diagnosis records:', error);
      });
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
      <h2>Disease List:</h2>
      <ul>
        {diagnosisResult.diseaseList.map(disease => (
          <li key={disease.id}>
            <strong>{disease.name}</strong>: {disease.symptoms} - {disease.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DiagnosisResult;