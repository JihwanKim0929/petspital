import React from 'react';
import { Card, Text } from '@chakra-ui/react';

const HospitalSelectCard = ({ hospital, isSelected, onSelect }) => {
  return (
    <Card.Root
      onClick={onSelect}
      bg={isSelected ? 'gray.100' : 'white'}
      cursor="pointer"
      h='100px'
      w='100%'
    >
        <Card.Body>
            <Text fontWeight="bold" fontFamily='LINESeedKR-Bd'>{hospital.hospitalName}</Text>
            <Text fontFamily='Pretendard Variable'>{hospital.hospitalAddress}</Text>
        </Card.Body>
    </Card.Root>
  );
};

export default HospitalSelectCard;