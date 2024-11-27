import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@chakra-ui/react';
import { Field } from '../ui/field';
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
import { Button } from "../ui/button";
import { toaster } from '../ui/toaster';
import { SERVER_URL } from '../../utils/GlobalConstants';

const PetDiaryEditModalButton = ({whenDisable, diaryID, petName}) => {

    const navigate = useNavigate();
    const [title, setTitle] = useState('');

    const handleEditDiary = async () => {
        const diaryTitle = title.trim() === '' ? `${petName}'s diary` : title;
    
        try {
    
            const response = await fetch(`${SERVER_URL}/updateDiary/${diaryID}`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ title: diaryTitle }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to edit diary');
            }
            navigate(0);
        } catch (error) {
          console.error('Error:', error);
        }
    };
    
    return (
        <DialogRoot minH='1000px'>
            <DialogTrigger>
                <Button disabled={whenDisable} margin="0.5rem" fontSize={{ base: '0.75rem', md: '0.75rem', lg: '0.9rem' }} 
                fontFamily='LINESeedKR-Bd'>
                    편집
                </Button>
            </DialogTrigger>
            <DialogContent marginLeft='0.5rem' marginRight='0.5rem'>
                <DialogHeader>
                    <DialogTitle fontFamily='LINESeedKR-Bd'>수첩 제목 변경</DialogTitle>
                </DialogHeader>
                <DialogCloseTrigger />
                <DialogBody pb={6}>
                    <Field>
                        <Input 
                        placeholder="수첩의 제목을 입력하세요."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        fontFamily='Pretendard Variable'
                        />
                    </Field>
                </DialogBody>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button variant="solid" onClick={handleEditDiary} fontFamily='LINESeedKR-Bd'>
                            편집
                        </Button>
                    </DialogActionTrigger>
                    <DialogActionTrigger asChild>
                        <Button variant="solid" fontFamily='LINESeedKR-Bd'>취소</Button>
                    </DialogActionTrigger>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    );
}

export default PetDiaryEditModalButton