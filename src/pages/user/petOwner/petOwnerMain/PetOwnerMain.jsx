import React from 'react';
import './PetOwnerMain.scss';
import { Card, Text } from '@chakra-ui/react';
import Dashboard from '../../../../components/dashboard/Dashboard';

const PetOwnerMain = () => {

  return (
    <div className="petOwnerMain">
      <Dashboard>
        <Card.Root height="250px">
          <Card.Body>
            <Text>[Widget]</Text>
          </Card.Body>
        </Card.Root>
        <Card.Root height="250px">
          <Card.Body>
            <Text>[Widget]</Text>
          </Card.Body>
        </Card.Root>
        <Card.Root height="250px">
          <Card.Body>
            <Text>[Widget]</Text>
          </Card.Body>
        </Card.Root>
        <Card.Root height="250px">
          <Card.Body>
            <Text>[Widget]</Text>
          </Card.Body>
        </Card.Root>
      </Dashboard>
    </div>
  )
}

export default PetOwnerMain