import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from "@chakra-ui/react";
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
import { Field } from "../ui/field";
import { Button } from "../ui/button";

const PetDiaryPageEditModalButton = ({ pageID, pageContent }) => {
    const { register, handleSubmit, reset, setValue, watch } = useForm();

    const contentValue = watch('content');

    const onSubmit = async (data) => {
        const diaryPageDto = {
            content: data.content,
        };
        try {
            const response = await fetch(`/updateDiaryPage/${pageID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(diaryPageDto),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to edit diary page');
            }
            reset();
            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const resetForm = () => {
        reset();
    };

    return (
        <DialogRoot minH='1000px'>
            <DialogTrigger>
                <Button margin="0.5rem" fontSize={{ base: '0.75rem', md: '0.75rem', lg: '0.9rem' }}>
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent marginLeft='0.5rem' marginRight='0.5rem'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Edit Page</DialogTitle>
                    </DialogHeader>
                    <DialogCloseTrigger />
                    <DialogBody pb={6}>
                        <Field label="Content" required>
                            <Input 
                                placeholder="Enter content"
                                defaultValue={pageContent}
                                {...register('content', { required: true })} 
                            />
                        </Field>
                    </DialogBody>

                    <DialogFooter>
                        <DialogActionTrigger asChild>
                            <Button 
                                type="submit" 
                                disabled={!contentValue}
                            >
                                Edit
                            </Button>
                        </DialogActionTrigger>
                        <DialogActionTrigger asChild>
                            <Button variant="outline" onClick={resetForm}>Cancel</Button>
                        </DialogActionTrigger>
                    </DialogFooter>
                </form>
            </DialogContent>
        </DialogRoot>
    );
}

export default PetDiaryPageEditModalButton;