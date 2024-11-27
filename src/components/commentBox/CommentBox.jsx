import React, { useState } from 'react';
import { Stack, Text, Show, Textarea, HStack, VStack } from '@chakra-ui/react';
import CommentDeleteModalButton from '../commentDeleteModalButton/CommentDeleteModalButton';
import { Button } from '../ui/button';
import { SERVER_URL } from '../../utils/GlobalConstants';

const CommentBox = ({comment, currentUser, postID, fetchComments}) => {

    const [isEditMode, setIsEditMode] = useState(false);
    const [nextContent, setNextContent] = useState(comment.content);
    const [error, setError] = useState(null);

    const startEditMode = () => {setIsEditMode(true)};

    const cancelEditMode = () => {
        setIsEditMode(false);
        setNextContent(comment.content);
    };
    
    const handleCommentSubmit = async () => {
        const commentData = {
            content: nextContent
        };
    
        try {
            const response = await fetch(`${SERVER_URL}/updateComment/${comment.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(commentData)
            });
    
            if (response.ok) {
                setIsEditMode(false);
                fetchComments(postID);
            } else {
                setError('Failed to add comment.');
            }
        } catch (error) {
            setError('Network error while submitting comment.');
        }
    };

    return (
        <div className="commentBox">
            <Show when={!isEditMode}>
                <Stack key={comment.id} padding="4" borderBottom="1px solid gray" flexDirection={{ base:'column', md:'row'}}>
                    <VStack align='left' w='100%'>
                        <Text fontWeight="bold" fontFamily='LINESeedKR-Bd'>{comment.author.username}</Text>
                        <Text fontFamily='Pretendard Variable' wordBreak='break-word'>{comment.content}</Text>
                        <Text fontSize="sm" color="gray.500" fontFamily='Pretendard Variable'>
                            {new Date(new Date(comment.createDate).getTime() + 9 * 60 * 60 * 1000).toLocaleString('ko-KR', {
                                timeZone: 'Asia/Seoul',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                            })}
                        </Text>
                    </VStack>
                    {currentUser && comment.author.id === currentUser.id && (
                    <HStack>
                        <Button onClick={startEditMode} fontFamily='LINESeedKR-Bd'>
                            편집
                        </Button>
                        <CommentDeleteModalButton commentID={comment.id} />
                    </HStack>
                    )}
                </Stack>
            </Show>
            <Show when={isEditMode}>
                <Textarea
                placeholder="댓글 내용을 입력하세요."
                value={nextContent}
                onChange={(e) => setNextContent(e.target.value)}
                fontFamily='Pretendard Variable'
                />
                <HStack>
                    <Button onClick={handleCommentSubmit} fontFamily='LINESeedKR-Bd'>편집</Button>
                    <Button onClick={cancelEditMode} fontFamily='LINESeedKR-Bd'>취소</Button>
                </HStack>
            </Show>
        </div>
    )
}

export default CommentBox