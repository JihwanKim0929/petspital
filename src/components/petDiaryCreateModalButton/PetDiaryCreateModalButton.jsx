import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Text } from "@chakra-ui/react";
import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogRoot,
    DialogTrigger,
} from "../ui/dialog";
import { Field } from "../ui/field";
import { Button } from "../ui/button";

const PetDiaryCreateModalButton = ({ petID, petName }) => {

  const navigate = useNavigate();
  const [title, setTitle] = useState('');

  const handleCreateDiary = async () => {
    const diaryTitle = title.trim() === '' ? `${petName}의 수첩` : title;

    try {

      const response = await fetch(`/pet/${petID}/diary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ title: diaryTitle }),
      });

      if (!response.ok) {
        throw new Error('Failed to create diary');
      }

    const newDiary = await response.json();
    const newDiaryID = newDiary.id;
    sessionStorage.setItem('selectedDiaryID', newDiaryID);
    navigate("./diary");
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const resetTitle = () => {
    setTitle('');
  }

  return (
    <DialogRoot minH='1000px'>
      <DialogTrigger>
        <Button margin="0.5rem" fontSize={{ base: '0.75rem', md: '0.75rem', lg: '0.9rem' }} fontFamily='LINESeedKR-Bd'>
            새로운 수첩 만들기
        </Button>
      </DialogTrigger>
      <DialogContent marginLeft='0.5rem' marginRight='0.5rem'>
        <DialogHeader>
          <DialogTitle fontFamily='LINESeedKR-Bd'>{petName}의 새로운 수첩 만들기</DialogTitle>
        </DialogHeader>
        <DialogCloseTrigger />
        <DialogBody pb={6}>
          <Field>
            <Text fontFamily='LINESeedKR-Bd'>제목</Text>
            <Input 
              placeholder="수첩 제목을 입력하세요."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fontFamily='Pretendard Variable'
            />
          </Field>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="solid" onClick={handleCreateDiary} fontFamily='LINESeedKR-Bd'>
              새로운 수첩 생성
            </Button>
          </DialogActionTrigger>
          <DialogActionTrigger asChild>
            <Button variant="solid" fontFamily='LINESeedKR-Bd' onClick={resetTitle}>취소</Button>
          </DialogActionTrigger>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}

export default PetDiaryCreateModalButton;