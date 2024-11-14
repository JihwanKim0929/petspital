import React from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Text } from '@chakra-ui/react';
import { Button } from "../ui/button";
import { toaster } from '../ui/toaster';


const PetDiaryDeleteModalButton = ({whenDisable, diaryID}) => {

    const navigate = useNavigate();

    const handleDeleteDiary = async () => {
        try {
            const url = `http://localhost:8080/diary/${diaryID}`;
            const response = await fetch(url, {
                method: 'DELETE',
                credentials: 'include'
            });
    
            if (response.ok) {
                navigate(0);
                toaster.create({
                    title: "Successfully deleted.",
                    status: "success",
                    duration: 3000,
                    isClosable: true
                });
            } else {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to delete diary.');
            }
        } catch (err) {
            console.error("Error deleting diary:", err);
            toaster.create({
                title: "Failed to delete diary.",
                description: err.message,
                status: "error",
                duration: 3000,
                isClosable: true
            });
        }
    };

    return (
        <div className="petDiaryDeleteModalButton">
            <DialogRoot minH='1000px'>
                <DialogTrigger>
                    <Button disabled={whenDisable} margin="0.5rem" fontSize={{ base: '0.75rem', md: '0.75rem', lg: '0.9rem' }}>
                        Delete
                    </Button>
                </DialogTrigger>
                <DialogContent marginLeft='0.5rem' marginRight='0.5rem'>
                    <DialogCloseTrigger />
                    <DialogHeader>
                    <DialogTitle>Deleting Diary</DialogTitle>
                    </DialogHeader>
                    <DialogBody pb={6}>
                        <Text>Are you really want to delete?</Text>
                    </DialogBody>

                    <DialogFooter>
                        <DialogActionTrigger asChild>
                            <Button onClick={handleDeleteDiary}>Delete</Button>
                        </DialogActionTrigger>
                        <DialogActionTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogActionTrigger>
                    </DialogFooter>
                </DialogContent>
            </DialogRoot>
        </div>
    )
}

export default PetDiaryDeleteModalButton