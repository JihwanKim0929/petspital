import React, { useEffect, useState } from 'react';
import './AppointmentPetDiagnosis.scss';
import { Link } from 'react-router-dom';
import { Card, Show, Text, Box, VStack, HStack, Image, useBreakpointValue } from '@chakra-ui/react';
import { EmptyState } from '../../../../../components/ui/empty-state';
import { Button } from '../../../../../components/ui/button';
import { BiSearchAlt2 } from "react-icons/bi";


const AppointmentPetDiagnosis = () => {

    const [records, setRecords] = useState([]);
    const isBelowMd = useBreakpointValue({ base: true, md: false });
  
    useEffect(() => {
        const petID = sessionStorage.getItem('selectedAppointmentPetID');
        if (petID) {
            const url = `http://localhost:8080/pet/${petID}/diagnosis`;
            fetch(url, {
            method: 'GET',
            credentials: 'include'
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.error('Records not found 1');
                    throw new Error('Failed to fetch records');
                }
            })
            .then(parsedRecords => {
            setRecords(parsedRecords);
            console.log('- Records Successfully Loaded -');
            console.log("Records:", parsedRecords);
            })
            .catch(error => console.error('Pets not found 2', error));
        }
        
    }, []);

    return (
        <div className='appointmentPetDiagnosis'>
            <Box w='100%' h='100%' p={3}>
                <Card.Root w='100%' h='100%' overflow='auto'
                data-state="open" 
                _open={{ 
                    animationName: "fade-in, slide-from-top",
                    animationDuration: "300ms",
                    animationTimingFunction: "ease-out"
                }}>
                    <Card.Body>
                    {records.length > 0 ? (
                        <VStack w='100%'>
                            {records.map(record => (
                            <Card.Root key={record.id} mb={4} w='100%'>
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
                                        </VStack>
                                    </Show>
                                </Card.Body>
                            </Card.Root>
                            ))}
                            <Link to='/user/doctor/appointments'>
                                <Button fontFamily='LINESeedKR-Bd'>뒤로 가기</Button>
                            </Link>
                        </VStack>
                        ) : (
                        <Box w='100%' h='100%' display='flex' justifyContent='center' alignItems='center'>
                            <EmptyState 
                            title="해당 반려동물의 AI 진단 기록이 없어요."
                            description=" "
                            icon={<BiSearchAlt2/>}
                            >
                                <Link to='/user/doctor/appointments'>
                                    <Button fontFamily='LINESeedKR-Bd'>뒤로 가기</Button>
                                </Link>
                            </EmptyState>
                        </Box>
                        )}
                    </Card.Body>
                </Card.Root>
            </Box>
        </div>
    )
}

export default AppointmentPetDiagnosis