import React from 'react';
import './Settings.scss';
import { Card, Box } from '@chakra-ui/react';
import AccountDeleteModalButton from '../../../components/accountDeleteModalButton/AccountDeleteModalButton';

const Settings = () => {
  return (
    <div className='settings'>
      <Box w='100%' h='100%' p={3} overflow='auto'
      data-state="open" 
      _open={{ 
          animationName: "fade-in, slide-from-top",
          animationDuration: "300ms",
          animationTimingFunction: "ease-out"
      }}>
        <Card.Root w='100%' h='100%'>
          <Card.Body>
            <AccountDeleteModalButton />
          </Card.Body>
        </Card.Root>
      </Box>
    </div>
  )
}

export default Settings