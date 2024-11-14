import React, { useState } from 'react';
import { Stack, Text, Show, Textarea } from '@chakra-ui/react';
import CommentDeleteModalButton from '../commentDeleteModalButton/CommentDeleteModalButton';
import { Button } from '../ui/button';

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
            const response = await fetch(`http://localhost:8080/updateComment/${comment.id}`, {
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
                <Stack key={comment.id} padding="4" borderBottom="1px solid gray">
                    <Text fontWeight="bold">{comment.author.username}</Text>
                    <Text>{comment.content}</Text>
                    <Text fontSize="sm" color="gray.500">{new Date(comment.createDate).toLocaleString()}</Text>

                    {currentUser && comment.author.id === currentUser.id && (
                    <div>
                        <Button margin="0.5rem" alignSelf="flex-start" onClick={startEditMode}>
                            Edit
                        </Button>
                        <CommentDeleteModalButton commentID={comment.id} />
                    </div>
                    )}
                </Stack>
            </Show>
            <Show when={isEditMode}>
                <Textarea
                placeholder="Comment..."
                value={nextContent}
                onChange={(e) => setNextContent(e.target.value)}
                />
                <Button onClick={handleCommentSubmit}>Submit</Button>
                <Button onClick={cancelEditMode}>Cancel</Button>
            </Show>
        </div>
    )
}

export default CommentBox