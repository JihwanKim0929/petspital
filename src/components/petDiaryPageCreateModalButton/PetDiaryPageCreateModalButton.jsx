import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Text, Flex } from "@chakra-ui/react";
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
import {
  FileUploadList,
  FileUploadRoot,
  FileUploadTrigger,
} from "../ui/file-button";
import { Field } from "../ui/field";
import { Button } from "../ui/button";

const PetDiaryPageCreateModalButton = ({ diaryID }) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [selectedFile, setSelectedFile] = useState(null);

  const contentValue = watch('content');

  const onSubmit = async (data) => {
    const formData = new FormData();
    const diaryPageDto = {
      content: data.content,
    };
    const json = JSON.stringify(diaryPageDto);
    const blob = new Blob([json],{type: "application/json"});
    formData.append("DiaryPageDto",blob);
    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    try {
      const response = await fetch(`/diary/${diaryID}/page`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to create diary page');
      }

      reset();
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setValue('image', file);
  };

  const resetForm = () => {
    reset();
    setSelectedFile(null);
  };

  return (
    <DialogRoot minH='1000px'>
      <DialogTrigger>
        <Button margin="0.5rem" fontFamily='LINESeedKR-Bd' fontSize={{ base: '0.75rem', md: '0.75rem', lg: '0.9rem' }}>
          새 페이지
        </Button>
      </DialogTrigger>
      <DialogContent marginLeft='0.5rem' marginRight='0.5rem'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle fontFamily='LINESeedKR-Bd'>새로운 페이지 생성</DialogTitle>
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
                fontFamily='Pretendard Variable' 
                {...register('content', { required: true })} 
              />
            </Field>
            <Field mt={4}>
              <Text fontFamily='LINESeedKR-Bd'>이미지</Text>
              <FileUploadRoot onChange={handleFileChange}>
                <FileUploadTrigger asChild>
                  <Button variant="outline" size="sm" fontFamily='LINESeedKR-Bd'>
                    이미지 파일 업로드
                  </Button>
                </FileUploadTrigger>
                <FileUploadList />
              </FileUploadRoot>
            </Field>
          </DialogBody>

          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button 
                type="submit" 
                isDisabled={!contentValue}
                fontFamily='LINESeedKR-Bd'
              >
                새로운 페이지 만들기
              </Button>
            </DialogActionTrigger>
            <DialogActionTrigger asChild>
              <Button variant="outline" fontFamily='LINESeedKR-Bd' onClick={resetForm}>취소</Button>
            </DialogActionTrigger>
          </DialogFooter>
        </form>
      </DialogContent>
    </DialogRoot>
  );
}

export default PetDiaryPageCreateModalButton;