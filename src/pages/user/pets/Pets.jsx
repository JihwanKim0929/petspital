import React, { useState, useEffect } from 'react';
import './Pets.scss';
import { Card, Show, Box, Text, useBreakpointValue } from '@chakra-ui/react';
import { EmptyState } from '../../../components/ui/empty-state';
import PetRegisterModalButton from '../../../components/petRegisterModalButton/PetRegisterModalButton';
import { MdOutlinePets } from "react-icons/md";
import PetInfoCard from '../../../components/petInfoCard/PetInfoCard';

const Pets = () => {
    
    const [pets, setPets] = useState([]);
    const hasPets = () => { return pets.length > 0; };

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
                <Card.Root className="card" w='100%' h='100%' overflow='auto'
                data-state="open" 
                _open={{ 
                    animationName: "fade-in, slide-from-top",
                    animationDuration: "300ms",
                    animationTimingFunction: "ease-out"
                }}>
                    <Card.Body>
                        <Show when={hasPets()}>
                            <Box>
                                <Text className="petList">
                                    {pets.map(pet => (
                                        <div key={pet.id} className="petItem">
                                            <PetInfoCard pet={pet} />
                                        </div>
                                    ))}
                                </Text>
                                <PetRegisterModalButton />
                            </Box>
                        </Show>
                        <Show when={!hasPets()}>
                            <Box w='100%' h='100%' display='flex' justifyContent='center' alignItems='center'>
                                <EmptyState 
                                title="등록되어 있는 반려동물이 없어요."
                                description="아래 버튼을 클릭해서 반려동물을 등록하세요." 
                                icon={<MdOutlinePets/>}
                                >
                                    <PetRegisterModalButton />
                                </EmptyState>
                            </Box>
                        </Show>
                    </Card.Body>
                </Card.Root>
            </Box>
        </div>
    )
}

export default Pets