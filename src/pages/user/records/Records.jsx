import React, { useState, useEffect } from 'react';
import './Records.scss';
import { Link } from 'react-router-dom';
import { Card, Show, Text, Box, VStack, HStack, Image, useBreakpointValue } from '@chakra-ui/react';
import {
  NativeSelectField,
  NativeSelectRoot,
} from "../../../components/ui/native-select";
import { EmptyState } from "../../../components/ui/empty-state";
import { Button } from '../../../components/ui/button';
import DiagnosisRecordDeleteModalButton from '../../../components/diagnosisRecordDeleteModalButton/DiagnosisRecordDeleteModalButton';
import { MdOutlinePets } from "react-icons/md";
import { BiSearchAlt2 } from "react-icons/bi";

const Records = () => {

  const [pets, setPets] = useState([]);
  const hasPets = () => { return pets.length > 0; };
  const [records, setRecords] = useState([]);
  const [currentPet, setCurrentPet] = useState('');
  const isBelowMd = useBreakpointValue({ base: true, md: false });
  
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
    setCurrentPet(selectedPetID);
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
          <Card.Header>
            <Text fontFamily='LINESeedKR-Bd'>반려동물 AI 진단 기록</Text>
          </Card.Header>
          <Card.Body>
            <Show when={hasPets()}>
              <NativeSelectRoot>
                <NativeSelectField placeholder="반려동물을 선택하세요." fontFamily='Pretendard Variable' onChange={handlePetChange}>
                  {pets.map(pet => (
                    <option key={pet.id} value={pet.id} style={{ fontFamily: 'Pretendard Variable' }}>
                      {pet.name}
                    </option>
                  ))}
                </NativeSelectField>
              </NativeSelectRoot>
              <Show when={currentPet !== ''}>
                {records.length > 0 ? (
                  <Box mt={4}>
                    {records.map(record => (
                      <Card.Root key={record.id} mb={4}>
                        <Card.Body>
                          <Show when={!isBelowMd}>
                            <HStack>
                              <Image src={record.image_url} boxSize={{base:"150px", md:"150px", lg:"200px"}} 
                              borderRadius={{base:"0.5rem", md:"0.5rem", lg:"1rem"}} objectFit="cover" />
                              <VStack align='left' ml='1rem'>
                                <Text fontFamily='Pretendard Variable'>진단일자: {new Date(record.createDate).toLocaleString()}</Text>
                                <Text fontFamily='Pretendard Variable'>진단 부위: {record.part}</Text>
                                <Text fontFamily='Pretendard Variable'>예상 질병:</Text>
                                {record.disease ? 
                                <Text fontFamily='Pretendard Variable'>{record.disease.name}: {record.disease.symptoms} - {record.disease.description}</Text> :
                                <Text fontFamily='Pretendard Variable'>질병 없음.</Text>}
                              </VStack>
                            </HStack>
                            <Box width='100%' display='flex' justifyContent='right'>
                              <DiagnosisRecordDeleteModalButton diagnosisID={record.id}/>
                            </Box>
                          </Show>
                          <Show when={isBelowMd}>
                            <VStack>
                              <Image src={record.image_url} boxSize={{base:"150px", md:"150px", lg:"200px"}} borderRadius='0.5rem' objectFit="cover" />
                              <VStack align='left' mt='1rem'>
                                <Text fontFamily='Pretendard Variable'>진단일자: {new Date(record.createDate).toLocaleString()}</Text>
                                <Text fontFamily='Pretendard Variable'>진단 부위: {record.part}</Text>
                                <Text fontFamily='Pretendard Variable'>예상 질병:</Text>
                                {record.disease ? 
                                <Text fontFamily='Pretendard Variable'>{record.disease.name}: {record.disease.symptoms} - {record.disease.description}</Text> :
                                <Text fontFamily='Pretendard Variable'>질병 없음.</Text>}
                              </VStack>
                              <Box width='100%' display='flex' justifyContent='right'>
                                <DiagnosisRecordDeleteModalButton diagnosisID={record.id}/>
                              </Box>
                            </VStack>
                          </Show>
                        </Card.Body>
                      </Card.Root>
                    ))}
                  </Box>
                ) : (
                  <Box w='100%' h='100%' display='flex' justifyContent='center' alignItems='center'>
                    <EmptyState 
                    title="진단 기록이 없어요."
                    description="아래 버튼을 클릭해서 AI를 통한 진단을 해보세요." 
                    icon={<BiSearchAlt2/>}
                    >
                      <Link to='/user/petowner/diagnosis'>
                        <Button fontFamily='LINESeedKR-Bd'>진단하러 가기</Button>
                      </Link>
                    </EmptyState>
                  </Box>
                )}
              </Show>
              <Show when={currentPet === ''}>
                <Box w='100%' h='100%' display='flex' justifyContent='center' alignItems='center'>
                  <EmptyState 
                  title="반려동물을 선택해주세요."
                  description="상단의 목록을 통해 진단 기록을 확인할 반려동물을 선택할 수 있어요." 
                  icon={<MdOutlinePets/>}
                  >
                  </EmptyState>
                </Box>
              </Show>
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