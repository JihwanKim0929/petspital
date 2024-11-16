import React, { useState, useEffect } from 'react';
import './Records.scss';
import { Card, Show, Text, Box, VStack, Image } from '@chakra-ui/react';
import {
  NativeSelectField,
  NativeSelectRoot,
} from "../../../components/ui/native-select";
import DiagnosisRecordDeleteModalButton from '../../../components/diagnosisRecordDeleteModalButton/DiagnosisRecordDeleteModalButton';

const Records = () => {

  const [pets, setPets] = useState([]);
  const hasPets = () => { return pets.length > 0; };
  const [records, setRecords] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:8080/user/pet", {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            console.error('Pets not found 1');
            throw new Error('Failed to fetch pets');
        }
    })
    .then(parsedPets => {
      setPets(parsedPets);
      console.log('- Pets Successfully Loaded -');
      console.log("Pets:", parsedPets);
    })
    .catch(error => console.error('Pets not found 2', error));
  }, []);

  const handlePetChange = (event) => {
    const selectedPetID = event.target.value;
    if (selectedPetID) {
      const url = `http://localhost:8080/pet/${selectedPetID}/diagnosis`;
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
        setRecords(parsedRecordsData);
      })
      .catch(error => {
        console.error('Error loading diagnosis records:', error);
      });
    }
  };

  return (
    <div className='records'>
      <Card.Root w='96%' h='96%'>
        <Card.Body>
          <Show  when={hasPets()}>
            <NativeSelectRoot>
              <NativeSelectField placeholder="Select your pet" onChange={handlePetChange}>
                {pets.map(pet => (
                  <option key={pet.id} value={pet.id}>
                    {pet.name}
                  </option>
                ))}
              </NativeSelectField>
            </NativeSelectRoot>
            <Box mt={4}>
              {records.length > 0 ? (
                records.map(record => (
                  <Box key={record.id} p={4} borderWidth="1px" borderRadius="md" mb={4}>
                    <Text fontWeight="bold">Diagnosis ID: {record.id}</Text>
                    <Text>Part: {record.part}</Text>
                    <Text>Create Date: {new Date(record.createDate).toLocaleString()}</Text>
                    <Image src={record.image_url} boxSize="100px" objectFit="cover" />
                    <Text>Disease:</Text>
                    <Text>{record.disease.name}: {record.disease.symptoms} - {record.disease.description}</Text>
                    <DiagnosisRecordDeleteModalButton diagnosisID={record.id}/>
                  </Box>
                ))
              ) : (
                <Text>No records found.</Text>
              )}
            </Box>
          </Show>
          <Show when={!hasPets()}>
            <Text>Pet is empty.</Text>
          </Show>
        </Card.Body>
      </Card.Root>
    </div>
  )
}

export default Records