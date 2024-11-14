import React, { useState } from 'react';
import './CommunityPost.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Text, VStack, Flex, Input, Textarea } from '@chakra-ui/react';
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
      <VStack w='100%'>
        <form onSubmit={onSubmit} style={{ width: '100%' }}>
          <Field label="Title" w='60%' m={6}>
            <Input placeholder="Enter title"  onChange={(e) => setTitle(e.target.value)}/>
          </Field>
          <Field label="Content" w='60%' m={6}>
            <Textarea placeholder="Enter content" onChange={(e) => setContent(e.target.value)} h='300px'/>
          </Field>
          <FileUploadRoot onChange={(e) => setImage(e.target.files[0])} accept={["image/*"]} m={6}>
            <FileUploadTrigger>
              <Button>Upload file</Button>
            </FileUploadTrigger>
            <FileUploadList />
          </FileUploadRoot>
          <Flex>
            <Button type='submit'>Post</Button>
            <Link to="../" style={{ textDecoration: "none" }}>
              <Button>Back</Button>
            </Link>
          </Flex>
        </form>
      </VStack>
    </div>
  );
};

export default CommunityPost;