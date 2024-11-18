import React, { useState, useEffect } from 'react';
import './DiagnosisResult.scss';
import { Box, Card, Flex, Text, Image } from '@chakra-ui/react';

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
      <Box w='100%' h='100%' p={10}>
        <Card.Root w='100%' h='100%' overflow='auto'>
          <Card.Body justifyContent='center' alignItems='center'
          data-state="open" 
          _open={{ 
              animationName: "fade-in, slide-from-top",
              animationDuration: "300ms",
              animationTimingFunction: "ease-out"
          }}>
            <Box w='fit-content'>
              <Text fontFamily='LINESeedKR-Bd' fontSize='30px' w='100%' textAlign='left'>진단 결과</Text>
              <Box display='flex' align='left' w='100%' mt={6}>
              <Image src={diagnosisResult.image_url} alt="Diagnosis" borderRadius='1rem' w='300px' h='300px' mr={10} />
                <Box>
                  <Flex>
                    <Text fontFamily='Pretendard Variable' fontWeight='700' fontSize='20px' whiteSpace='nowrap'>이름 :</Text>
                    <Text fontFamily='Pretendard Variable' fontSize='20px' ml={2} wordBreak='break-word'>{diagnosisResult.pet.name}</Text>
                  </Flex>
                  <Flex mt={3}>
                    <Text fontFamily='Pretendard Variable' fontWeight='700' fontSize='20px' whiteSpace='nowrap'>종 :</Text>
                    <Text fontFamily='Pretendard Variable' fontSize='20px' ml={2} wordBreak='break-word'>{diagnosisResult.species}</Text>
                  </Flex>
                  <Flex mt={3}>
                    <Text fontFamily='Pretendard Variable' fontWeight='700' fontSize='20px' whiteSpace='nowrap'>진단 부위 :</Text>
                    <Text fontFamily='Pretendard Variable' fontSize='20px' ml={2} wordBreak='break-word'>{diagnosisResult.part}</Text>
                  </Flex>
                  <Flex mt={3}>
                    <Text fontFamily='Pretendard Variable' fontWeight='700' fontSize='20px' whiteSpace='nowrap'>예상 질병 :</Text>
                    {diagnosisResult.disease ? 
                    <Box ml={2}>
                      <Flex>
                        <Text fontFamily='Pretendard Variable' fontSize='20px' whiteSpace='nowrap'>질병명:</Text>
                        <Text fontFamily='Pretendard Variable' fontSize='20px' ml={2} wordBreak='break-word'>{diagnosisResult.disease.name}</Text>
                      </Flex>
                      <Flex mt={3}>
                        <Text fontFamily='Pretendard Variable' fontSize='20px' whiteSpace='nowrap'>증상:</Text>
                        <Text fontFamily='Pretendard Variable' fontSize='20px' ml={2} wordBreak='break-word'>{diagnosisResult.disease.symptoms}</Text>
                      </Flex>
                      <Flex mt={3}>
                        <Text fontFamily='Pretendard Variable' fontSize='20px' whiteSpace='nowrap'>설명:</Text>
                        <Text fontFamily='Pretendard Variable' fontSize='20px' ml={2} wordBreak='break-word'>{diagnosisResult.disease.description}</Text>
                      </Flex>
                    </Box> : 
                    <Text fontFamily='Pretendard Variable' fontSize='20px' ml={2} wordBreak='break-word'>예상되는 질병이 없습니다.</Text>}
                  </Flex>
                </Box>
              </Box>
            </Box>
          </Card.Body>
        </Card.Root>
      </Box>
    </div>
  );
}

export default DiagnosisResult;