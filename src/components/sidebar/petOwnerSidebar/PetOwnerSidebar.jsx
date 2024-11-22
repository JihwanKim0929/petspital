import React, { Fragment, useEffect, useState } from 'react';
import '../Sidebar.scss';
import { Outlet } from "react-router-dom";
import { Show, Box, Center, Text, useBreakpointValue } from '@chakra-ui/react';
import { BiHome } from "react-icons/bi";
import { BiSearchAlt2 } from "react-icons/bi";
import { BiSolidReport } from "react-icons/bi";
import { FaRegHospital } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import { BiUserCircle } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { MdOutlinePets } from "react-icons/md";
import SidebarCategory from '../../sidebarCategory/SidebarCategory';
import { Avatar } from "../../ui/avatar";

const PetOwnerSidebar = () => {

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
  }, []);

  return (
    <Fragment>
      <div className="body">
        <Show when={isMdOrMore}>
          <Box className="sidebar" hideBelow='md'>
            <ul className="sidebarComponents">
              <Center flexDirection='column' backgroundColor='gray.100' pt='1rem' pb='1rem'>
                <Avatar name={username} src={userImageURL} w='150px' h='150px' borderColor='white' borderWidth='0.25rem' />
              </Center>
              <Center width='100%' display='flex' backgroundColor='teal.600' borderBottomRadius='1rem'>
                  <Text mt='0.75rem' mb='0.5rem' fontWeight='bold' fontSize='18px' fontFamily='LINESeedKR-Bd' color='white'>{username}</Text>
              </Center>
              <br />
              <SidebarCategory CategoryIcon={BiHome} categoryName='홈' categoryLink='/user/petowner'/>
              <SidebarCategory CategoryIcon={MdOutlinePets} categoryName='반려동물' categoryLink='/user/petowner/pets'/>
              <SidebarCategory CategoryIcon={BiSearchAlt2} categoryName='진단하기' categoryLink='/user/petowner/diagnosis'/>
              <SidebarCategory CategoryIcon={BiSolidReport} categoryName='진단 기록' categoryLink='/user/petowner/records'/>
              <SidebarCategory CategoryIcon={FaRegHospital} categoryName='병원 예약' categoryLink='/user/petowner/hospital'/>
              <SidebarCategory CategoryIcon={FaRegHospital} categoryName='예약 확인' categoryLink='/user/petowner/appointments'/>
              <SidebarCategory CategoryIcon={FaUsers} categoryName='커뮤니티' categoryLink='/user/petowner/community'/>
              <SidebarCategory CategoryIcon={BiUserCircle} categoryName='프로필' categoryLink='/user/petowner/profile'/>
              <SidebarCategory CategoryIcon={BiCog} categoryName='설정' categoryLink='/user/petowner/settings'/>
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

export default PetOwnerSidebar