import React, { useEffect, useState } from 'react';
import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
  } from "../ui/dialog";
import { Text, Image } from '@chakra-ui/react';
import { Field } from "../ui/field";
import { Button } from "../ui/button";
import { SERVER_URL } from '../../utils/GlobalConstants';


const AppointmentViewModalButton = ({appointmentID}) => {

    const [appointment, setAppointment] = useState({ pet: {} });

    useEffect(() => {

        const petUrl = `${SERVER_URL}/reservation/${appointmentID}`;

        fetch(petUrl, {
            method: 'GET',
            credentials: 'include'
          })
          .then(response => {
              if (response.ok) {
                  return response.json();
              } else {
                  console.error('Cannot find appointment 1');
                  throw new Error('Failed to fetch appointment');
              }
          })
          .then(parsedAppointment => {
              setAppointment(parsedAppointment);
              console.log('- Appointment Successfully Loaded -');
              console.log("Appointment:", parsedAppointment);
          })
          .catch(error => console.error('Cannot find appointment 2', error));
    }, []);

    return (
        <DialogRoot minH='1000px'>
            <DialogTrigger>
                <Button margin="0.5rem" fontFamily='LINESeedKR-Bd' fontSize={{ base: '0.75rem', md: '0.75rem', lg: '0.9rem' }}>
                    상세 정보
                </Button>
            </DialogTrigger>
            <DialogContent marginLeft='0.5rem' marginRight='0.5rem'>
                <DialogHeader>
                    <DialogTitle fontFamily='LINESeedKR-Bd'>예약 조회</DialogTitle>
                </DialogHeader>
                <DialogCloseTrigger />
                <DialogBody pb={6}>
                    <Field>
                        <Text fontFamily='LINESeedKR-Bd'>동물명</Text>
                        <Text fontFamily='Pretendard Variable'>{appointment.pet.name}</Text>
                    </Field>
                    <Field mt={4}>
                    <Text fontFamily='LINESeedKR-Bd'>나이</Text>
                        <Text fontFamily='Pretendard Variable'>{appointment.pet.age}</Text>
                    </Field>
                    <Field mt={4}>
                        <Text fontFamily='LINESeedKR-Bd'>성별</Text>
                        <Text fontFamily='Pretendard Variable'>{appointment.pet.gender}</Text>
                    </Field>
                    <Field mt={4}>
                        <Text fontFamily='LINESeedKR-Bd'>무게</Text>
                        <Text fontFamily='Pretendard Variable'>{appointment.pet.weight}</Text>
                    </Field>
                    <Field mt={4}>
                        <Text fontFamily='LINESeedKR-Bd'>종</Text>
                        <Text fontFamily='Pretendard Variable'>{appointment.pet.species}</Text>
                    </Field>
                    <Field mt={4}>
                        <Text fontFamily='LINESeedKR-Bd'>설명</Text>
                        <Text fontFamily='Pretendard Variable'>{appointment.pet.description}</Text>
                    </Field>
                    <Field mt={4}>
                        <Text fontFamily='LINESeedKR-Bd'>반려동물 이미지</Text>
                        <Image src={appointment.pet.image_url} boxSize="100px" objectFit="cover" />
                    </Field>
                    <Field mt={4}>
                        <Text fontFamily='LINESeedKR-Bd'>예약 날짜</Text>
                        <Text fontFamily='Pretendard Variable'>{appointment.reservationDate}</Text>
                    </Field>
                    <Field mt={4}>
                        <Text fontFamily='LINESeedKR-Bd'>병원 주소</Text>
                        <Text fontFamily='Pretendard Variable'>{appointment.hospitalAddress}</Text>
                    </Field>
                </DialogBody>

                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button variant="outline" fontFamily='LINESeedKR-Bd'>닫기</Button>
                    </DialogActionTrigger>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    )
}

export default AppointmentViewModalButton