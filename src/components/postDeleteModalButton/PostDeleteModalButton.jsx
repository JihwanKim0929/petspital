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


const PostDeleteModalButton = ({postID}) => {

    const navigate = useNavigate();

    const handleDeletePost = async () => {
        try {
            const url = `http://localhost:8080/board/${postID}`;
            const response = await fetch(url, {
                method: 'DELETE',
                credentials: 'include'
            });
    
            if (response.ok) {
                navigate(0);
                toaster.create({
                    title: "삭제 완료",
                    description: "게시글 삭제가 완료되었습니다.",
                    status: "success",
                    duration: 3000,
                    isClosable: true
                });
            } else {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to delete post.');
            }
        } catch (err) {
            console.error("Error deleting post:", err);
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
        <div className="postDeleteModalButton">
            <DialogRoot minH='1000px'>
                <DialogTrigger>
                    <Button margin="0.5rem" fontFamily='LINESeedKR-Bd' fontSize={{ base: '0.75rem', md: '0.75rem', lg: '0.9rem' }}>
                        삭제
                    </Button>
                </DialogTrigger>
                <DialogContent marginLeft='0.5rem' marginRight='0.5rem'>
                    <DialogCloseTrigger />
                    <DialogHeader>
                    <DialogTitle fontFamily='LINESeedKR-Bd'>게시글 삭제</DialogTitle>
                    </DialogHeader>
                    <DialogBody pb={6}>
                        <Text fontFamily='Pretendard Variable'>해당 게시글을 삭제하시겠습니까?</Text>
                    </DialogBody>

                    <DialogFooter>
                        <DialogActionTrigger asChild>
                            <Button onClick={handleDeletePost} fontFamily='LINESeedKR-Bd'>삭제</Button>
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

export default PostDeleteModalButton