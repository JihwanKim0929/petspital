import React, { useState, useEffect } from 'react';
import './Records.scss';
import { Link } from 'react-router-dom';
import { Card, Show, Text, Box, VStack, HStack, Image, useBreakpointValue, Separator } from '@chakra-ui/react';
import {
  NativeSelectField,
  NativeSelectRoot,
} from "../../../components/ui/native-select";
import { EmptyState } from "../../../components/ui/empty-state";
import { Button } from '../../../components/ui/button';
import DiagnosisRecordDeleteModalButton from '../../../components/diagnosisRecordDeleteModalButton/DiagnosisRecordDeleteModalButton';
import { MdOutlinePets } from "react-icons/md";
import { BiSearchAlt2 } from "react-icons/bi";
import { SERVER_URL } from '../../../utils/GlobalConstants';

const Records = () => {

  const [pets, setPets] = useState([]);
  const hasPets = () => { return pets.length > 0; };
  const [records, setRecords] = useState([]);
  const [currentPet, setCurrentPet] = useState('');
  const isBelowMd = useBreakpointValue({ base: true, md: false });
  
  useEffect(() => {
    fetch(`${SERVER_URL}/user/pet`, {
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
      const url = `${SERVER_URL}/pet/${selectedPetID}/diagnosis`;
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
                                <HStack align='flex-start'>
                                  <Text fontFamily='Pretendard Variable' fontWeight='700' whiteSpace='nowrap'>진단 일자: </Text>
                                  <Text fontFamily='Pretendard Variable' wordBreak='break-word'>
                                    {new Date(new Date(record.createDate).getTime() + 9 * 60 * 60 * 1000).toLocaleString('ko-KR', {
                                        timeZone: 'Asia/Seoul',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true
                                    })}
                                  </Text>
                                </HStack>
                                <HStack align='flex-start'>
                                  <Text fontFamily='Pretendard Variable' fontWeight='700' whiteSpace='nowrap'>진단 부위: </Text>
                                  <Text fontFamily='Pretendard Variable' wordBreak='break-word'>{record.part}</Text>
                                </HStack>
                                <Text fontFamily='Pretendard Variable' fontWeight='700' whiteSpace='nowrap'>예상 질병:</Text>
                                {record.disease ? 
                                <VStack align='left'>
                                  <HStack align='flex-start'>
                                    <Text fontFamily='Pretendard Variable' whiteSpace='nowrap'>질병명: </Text>
                                    <Text fontFamily='Pretendard Variable' wordBreak='break-word'>{record.disease.name}</Text>
                                  </HStack>
                                  <HStack align='flex-start'>
                                    <Text fontFamily='Pretendard Variable' whiteSpace='nowrap'>증상: </Text>
                                    <Text fontFamily='Pretendard Variable' wordBreak='break-word'>{record.disease.symptoms}</Text>
                                  </HStack>
                                  <HStack align='flex-start'>
                                    <Text fontFamily='Pretendard Variable' whiteSpace='nowrap'>설명: </Text>
                                    <Text fontFamily='Pretendard Variable' wordBreak='break-word'>{record.disease.description}</Text>
                                  </HStack>
                                </VStack>
                                :
                                <Text fontFamily='Pretendard Variable'>질병 없음.</Text>}
                              </VStack>
                            </HStack>
                            <Box width='100%' display='flex' justifyContent='right'>
                              <DiagnosisRecordDeleteModalButton diagnosisID={record.id}/>
                            </Box>
                          </Show>
                          <Show when={isBelowMd}>
                            <VStack w='100%'>
                              <Image src={record.image_url} boxSize={{base:"150px", md:"150px", lg:"200px"}} borderRadius='0.5rem' objectFit="cover" />
                              <Separator m={4} borderWidth='1.5px' />
                              <VStack align='left' w='100%'>
                                <HStack align='flex-start'>
                                  <Text fontFamily='Pretendard Variable' fontWeight='700' whiteSpace='nowrap'>진단 일자: </Text>
                                  <Text fontFamily='Pretendard Variable' wordBreak='break-word'>
                                    {new Date(new Date(record.createDate).getTime() + 9 * 60 * 60 * 1000).toLocaleString('ko-KR', {
                                        timeZone: 'Asia/Seoul',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true
                                    })}
                                  </Text>
                                </HStack>
                                <HStack align='flex-start'>
                                  <Text fontFamily='Pretendard Variable' fontWeight='700' whiteSpace='nowrap'>진단 부위: </Text>
                                  <Text fontFamily='Pretendard Variable' wordBreak='break-word'>{record.part}</Text>
                                </HStack>
                                <Text fontFamily='Pretendard Variable' fontWeight='700' whiteSpace='nowrap'>예상 질병:</Text>
                                {record.disease ? 
                                <VStack align='left'>
                                  <HStack align='flex-start'>
                                    <Text fontFamily='Pretendard Variable' whiteSpace='nowrap'>질병명: </Text>
                                    <Text fontFamily='Pretendard Variable' wordBreak='break-word'>{record.disease.name}</Text>
                                  </HStack>
                                  <HStack align='flex-start'>
                                    <Text fontFamily='Pretendard Variable' whiteSpace='nowrap'>증상: </Text>
                                    <Text fontFamily='Pretendard Variable' wordBreak='break-word'>{record.disease.symptoms}</Text>
                                  </HStack>
                                  <HStack align='flex-start'>
                                    <Text fontFamily='Pretendard Variable' whiteSpace='nowrap'>설명: </Text>
                                    <Text fontFamily='Pretendard Variable' wordBreak='break-word'>{record.disease.description}</Text>
                                  </HStack>
                                </VStack>
                                :
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