import React, { useState, useEffect } from 'react';
import './Pets.scss';
import { Card, Show, Box, Center, Text, useBreakpointValue } from '@chakra-ui/react';
import PetRegisterModalButton from '../../../components/petRegisterModalButton/PetRegisterModalButton';
import PetViewModalButton from '../../../components/petViewModalButton/PetViewModalButton';
import PetDiariesModalButton from '../../../components/petDiariesModalButton/PetDiariesModalButton';
import PetDeleteModalButton from '../../../components/petDeleteModalButton/PetDeleteModalButton';
import PetEditModalButton from '../../../components/petEditModalButton/PetEditModalButton';

const Pets = () => {
    
    const [pets, setPets] = useState([]);

    useEffect(() => {

        fetch("http://localhost:8080/user/pet", {
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
        <div className="pets">
            <Box w='100%' h='100%' p={3}>
                <Card.Root className="card" w='100%' h='100%'
                data-state="open" 
                _open={{ 
                    animationName: "fade-in, slide-from-top",
                    animationDuration: "300ms",
                    animationTimingFunction: "ease-out"
                }}>
                    <Card.Body>
                        <Text>- PETS -</Text>
                        <Text className="petList">
                            {pets.map(pet => (
                                <div key={pet.id} className="petItem">
                                    <Text>Pet ID: {pet.id}</Text>
                                    <Text>Name: {pet.name}</Text>
                                    <Text>Age: {pet.age}</Text>
                                    <Text>Gender: {pet.gender}</Text>
                                    <Text>Species: {pet.species}</Text>
                                    <Text>Weight: {pet.weight}</Text>
                                    <Text>Description: {pet.description}</Text>
                                    <img 
                                        src={pet.image_url} 
                                        alt={pet.name} 
                                        className="petImage"
                                    />
                                    <PetViewModalButton petID={pet.id}/>
                                    <PetDiariesModalButton petID={pet.id} petName={pet.name} />
                                    <PetEditModalButton 
                                    petID={pet.id} 
                                    petName={pet.name} 
                                    age={pet.age} 
                                    gender={pet.gender} 
                                    species={pet.species} 
                                    weight={pet.weight} 
                                    description={pet.description}
                                    />
                                    <PetDeleteModalButton petID={pet.id} />
                                </div>
                            ))}
                        </Text>
                        <PetRegisterModalButton />
                    </Card.Body>
                </Card.Root>
            </Box>
        </div>
    )
}

export default Pets