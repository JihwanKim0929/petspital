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
import { SERVER_URL } from '../../utils/GlobalConstants';


const PetDeleteModalButton = ({petID}) => {

    const navigate = useNavigate();

    const handleDeletePet = async () => {
        try {
            const url = `${SERVER_URL}/pet/${petID}`;
            const response = await fetch(url, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (response.ok) {
                navigate(0);
                toaster.create({
                    title: "삭제 완료",
                    description: "등록된 반려동물 정보가 성공적으로 삭제되었습니다.",
                    status: "success",
                    duration: 3000,
                    isClosable: true
                });
            } else {
                throw new Error('Failed to delete pet');
            }
        } catch (err) {
            console.log("Failed to delete pet.");
        }
    }

    return (
        <div className="petDeleteModalButton">
            <DialogRoot minH='1000px'>
                <DialogTrigger>
                    <Button fontSize={{ base: '0.75rem', md: '0.75rem', lg: '0.9rem' }} fontFamily='LINESeedKR-Bd'>
                        삭제
                    </Button>
                </DialogTrigger>
                <DialogContent marginLeft='0.5rem' marginRight='0.5rem'>
                    <DialogCloseTrigger />
                    <DialogHeader>
                    <DialogTitle fontFamily='LINESeedKR-Bd'>등록된 반려동물 삭제</DialogTitle>
                    </DialogHeader>
                    <DialogBody pb={6}>
                        <Text fontFamily='Pretendard Variable'>등록된 반려동물 정보를 삭제할까요?</Text>
                    </DialogBody>

                    <DialogFooter>
                        <DialogActionTrigger asChild>
                            <Button onClick={handleDeletePet} fontFamily='LINESeedKR-Bd'>삭제</Button>
                        </DialogActionTrigger>
                        <DialogActionTrigger asChild>
                            <Button variant="outline" fontFamily='LINESeedKR-Bd'>취소</Button>
                        </DialogActionTrigger>
                    </DialogFooter>
                </DialogContent>
            </DialogRoot>
        </div>
    )
}

export default PetDeleteModalButton