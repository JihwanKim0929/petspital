import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@chakra-ui/react";
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
    const diaryTitle = title.trim() === '' ? `${petName}'s diary` : title;

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

  return (
    <DialogRoot minH='1000px'>
      <DialogTrigger>
        <Button margin="0.5rem" fontSize={{ base: '0.75rem', md: '0.75rem', lg: '0.9rem' }}>
            Create New Diary
        </Button>
      </DialogTrigger>
      <DialogContent marginLeft='0.5rem' marginRight='0.5rem'>
        <DialogHeader>
          <DialogTitle>New {petName}'s Diary</DialogTitle>
        </DialogHeader>
        <DialogCloseTrigger />
        <DialogBody pb={6}>
          <Field label="Title">
            <Input 
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Field>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="solid" onClick={handleCreateDiary}>
                Create New {petName}'s Diary
            </Button>
          </DialogActionTrigger>
          <DialogActionTrigger asChild>
            <Button variant="solid">Close</Button>
          </DialogActionTrigger>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}

export default PetDiaryCreateModalButton;