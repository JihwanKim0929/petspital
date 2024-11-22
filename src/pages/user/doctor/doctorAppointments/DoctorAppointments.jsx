import React, { useEffect, useState } from 'react';
import './DoctorAppointments.scss';
import { useNavigate, Link } from 'react-router-dom';
import { Card, Show, Text, Box, Image, VStack, HStack, Stack, useBreakpointValue, Separator } from '@chakra-ui/react';
import { Button } from '../../../../components/ui/button';
import { EmptyState } from '../../../../components/ui/empty-state';
import { FaNotesMedical } from "react-icons/fa6";
import { SERVER_URL } from '../../../../utils/GlobalConstants';

const DoctorAppointments = () => {
  const hasAppointments = () => { return appointments.length > 0; };
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${SERVER_URL}/reservation/vet`, {
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
    .then(parsedAppointments => {
    setAppointments(parsedAppointments);
    console.log('- Appointments Successfully Loaded -');
    console.log("Appointments:", parsedAppointments);
    })
    .catch(error => console.error('Appointments not found 2', error));
  }, []);

  const handleViewRecords = (petID) => {
    sessionStorage.setItem("selectedAppointmentPetID", petID);
    navigate('./diagnosisRecords');
  }

  const handleViewDiaries = (petID) => {
    sessionStorage.setItem("selectedAppointmentPetID", petID);
    navigate('./diary');
  }

  return (
    <div className='doctorAppointments'>
      <Box w='100%' h='100%' p={3}>
        <Card.Root w='100%' h='100%' overflow='auto'
        data-state="open" 
        _open={{ 
            animationName: "fade-in, slide-from-top",
            animationDuration: "300ms",
            animationTimingFunction: "ease-out"
        }}>
          <Card.Body>
            <Show when={hasAppointments()}>
            <VStack spacing={4} align="stretch">
              {appointments.map(appointment => (
                <Box key={appointment.id} p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
                  <HStack>
                    <Text whiteSpace='nowrap' fontFamily='LINESeedKR-Bd' fontSize={{ base:'14px', md:'16px', lg:'17px' }}>예약일자</Text>
                    <Separator orientation='vertical' height={4} />
                    <Text fontFamily='LINESeedKR-Bd' fontSize={{ base:'14px', md:'16px', lg:'17px' }} wordBreak='break-word'>
                      {new Date(appointment.reservationDate).toLocaleString()}
                    </Text>
                  </HStack>
                  <HStack>
                    <Text whiteSpace='nowrap' fontFamily='LINESeedKR-Bd' fontSize={{ base:'14px', md:'16px', lg:'17px' }}>생성일자</Text>
                    <Separator orientation='vertical' height={4} />
                    <Text fontFamily='LINESeedKR-Bd' fontSize={{ base:'14px', md:'16px', lg:'17px' }} wordBreak='break-word'>
                      {new Date(appointment.createDate).toLocaleString()}
                    </Text>
                  </HStack>
                  <Separator mt={2} mb={2}/>
                  <Text whiteSpace='nowrap' fontFamily='LINESeedKR-Bd' fontSize={{ base:'14px', md:'16px', lg:'17px' }}>유저 정보</Text>
                  <HStack>
                    <Text whiteSpace='nowrap' fontFamily='Pretendard Variable' fontSize={{ base:'14px', md:'16px', lg:'17px' }}>유저네임</Text>
                    <Separator orientation='vertical' height={4} />
                    <Text fontFamily='Pretendard Variable' fontSize={{ base:'14px', md:'16px', lg:'17px' }} wordBreak='break-word'>
                      {appointment.pet.siteUser.username}
                    </Text>
                  </HStack>
                  <HStack>
                    <Text whiteSpace='nowrap' fontFamily='Pretendard Variable' fontSize={{ base:'14px', md:'16px', lg:'17px' }}>이메일</Text>
                    <Separator orientation='vertical' height={4} />
                    <Text fontFamily='Pretendard Variable' fontSize={{ base:'14px', md:'16px', lg:'17px' }} wordBreak='break-word'>
                      {appointment.pet.siteUser.email}
                    </Text>
                  </HStack>
                  <HStack>
                    <Text whiteSpace='nowrap' fontFamily='Pretendard Variable' fontSize={{ base:'14px', md:'16px', lg:'17px' }}>전화번호</Text>
                    <Separator orientation='vertical' height={4} />
                    <Text fontFamily='Pretendard Variable' fontSize={{ base:'14px', md:'16px', lg:'17px' }} wordBreak='break-word'>
                      {appointment.pet.siteUser.phone_num}
                    </Text>
                  </HStack>
                  <Separator mt={2} mb={2}/>
                  <Text whiteSpace='nowrap' fontFamily='LINESeedKR-Bd' fontSize={{ base:'14px', md:'16px', lg:'17px' }}>반려동물 정보</Text>
                  <Stack flexDirection={{ base:'column', md:'row' }} alignItems='center'>
                    <Image 
                        src={appointment.pet.image_url} 
                        alt={`Image of ${appointment.pet.name}`} 
                        boxSize={{ base:'150px', md:'180px', lg:'200px' }}
                        objectFit="cover" 
                    />
                    <VStack align='left' w='100%'>
                      <HStack>
                        <Text whiteSpace='nowrap' fontFamily='Pretendard Variable' fontSize={{ base:'14px', md:'16px', lg:'17px' }}>이름</Text>
                        <Separator orientation='vertical' height={4} />
                        <Text fontFamily='Pretendard Variable' fontSize={{ base:'14px', md:'16px', lg:'17px' }} wordBreak='break-word'>
                          {appointment.pet.name}
                        </Text>
                      </HStack>
                      <HStack>
                        <Text whiteSpace='nowrap' fontFamily='Pretendard Variable' fontSize={{ base:'14px', md:'16px', lg:'17px' }}>나이</Text>
                        <Separator orientation='vertical' height={4} />
                        <Text fontFamily='Pretendard Variable' fontSize={{ base:'14px', md:'16px', lg:'17px' }} wordBreak='break-word'>
                          {appointment.pet.age}
                        </Text>
                      </HStack>
                      <HStack>
                        <Text whiteSpace='nowrap' fontFamily='Pretendard Variable' fontSize={{ base:'14px', md:'16px', lg:'17px' }}>성별</Text>
                        <Separator orientation='vertical' height={4} />
                        <Text fontFamily='Pretendard Variable' fontSize={{ base:'14px', md:'16px', lg:'17px' }} wordBreak='break-word'>
                          {appointment.pet.gender}
                        </Text>
                      </HStack>
                      <HStack>
                        <Text whiteSpace='nowrap' fontFamily='Pretendard Variable' fontSize={{ base:'14px', md:'16px', lg:'17px' }}>종</Text>
                        <Separator orientation='vertical' height={4} />
                        <Text fontFamily='Pretendard Variable' fontSize={{ base:'14px', md:'16px', lg:'17px' }} wordBreak='break-word'>
                          {appointment.pet.species}
                        </Text>
                      </HStack>
                      <HStack>
                        <Text whiteSpace='nowrap' fontFamily='Pretendard Variable' fontSize={{ base:'14px', md:'16px', lg:'17px' }}>무게(kg)</Text>
                        <Separator orientation='vertical' height={4} />
                        <Text fontFamily='Pretendard Variable' fontSize={{ base:'14px', md:'16px', lg:'17px' }} wordBreak='break-word'>
                          {appointment.pet.weight}
                        </Text>
                      </HStack>
                      <HStack>
                        <Text whiteSpace='nowrap' fontFamily='Pretendard Variable' fontSize={{ base:'14px', md:'16px', lg:'17px' }}>설명</Text>
                        <Separator orientation='vertical' height={4} />
                        <Text fontFamily='Pretendard Variable' fontSize={{ base:'14px', md:'16px', lg:'17px' }} wordBreak='break-word'>
                          {appointment.pet.description}
                        </Text>
                      </HStack>
                    </VStack>
                  </Stack>
                  <Separator mt={2} mb={2}/>
                  <Stack flexDirection={{ base:'column', md:'row' }} justifyContent='center'>
                    <Button fontFamily='LINESeedKR-Bd' onClick={() => handleViewRecords(appointment.pet.id)}>
                      AI 진단 기록 살펴보기
                    </Button>
                    <Button fontFamily='LINESeedKR-Bd' onClick={() => handleViewDiaries(appointment.pet.id)}>
                      수첩 살펴보기
                    </Button>
                  </Stack>
                </Box>
                ))}
              </VStack>
            </Show>
            <Show when={!hasAppointments()}>
              <Box w='100%' h='100%' display='flex' justifyContent='center' alignItems='center'>
                <EmptyState 
                title="예약 기록이 존재하지 않아요."
                description=" "
                icon={<FaNotesMedical/>}
                >
                    <Link to='/user/doctor'>
                        <Button fontFamily='LINESeedKR-Bd'>뒤로 가기</Button>
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

export default DoctorAppointments