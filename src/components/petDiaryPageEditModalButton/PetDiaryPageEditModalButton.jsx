import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Flex, Text } from "@chakra-ui/react";
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
                <Button margin="0.5rem" fontFamily='LINESeedKR-Bd' fontSize={{ base: '0.75rem', md: '0.75rem', lg: '0.9rem' }}>
                    편집
                </Button>
            </DialogTrigger>
            <DialogContent marginLeft='0.5rem' marginRight='0.5rem'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle fontFamily='LINESeedKR-Bd'>페이지 편집</DialogTitle>
                    </DialogHeader>
                    <DialogCloseTrigger />
                    <DialogBody pb={6}>
                        <Field required>
                            <Flex>
                                <Text fontFamily='LINESeedKR-Bd'>내용</Text>
                                <Text color='red.500' ml='0.25rem'>*</Text>
                            </Flex>
                            <Input 
                                placeholder="내용을 입력하세요."
                                defaultValue={pageContent}
                                {...register('content', { required: true })}
                                fontFamily='Pretendard Variable'
                            />
                        </Field>
                    </DialogBody>

                    <DialogFooter>
                        <DialogActionTrigger asChild>
                            <Button 
                                type="submit" 
                                disabled={!contentValue}
                                fontFamily='LINESeedKR-Bd'
                            >
                                편집
                            </Button>
                        </DialogActionTrigger>
                        <DialogActionTrigger asChild>
                            <Button variant="outline" onClick={resetForm} fontFamily='LINESeedKR-Bd'>취소</Button>
                        </DialogActionTrigger>
                    </DialogFooter>
                </form>
            </DialogContent>
        </DialogRoot>
    );
}

export default PetDiaryPageEditModalButton;