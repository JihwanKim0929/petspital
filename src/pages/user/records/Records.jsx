import React, { useState, useEffect } from 'react';
import './Records.scss';
import { Link } from 'react-router-dom';
import { Card, Show, Text, Box, VStack, Image } from '@chakra-ui/react';
import {
  NativeSelectField,
  NativeSelectRoot,
} from "../../../components/ui/native-select";
import { EmptyState } from "../../../components/ui/empty-state";
import { Button } from '../../../components/ui/button';
import DiagnosisRecordDeleteModalButton from '../../../components/diagnosisRecordDeleteModalButton/DiagnosisRecordDeleteModalButton';
import { MdOutlinePets } from "react-icons/md";

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
      <Box w='100%' h='100%' p={3}>
        <Card.Root w='100%' h='100%' overflow='auto'
        data-state="open" 
        _open={{ 
            animationName: "fade-in, slide-from-top",
            animationDuration: "300ms",
            animationTimingFunction: "ease-out"
        }}>
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
                      {record.disease ? 
                      <Text>{record.disease.name}: {record.disease.symptoms} - {record.disease.description}</Text> :
                      <Text>No disease.</Text>}
                      <DiagnosisRecordDeleteModalButton diagnosisID={record.id}/>
                    </Box>
                  ))
                ) : (
                  <Text>No records found.</Text>
                )}
              </Box>
            </Show>
            <Show when={!hasPets()}>
              <Box w='100%' h='100%' display='flex' justifyContent='center' alignItems='center'>
                <EmptyState 
                title="등록되어 있는 반려동물이 없어요."
                description="아래 버튼을 클릭해서 반려동물을 등록하세요." 
                icon={<MdOutlinePets/>}
                >
                  <Link to='/user/petowner/pets'>
                    <Button fontFamily='LINESeedKR-Bd'>반려동물 등록하러 가기</Button>
                  </Link>
                </EmptyState>
              </Box>
            </Show>
          </Card.Body>
        </Card.Root>
      </Box>
    </div>
  )
}

export default Records