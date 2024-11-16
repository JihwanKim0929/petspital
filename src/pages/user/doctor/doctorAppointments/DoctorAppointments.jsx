import React, { useEffect, useState } from 'react';
import './DoctorAppointments.scss';
import { Card, Show, Text, Box, Image, VStack } from '@chakra-ui/react';

const DoctorAppointments = () => {
  const hasPets = () => { return pets.length > 0; };
    const [pets, setPets] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/vet/pet", {
        method: 'GET',
        credentials: 'include'
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.error('Pets not found 1');
                throw new Error('Failed to fetch pets');
            }
        })
        .then(parsedPets => {
        setPets(parsedPets);
        console.log('- Pets Successfully Loaded -');
        console.log("Pets:", parsedPets);
        })
        .catch(error => console.error('Pets not found 2', error));
    }, []);

  return (
    <div className='doctorAppointments'>
      <Card.Root w='96%' h='96%'>
        <Card.Body>
          <Show when={hasPets()}>
          <VStack spacing={4} align="stretch">
            {pets.map(pet => (
              <Box key={pet.id} p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
                <Text fontWeight="bold">{pet.name}</Text>
                <Text>Age: {pet.age}</Text>
                <Text>Gender: {pet.gender}</Text>
                <Text>Species: {pet.species}</Text>
                <Text>Weight: {pet.weight}</Text>
                <Text>Description: {pet.description}</Text>
                <Image 
                    src={pet.image_url} 
                    alt={`Image of ${pet.name}`} 
                    boxSize="100px" 
                    objectFit="cover" 
                />
              </Box>
              ))}
            </VStack>
          </Show>
          <Show when={!hasPets()}>
            <Text>There is no pet.</Text>
          </Show>
        </Card.Body>
      </Card.Root>
    </div>
  )
}

export default DoctorAppointments