import React, { Fragment, useEffect, useState } from 'react';
import '../Sidebar.scss';
import { Outlet } from "react-router-dom";
import { Show, Box, Center, Text, useBreakpointValue } from '@chakra-ui/react';
import { BiHome } from "react-icons/bi";
import { FaUsers } from "react-icons/fa6";
import { BiUserCircle } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { FaNotesMedical } from "react-icons/fa6";
import { Avatar } from "../../ui/avatar";
import SidebarCategory from '../../sidebarCategory/SidebarCategory';

const DoctorSidebar = () => {

  const isMdOrMore = useBreakpointValue({ base: false, md: true });
  const [username, setUsername] = useState('');
  const [userImageURL, setUserImageURL] = useState('');

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (!user) {
      return;
    }
    
    const parsedUser = JSON.parse(user);

    setUsername(parsedUser.username);
    setUserImageURL(parsedUser.image_url);
    console.log("User Image URL:" + parsedUser.image_url);
  }, []);

  return (
    <Fragment>
      <div className="body">
        <Show when={isMdOrMore}>
          <Box className="sidebar" hideBelow='md'>
            <ul className="sidebarComponents">
              <Center flexDirection='column' borderBottom="1.5px solid lightgray" marginLeft='0.75rem' marginRight='0.75rem' marginTop='1rem'>
                <Avatar name={username} src={userImageURL} w='125px' h='125px' />
                <Text mt='0.5rem' mb='0.5rem' fontWeight='bold' fontSize='18px'>{username}</Text>
              </Center>
              <br />
              <SidebarCategory CategoryIcon={BiHome} categoryName='Home' categoryLink='/user/doctor'/>
              <SidebarCategory CategoryIcon={FaNotesMedical} categoryName='Appointments' categoryLink='/user/doctor/appointments'/>
              <SidebarCategory CategoryIcon={FaUsers} categoryName='Community' categoryLink='/user/doctor/community'/>
              <SidebarCategory CategoryIcon={BiUserCircle} categoryName='Profile' categoryLink='/user/doctor/profile'/>
              <SidebarCategory CategoryIcon={BiCog} categoryName='Settings' categoryLink='/user/doctor/settings'/>
            </ul>
          </Box>
        </Show>

        <div className="background">
          <Outlet />
        </div>
      </div>
    </Fragment>
  );
}

export default DoctorSidebar