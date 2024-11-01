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
import SidebarCategory from '../sidebarCategory/SidebarCategory';
import { FaNotesMedical } from "react-icons/fa6";
import { Button } from "../ui/button";
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
import { toaster } from '../ui/toaster';

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
    } else if (parsedUser.role === 'DOCTOR') {
      setUserType('doctor');
    } else if (parsedUser.role === 'ADMIN') {
      setUserType('admin');
    }

    setUsername(parsedUser.username);
    setUserImageURL(parsedUser.image_url);
    console.log("User Image URL:" + parsedUser.image_url);
  }, [navigate]);

  const petOwnerMenuData = [{
    title: 'Home', 
    icon: BiHome,
    linkTo: '/user/petowner'
  }, {
    title: 'Diagnosis', 
    icon: BiSearchAlt2,
    linkTo: '/user/petowner/diagnosis'
  }, {
    title: 'Records', 
    icon: BiSolidReport,
    linkTo: '/user/petowner/records'
  }, {
    title: 'Hospital', 
    icon: FaRegHospital,
    linkTo: '/user/petowner/hospital'
  }, {
    title: 'Community', 
    icon: FaUsers,
    linkTo: '/user/petowner/community'
  }, {
    title: 'Profile', 
    icon: BiUserCircle,
    linkTo: '/user/petowner/profile'
  }, {
    title: 'Settings', 
    icon: BiCog,
    linkTo: '/user/petowner/settings'
  }];

  const doctorMenuData = [{
    title: 'Home', 
    icon: BiHome, 
    linkTo: '/user/doctor'
  }, {
    title: 'Appointments', 
    icon: FaNotesMedical, 
    linkTo: '/user/doctor/appointments'
  }, {
    title: 'Community', 
    icon: FaUsers, 
    linkTo: '/user/doctor/community'
  }, {
    title: 'Profile', 
    icon: BiUserCircle, 
    linkTo: '/user/doctor/profile'
  }, {
    title: 'Settings', 
    icon: BiCog, 
    linkTo: '/user/doctor/settings'
  }];

  const adminMenuData = [{
    title: 'Home', 
    icon: BiHome, 
    linkTo: '/user/admin'
  }, {
    title: 'Community', 
    icon: FaUsers, 
    linkTo: '/user/admin/community'
  }, {
    title: 'Profile', 
    icon: BiUserCircle, 
    linkTo: '/user/admin/profile'
  }, {
    title: 'Settings', 
    icon: BiCog, 
    linkTo: '/user/admin/settings'
  }];

  const userLink = userType === 'petOwner' ? '/user/petowner' :
                   userType === 'doctor' ? '/user/doctor' :
                   userType === 'admin' ? '/user/admin' : '/';

  const menuItems = userType === 'petOwner' ? petOwnerMenuData :
                    userType === 'doctor' ? doctorMenuData :
                    userType === 'admin' ? adminMenuData : [];

  const handleSignOut = () => {
    sessionStorage.removeItem('user');
    navigate('/');
    toaster.create({
      title: "Successfully logged out.",
      status: "success",
      duration: 3000,
      isClosable: true
  });
  };

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
                      <Text mt='0.5rem' fontSize='18px' fontWeight='600'>{username}</Text>
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
                    <Button className="signOutButton" colorScheme='gray' variant='solid' onClick={handleSignOut}>Sign out</Button>
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
                <div className="abtPetspital">
                  About
                </div>
              </Link>
            </div>
            <div className="item">
              <Link to="/notifications" style={{ textDecoration: "none" }}>
                <div className="notification">
                  Notification
                </div>
              </Link>
            </div>
            <div className="item">
              <Button className="signOutButton" colorScheme='gray' variant='solid' onClick={handleSignOut}>Sign out</Button>
            </div>
          </div>
        </Box>
      </div>

      <Outlet />
    </Fragment>
  );
}

export default UserNavbar