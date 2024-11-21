import React, { useEffect, useState } from 'react';
import './DoctorAppointments.scss';
import { useNavigate } from 'react-router-dom';
import { Card, Show, Text, Box, Image, VStack } from '@chakra-ui/react';
import { Button } from '../../../../components/ui/button';

const DoctorAppointments = () => {
  const hasAppointments = () => { return appointments.length > 0; };
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/reservation/vet", {
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
        <Card.Root w='100%' h='100%'
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
                  <Text>예약일자: {appointment.reservationDate}</Text>
                  <Text>예약생성일자: {appointment.createDate}</Text>
                  <Text>반려동물 정보</Text>
                  <Image 
                      src={appointment.pet.image_url} 
                      alt={`Image of ${appointment.pet.name}`} 
                      boxSize="100px" 
                      objectFit="cover" 
                  />
                  <Text fontWeight="bold">{appointment.pet.name}</Text>
                  <Text>나이: {appointment.pet.age}</Text>
                  <Text>성별: {appointment.pet.gender}</Text>
                  <Text>종: {appointment.pet.species}</Text>
                  <Text>무게(kg): {appointment.pet.weight}</Text>
                  <Text>설명: {appointment.pet.description}</Text>
                  <Button fontFamily='LINESeedKR-Bd' onClick={() => handleViewRecords(appointment.pet.id)}>
                    AI 진단 기록 살펴보기
                  </Button>
                  <Button fontFamily='LINESeedKR-Bd' onClick={() => handleViewDiaries(appointment.pet.id)}>
                    수첩 살펴보기
                  </Button>
                </Box>
                ))}
              </VStack>
            </Show>
            <Show when={!hasAppointments()}>
              <Text>예약이 없습니다.</Text>
            </Show>
          </Card.Body>
        </Card.Root>
      </Box>
    </div>
  )
}

export default DoctorAppointments