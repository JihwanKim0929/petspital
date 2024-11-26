import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DiagnosisResult.scss';
import { Box, Card, Flex, Text, Image, useBreakpointValue, VStack, HStack, Show, Button, Separator } from '@chakra-ui/react';
import { SERVER_URL } from '../../../../utils/GlobalConstants';

const DiagnosisResult = () => {
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [error, setError] = useState(null);
  const isBelowMd = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    if (!diagnosisResult) {
      const diagnosisID = sessionStorage.getItem('diagnosisID');
      if (diagnosisID) {
        const url = `${SERVER_URL}/diagnosis/${diagnosisID}`;
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
      <Box w='100%' h='100%' p={3}>
        <Card.Root w='100%' h='100%' overflow='auto'>
          <Card.Body justifyContent='center' alignItems='center'
          data-state="open" 
          _open={{ 
              animationName: "fade-in, slide-from-top",
              animationDuration: "300ms",
              animationTimingFunction: "ease-out"
          }}>
            <VStack w='100%'>
              <Text fontFamily='LINESeedKR-Bd' fontSize={{base:'20px', md:'20px', lg:'30px'}} w='100%' textAlign='left'>진단 결과</Text>
              <Show when={!isBelowMd}>
                <Box display='flex' align='left' w='100%' mt={6}>
                  <Image src={diagnosisResult.image_url} alt="Diagnosis" borderRadius='1rem' 
                  boxSize={{base:'100px', md:'150px', lg:'200px'}} mr={10} />
                  <Box>
                    <Flex>
                      <Text fontFamily='Pretendard Variable' fontWeight='700' fontSize={{base:'16px', md:'16px', lg:'20px'}} whiteSpace='nowrap'>이름 :</Text>
                      <Text fontFamily='Pretendard Variable' fontSize={{base:'16px', md:'16px', lg:'20px'}} ml={2} wordBreak='break-word'>{diagnosisResult.pet.name}</Text>
                    </Flex>
                    <Flex mt={3}>
                      <Text fontFamily='Pretendard Variable' fontWeight='700' fontSize={{base:'16px', md:'16px', lg:'20px'}} whiteSpace='nowrap'>종 :</Text>
                      <Text fontFamily='Pretendard Variable' fontSize={{base:'16px', md:'16px', lg:'20px'}} ml={2} wordBreak='break-word'>{diagnosisResult.species}</Text>
                    </Flex>
                    <Flex mt={3}>
                      <Text fontFamily='Pretendard Variable' fontWeight='700' fontSize={{base:'16px', md:'16px', lg:'20px'}} whiteSpace='nowrap'>진단 부위 :</Text>
                      <Text fontFamily='Pretendard Variable' fontSize={{base:'16px', md:'16px', lg:'20px'}} ml={2} wordBreak='break-word'>{diagnosisResult.part}</Text>
                    </Flex>
                  </Box>
                </Box>
                <Separator mt={4} mb={4} borderWidth='1.5px'/>
                <Box display='flex' align='left' w='100%'>
                  <Box>
                    <Text mt={3} fontFamily='Pretendard Variable' fontWeight='700' fontSize={{base:'16px', md:'16px', lg:'20px'}} whiteSpace='nowrap'>예상 질병 :</Text>
                    {diagnosisResult.disease ? 
                    <HStack mt={3}>
                      <Image src={diagnosisResult.disease.image_url} alt="Diagnosis" borderRadius='1rem' 
                     boxSize={{base:'100px', md:'150px', lg:'200px'}} mr={10} />
                      <VStack align='left'>
                        <Flex>
                          <Text fontFamily='Pretendard Variable' fontSize={{base:'16px', md:'16px', lg:'20px'}} fontWeight='700' whiteSpace='nowrap'>질병명:</Text>
                          <Text fontFamily='Pretendard Variable' fontSize={{base:'16px', md:'16px', lg:'20px'}} ml={2} wordBreak='break-word'>{diagnosisResult.disease.name}</Text>
                        </Flex>
                        <Flex mt={3}>
                          <Text fontFamily='Pretendard Variable' fontSize={{base:'16px', md:'16px', lg:'20px'}} fontWeight='700' whiteSpace='nowrap'>증상:</Text>
                          <Text fontFamily='Pretendard Variable' fontSize={{base:'16px', md:'16px', lg:'20px'}} ml={2} wordBreak='break-word'>{diagnosisResult.disease.symptoms}</Text>
                        </Flex>
                        <Flex mt={3}>
                          <Text fontFamily='Pretendard Variable' fontSize={{base:'16px', md:'16px', lg:'20px'}} fontWeight='700' whiteSpace='nowrap'>설명:</Text>
                          <Text fontFamily='Pretendard Variable' fontSize={{base:'16px', md:'16px', lg:'20px'}} ml={2} wordBreak='break-word'>{diagnosisResult.disease.description}</Text>
                        </Flex>
                      </VStack>
                    </HStack> : 
                    <Text fontFamily='Pretendard Variable' fontSize={{base:'16px', md:'16px', lg:'20px'}} wordBreak='break-word'>예상되는 질병이 없습니다.</Text>}
                  </Box>
                </Box>
              </Show>
              <Show when={isBelowMd}>
                <VStack w='100%'>
                  <Image src={diagnosisResult.image_url} alt="Diagnosis" borderRadius='1rem' 
                  w={{base:'150px', md:'200px', lg:'300px'}} h={{base:'150px', md:'200px', lg:'300px'}} m={6} />
                  <Box width='100%' justifyContent='left'>
                    <Flex>
                      <Text fontFamily='Pretendard Variable' fontWeight='700' fontSize={{base:'16px', md:'16px', lg:'20px'}} whiteSpace='nowrap'>이름 :</Text>
                      <Text fontFamily='Pretendard Variable' fontSize={{base:'16px', md:'16px', lg:'20px'}} ml={2} wordBreak='break-word'>{diagnosisResult.pet.name}</Text>
                    </Flex>
                    <Flex mt={3}>
                      <Text fontFamily='Pretendard Variable' fontWeight='700' fontSize={{base:'16px', md:'16px', lg:'20px'}} whiteSpace='nowrap'>종 :</Text>
                      <Text fontFamily='Pretendard Variable' fontSize={{base:'16px', md:'16px', lg:'20px'}} ml={2} wordBreak='break-word'>{diagnosisResult.species}</Text>
                    </Flex>
                    <Flex mt={3}>
                      <Text fontFamily='Pretendard Variable' fontWeight='700' fontSize={{base:'16px', md:'16px', lg:'20px'}} whiteSpace='nowrap'>진단 부위 :</Text>
                      <Text fontFamily='Pretendard Variable' fontSize={{base:'16px', md:'16px', lg:'20px'}} ml={2} wordBreak='break-word'>{diagnosisResult.part}</Text>
                    </Flex>
                  </Box>
                  <Box w='100%'>
                    <Separator mt={4} mb={4} borderWidth='1.5px'/>
                    <Text mt={3} fontFamily='Pretendard Variable' fontWeight='700' fontSize={{base:'18px', md:'18px', lg:'20px'}} whiteSpace='nowrap'>예상 질병 :</Text>
                    <VStack w='100%'>
                      {diagnosisResult.disease ? 
                      <VStack w='100%' align='center'>
                        <Image src={diagnosisResult.disease.image_url} borderRadius='1rem' 
                        w={{base:'150px', md:'200px', lg:'300px'}} h={{base:'150px', md:'200px', lg:'300px'}} m={6} />
                        <VStack w='100%' align='left'>
                          <Flex>
                            <Text fontFamily='Pretendard Variable' fontSize={{base:'16px', md:'16px', lg:'20px'}} fontWeight='700' whiteSpace='nowrap'>질병명:</Text>
                            <Text fontFamily='Pretendard Variable' fontSize={{base:'16px', md:'16px', lg:'20px'}} ml={2} wordBreak='break-word'>{diagnosisResult.disease.name}</Text>
                          </Flex>
                          <Flex mt={3}>
                            <Text fontFamily='Pretendard Variable' fontSize={{base:'16px', md:'16px', lg:'20px'}} fontWeight='700' whiteSpace='nowrap'>증상:</Text>
                            <Text fontFamily='Pretendard Variable' fontSize={{base:'16px', md:'16px', lg:'20px'}} ml={2} wordBreak='break-word'>{diagnosisResult.disease.symptoms}</Text>
                          </Flex>
                          <Flex mt={3}>
                            <Text fontFamily='Pretendard Variable' fontSize={{base:'16px', md:'16px', lg:'20px'}} fontWeight='700' whiteSpace='nowrap'>설명:</Text>
                            <Text fontFamily='Pretendard Variable' fontSize={{base:'16px', md:'16px', lg:'20px'}} ml={2} wordBreak='break-word'>{diagnosisResult.disease.description}</Text>
                          </Flex>
                        </VStack>
                      </VStack> : 
                      <Text fontFamily='Pretendard Variable' fontSize={{base:'16px', md:'16px', lg:'20px'}} wordBreak='break-word'>예상되는 질병이 없습니다.</Text>}
                    </VStack>
                  </Box>
                </VStack>
              </Show>
              <Box width='100%' mt={{base:'1rem', md:'3.5rem'}} display='flex' justifyContent='center'>
                <Link to='/'>
                  <Button fontFamily='LINESeedKR-Bd'>돌아가기</Button>
                </Link>
              </Box>
            </VStack>
          </Card.Body>
        </Card.Root>
      </Box>
    </div>
  );
}

export default DiagnosisResult;