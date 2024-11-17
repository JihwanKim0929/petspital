import React from 'react';
import { Card, Text, Image, Flex, VStack, Box } from '@chakra-ui/react';
import PetViewModalButton from '../petViewModalButton/PetViewModalButton';
import PetDiariesModalButton from '../petDiariesModalButton/PetDiariesModalButton';
import PetDeleteModalButton from '../petDeleteModalButton/PetDeleteModalButton';
import PetEditModalButton from '../petEditModalButton/PetEditModalButton';

const PetInfoCard = ({pet}) => {
  return (
    <Card.Root className="petCard" w='100%' h='300px' mt='1rem' mb='1rem'>
        <Card.Body>
            <Flex w="100%">
                <Image 
                    src={pet.image_url} 
                    alt={pet.name} 
                    className="petImage"
                    w="200px" 
                    h="200px"
                    mr="0.5rem"
                    mb="0.5rem"
                    borderRadius="1rem"
                />
                <Box w="100%" ml="1rem">
                    <VStack h="200px" align='left'>
                        <Flex>
                            <Text mr='0.5rem' fontFamily='Pretendard Variable' fontWeight='600'>이름:</Text>
                            <Text fontFamily='Pretendard Variable' fontWeight='300'>{pet.name}</Text>
                        </Flex>
                        <Flex>
                            <Text mr='0.5rem' fontFamily='Pretendard Variable' fontWeight='600'>나이:</Text>
                            <Text fontFamily='Pretendard Variable' fontWeight='300'>{pet.age}</Text>
                        </Flex>
                        <Flex>
                            <Text mr='0.5rem' fontFamily='Pretendard Variable' fontWeight='600'>성별:</Text>
                            <Text fontFamily='Pretendard Variable' fontWeight='300'>{pet.gender}</Text>
                        </Flex>
                        <Flex>
                            <Text mr='0.5rem' fontFamily='Pretendard Variable' fontWeight='600'>종:</Text>
                            <Text fontFamily='Pretendard Variable' fontWeight='300'>{pet.species}</Text>
                        </Flex>
                        <Flex>
                            <Text mr='0.5rem' fontFamily='Pretendard Variable' fontWeight='600'>몸무게(kg):</Text>
                            <Text fontFamily='Pretendard Variable' fontWeight='300'>{pet.weight}</Text>
                        </Flex>
                        <Flex>
                            <Text mr='0.5rem' fontFamily='Pretendard Variable' fontWeight='600'>설명:</Text>
                            <Text fontFamily='Pretendard Variable' fontWeight='300'>{pet.description}</Text>
                        </Flex>
                    </VStack>
                </Box>
            </Flex>
            <Flex>
                <PetViewModalButton petID={pet.id} />
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
            </Flex>
        </Card.Body>
    </Card.Root>
  )
}

export default PetInfoCard