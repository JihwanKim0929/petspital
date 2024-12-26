import React, { Fragment, useState, useEffect } from 'react';
import './Navbar.scss';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Show, Box, IconButton, useBreakpointValue, Text } from "@chakra-ui/react";
import { IoMenu } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { MenuContent, MenuItem, MenuRoot, MenuSeparator, MenuTrigger } from "../ui/menu";
import { Button } from '../ui/button';
import SignOutButton from '../signOutButton/SignOutButton';
import { LOGO_URL, SERVER_URL } from '../../utils/GlobalConstants';

const Navbar = () => {

  const isBelowMd = useBreakpointValue({ base: true, md: false });
  const [userType, setUserType] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/user`, {
        method: 'GET',
        credentials: "include"
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
  
      const text = await response.text();
      if (text) {
        const user = JSON.parse(text);
        const userJsonStr = JSON.stringify(user);
        sessionStorage.setItem('user', userJsonStr);
        setIsLoggedIn(true);
        if (user.role === 'PETOWNER') {
          setUserType('petOwner');
        } else if (user.role === 'VET') {
          setUserType('vet');
        } else if (user.role === 'ADMIN') {
          setUserType('admin');
        }
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setIsLoggedIn(false);
    }
  }

  const handleSignOut = async () => {
    try 
      {
      const response = await fetch(`${SERVER_URL}/logout`, {
          method: 'GET',
          credentials: 'include'
      });
  
      if (!response.ok) {
          throw new Error('Failed to log out');
      }
  
      sessionStorage.removeItem('user');
      navigate('/');
      
    } catch (error) {
        console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [navigate]);

  const userLink = userType === 'petOwner' ? '/user/petowner' :
                   userType === 'vet' ? '/user/doctor' :
                   userType === 'admin' ? '/user/admin' : '/';

  return (
    <Fragment>
      <div className="navbar">
        <Link to={userLink} style={{ textDecoration: "none" }} className="logoContainer">
          <img src={LOGO_URL} alt="LOGO" className="logo" />
          <span className="logoTitle">Petspital</span>
        </Link>

        <Box hideBelow='md'>
          <div className="desktopItems">
            <div className="item">
              <Link to="/about" style={{ textDecoration: "none" }}>
                <Text className="abtPetspital" fontFamily='Pretendard Variable' fontWeight='600'>
                  About
                </Text>
              </Link>
            </div>
            { isLoggedIn && 
            (<div className="item">
              <SignOutButton className="signOutButton" colorPalette='teal' variant='solid' fontFamily='Pretendard Variable' fontWeight='600'>로그아웃</SignOutButton>
            </div>)}
            { !isLoggedIn && 
            (<div className="item">
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  <Button className="signInButton" colorPalette='teal' variant="subtle" fontFamily='Pretendard Variable' fontWeight='600'>회원가입</Button>
                </Link>
            </div>)}
            { !isLoggedIn && 
            (<div className="item">
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Button className="signUpButton" colorPalette='teal' variant='solid' fontFamily='Pretendard Variable' fontWeight='600'>로그인</Button>
                </Link>
            </div>)}
          </div>
        </Box>

        <Show when={isBelowMd}>
          <div className="mobileItems">
            {
              isLoggedIn ?
              <div className="item">
                <SignOutButton className="signOutButton"  colorPalette='teal' variant='solid' fontFamily='Pretendard Variable' fontWeight='600'>로그아웃</SignOutButton>
              </div> :
              <div className="item">
                <Link to="/login" style={{ textDecoration: "none" }} className="signIn">
                  <Button className="signUpButton"  colorPalette='teal' variant='solid' fontFamily='Pretendard Variable' fontWeight='600'>로그인</Button>
                </Link>
              </div>
            }
            <div className="item">
              <MenuRoot>
                <MenuTrigger asChild>
                  <IconButton colorScheme='black' variant='ghost' className="mobileMenuButton">
                    <IoMenu />
                  </IconButton>
                </MenuTrigger>
                <MenuContent>
                  <Link to="/about" style={{ textDecoration: "none" }}>
                    <MenuItem p={3} paddingRight={6} value='about'>
                      <IoIosArrowForward /> About
                    </MenuItem>
                  </Link>
                    { !isLoggedIn && (
                    <div>
                      <MenuSeparator />
                      <MenuItem alignItems='center' justifyContent='center' p={3} value='signUp'>
                        <Link to="/signup" style={{ textDecoration: "none" }} className="signUp">
                          <Button className="signUpButton" colorPalette='teal' variant="subtle" fontFamily='Pretendard Variable' fontWeight='600'>회원가입</Button>
                        </Link>
                      </MenuItem>
                    </div>)}
                </MenuContent>
              </MenuRoot>
            </div>
          </div>
        </Show>
      </div>
      <Outlet />
    </Fragment>
  );
}

export default Navbar