import React, { useState } from 'react';
import './CommunityPost.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Text, Stack, HStack, Input, Textarea } from '@chakra-ui/react';
import { Button } from '../../../../components/ui/button';
import {
  FileUploadList,
  FileUploadRoot,
  FileUploadTrigger,
} from "../../../../components/ui/file-button";
import { Field } from "../../../../components/ui/field";

const CommunityPost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
  
    const boardDto = {
      title: title,
      content: content
    };
  
    console.log(boardDto);
    const json = JSON.stringify(boardDto);
    const blob = new Blob([json], { type: "application/json" });
    formData.append("boardDto", blob);
  
    if (image) {
      console.log(image);
      formData.append("image", image);
    }
  
    const url = "http://localhost:8080/board";
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        credentials: 'include',
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
      <Stack w='100%' justifyContent='center'>
        <form onSubmit={onSubmit} style={{ width: '100%' }}>
          <Field w='100%'>
            <Text fontFamily='LINESeedKR-Bd'>제목</Text>
            <Input placeholder="제목을 입력하세요." onChange={(e) => setTitle(e.target.value)}
            fontFamily='Pretendard Variable'/>
          </Field>
          <Field w='100%' mt={6}>
            <Text fontFamily='LINESeedKR-Bd'>내용</Text>
            <Textarea placeholder="내용을 입력하세요." onChange={(e) => setContent(e.target.value)} h='300px'
            fontFamily='Pretendard Variable'/>
          </Field>
          <FileUploadRoot onChange={(e) => setImage(e.target.files[0])} accept={["image/*"]} mt={6}>
            <FileUploadTrigger>
              <Button fontFamily='LINESeedKR-Bd'>이미지 파일 업로드</Button>
            </FileUploadTrigger>
            <FileUploadList />
          </FileUploadRoot>
          <HStack mt={6} w='100%' justifyContent='center' gap={4}>
            <Button type='submit' fontFamily='LINESeedKR-Bd'>작성</Button>
            <Link to="../" style={{ textDecoration: "none" }}>
              <Button fontFamily='LINESeedKR-Bd'>뒤로가기</Button>
            </Link>
          </HStack>
        </form>
      </Stack>
    </div>
  );
};

export default CommunityPost;