import React, { useState, useEffect } from 'react';
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Text, Button, Input } from "@chakra-ui/react";
import { PasswordInput } from '../../components/ui/password-input';
import { toaster } from "../../components/ui/toaster";
import { SERVER_URL } from '../../utils/GlobalConstants';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const user = sessionStorage.getItem('user');
        
        if (user) {
            const parsedUser = JSON.parse(user);
            if (parsedUser.role === 'PETOWNER') {
                navigate('/user/petowner');
            } else if (parsedUser.role === 'DOCTOR') {
                navigate('/user/doctor');
            } else if (parsedUser.role === 'ADMIN') {
                navigate('/user/admin');
            }
        }
    }, [navigate]);

    const handleLogin = async () => {
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            const response = await fetch(`${SERVER_URL}/loginProc`, {
                method: 'POST',
                headers: {},
                body: formData,
                credentials: "include"
            });

            if (!response.ok) {
                const errorText = await response.text();
                toaster.create({
                    title: "로그인 실패",
                    description: "유효하지 않은 아이디 또는 패스워드입니다.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    
                });
                return;
            }

            const loginSuccess = await response.json();
            if(loginSuccess)
            {
                console.log("JSON to store: " + JSON.stringify(loginSuccess));

                const response2 = await fetch(`${SERVER_URL}/user`, {
                    method: 'GET',
                    credentials: "include"
                });

                if (!response2.ok) {
                    return;
                }

                const user = await response2.json();
                const userJsonStr = JSON.stringify(user);
                sessionStorage.setItem('user', userJsonStr);
                toaster.create({
                    title: "로그인 성공",
                    description: user.username + "님 환영합니다!",
                    status: "success",
                    duration: 3000,
                    isClosable: true
                });
                if (user.role === 'PETOWNER') {
                    navigate("/user/petowner")
                } else if (user.role === 'VET') {
                    navigate("/user/doctor")
                } else if (user.role === 'ADMIN') {
                    navigate("/user/admin")
                }
            } else {
                toaster.create({
                    title: "로그인 실패",
                    description: "유효하지 않은 아이디 또는 패스워드입니다.",
                    status: "error",
                    duration: 3000,
                    isClosable: true
                });
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            toaster.create({
                title: "에러 발생",
                description: "로그인 할 수 없었습니다. 나중에 시도해주세요.",
                status: "error",
                duration: 3000,
                isClosable: true
            });
        }
    };

    return (
        <div className="login">
            <div className="background">
                <Box className="loginContainer" w={{base: "19rem", md: "25rem", lg: "25rem"}} data-state="open" 
                _open={{ 
                    animationName: "fade-in, slide-from-top",
                    animationDuration: "300ms",
                    animationTimingFunction: "ease-out"
                }}>
                    <img src={process.env.PUBLIC_URL + "/assets/images/logo1.png"} alt="" className="logo" />
                    <Text fontSize={{ base: '1.5rem', md: '2rem', lg: '2rem' }} fontFamily='poppins' fontWeight='700' m='0.5rem'>Petspital</Text>
                    <div className="inputContainer">
                        <Text className="desc">아이디</Text>
                        <Input className='input' placeholder='아이디를 입력하세요.' onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="inputContainer">
                        <Text className="desc">패스워드</Text>
                        <PasswordInput className='input' placeholder='비밀번호를 입력하세요.' onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <Button className="loginButton" colorPalette='teal' variant='solid'
                    h={{ base: '50px', md: '53px', lg: '55px' }}
                    w={{ base: '200px', md: '225px', lg: '250px' }}
                    fontSize={{ base: '16px', md: '18px', lg: '20px' }}
                    fontFamily='LINESeedKR-Bd'
                    margin='4px'
                    onClick={handleLogin}>로그인</Button>
                    <div className="signUpContainer">
                        <Text fontSize={{ base: '0.9rem', md: '1.1rem', lg: '1.1rem' }} fontFamily='Pretendard Variable' fontWeight='400'>계정이 필요하신가요?</Text>
                        <Link to="/SignUp" style={{ textDecoration: "none" }} className="signUp">
                            <Text fontSize={{ base: '0.9rem', md: '1.1rem', lg: '1.1rem' }} fontFamily='Pretendard Variable' fontWeight='700'>계정 생성하기</Text>
                        </Link>
                    </div>
                </Box>
            </div>
        </div>
    );
}

export default Login
