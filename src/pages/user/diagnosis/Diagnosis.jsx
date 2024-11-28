import React, { useState, useEffect } from 'react';
import './Diagnosis.scss';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { Fieldset, Input, Card, Show, Text, Box, Separator, VStack, HStack, Stack, Image } from "@chakra-ui/react";
import { EmptyState } from '../../../components/ui/empty-state';
import { Button } from '../../../components/ui/button';
import {
  NativeSelectField,
  NativeSelectRoot,
} from "../../../components/ui/native-select";
import { Field } from "../../../components/ui/field";
import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from "../../../components/ui/file-button";
import { MdOutlinePets } from "react-icons/md";
import { 
  SERVER_URL, 
  GUIDELINE_CAT_SKIN_URL, 
  GUIDELINE_CAT_EYE_URL, 
  GUIDELINE_DOG_SKIN_URL, 
  GUIDELINE_DOG_EYE_URL 
} from '../../../utils/GlobalConstants';
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "../../../components/ui/accordion"

const Diagnosis = () => {

  const { register, handleSubmit, errors, reset, setValue } = useForm();

  const [pets, setPets] = useState([]);
  const hasPets = () => { return pets.length > 0; };
  const navigate = useNavigate();

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

  const onSubmit = async (data) => {
    console.log(data);
  
    const formData = new FormData();
  
    const diagnosisDto = {
      species: data.species,
      part: data.part,
    };
  
    const diagnosisJson = JSON.stringify(diagnosisDto);
    const diagnosisBlob = new Blob([diagnosisJson], { type: "application/json" });
    formData.append("diagnosisDto", diagnosisBlob);
  
    const diagnosisImage = data.image;
    if (diagnosisImage) {
      formData.append("image", diagnosisImage);
    }
  
    const url = `${SERVER_URL}/pet/${data.petID}/diagnosis`;
  
    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Diagnosis created successfully:", result);
        sessionStorage.setItem("diagnosisID", result.id);
        navigate("/user/petowner/diagnosis/result");
  
      } else {
        throw new Error("Failed to create diagnosis");
      }
    } catch (error) {
      console.error("Error creating diagnosis:", error);
    }
  
    reset();
  };

  const handlePetChange = (event) => {
    const selectedId = event.target.value;
    const pet = pets.find(p => p.id === Number(selectedId));
    if (pet) {
      setValue('species', pet.species);
    }
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    setValue('image', file);
    console.log("Selected file:", file);
  };

  return (
    <div className='diagnosis'>
      <Box w='100%' h='100%' p={3}>
        <Card.Root w='100%' h='100%' overflow='auto'
        data-state="open" 
        _open={{ 
            animationName: "fade-in, slide-from-top",
            animationDuration: "300ms",
            animationTimingFunction: "ease-out"
        }}>
          <Card.Header>
            <Text fontFamily='LINESeedKR-Bd'>반려동물 AI로 진단해보기</Text>
          </Card.Header>
          <Card.Body>
            <Show when={hasPets()}>
              <VStack w='100%' align='center'>
                <Separator border='1px solid lightgray' />
                <AccordionRoot collapsible variant='outline' spaceY={4} colorPalette='teal'>
                  <AccordionItem value='a'>
                    <AccordionItemTrigger>
                      <Text fontFamily='Pretendard Variable'>
                        안구 진단 가이드
                      </Text>
                    </AccordionItemTrigger>
                    <AccordionItemContent spaceY={3}>
                      <Stack flexDirection={{ base:'column', sm:'row' }} justifyContent='center' 
                      spaceX={{ base:'0', sm:'5', md:'10' }} spaceY={{ base:'2', sm:'0' }}>
                        <VStack>
                          <Image src={GUIDELINE_DOG_EYE_URL} boxSize={{ base:'150px', md:'200px' }} borderRadius={{ base:'0.5rem', md:'1rem' }}/>
                          <Text fontFamily='Pretendard Variable' fontSize={{base:'12px', md:'14px' }}>- 강아지 안구 예시 -</Text>
                        </VStack>
                        <VStack>
                          <Image src={GUIDELINE_CAT_EYE_URL} boxSize={{ base:'150px', md:'200px' }} borderRadius={{ base:'0.5rem', md:'1rem' }}/>
                          <Text fontFamily='Pretendard Variable' fontSize={{base:'12px', md:'14px' }}>- 고양이 안구 예시 -</Text>
                        </VStack>
                      </Stack>
                      <HStack align='flex-start'>
                        <Text fontFamily='Pretendard Variable' fontSize={{base:'14px', md:'16px' }} fontWeight='500'>1.</Text>
                        <Text fontFamily='Pretendard Variable' fontSize={{base:'14px', md:'16px' }}>
                          안구는 한 사진에{' '}
                          <Text as='span' style={{ fontFamily:'Pretendard Variable', color:'#de4949' }} fontSize={{base:'14px', md:'16px' }}>
                            하나
                          </Text>
                          만 나오게 해주세요.
                        </Text>
                      </HStack>
                      <HStack align='flex-start'>
                        <Text fontFamily='Pretendard Variable' fontSize={{base:'14px', md:'16px' }} fontWeight='500'>2.</Text>
                        <Text fontFamily='Pretendard Variable' fontSize={{base:'14px', md:'16px' }}>
                          반려동물의 안구를 사진{' '}
                          <Text as='span' style={{ fontFamily:'Pretendard Variable', color:'#de4949' }} fontSize={{base:'14px', md:'16px' }}>
                            중앙
                          </Text>
                          에 위치하게 해주세요.
                        </Text>
                      </HStack>
                      <HStack align='flex-start'>
                        <Text fontFamily='Pretendard Variable' fontSize={{base:'14px', md:'16px' }} fontWeight='500'>3.</Text>
                        <Text fontFamily='Pretendard Variable' fontSize={{base:'14px', md:'16px' }}>
                          사진에서 반려동물의 눈이{' '}
                          <Text as='span' style={{ fontFamily:'Pretendard Variable', color:'#de4949' }} fontSize={{base:'14px', md:'16px' }}>
                            아닌 부분이 차지하는 비율이 많지 않게
                          </Text>
                          {' '}해주세요.
                        </Text>
                      </HStack>
                      <HStack align='flex-start'>
                        <Text fontFamily='Pretendard Variable' fontSize={{base:'14px', md:'16px' }} fontWeight='500'>4.</Text>
                        <Text fontFamily='Pretendard Variable' fontSize={{base:'14px', md:'16px' }}>
                          안구가{' '}
                          <Text as='span' style={{ fontFamily:'Pretendard Variable', color:'#de4949' }} fontSize={{base:'14px', md:'16px' }}>
                            정방향
                          </Text>
                          으로 위치하게 해주세요.
                        </Text>
                      </HStack>
                      <HStack align='flex-start'>
                        <Text fontFamily='Pretendard Variable' fontSize={{base:'14px', md:'16px' }} fontWeight='500'>5.</Text>
                        <Text fontFamily='Pretendard Variable' fontSize={{base:'14px', md:'16px' }}>
                          해당 판별결과는 딥러닝 모델에 의해 판별된 결과이므로 실제 결과와{' '}
                          <Text as='span' style={{ fontFamily:'Pretendard Variable', color:'#de4949' }} fontSize={{base:'14px', md:'16px' }}>
                            차이
                          </Text>
                          가 있을 수 있습니다. 판별결과에서 의심질환이 없더라도 반려동물에게 증상이 있을 경우 꼭 수의사에게 진찰을 받아주세요!
                        </Text>
                      </HStack>
                    </AccordionItemContent>
                  </AccordionItem>
                  <AccordionItem value='b'>
                    <AccordionItemTrigger>
                      <Text fontFamily='Pretendard Variable'>피부 진단 가이드</Text>
                    </AccordionItemTrigger>
                    <AccordionItemContent spaceY={3}>
                      <Stack flexDirection={{ base:'column', sm:'row' }} justifyContent='center' 
                      spaceX={{ base:'0', sm:'5', md:'10' }} spaceY={{ base:'2', sm:'0' }}>
                        <VStack>
                          <Image src={GUIDELINE_DOG_SKIN_URL} boxSize={{ base:'150px', md:'200px' }} borderRadius={{ base:'0.5rem', md:'1rem' }}/>
                          <Text fontFamily='Pretendard Variable' fontSize={{base:'12px', md:'14px' }}>- 강아지 피부 예시 -</Text>
                        </VStack>
                        <VStack>
                          <Image src={GUIDELINE_CAT_SKIN_URL} boxSize={{ base:'150px', md:'200px' }} borderRadius={{ base:'0.5rem', md:'1rem' }}/>
                          <Text fontFamily='Pretendard Variable' fontSize={{base:'12px', md:'14px' }}>- 고양이 피부 예시 -</Text>
                        </VStack>
                      </Stack>
                      <HStack align='flex-start'>
                        <Text fontFamily='Pretendard Variable' fontSize={{base:'14px', md:'16px' }} fontWeight='500'>1.</Text>
                        <Text fontFamily='Pretendard Variable' fontSize={{base:'14px', md:'16px' }}>
                          판별하고자 하는 반려동물의{' '}
                          <Text as='span' style={{ fontFamily:'Pretendard Variable', color:'#de4949' }} fontSize={{base:'14px', md:'16px' }}>
                            피부 부위를 중심
                          </Text>
                          으로 사진을 찍어주세요.
                        </Text>
                      </HStack>
                      <HStack align='flex-start'>
                        <Text fontFamily='Pretendard Variable' fontSize={{base:'14px', md:'16px' }} fontWeight='500'>2.</Text>
                        <Text fontFamily='Pretendard Variable' fontSize={{base:'14px', md:'16px' }}>
                          사진에서 반려동물의 해당 피부 부위가{' '}
                          <Text as='span' style={{ fontFamily:'Pretendard Variable', color:'#de4949' }} fontSize={{base:'14px', md:'16px' }}>
                            아닌 부분이 차지하는 비율이 많지 않게
                          </Text>
                          {' '}해주세요.
                        </Text>
                      </HStack>
                      <HStack align='flex-start'>
                        <Text fontFamily='Pretendard Variable' fontSize={{base:'14px', md:'16px' }} fontWeight='500'>3.</Text>
                        <Text fontFamily='Pretendard Variable' fontSize={{base:'14px', md:'16px' }}>
                          해당 판별결과는 딥러닝 모델에 의해 판별된 결과이므로 실제 결과와{' '}
                          <Text as='span' style={{ fontFamily:'Pretendard Variable', color:'#de4949' }} fontSize={{base:'14px', md:'16px' }}>
                            차이
                          </Text>
                          가 있을 수 있습니다. 판별결과에서 의심질환이 없더라도 반려동물에게 증상이 있을 경우 꼭 수의사에게 진찰을 받아주세요!
                        </Text>
                      </HStack>
                    </AccordionItemContent>
                  </AccordionItem>
                </AccordionRoot> 
                <Separator border='1px solid lightgray' mt={2} mb={2} />
                <form onSubmit={handleSubmit(onSubmit)} style={{ width:'100%' }}>
                  <Fieldset.Root size="lg" maxW="xl" w='100%'>
                    <Fieldset.Content>
                      <Field>
                        <Text fontFamily='Pretendard Variable' fontWeight='500'>반려동물 선택</Text>
                        <NativeSelectRoot>
                          <NativeSelectField placeholder="진단할 반려동물을 선택하세요." {...register('petID', { required: true })}
                          onChange={handlePetChange}
                          fontFamily='Pretendard Variable'
                          >
                            {pets.map(pet => (
                              <option key={pet.id} value={pet.id} style={{fontFamily: 'Pretendard Variable'}}>
                                {pet.name}
                              </option>
                            ))}
                          </NativeSelectField>
                        </NativeSelectRoot>
                      </Field>
                      <Field>
                        <Text fontFamily='Pretendard Variable' fontWeight='500'>신체부위 선택</Text>
                        <NativeSelectRoot>
                          <NativeSelectField placeholder="진단할 신체부위를 선택하세요." {...register('part', { required: true })} 
                          fontFamily='Pretendard Variable'
                          >
                          <option value="eye" style={{fontFamily: 'Pretendard Variable'}}>눈</option>
                          <option value="skin" style={{fontFamily: 'Pretendard Variable'}}>피부</option>
                          </NativeSelectField>
                        </NativeSelectRoot>
                      </Field>
                      <Box w='100%'>
                        <Field w='100%' display='flex' justifyContent='center' alignItems='center'>
                          <FileUploadRoot maxW="xl" alignItems="stretch" maxFiles={1} onChange={handleImageFileChange}>
                            <FileUploadDropzone
                              label="파일을 드래그하여 업로드"
                              description="5MB 이하의 이미지 파일을 업로드하세요."
                            />
                            <FileUploadList />
                          </FileUploadRoot>
                        </Field>
                      </Box>
                    </Fieldset.Content>
                    <Button type="submit" alignSelf="flex-start" mt={6} fontFamily='LINESeedKR-Bd'>
                      진단하기
                    </Button>
                  </Fieldset.Root>
                </form>
                <Text fontFamily='Pretendard Variable' fontSize={{base:'12px', md:'12px', lg:'14px' }} mt={4}>
                  해당 판별결과는 딥러닝 모델에 의해 판별된 결과이므로 실제 결과와 차이가 있을 수 있습니다. 
                </Text>
                <Text fontFamily='Pretendard Variable' fontSize={{base:'12px', md:'12px', lg:'14px' }}>
                  판별결과에서 의심질환이 없더라도 반려동물에게 증상이 있을 경우 꼭 수의사에게 진찰을 받아주세요!
                </Text>
              </VStack>
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

export default Diagnosis