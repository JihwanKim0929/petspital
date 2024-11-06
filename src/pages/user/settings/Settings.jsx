import React from 'react';
import './Settings.scss';
import { Card } from '@chakra-ui/react';
import AccountDeleteModalButton from '../../../components/accountDeleteModalButton/AccountDeleteModalButton';

const Settings = () => {
  return (
    <div className='settings'>
      <Card.Root w='96%' h='96%'>
        <Card.Body>
          <AccountDeleteModalButton />
        </Card.Body>
      </Card.Root>
    </div>
  )
}

export default Settings