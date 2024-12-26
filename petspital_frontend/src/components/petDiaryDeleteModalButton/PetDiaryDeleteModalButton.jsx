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


const PetDiaryDeleteModalButton = ({whenDisable, diaryID}) => {

    const navigate = useNavigate();

    const handleDeleteDiary = async () => {
        try {
            const url = `${SERVER_URL}/diary/${diaryID}`;
            const response = await fetch(url, {
                method: 'DELETE',
                credentials: 'include'
            });
    
            if (response.ok) {
                navigate(0);
                toaster.create({
                    title: "삭제 완료",
                    description: "성공적으로 삭제가 완료되었습니다.",
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
                title: "삭제 실패",
                description: err.message,
                status: "error",
                duration: 3000,
                isClosable: true
            });
        }
    };

    return (
        <DialogRoot minH='1000px'>
            <DialogTrigger>
                <Button disabled={whenDisable} fontFamily='LINESeedKR-Bd' w='100%'>
                    삭제
                </Button>
            </DialogTrigger>
            <DialogContent marginLeft='0.5rem' marginRight='0.5rem'>
                <DialogCloseTrigger />
                <DialogHeader>
                <DialogTitle fontFamily='LINESeedKR-Bd'>수첩 삭제하기</DialogTitle>
                </DialogHeader>
                <DialogBody pb={6}>
                    <Text fontFamily='Pretendard Variable'>선택한 수첩을 삭제하시겠습니까?</Text>
                </DialogBody>

                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button onClick={handleDeleteDiary} fontFamily='LINESeedKR-Bd'>삭제</Button>
                    </DialogActionTrigger>
                    <DialogActionTrigger asChild>
                        <Button variant="outline" fontFamily='LINESeedKR-Bd'>취소</Button>
                    </DialogActionTrigger>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    )
}

export default PetDiaryDeleteModalButton