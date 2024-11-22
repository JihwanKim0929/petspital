import React, { useEffect } from 'react';
import './Home.scss';
import { Link, useNavigate } from "react-router-dom";
import { Box, Text, Button } from "@chakra-ui/react";

const Home = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
        navigate('/user/petowner');
    }
  }, [navigate]);

  return (
    <div className="home">
      <Box className="homeContainer" data-state="open" 
      _open={{ 
        animationName: "fade-in, slide-from-top",
        animationDuration: "300ms",
        animationTimingFunction: "ease-out"
      }}>
        <Text className="title" fontSize={{ base: '56px', md: '76px', lg: '100px' }}>Petspital</Text>
        <Text className="desc" fontSize={{ base: '16px', md: '20px', lg: '24px' }}>반려동물의 눈과 피부, AI를 통해 체크해보세요.</Text>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button colorPalette='gray' variant='solid' marginBottom='10px' fontFamily='LINESeedKR-Bd'
            h={{ base: '50px', md: '53px', lg: '55px' }}
            w={{ base: '200px', md: '225px', lg: '250px' }}
            fontSize={{ base: '16px', md: '18px', lg: '20px' }}>
            Petspital 로그인
          </Button>
        </Link>
        <Box className="signUpContainer">
          <Text className="signUpDesc" fontSize={{ base: '16px', md: '20px', lg: '24px' }} fontFamily='LINESeedKR-Bd'>계정이 필요하신가요?</Text>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <Text className="signUp" fontSize={{ base: '16px', md: '20px', lg: '24px' }} fontFamily='LINESeedKR-Bd'>회원가입하기</Text>
          </Link>
        </Box>
      </Box>
    </div>
  )
}

export default Home