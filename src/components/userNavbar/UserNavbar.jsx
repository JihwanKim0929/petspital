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

const UserNavbar = () => {

  const [username, setUsername] = useState('');
  const [userImageURL, setUserImageURL] = useState('');
  const [userType, setUserType] = useState('');
  const isBelowMd = useBreakpointValue({ base: true, md: false });
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (!user) {
      navigate('/login');
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
    setUserImageURL(parsedUser.image_url);
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

  const userLink = userType === 'petOwner' ? '/user/petowner' :
                   userType === 'vet' ? '/user/doctor' :
                   userType === 'admin' ? '/user/admin' : '/';

  const menuItems = userType === 'petOwner' ? petOwnerMenuData :
                    userType === 'vet' ? doctorMenuData :
                    userType === 'admin' ? adminMenuData : [];

  return (
    <Fragment>
      <div className="userNavbar">
        <Show when={isBelowMd}>
          <div className="mobileItems">
            <div className="item">
              <DrawerRoot placement='start'>
                <DrawerTrigger asChild>
                  <IconButton colorScheme='black' variant='ghost' className="mobileMenuButton">
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
                    <SignOutButton className="signOutButton" colorScheme='gray' variant='solid' fontFamily='Pretendard Variable' fontWeight='600'>로그아웃</SignOutButton>
                  </DrawerFooter>
                </DrawerContent>
              </DrawerRoot>
            </div>
          </div>
        </Show>

        <Show when={isBelowMd}>
          <Link to="/" style={{ textDecoration: "none" }} className="mobileLogoContainer">
            <img src={process.env.PUBLIC_URL + "/assets/images/logo1.png"} alt="LOGO" className="logo" />
            <span className="logoTitle">Petspital</span>
          </Link>
        </Show>

        <Show when={isBelowMd}><div /></Show>

        <Box hideBelow='md'>
          <Link to={userLink}
          style={{ textDecoration: "none" }} className="desktopLogoContainer">
            <img src={process.env.PUBLIC_URL + "/assets/images/logo1.png"} alt="LOGO" className="logo" />
            <span className="logoTitle">Petspital</span>
          </Link>
        </Box>

        <Box hideBelow='md'>
          <div className="desktopItems">
            <div className="item">
              <Link to="/about" style={{ textDecoration: "none" }}>
                <div className="abtPetspital" fontFamily='Pretendard Variable' fontWeight='600'>
                  About
                </div>
              </Link>
            </div>
            <div className="item">
              <SignOutButton className="signOutButton" colorScheme='gray' variant='solid' fontFamily='Pretendard Variable' fontWeight='600'>로그아웃</SignOutButton>
            </div>
          </div>
        </Box>
      </div>

      <Outlet />
    </Fragment>
  );
}

export default UserNavbar