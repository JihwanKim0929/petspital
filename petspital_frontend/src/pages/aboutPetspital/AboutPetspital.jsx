import React from 'react';
import './AboutPetspital.scss';
import { Card, Box, Image, VStack, Text, HStack, Separator } from '@chakra-ui/react';
import { LOGO_URL } from '../../utils/GlobalConstants';

const AboutPetspital = () => {
  return (
    <div className='aboutPetspital'>
      <Box w='100%' h='100%' display='flex' justifyContent='center'
      overflow='auto' 
      data-state="open" 
      _open={{ 
          animationName: "fade-in, slide-from-top",
          animationDuration: "300ms",
          animationTimingFunction: "ease-out"
      }}>
        <Card.Root w='fit-content' h='fit-content' p={{ base:'2', md:'5', lg:'10' }} m={10}>
          <Card.Body>
            <VStack h='100%'>
              <HStack>
                <Image src={LOGO_URL} className='logo' boxSize={{ base:'40px', md:'50px', lg:'60px' }} />
                <Text fontFamily='poppins' fontWeight='700' fontSize={{ base:'30px', md:'40px', lg:'50px' }}>Petspital</Text>
              </HStack>
              <Separator borderWidth='1px' />
              <Box w='100%' h='100%' display='flex' alignItems='center' justifyContent='center'>
                <VStack align='left'>
                  <Box mt={12}>
                    <Text fontFamily='LINESeedKR-Bd' fontSize={{ base:'16px', md:'24px', lg:'30px' }}>
                      1. 반려동물의 안구와 피부 진단
                    </Text>
                    <Text fontFamily='Pretendard Variable' ml={4} fontSize={{ base:'12px', md:'18px', lg:'20px' }} color='gray'>
                      AI를 통해 반려동물의 눈과 피부 건강을 간편하게 진단할 수 있어요.
                    </Text>
                  </Box>
                  <Box mt={12}>
                    <Text fontFamily='LINESeedKR-Bd' fontSize={{ base:'16px', md:'24px', lg:'30px' }}>
                      2. 병원 예약 서비스
                    </Text>
                    <Text fontFamily='Pretendard Variable' ml={4} fontSize={{ base:'12px', md:'18px', lg:'20px' }} color='gray'>
                      Petspital에 등록된 근처의 병원들에 예약할 수 있어요.
                    </Text>
                  </Box>
                  <Box mt={12}>
                    <Text fontFamily='LINESeedKR-Bd' fontSize={{ base:'16px', md:'24px', lg:'30px' }}>
                      3. 반려동물 수첩
                    </Text>
                    <Text fontFamily='Pretendard Variable' ml={4} fontSize={{ base:'12px', md:'18px', lg:'20px' }} color='gray'>
                      반려동물 수첩을 통해 반려동물의 정보를 기록하고 해당 내용을 수의사와 공유할 수 있어요.
                    </Text>
                  </Box>
                  <Box mt={12} mb={12}>
                    <Text fontFamily='LINESeedKR-Bd' fontSize={{ base:'16px', md:'24px', lg:'30px' }}>
                      4. 커뮤니티
                    </Text>
                    <Text fontFamily='Pretendard Variable' ml={4} fontSize={{ base:'12px', md:'18px', lg:'20px' }} color='gray'>
                      커뮤니티를 통해 정보를 공유할 수 있어요.
                    </Text>
                  </Box>
                </VStack>
              </Box>
            </VStack>
          </Card.Body>
        </Card.Root>
      </Box>
    </div>
  )
}

export default AboutPetspital