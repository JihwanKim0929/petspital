import React, { useState, useEffect } from 'react';
import './Profile.scss';
import { Card, Show, Box, Center, Text, useBreakpointValue } from '@chakra-ui/react';
import { Avatar } from '../../../components/ui/avatar';
import { Button } from '../../../components/ui/button';

const Profile = () => {

  const [username, setUsername] = useState('');
  const [userImageURL, setUserImageURL] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (!user) {
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
    setUserEmail(parsedUser.email);
    setUserPhoneNumber(parsedUser.phone_num);
    setUserAddress(parsedUser.address);
    setUserImageURL(`http://localhost:8080/image/user/${parsedUser.image_url}`);
  }, []);

  return (
    <div className="profile">
      <Card.Root className="card" w='96%' h='96%'>
        <Card.Body>
          <Box>
            <Avatar name={username} src={userImageURL} w='125px' h='125px' />
          </Box>
          <Box>
            <Text>Username: {username}</Text>
            <Text>Email: {userEmail}</Text>
            <Text>Tel: {userPhoneNumber}</Text>
            <Text>Address: {userAddress}</Text>
          </Box>
        </Card.Body>
      </Card.Root>
    </div>
  )
}

export default Profile