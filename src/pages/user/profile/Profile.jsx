import React, { useState, useEffect } from 'react';
import './Profile.scss';
import { useNavigate } from 'react-router-dom';
import { Card, Show, Box, Center, Text, useBreakpointValue, Flex, HStack, VStack, Separator } from '@chakra-ui/react';
import { Avatar } from '../../../components/ui/avatar';
import { Button } from '../../../components/ui/button';
import { Editable, IconButton } from "@chakra-ui/react";
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu";
import { toaster } from "../../../components/ui/toaster";

const Profile = () => {

  const [username, setUsername] = useState('');
  const [userImageURL, setUserImageURL] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userType, setUserType] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  const [nextUsername, setNextUsername] = useState('');
  const [nextUserEmail, setNextUserEmail] = useState('');
  const [nextUserPhoneNumber, setNextUserPhoneNumber] = useState('');
  const [nextUserAddress, setNextUserAddress] = useState('');

  const navigate = useNavigate();
  const isBelowMd = useBreakpointValue({ base: true, md: false });
  const toggleEditMode = () => {setIsEditMode(!isEditMode)};

  const cancelEditMode = () => {
    setNextUsername(username);
    setNextUserEmail(userEmail);
    setNextUserPhoneNumber(userPhoneNumber);
    setNextUserAddress(userAddress);
    setIsEditMode(false);
  };

  const handleNextUsername = (e) => {
    setNextUsername(e.value);
  }

  const handleNextUserEmail = (e) => {
    setNextUserEmail(e.value);
  }

  const handleNextUserPhoneNumber = (e) => {
    setNextUserPhoneNumber(e.value);
  }

  const handleNextUserAddress = (e) => {
    setNextUserAddress(e.value);
  }

  const editUser = async () => {
    console.log("Next username: " + nextUsername);
    console.log("Next email: " + nextUserEmail);
    console.log("Next phone number: " + nextUserPhoneNumber);
    console.log("Next address: " + nextUserAddress);

    const userDto = {
      username: nextUsername,
      email: nextUserEmail,
      address: nextUserAddress,
      phone_num: nextUserPhoneNumber,
      role: "PETOWNER"
    };

    try {
        const response = await fetch("http://localhost:8080/updateUser", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userDto),
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`Failed to update user: ${response.statusText}`);
        }

        const text = await response.text();
        const data = text ? JSON.parse(text) : {};

        console.log('Success:', data);

        setIsEditMode(false);
        
        toaster.create({
            title: "Successfully changed",
            status: "success",
            duration: 3000,
            isClosable: true
        });

        navigate(0);
    } catch (error) {
        console.error('Error:', error);
    }
  };

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (!user) {
      return;
    }
    
    const parsedUser = JSON.parse(user);
    if (parsedUser.role === 'PETOWNER') {
      setUserType('petOwner');
    } else if (parsedUser.role === 'VET') {
      setUserType('vet');
    } else if (parsedUser.role === 'ADMIN') {
      setUserType('admin');
    }

    setUsername(parsedUser.username);
    setUserEmail(parsedUser.email);
    setUserPhoneNumber(parsedUser.phone_num);
    setUserAddress(parsedUser.address);
    setUserImageURL(parsedUser.image_url);

    setNextUsername(parsedUser.username);
    setNextUserEmail(parsedUser.email);
    setNextUserPhoneNumber(parsedUser.phone_num);
    setNextUserAddress(parsedUser.address);
  }, []);

  return (
    <div className="profile">
      <Box w='100%' h='100%' p={3}>
        <Card.Root className="card" w='100%' h='100%' overflow='auto'
        data-state="open" 
        _open={{ 
            animationName: "fade-in, slide-from-top",
            animationDuration: "300ms",
            animationTimingFunction: "ease-out"
        }}>
          <Card.Body justifyContent='center'>
            <Show when={!isEditMode}>
              <Show when={!isBelowMd}>
                <HStack>
                  <Box>
                    <Avatar name={username} src={userImageURL} w={{base:'150px', md:'200px', lg:'300px'}} h={{base:'150px', md:'200px', lg:'300px'}} />
                  </Box>
                  <Box ml={10} w='100%'>
                    <HStack mr={3} pb={1}>
                      <Text fontFamily='Pretendard Variable' fontWeight='600' fontSize={{base: '16px', md:'16px', lg:'20px'}} whiteSpace="nowrap">유저네임</Text>
                      <Separator orientation='vertical' border='0.25px solid lightgray' ml={2} height={6}/>
                      <Text fontFamily='Pretendard Variable' ml={2} fontSize={{base: '16px', md:'16px', lg:'20px'}} wordBreak='break-word'>{username}</Text>
                    </HStack>
                    <HStack mt={10} mr={3} pb={1}>
                      <Text fontFamily='Pretendard Variable' fontWeight='600' fontSize={{base: '16px', md:'16px', lg:'20px'}} whiteSpace="nowrap">이메일</Text>
                      <Separator orientation='vertical' border='0.25px solid lightgray' ml={2} height={6}/>
                      <Text fontFamily='Pretendard Variable' ml={2} fontSize={{base: '16px', md:'16px', lg:'20px'}} wordBreak='break-word'>{userEmail}</Text>
                    </HStack>
                    <HStack mt={10} mr={3} pb={1}>
                      <Text fontFamily='Pretendard Variable' fontWeight='600' fontSize={{base: '16px', md:'16px', lg:'20px'}} whiteSpace="nowrap">전화번호</Text>
                      <Separator orientation='vertical' border='0.25px solid lightgray' ml={2} height={6}/>
                      <Text fontFamily='Pretendard Variable' ml={2} fontSize={{base: '16px', md:'16px', lg:'20px'}} wordBreak='break-word'>{userPhoneNumber}</Text>
                    </HStack>
                    <HStack mt={10} mr={3} pb={1}>
                      <Text fontFamily='Pretendard Variable' fontWeight='600' fontSize={{base: '16px', md:'16px', lg:'20px'}} whiteSpace="nowrap">주소</Text>
                      <Separator orientation='vertical' border='0.25px solid lightgray' ml={2} height={6}/>
                      <Text fontFamily='Pretendard Variable' ml={2} fontSize={{base: '16px', md:'16px', lg:'20px'}} wordBreak='break-word'>{userAddress}</Text>
                    </HStack>
                  </Box>
                </HStack>
              </Show>
              <Show when={isBelowMd}>
                <VStack>
                  <Box>
                    <Avatar name={username} src={userImageURL} w={{base:'150px', md:'200px', lg:'300px'}} h={{base:'150px', md:'200px', lg:'300px'}} />
                  </Box>
                  <Box w='100%'>
                    <HStack mt={10} pb={1}>
                      <Text fontFamily='Pretendard Variable' fontWeight='600' fontSize={{base: '16px', md:'16px', lg:'20px'}} whiteSpace="nowrap">유저네임</Text>
                      <Separator orientation='vertical' border='0.25px solid lightgray' ml={2} height={6}/>
                      <Text fontFamily='Pretendard Variable' ml={2} fontSize={{base: '16px', md:'16px', lg:'20px'}} wordBreak='break-word'>{username}</Text>
                    </HStack>
                    <HStack mt={10} pb={1}>
                      <Text fontFamily='Pretendard Variable' fontWeight='600' fontSize={{base: '16px', md:'16px', lg:'20px'}} whiteSpace="nowrap">이메일</Text>
                      <Separator orientation='vertical' border='0.25px solid lightgray' ml={2} height={6}/>
                      <Text fontFamily='Pretendard Variable' ml={2} fontSize={{base: '16px', md:'16px', lg:'20px'}} wordBreak='break-word'>{userEmail}</Text>
                    </HStack>
                    <HStack mt={10} pb={1}>
                      <Text fontFamily='Pretendard Variable' fontWeight='600' fontSize={{base: '16px', md:'16px', lg:'20px'}} whiteSpace="nowrap">전화번호</Text>
                      <Separator orientation='vertical' border='0.25px solid lightgray' ml={2} height={6}/>
                      <Text fontFamily='Pretendard Variable' ml={2} fontSize={{base: '16px', md:'16px', lg:'20px'}} wordBreak='break-word'>{userPhoneNumber}</Text>
                    </HStack>
                    <HStack mt={10} pb={1}>
                      <Text fontFamily='Pretendard Variable' fontWeight='600' fontSize={{base: '16px', md:'16px', lg:'20px'}} whiteSpace="nowrap">주소</Text>
                      <Separator orientation='vertical' border='0.25px solid lightgray' ml={2} height={6}/>
                      <Text fontFamily='Pretendard Variable' ml={2} fontSize={{base: '16px', md:'16px', lg:'20px'}} wordBreak='break-word'>{userAddress}</Text>
                    </HStack>
                  </Box>
                </VStack>
              </Show>
              <Box width='100%' display='flex' justifyContent='right'>
                <Button alignSelf="flex-start" mt={6} onClick={toggleEditMode} fontFamily='LINESeedKR-Bd'>
                  편집
                </Button>
              </Box>
            </Show>
            
            <Show when={isEditMode}>
              <Flex gap='8px' alignItems='center'>
                <Text>Username</Text>
                <Editable.Root defaultValue={username} onValueCommit={handleNextUsername}>
                  <Editable.Preview />
                  <Editable.Input/>
                  <Editable.Control>
                    <Editable.EditTrigger asChild>
                      <IconButton variant="ghost" size="xs">
                        <LuPencilLine />
                      </IconButton>
                    </Editable.EditTrigger>
                    <Editable.CancelTrigger asChild>
                      <IconButton variant="outline" size="xs">
                        <LuX />
                      </IconButton>
                    </Editable.CancelTrigger>
                    <Editable.SubmitTrigger asChild>
                      <IconButton variant="outline" size="xs">
                        <LuCheck />
                      </IconButton>
                    </Editable.SubmitTrigger>
                  </Editable.Control>
                </Editable.Root>
              </Flex>

              <Flex gap='8px' alignItems='center'>
                <Text>Email</Text>
                <Editable.Root defaultValue={userEmail} onValueCommit={handleNextUserEmail}>
                  <Editable.Preview />
                  <Editable.Input />
                  <Editable.Control>
                    <Editable.EditTrigger asChild>
                      <IconButton variant="ghost" size="xs">
                        <LuPencilLine />
                      </IconButton>
                    </Editable.EditTrigger>
                    <Editable.CancelTrigger asChild>
                      <IconButton variant="outline" size="xs">
                        <LuX />
                      </IconButton>
                    </Editable.CancelTrigger>
                    <Editable.SubmitTrigger asChild>
                      <IconButton variant="outline" size="xs">
                        <LuCheck />
                      </IconButton>
                    </Editable.SubmitTrigger>
                  </Editable.Control>
                </Editable.Root>
              </Flex>

              <Flex gap='8px' alignItems='center'>
                <Text>Tel</Text>
                <Editable.Root defaultValue={userPhoneNumber} onValueCommit={handleNextUserPhoneNumber}>
                  <Editable.Preview />
                  <Editable.Input />
                  <Editable.Control>
                    <Editable.EditTrigger asChild>
                      <IconButton variant="ghost" size="xs">
                        <LuPencilLine />
                      </IconButton>
                    </Editable.EditTrigger>
                    <Editable.CancelTrigger asChild>
                      <IconButton variant="outline" size="xs">
                        <LuX />
                      </IconButton>
                    </Editable.CancelTrigger>
                    <Editable.SubmitTrigger asChild>
                      <IconButton variant="outline" size="xs">
                        <LuCheck />
                      </IconButton>
                    </Editable.SubmitTrigger>
                  </Editable.Control>
                </Editable.Root>
              </Flex>

              <Flex gap='8px' alignItems='center'>
                <Text>Address</Text>
                <Editable.Root defaultValue={userAddress} onValueCommit={handleNextUserAddress}>
                  <Editable.Preview />
                  <Editable.Input />
                  <Editable.Control>
                    <Editable.EditTrigger asChild>
                      <IconButton variant="ghost" size="xs">
                        <LuPencilLine />
                      </IconButton>
                    </Editable.EditTrigger>
                    <Editable.CancelTrigger asChild>
                      <IconButton variant="outline" size="xs">
                        <LuX />
                      </IconButton>
                    </Editable.CancelTrigger>
                    <Editable.SubmitTrigger asChild>
                      <IconButton variant="outline" size="xs">
                        <LuCheck />
                      </IconButton>
                    </Editable.SubmitTrigger>
                  </Editable.Control>
                </Editable.Root>
              </Flex>
              <Button alignSelf="flex-start" mt={6}>
                Save
              </Button>
              <Button alignSelf="flex-start" mt={6} onClick={cancelEditMode}>
                Cancel
              </Button>
            </Show>
          </Card.Body>
        </Card.Root>
      </Box>
    </div>
  )
}

export default Profile