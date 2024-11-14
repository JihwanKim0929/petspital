import React from 'react';
import { useNavigate } from "react-router-dom";
import { Input } from "@chakra-ui/react";
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
 import { Field } from "../ui/field";
 import { Button } from "../ui/button";
 import { useForm } from 'react-hook-form';
 import {
  NativeSelectField,
  NativeSelectRoot,
} from "../ui/native-select"


const PetEditModalButton = ({petID, petName, age, gender, species, weight, description}) => {

    const { register, handleSubmit, errors, reset, setValue } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        const petDto = {
            name: data.petName,
            age: data.age,
            gender: data.gender,
            species: data.species,
            weight: data.weight,
            description: data.description
        };
        console.log(petDto);
        const url = `http://localhost:8080/updatePet/${petID}`;
        fetch(url,{
            method: 'POST',
            body: JSON.stringify(petDto),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        navigate(0);
    };

    const resetForm = () => {
        reset();
    };

    return  (
        <DialogRoot minH='1000px'>
            <DialogTrigger>
                <Button margin="0.5rem" fontSize={{ base: '0.75rem', md: '0.75rem', lg: '0.9rem' }}>
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent marginLeft='0.5rem' marginRight='0.5rem'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Edit pet</DialogTitle>
                    </DialogHeader>
                    <DialogCloseTrigger />
                    <DialogBody pb={6}>
                        <Field label="Pet name" required>
                            <Input placeholder="Enter your pet's name" defaultValue={petName} {...register('petName', { required: true })}/>
                        </Field>
                        <Field label="Age" required mt={4}>
                            <Input placeholder="Enter your pet's age" defaultValue={age} {...register('age', { required: true })}/>
                        </Field>
                        <Field label="Gender" required mt={4}>
                            <Input placeholder="Enter your pet's gender" defaultValue={gender} {...register('gender', { required: true })}/>
                        </Field>
                        <Field label="Species" required mt={4}>
                        <NativeSelectRoot>
                            <NativeSelectField placeholder="Select option" defaultValue={species} {...register('species', { required: true })}>
                                <option value="dog">Dog</option>
                                <option value="cat">Cat</option>
                            </NativeSelectField>
                        </NativeSelectRoot>
                        </Field>
                        <Field label="Weight" required mt={4}>
                            <Input placeholder="Enter your pet's weight" defaultValue={weight} {...register('weight', { required: true })}/>
                        </Field>
                        <Field label="Description" required mt={4}>
                            <Input placeholder="Enter your pet's description" defaultValue={description} {...register('description', { required: true })}/>
                        </Field>
                    </DialogBody>

                    <DialogFooter>
                        <Button type="submit">Edit</Button>
                        <DialogActionTrigger asChild>
                            <Button variant="outline" onClick={resetForm}>Cancel</Button>
                        </DialogActionTrigger>
                    </DialogFooter>
                </form>
            </DialogContent>
        </DialogRoot>
    );
};

export default PetEditModalButton