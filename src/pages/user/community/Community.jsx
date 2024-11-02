import React from 'react';
import './Community.scss';
import { Outlet } from 'react-router-dom';
import { Card } from '@chakra-ui/react';

const Community = () => {
  return (
    <div className="community">
      <Card.Root w='96%' h='96%'>
        <Card.Body  justifyContent='center' alignItems='center'>
          <Outlet />
        </Card.Body>
      </Card.Root>
    </div>
  )
}

export default Community