import React, { Fragment, useEffect, useState } from 'react';
import '../Sidebar.scss';
import { Outlet } from "react-router-dom";
import { Show, Box, Center, Text, useBreakpointValue, HStack, VStack, Icon } from '@chakra-ui/react';
import { BiHome } from "react-icons/bi";
import { FaUsers } from "react-icons/fa6";
import { BiUserCircle } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { FaNotesMedical } from "react-icons/fa6";
import { Avatar } from "../../ui/avatar";
import SidebarCategory from '../../sidebarCategory/SidebarCategory';
import { FaUserDoctor } from "react-icons/fa6";
import { SERVER_URL } from '../../../utils/GlobalConstants';

const DoctorSidebar = () => {

  const isMdOrMore = useBreakpointValue({ base: false, md: true });
  const [username, setUsername] = useState('');
  const [userImageURL, setUserImageURL] = useState('');
  const [vetInfo, setVetInfo] = useState(null);

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (!user) {
      return;
    }
    
    const parsedUser = JSON.parse(user);

    setUsername(parsedUser.username);
    setUserImageURL(parsedUser.image_url);

    const fetchVetInfo = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/vet/animalHospital`, {
          method: 'GET',
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch diary pages');
        }

        const data = await response.json();
        setVetInfo(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchVetInfo();
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
              <Center width='100%' backgroundColor='teal.600'>
                <HStack>
                  <Icon w="18px" h="18px" color='white'>
                    <FaUserDoctor />
                  </Icon>
                  <Text mt='0.75rem' mb='0.5rem' fontWeight='bold' fontSize='18px' fontFamily='LINESeedKR-Bd' color='white'>{username}</Text>
                </HStack>
              </Center>
              <Center width='100%' backgroundColor='teal.700' borderBottomRadius='1rem'>
                {vetInfo != null ? <Text mt='0.75rem' mb='0.75rem' fontWeight='bold' fontSize='18px' fontFamily='LINESeedKR-Bd' color='white'>{vetInfo.hospitalName}</Text> 
                : null}
              </Center>
              <br />
              <SidebarCategory CategoryIcon={BiHome} categoryName='홈' categoryLink='/user/doctor'/>
              <SidebarCategory CategoryIcon={FaNotesMedical} categoryName='예약 확인' categoryLink='/user/doctor/appointments'/>
              <SidebarCategory CategoryIcon={FaUsers} categoryName='커뮤니티' categoryLink='/user/doctor/community'/>
              <SidebarCategory CategoryIcon={BiUserCircle} categoryName='프로필' categoryLink='/user/doctor/profile'/>
              <SidebarCategory CategoryIcon={BiCog} categoryName='설정' categoryLink='/user/doctor/settings'/>
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