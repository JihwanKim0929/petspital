import React from 'react';
import './DoctorMain.scss';
import { Card, Text } from '@chakra-ui/react';
import Dashboard from '../../../../components/dashboard/Dashboard';

const DoctorMain = () => {

  return (
    <div className="doctorMain">
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

export default DoctorMain