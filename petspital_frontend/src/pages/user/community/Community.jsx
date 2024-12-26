import React from 'react';
import './Community.scss';
import { Outlet } from 'react-router-dom';
import { Card, Box, Text } from '@chakra-ui/react';

const Community = () => {
  return (
    <div className="community">
      <Box w='100%' h='100%' p={3}>
        <Card.Root w='100%' h='100%' overflow='auto' 
        data-state="open" 
        _open={{ 
            animationName: "fade-in, slide-from-top",
            animationDuration: "300ms",
            animationTimingFunction: "ease-out"
        }}>
          <Card.Header>
            <Text fontFamily='LINESeedKR-Bd'>커뮤니티</Text>
          </Card.Header>
          <Card.Body justifyContent='center' alignItems='center'
          data-state="open" 
          _open={{ 
              animationName: "fade-in, slide-from-top",
              animationDuration: "300ms",
              animationTimingFunction: "ease-out"
          }}>
            <Outlet />
          </Card.Body>
        </Card.Root>
      </Box>
    </div>
  )
}

export default Community