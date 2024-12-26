import React, { Fragment, useState, useEffect } from 'react';
import './UserNavbar.scss';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Show, IconButton, Text, Box, useBreakpointValue } from "@chakra-ui/react";
import { IoMenu } from "react-icons/io5";
import { BiHome } from "react-icons/bi";
import { BiSearchAlt2 } from "react-icons/bi";
import { BiSolidReport } from "react-icons/bi";
import { FaRegHospital } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import { BiUserCircle } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { MdOutlinePets } from "react-icons/md";
import SidebarCategory from '../sidebarCategory/SidebarCategory';
import { FaNotesMedical } from "react-icons/fa6";
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTrigger,
} from "../ui/drawer";
import { Avatar } from "../ui/avatar";
import SignOutButton from '../signOutButton/SignOutButton';
import { SERVER_URL, LOGO_URL } from '../../utils/GlobalConstants';

const UserNavbar = () => {

  const [username, setUsername] = useState('');
  const [userImageURL, setUserImageURL] = useState('');
  const [userType, setUserType] = useState('');
  const isBelowMd = useBreakpointValue({ base: true, md: false });
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/user`, {
        method: 'GET',
        credentials: "include"
      });
  
      if (!response.ok) {
        const userSessionData = sessionStorage.getItem('user');
        if (userSessionData) {
          sessionStorage.removeItem('user');
          handleSignOut();
        }
        return;
      }
  
      const text = await response.text();
      if (!text) {
        throw new Error('Empty response body');
      }
  
      const user = JSON.parse(text);
      sessionStorage.setItem('user', JSON.stringify(user));
  
      if (user) {
        setUserType(user.role);
        setUsername(user.username);
        setUserImageURL(user.image_url);
      } else {
        const userSessionData = sessionStorage.getItem('user');
        if (userSessionData) {
          sessionStorage.removeItem('user');
          handleSignOut();
        }
        navigate('/login');
        return;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      const userSessionData = sessionStorage.getItem('user');
      if (userSessionData) {
        sessionStorage.removeItem('user');
        handleSignOut();
      }
      navigate('/login');
    }
  };

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
  
  const petOwnerMenuData = [{
    title: '홈', 
    icon: BiHome,
    linkTo: '/user/petowner'
  }, {
    title: '반려동물', 
    icon: MdOutlinePets,
    linkTo: '/user/petowner/pets'
  }, {
    title: '진단하기', 
    icon: BiSearchAlt2,
    linkTo: '/user/petowner/diagnosis'
  }, {
    title: '진단 기록', 
    icon: BiSolidReport,
    linkTo: '/user/petowner/records'
  }, {
    title: '병원 예약', 
    icon: FaRegHospital,
    linkTo: '/user/petowner/hospital'
  }, {
    title: '예약 확인', 
    icon: FaRegHospital,
    linkTo: '/user/petowner/appointments'
  }, {
    title: '커뮤니티', 
    icon: FaUsers,
    linkTo: '/user/petowner/community'
  }, {
    title: '프로필', 
    icon: BiUserCircle,
    linkTo: '/user/petowner/profile'
  }, {
    title: '설정', 
    icon: BiCog,
    linkTo: '/user/petowner/settings'
  }];

  const doctorMenuData = [{
    title: '홈', 
    icon: BiHome, 
    linkTo: '/user/doctor'
  }, {
    title: '예약 확인', 
    icon: FaNotesMedical, 
    linkTo: '/user/doctor/appointments'
  }, {
    title: '커뮤니티', 
    icon: FaUsers, 
    linkTo: '/user/doctor/community'
  }, {
    title: '프로필', 
    icon: BiUserCircle, 
    linkTo: '/user/doctor/profile'
  }, {
    title: '설정', 
    icon: BiCog, 
    linkTo: '/user/doctor/settings'
  }];

  const adminMenuData = [{
    title: '홈', 
    icon: BiHome, 
    linkTo: '/user/admin'
  }, {
    title: '커뮤니티', 
    icon: FaUsers, 
    linkTo: '/user/admin/community'
  }, {
    title: '프로필', 
    icon: BiUserCircle, 
    linkTo: '/user/admin/profile'
  }, {
    title: '설정', 
    icon: BiCog, 
    linkTo: '/user/admin/settings'
  }];

  const userLink = userType === 'PETOWNER' ? '/user/petowner' :
                   userType === 'VET' ? '/user/doctor' :
                   userType === 'ADMIN' ? '/user/admin' : '/';

  const menuItems = userType === 'PETOWNER' ? petOwnerMenuData :
                    userType === 'VET' ? doctorMenuData :
                    userType === 'ADMIN' ? adminMenuData : [];

  return (
    <Fragment>
      <div className="userNavbar">
        <Show when={isBelowMd}>
          <div className="mobileItems">
            <div className="item">
              <DrawerRoot placement='start'>
                <DrawerTrigger asChild>
                  <IconButton colorPalette='teal' variant='ghost' className="mobileMenuButton">
                    <IoMenu />
                  </IconButton>
                </DrawerTrigger>
                <DrawerBackdrop />
                <DrawerContent borderTopRightRadius='0.5rem' borderBottomRightRadius='0.5rem'>
                  <DrawerCloseTrigger />
                  <DrawerHeader borderBottomWidth='1px'>
                    <Box h="60px" display='flex' alignItems='center'>
                      <Avatar name={username} src={userImageURL} w="60px" h="60px" mt="0.5rem" mr="1rem"/>
                      <Text mt='0.5rem' fontSize='18px' fontWeight='600' fontFamily='LINESeedKR-Bd'>{username}</Text>
                    </Box>
                  </DrawerHeader>
                  <DrawerBody>
                    <ul style={{listStyle: 'none'}}>
                      {menuItems.map((item, index) => (
                        <DrawerActionTrigger asChild>
                          <div>
                            <SidebarCategory key={index} CategoryIcon={item.icon} categoryName={item.title} categoryLink={item.linkTo} />
                          </div>
                        </DrawerActionTrigger>
                      ))}
                    </ul>
                  </DrawerBody>
                  <DrawerFooter>
                    <SignOutButton className="signOutButton" colorPalette='teal' variant='solid' fontFamily='Pretendard Variable' fontWeight='600'>로그아웃</SignOutButton>
                  </DrawerFooter>
                </DrawerContent>
              </DrawerRoot>
            </div>
          </div>
        </Show>

        <Show when={isBelowMd}>
          <Link to="/" style={{ textDecoration: "none" }} className="mobileLogoContainer">
            <img src={LOGO_URL} alt="LOGO" className="logo" />
            <span className="logoTitle">Petspital</span>
          </Link>
        </Show>

        <Show when={isBelowMd}><div /></Show>

        <Box hideBelow='md'>
          <Link to={userLink}
          style={{ textDecoration: "none" }} className="desktopLogoContainer">
            <img src={LOGO_URL} alt="LOGO" className="logo" />
            <span className="logoTitle">Petspital</span>
          </Link>
        </Box>

        <Box hideBelow='md'>
          <div className="desktopItems">
            <div className="item">
              <Link to="/about" style={{ textDecoration: "none" }}>
                <Text className="abtPetspital" fontFamily='Pretendard Variable' fontWeight='600'>
                  About
                </Text>
              </Link>
            </div>
            <div className="item">
              <SignOutButton className="signOutButton" colorPalette='teal' variant='solid' fontFamily='Pretendard Variable' fontWeight='600'>
                로그아웃
              </SignOutButton>
            </div>
          </div>
        </Box>
      </div>

      <Outlet />
    </Fragment>
  );
}

export default UserNavbar