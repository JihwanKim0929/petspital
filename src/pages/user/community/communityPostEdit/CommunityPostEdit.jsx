import React, { useState, useEffect } from 'react';
import './CommunityPostEdit.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Text, VStack, Flex, Input, Textarea } from '@chakra-ui/react';
import { Button } from '../../../../components/ui/button';
import { Field } from "../../../../components/ui/field";

const CommunityPostEdit = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const postID = sessionStorage.getItem('postID');

        fetch(`http://localhost:8080/board/${postID}`, {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.error('Post not found 1');
                throw new Error('Failed to fetch post');
            }
        })
        .then(parsedPost => {
            setTitle(parsedPost.title);
            setContent(parsedPost.content);
            console.log('- Post Successfully Loaded -');
        })
        .catch(error => console.error('Post not found 2', error));
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        
        const boardDto = {
        title: title,
        content: content
        };
        
        const postID = sessionStorage.getItem('postID');
        console.log(boardDto);
        const url = `http://localhost:8080/updateBoard/${postID}`;
        try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(boardDto),
            credentials: 'include'
        });
    
        if (response.ok) {
            navigate('../');
        } else {
            const errorText = await response.text();
            console.error('Error submitting form:', response.statusText, errorText);
        }
        } catch (error) {
        console.error('Error during fetch:', error);
        }
    };

    return (
        <div className="communityPost">
            <VStack w='100%'>
                <form onSubmit={onSubmit} style={{ width: '100%' }}>
                    <Field w='60%' m={6}>
                        <Text fontFamily='LINESeedKR-Bd'>제목</Text>
                        <Input placeholder="제목을 입력하세요." value={title} onChange={(e) => setTitle(e.target.value)}
                        fontFamily='Pretendard Variable'/>
                    </Field>
                    <Field w='60%' m={6}>
                        <Text fontFamily='LINESeedKR-Bd'>내용</Text>
                        <Textarea placeholder="내용을 입력하세요." value={content} onChange={(e) => setContent(e.target.value)}
                        h='300px' fontFamily='Pretendard Variable'/>
                    </Field>
                    <Flex>
                        <Button type='submit' fontFamily='LINESeedKR-Bd'>게시글 편집</Button>
                        <Link to="../" style={{ textDecoration: "none" }}>
                            <Button fontFamily='LINESeedKR-Bd'>뒤로가기</Button>
                        </Link>
                    </Flex>
                </form>
            </VStack>
        </div>
    );
};

export default CommunityPostEdit;