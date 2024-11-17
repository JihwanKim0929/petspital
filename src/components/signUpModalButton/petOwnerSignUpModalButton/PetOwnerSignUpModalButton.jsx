import React, { useState } from 'react';
import { Input } from "@chakra-ui/react";
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
} from "../../../components/ui/dialog";
import {
  FileUploadList,
  FileUploadRoot,
  FileUploadTrigger,
} from "../../../components/ui/file-button";
import { Field } from "../../../components/ui/field";
import { PasswordInput } from "../../../components/ui/password-input";
import { Button } from "../../../components/ui/button";
import { useForm } from 'react-hook-form';
import { toaster } from '../../ui/toaster';
import { Text, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


const PetOwnerSignUpModalButton = () => {

  const { register, handleSubmit, errors, reset, setValue } = useForm();
  
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const userDto = {
      username: data.username,
      password: data.password,
      email: data.email,
      address: data.homeaddress,
      phone_num: data.phonenumber,
      role: "PETOWNER"
    };
    console.log(data.image);
    const dataImage = data.image;
    const formData = new FormData();
    if (dataImage) {
      formData.append("image", dataImage);
    }
    const json = JSON.stringify(userDto);
    const blob = new Blob([json],{type: "application/json"});
    formData.append("userDto",blob);
    const url = "http://localhost:8080/user";
    fetch(url,{
        method: 'POST',
        body: formData,
        headers: {},
        credentials: 'include'
    })
    .then(response => {
      if (response.ok) {
        toaster.create({
          title: "계정 생성 완료",
          description: "성공적으로 계정이 생성되었습니다.",
          status: "success",
          duration: 3000,
          isClosable: true
        });
        reset();
        navigate('/login');
      } else {
        toaster.create({
          title: "계정 생성 실패",
          description: "계정 생성에 실패했습니다. 다시 시도해 주세요.",
          status: "error",
          duration: 3000,
          isClosable: true
        });
      }
    })
    .catch(error => {
      toaster.create({
        title: "서버 오류 발생",
        description: "서버와 연결할 수 없습니다. 다시 시도해 주세요.",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setValue('image', file);
    console.log("Selected file:", file);
  };

  const resetForm = () => {
    reset();
  };

  return (
    <DialogRoot minH='1000px'>
      <DialogTrigger>
        <Button margin="0.5rem" fontSize={{ base: '0.75rem', md: '0.75rem', lg: '0.9rem' }} fontFamily='LINESeedKR-Bd'>
          반려동물 보유자 계정 생성하기
        </Button>
      </DialogTrigger>
      <DialogContent marginLeft='0.5rem' marginRight='0.5rem'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle fontFamily='LINESeedKR-Bd'>반려동물 보유자 계정 생성</DialogTitle>
          </DialogHeader>
          <DialogCloseTrigger />
          <DialogBody pb={6}>
            <Field>
              <Flex>
                <Text fontFamily='LINESeedKR-Bd'>아이디</Text>
                <Text color='red.500' ml='0.25rem'>*</Text>
              </Flex>
              <Input placeholder="아이디를 입력하세요." fontFamily='Pretendard Variable' {...register('username', { required: true })}/>
            </Field>
            <Field required mt={4}>
              <Flex>
                <Text fontFamily='LINESeedKR-Bd'>비밀번호</Text>
                <Text color='red.500' ml='0.25rem'>*</Text>
              </Flex>
              <PasswordInput placeholder='패스워드를 입력하세요.' fontFamily='Pretendard Variable' {...register('password', { required: true })}/>
            </Field>
            <Field required mt={4}>
              <Flex>
                <Text fontFamily='LINESeedKR-Bd'>이메일</Text>
                <Text color='red.500' ml='0.25rem'>*</Text>
              </Flex>
              <Input placeholder='이메일을 입력하세요.' fontFamily='Pretendard Variable' {...register('email', { required: true })}/>
            </Field>
            <Field required mt={4}>
              <Flex>
                <Text fontFamily='LINESeedKR-Bd'>전화번호</Text>
                <Text color='red.500' ml='0.25rem'>*</Text>
              </Flex>
              <Input placeholder='전화번호를 입력하세요.' fontFamily='Pretendard Variable' {...register('phonenumber', { required: true })}/>
            </Field>
            <Field required mt={4}>
              <Flex>
                <Text fontFamily='LINESeedKR-Bd'>집주소</Text>
                <Text color='red.500' ml='0.25rem'>*</Text>
              </Flex>
              <Input placeholder='집 주소를 입력하세요.' fontFamily='Pretendard Variable' {...register('homeaddress', { required: false })}/>
            </Field>
            <Field mt={4}>
              <Flex>
                <Text fontFamily='LINESeedKR-Bd'>프로필 이미지</Text>
                <Text color='red.500' ml='0.25rem'>*</Text>
              </Flex>
              <FileUploadRoot onChange={handleFileChange}>
                <FileUploadTrigger asChild>
                  <Button variant="outline" size="sm" fontFamily='LINESeedKR-Bd'>
                    프로필 이미지 업로드
                  </Button>
                </FileUploadTrigger>
                <FileUploadList />
              </FileUploadRoot>
            </Field>
          
          </DialogBody>

          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button type="submit" fontFamily='LINESeedKR-Bd'>계정 생성</Button>
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

export default PetOwnerSignUpModalButton