import React, { useState, useEffect } from 'react';
import './PetOwnerAppointments.scss';
import { Link } from 'react-router-dom';
import { Card, Show, Text, Box, Image, Flex } from '@chakra-ui/react';
import { NativeSelectField, NativeSelectRoot } from '../../../../components/ui/native-select';
import AppointmentViewModalButton from '../../../../components/appointmentViewModalButton/AppointmentViewModalButton';
import AppointmentDeleteModalButton from '../../../../components/appointmentDeleteModalButton/AppointmentDeleteModalButton';
import { EmptyState } from '../../../../components/ui/empty-state';
import { Button } from '../../../../components/ui/button';
import { MdOutlinePets } from "react-icons/md";

const PetOwnerAppointments = () => {
    
    const [pets, setPets] = useState([]);
    const hasPets = () => { return pets.length > 0; };
    const [appointments, setAppointments] = useState([]);
    const [currentPet, setCurrentPet] = useState('');

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
            const url = `http://localhost:8080/pet/${selectedPetID}/reservation`;
            console.log("Appointments URL: " + url);
            fetch(url, {
                method: 'GET',
                credentials: 'include'
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.error('Error fetching appointments:', response.statusText);
                    throw new Error('Failed to fetch appointments');
                }
            })
            .then(parsedAppointmentsData => {
                setAppointments(parsedAppointmentsData);
            })
            .catch(error => {
                console.error('Error loading appointments:', error);
            });
        }
    };

    return (
        <div className="petOwnerAppointments">
            <Box w='100%' h='100%' p={3}>
                <Card.Root  w='100%' h='100%' overflow='auto'
                data-state="open" 
                _open={{ 
                    animationName: "fade-in, slide-from-top",
                    animationDuration: "300ms",
                    animationTimingFunction: "ease-out"
                }}>
                    <Card.Header>
                        <Text fontFamily='LINESeedKR-Bd'>예약 확인하기</Text>
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
                                <Box mt={4} h='100%'>
                                    {appointments.length > 0 ? (
                                        appointments.map(appointment => (
                                            <Box key={appointment.id} p={4} borderWidth="1px" borderRadius="md" mb={4}>
                                                <Box>
                                                    <Text fontFamily='LINESeedKR-Bd'>예약 날짜</Text>
                                                    <Text ml={3} fontFamily='Pretendard Variable'>{new Date(appointment.reservationDate).toLocaleString()}</Text>
                                                    <Text mt={6} fontFamily='LINESeedKR-Bd'>병원 이름</Text>
                                                    <Text ml={3} fontFamily='Pretendard Variable'> {appointment.animalHospital.hospitalName}</Text>
                                                    <Text mt={6} fontFamily='LINESeedKR-Bd'>병원 주소</Text>
                                                    <Text ml={3} fontFamily='Pretendard Variable'> {appointment.animalHospital.hospitalAddress}</Text>
                                                </Box>
                                                <Box display='flex' justifyContent='right'>
                                                    <AppointmentDeleteModalButton appointmentID={appointment.id}/>
                                                </Box>
                                            </Box>
                                        ))
                                    ) : (
                                        <Box w='100%' h='100%' display='flex' justifyContent='center' alignItems='center'>
                                            <EmptyState 
                                            title="예약이 없어요."
                                            description="해당 반려동물에 대한 병원 예약이 존재하지 않습니다." 
                                            icon={<MdOutlinePets/>}
                                            >
                                            </EmptyState>
                                        </Box>
                                    )}
                                </Box>
                            </Show>
                            <Show when={currentPet === ''}>
                                <Box w='100%' h='100%' display='flex' justifyContent='center' alignItems='center'>
                                    <EmptyState 
                                    title="반려동물을 선택해주세요."
                                    description="상단의 목록을 통해 병원 예약을 확인할 반려동물을 선택할 수 있어요." 
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

export default PetOwnerAppointments