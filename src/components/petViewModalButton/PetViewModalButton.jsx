import React, { useEffect, useState } from 'react';
import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
  } from "../ui/dialog";
import { Text } from '@chakra-ui/react';
import { Field } from "../ui/field";
import { Button } from "../ui/button";


const PetViewModalButton = ({petID}) => {

    const [pet, setPet] = useState('');

    useEffect(() => {

        const petUrl = `http://localhost:8080/pet/${petID}`;

        fetch(petUrl, {
            method: 'GET',
            credentials: 'include'
          })
          .then(response => {
              if (response.ok) {
                  return response.json();
              } else {
                  console.error('Cannot find pet 1');
                  throw new Error('Failed to fetch pet');
              }
          })
          .then(parsedPet => {
              setPet(parsedPet);
              console.log('- Pet Successfully Loaded -');
              console.log("Pet:", parsedPet);
          })
          .catch(error => console.error('Cannot find pet 2', error));
    }, []);

    return (
        <DialogRoot minH='1000px'>
            <DialogTrigger>
                <Button margin="0.5rem" fontSize={{ base: '0.75rem', md: '0.75rem', lg: '0.9rem' }} fontFamily='LINESeedKR-Bd'>
                상세 정보
                </Button>
            </DialogTrigger>
            <DialogContent marginLeft='0.5rem' marginRight='0.5rem'>
                <DialogHeader>
                    <DialogTitle fontFamily='LINESeedKR-Bd'>반려동물 상세 정보</DialogTitle>
                </DialogHeader>
                <DialogCloseTrigger />
                <DialogBody pb={6}>
                    <Field>
                        <Text fontFamily='LINESeedKR-Bd'>이름</Text>
                        <Text fontFamily='Pretendard Variable'>{pet.name}</Text>
                    </Field>
                    <Field mt={4}>
                        <Text fontFamily='LINESeedKR-Bd'>나이</Text>
                        <Text fontFamily='Pretendard Variable'>{pet.age}</Text>
                    </Field>
                    <Field mt={4}>
                        <Text fontFamily='LINESeedKR-Bd'>성별</Text>
                        <Text fontFamily='Pretendard Variable'>{pet.gender}</Text>
                    </Field>
                    <Field mt={4}>
                        <Text fontFamily='LINESeedKR-Bd'>종</Text>
                        <Text fontFamily='Pretendard Variable'>{pet.species}</Text>
                    </Field>
                    <Field mt={4}>
                        <Text fontFamily='LINESeedKR-Bd'>무게</Text>
                        <Text fontFamily='Pretendard Variable'>{pet.weight}</Text>
                    </Field>
                    <Field mt={4}>
                        <Text fontFamily='LINESeedKR-Bd'>설명</Text>
                        <Text fontFamily='Pretendard Variable' wordBreak='break-word'>{pet.description}</Text>
                    </Field>
                </DialogBody>

                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button variant="outline" fontFamily='LINESeedKR-Bd'>닫기</Button>
                    </DialogActionTrigger>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    )
}

export default PetViewModalButton