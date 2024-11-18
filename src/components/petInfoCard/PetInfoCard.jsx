import React from 'react';
import { Card, Text, Image, Flex, VStack, Box, useBreakpointValue, Show } from '@chakra-ui/react';
import PetViewModalButton from '../petViewModalButton/PetViewModalButton';
import PetDiariesModalButton from '../petDiariesModalButton/PetDiariesModalButton';
import PetDeleteModalButton from '../petDeleteModalButton/PetDeleteModalButton';
import PetEditModalButton from '../petEditModalButton/PetEditModalButton';

const PetInfoCard = ({pet}) => {

    const isBelowMd = useBreakpointValue({ base: true, md: false });

    return (
    <Card.Root className="petCard" mt='1rem' mb='1rem'>
        <Card.Body>
            <Show when={!isBelowMd}>
                <Flex>
                    <Image 
                        src={pet.image_url} 
                        alt={pet.name} 
                        className="petImage"
                        w={{base:"100px", md:"200px"}} 
                        h={{base:"100px", md:"200px"}} 
                        mr="0.5rem"
                        mb="0.5rem"
                        borderRadius="1rem"
                    />
                    <Box w="100%" ml="1rem" overflow="auto">
                        <VStack align='left'>
                            <Flex>
                                <Text mr='0.5rem' fontFamily='Pretendard Variable' fontWeight='600' whiteSpace="nowrap">이름:</Text>
                                <Text fontFamily='Pretendard Variable' fontWeight='300'>{pet.name}</Text>
                            </Flex>
                            <Flex>
                                <Text mr='0.5rem' fontFamily='Pretendard Variable' fontWeight='600' whiteSpace="nowrap">나이:</Text>
                                <Text fontFamily='Pretendard Variable' fontWeight='300'>{pet.age}</Text>
                            </Flex>
                            <Flex>
                                <Text mr='0.5rem' fontFamily='Pretendard Variable' fontWeight='600' whiteSpace="nowrap">성별:</Text>
                                <Text fontFamily='Pretendard Variable' fontWeight='300'>{pet.gender}</Text>
                            </Flex>
                            <Flex>
                                <Text mr='0.5rem' fontFamily='Pretendard Variable' fontWeight='600' whiteSpace="nowrap">종:</Text>
                                <Text fontFamily='Pretendard Variable' fontWeight='300'>{pet.species}</Text>
                            </Flex>
                            <Flex>
                                <Text mr='0.5rem' fontFamily='Pretendard Variable' fontWeight='600' whiteSpace="nowrap">몸무게(kg):</Text>
                                <Text fontFamily='Pretendard Variable' fontWeight='300'>{pet.weight}</Text>
                            </Flex>
                            <Flex>
                                <Text mr='0.5rem' fontFamily='Pretendard Variable' fontWeight='600' whiteSpace="nowrap">설명:</Text>
                                <Text fontFamily='Pretendard Variable' fontWeight='300' wordBreak='break-word'>{pet.description}</Text>
                            </Flex>
                        </VStack>
                    </Box>
                </Flex>
                <Box mt={3}>
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
                </Box>
            </Show>
            <Show when={isBelowMd}>
                <VStack>
                    <Image 
                        src={pet.image_url} 
                        alt={pet.name} 
                        className="petImage"
                        w={{base:"100px", md:"200px"}} 
                        h={{base:"100px", md:"200px"}} 
                        mr="0.5rem"
                        mb="0.5rem"
                        borderRadius="1rem"
                    />
                    <Box w="100%" ml="1rem" overflow="auto">
                        <VStack align='left'>
                            <Flex>
                                <Text mr='0.5rem' fontFamily='Pretendard Variable' fontWeight='600' whiteSpace="nowrap">이름:</Text>
                                <Text fontFamily='Pretendard Variable' fontWeight='300'>{pet.name}</Text>
                            </Flex>
                            <Flex>
                                <Text mr='0.5rem' fontFamily='Pretendard Variable' fontWeight='600' whiteSpace="nowrap">나이:</Text>
                                <Text fontFamily='Pretendard Variable' fontWeight='300'>{pet.age}</Text>
                            </Flex>
                            <Flex>
                                <Text mr='0.5rem' fontFamily='Pretendard Variable' fontWeight='600' whiteSpace="nowrap">성별:</Text>
                                <Text fontFamily='Pretendard Variable' fontWeight='300'>{pet.gender}</Text>
                            </Flex>
                            <Flex>
                                <Text mr='0.5rem' fontFamily='Pretendard Variable' fontWeight='600' whiteSpace="nowrap">종:</Text>
                                <Text fontFamily='Pretendard Variable' fontWeight='300'>{pet.species}</Text>
                            </Flex>
                            <Flex>
                                <Text mr='0.5rem' fontFamily='Pretendard Variable' fontWeight='600' whiteSpace="nowrap">몸무게(kg):</Text>
                                <Text fontFamily='Pretendard Variable' fontWeight='300'>{pet.weight}</Text>
                            </Flex>
                            <Flex>
                                <Text mr='0.5rem' fontFamily='Pretendard Variable' fontWeight='600' whiteSpace="nowrap">설명:</Text>
                                <Text fontFamily='Pretendard Variable' fontWeight='300' wordBreak='break-word'>{pet.description}</Text>
                            </Flex>
                        </VStack>
                    </Box>
                </VStack>
                <Box mt={3}>
                    <VStack align='left'>
                        <Flex>
                            <PetViewModalButton petID={pet.id} />
                            <PetDiariesModalButton petID={pet.id} petName={pet.name} />
                        </Flex>
                        <Flex>
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
                    </VStack>
                    
                </Box>
            </Show>
        </Card.Body>
    </Card.Root>
  )
}

export default PetInfoCard