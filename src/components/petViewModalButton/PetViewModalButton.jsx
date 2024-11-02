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
                <Button margin="0.5rem" fontSize={{ base: '0.75rem', md: '0.75rem', lg: '0.9rem' }}>
                View
                </Button>
            </DialogTrigger>
            <DialogContent marginLeft='0.5rem' marginRight='0.5rem'>
                <DialogHeader>
                    <DialogTitle>PET NAME</DialogTitle>
                </DialogHeader>
                <DialogCloseTrigger />
                <DialogBody pb={6}>
                    <Field label="Pet name">
                        <Text>{pet.name}</Text>
                    </Field>
                    <Field label="Age" mt={4}>
                        <Text>{pet.age}</Text>
                    </Field>
                    <Field label="Gender" mt={4}>
                        <Text>{pet.gender}</Text>
                    </Field>
                    <Field label="Species" mt={4}>
                        <Text>{pet.species}</Text>
                    </Field>
                    <Field label="Weight" mt={4}>
                        <Text>{pet.weight}</Text>
                    </Field>
                    <Field label="Description" mt={4}>
                        <Text>{pet.description}</Text>
                    </Field>
                </DialogBody>

                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button variant="outline">Close</Button>
                    </DialogActionTrigger>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    )
}

export default PetViewModalButton