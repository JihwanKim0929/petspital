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

const PetDiaryEditModalButton = ({whenDisable, diaryID, petName}) => {

    const navigate = useNavigate();
    const [title, setTitle] = useState('');

    const handleEditDiary = async () => {
        const diaryTitle = title.trim() === '' ? `${petName}'s diary` : title;
    
        try {
    
            const response = await fetch(`/updateDiary/${diaryID}`, {
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
                <Button disabled={whenDisable} margin="0.5rem" fontSize={{ base: '0.75rem', md: '0.75rem', lg: '0.9rem' }}>
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent marginLeft='0.5rem' marginRight='0.5rem'>
                <DialogHeader>
                    <DialogTitle>Edit Diary</DialogTitle>
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
                        <Button variant="solid" onClick={handleEditDiary}>
                            Edit
                        </Button>
                    </DialogActionTrigger>
                    <DialogActionTrigger asChild>
                        <Button variant="solid">Cancel</Button>
                    </DialogActionTrigger>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    );
}

export default PetDiaryEditModalButton