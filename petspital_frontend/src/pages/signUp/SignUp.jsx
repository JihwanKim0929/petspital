import React from 'react';
import './SignUp.scss';
import { Box, Text, Stack, StackSeparator, Icon } from "@chakra-ui/react";
import { MdOutlinePets } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import DoctorSignUpModalButton from '../../components/signUpModalButton/doctorSignUpModalButton/DoctorSignUpModalButton';
import PetOwnerSignUpModalButton from '../../components/signUpModalButton/petOwnerSignUpModalButton/PetOwnerSignUpModalButton';



const Signup = () => {

    return (
        <div className="signUp">
            <div className="background">
                <Box className="signUpContainer" w={{base: "19rem", md: "30rem", lg: "40rem"}} data-state="open" 
                _open={{ 
                    animationName: "fade-in, slide-from-top",
                    animationDuration: "300ms",
                    animationTimingFunction: "ease-out"
                }}>
                    <Text className="title" fontSize={{ base: '1.5rem', md: '2rem', lg: '2rem' }}>
                        Petspital 가입하기
                    </Text>
                    <Stack spacing={2} direction={{ base: 'column', md: 'row', lg: 'row' }} align='center' 
                    separator={<StackSeparator borderColor='gray.200' />}>
                        <Box className="selectBox"
                        w={{base: "15rem", md: "14rem", lg: "18.5rem"}}
                        h={{base: "12.5rem", md: "14rem", lg: "18rem"}}>
                            <Icon className="petOwnerIcon" w="3rem" h="3rem" margin="0.5rem"><MdOutlinePets /></Icon>
                            <Text className="desc" margin="0.5rem" fontSize={{ base: '0.7rem', md: '0.75rem', lg: '0.9rem' }}>
                                Petspital에 가입하여 AI를 통해 반려동물의 <br/>눈과 피부 건강을 체크해보세요.
                            </Text>
                            <PetOwnerSignUpModalButton />
                        </Box>
                        <Box className="selectBox"
                        w={{base: "15rem", md: "14rem", lg: "18.5rem"}}
                        h={{base: "12.5rem", md: "14rem", lg: "18rem"}}>
                            <Icon className="doctorIcon" w="3rem" h="3rem" margin="0.5rem"><FaUserDoctor /></Icon>
                            <Text className="desc" margin="0.5rem" fontSize={{ base: '0.7rem', md: '0.75rem', lg: '0.9rem' }}>
                                Petspital에 가입하여 <br/>반려동물 진단 예약을 받아보세요.
                            </Text>
                            <DoctorSignUpModalButton />
                        </Box>
                    </Stack>
                </Box>
            </div>
        </div>
    );
}

export default Signup