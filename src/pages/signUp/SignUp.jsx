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
                        Sign up
                    </Text>
                    <Stack spacing={2} direction={{ base: 'column', md: 'row', lg: 'row' }} align='center' 
                    separator={<StackSeparator borderColor='gray.200' />}>
                        <Box className="selectBox"
                        w={{base: "15rem", md: "14rem", lg: "18rem"}}
                        h={{base: "12.5rem", md: "14rem", lg: "18rem"}}>
                            <Icon className="petOwnerIcon" w="3rem" h="3rem" margin="0.5rem"><MdOutlinePets /></Icon>
                            <Text className="desc" margin="0.5rem" fontSize={{ base: '0.7rem', md: '0.75rem', lg: '0.9rem' }}>
                                This is pet owner account description. Write something nice.
                            </Text>
                            <PetOwnerSignUpModalButton />
                        </Box>
                        <Box className="selectBox"
                        w={{base: "15rem", md: "14rem", lg: "18rem"}}
                        h={{base: "12.5rem", md: "14rem", lg: "18rem"}}>
                            <Icon className="doctorIcon" w="3rem" h="3rem" margin="0.5rem"><FaUserDoctor /></Icon>
                            <Text className="desc" margin="0.5rem" fontSize={{ base: '0.7rem', md: '0.75rem', lg: '0.9rem' }}>
                                This is doctor account description. Write something nice.
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