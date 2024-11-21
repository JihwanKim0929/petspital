import React, { useState, useEffect } from 'react';
import './AppointmentPetDiary.scss';
import { Link } from 'react-router-dom';
import { Card, Box, VStack, Text, Image } from '@chakra-ui/react';
import { Button } from '../../../../../components/ui/button';
import {
    NativeSelectField,
    NativeSelectRoot,
} from "../../../../../components/ui/native-select";
import { EmptyState } from '../../../../../components/ui/empty-state';
import { BiSearchAlt2 } from "react-icons/bi";

const AppointmentPetDiary = () => {

    const [petID, setPetID] = useState(null);
    const [diaries, setDiaries] = useState([]);
    const [selectedDiary, setSelectedDiary] = useState(null);
    const [diaryPages, setDiaryPages] = useState([]);

    useEffect(() => {
        const petIDFromStorage = sessionStorage.getItem('selectedAppointmentPetID');
        if (petIDFromStorage) {
            setPetID(petIDFromStorage);
        }
    }, []);

    useEffect(() => {
        if (petID) {
            fetch(`http://localhost:8080/pet/${petID}/diary`, {
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
            fetch(`http://localhost:8080/diary/${selectedDiary.id}/page`, {
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
                                    <Card.Root w='100%' key={page.id}>
                                        <Card.Body>
                                            <Text>{new Date(page.createDate).toLocaleString()}</Text>
                                            <Image src={page.image_url} />
                                            <Text>{page.content}</Text>
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