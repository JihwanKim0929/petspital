import React, { useState, useEffect } from 'react';
import './AppointmentPetDiary.scss';
import { Link } from 'react-router-dom';
import { Card, Box, VStack, HStack, Stack, Text, Image, Separator, useBreakpointValue, Show } from '@chakra-ui/react';
import { Button } from '../../../../../components/ui/button';
import {
    NativeSelectField,
    NativeSelectRoot,
} from "../../../../../components/ui/native-select";
import { EmptyState } from '../../../../../components/ui/empty-state';
import { BiSearchAlt2 } from "react-icons/bi";
import { SERVER_URL } from '../../../../../utils/GlobalConstants';

const AppointmentPetDiary = () => {

    const [petID, setPetID] = useState(null);
    const [diaries, setDiaries] = useState([]);
    const [selectedDiary, setSelectedDiary] = useState(null);
    const [diaryPages, setDiaryPages] = useState([]);
    const isBelowMd = useBreakpointValue({ base: true, md: false });

    useEffect(() => {
        const petIDFromStorage = sessionStorage.getItem('selectedAppointmentPetID');
        if (petIDFromStorage) {
            setPetID(petIDFromStorage);
        }
    }, []);

    useEffect(() => {
        if (petID) {
            fetch(`${SERVER_URL}/pet/${petID}/diary`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })
                .then(response => response.json())
                .then(data => {
                    setDiaries(data);
                })
                .catch(error => {
                    console.error("Error fetching diaries:", error);
                });
        }
    }, [petID]);

    useEffect(() => {
        if (selectedDiary) {
            fetch(`${SERVER_URL}/diary/${selectedDiary.id}/page`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })
                .then(response => response.json())
                .then(data => {
                    setDiaryPages(data);
                })
                .catch(error => {
                    console.error("Error fetching diary pages:", error);
                });
        }
    }, [selectedDiary]);

    const handleDiarySelect = (e) => {
        const selectedDiaryId = e.target.value;
        const diary = diaries.find(diary => diary.id === parseInt(selectedDiaryId));
        setSelectedDiary(diary);
    };

    return (
        <div className='appointmentPetDiary'>
            <Box w='100%' h='100%' p={3}>
                <Card.Root w='100%' h='100%' overflow='auto'
                data-state="open" 
                _open={{ 
                    animationName: "fade-in, slide-from-top",
                    animationDuration: "300ms",
                    animationTimingFunction: "ease-out"
                }}>
                    <Card.Body>
                        <NativeSelectRoot>
                            <NativeSelectField 
                                placeholder="조회할 수첩을 선택하세요."
                                onChange={handleDiarySelect}
                                fontFamily='Pretendard Variable'>
                                {diaries.map(diary => (
                                    <option key={diary.id} value={diary.id} style={{ fontFamily: 'Pretendard Variable' }}>
                                        {diary.title} - {new Date(diary.createDate).toLocaleString()}
                                    </option>
                                ))}
                            </NativeSelectField>
                        </NativeSelectRoot>

                        {selectedDiary !== null ? (
                            <VStack w='100%'>
                                {diaryPages.map(page => (
                                    <Card.Root key={page.id} w='100%' h='auto' mb='1rem'>
                                        <Card.Body>
                                            <VStack align='left'>
                                                <Text fontFamily='LINESeedKR-Bd' fontSize={{ base:'16px', lg:'18px' }}>
                                                {new Date(page.createDate).toLocaleString()}
                                                </Text>
                                                <Separator mt={{ base:'2', md:'4' }} mb={{ base:'2', md:'4' }} />
                                                <Stack flexDirection={{ base:'column', md:'row' }} align='center'>
                                                    {page.image_url && <Image src={page.image_url} boxSize={{ base:'200px', md:'150px', lg:'200px' }} borderRadius={{ base:'0.5rem', lg:'1rem' }}/>}
                                                    <Show when={isBelowMd}><Separator mt={2} mb={2} /></Show>
                                                    <Card.Root ml={{ base:'0', md:'6' }} minH={{ base:'150px', lg:'200px' }} height='auto' w='100%'>
                                                        <Card.Body>
                                                        <Text h='100%' fontFamily='Pretendard Variable'>{page.content}</Text>
                                                        </Card.Body>
                                                    </Card.Root>
                                                </Stack>
                                            </VStack>                 
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
                                title="조회할 수첩을 선택하세요."
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
    );
};

export default AppointmentPetDiary;