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
import {
    FileUploadList,
    FileUploadRoot,
    FileUploadTrigger,
 } from "../ui/file-button";
 import { Field } from "../ui/field";
 import { Button } from "../ui/button";
 import { useForm } from 'react-hook-form';
 import {
  NativeSelectField,
  NativeSelectRoot,
} from "../ui/native-select"


const PetRegisterModalButton = () => {

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
    const dataImage = data.image;
    const formData = new FormData();
    const json = JSON.stringify(petDto);
    const blob = new Blob([json],{type: "application/json"});
    formData.append("petDto",blob);
    if (dataImage) {
      formData.append("image", dataImage);
    }
    const url = "http://localhost:8080/user/pet";
    fetch(url,{
      method: 'POST',
      body: formData,
      headers: {},
      credentials: 'include'
    });
    reset();
    navigate(0);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setValue('image', file);
    console.log("Selected file:", file);
  };

  const resetForm = () => {
      reset();
  };

  return (
    <DialogRoot minH='1000px'>
      <DialogTrigger>
        <Button margin="0.5rem" fontSize={{ base: '0.75rem', md: '0.75rem', lg: '0.9rem' }}>
          Register your pet
        </Button>
      </DialogTrigger>
      <DialogContent marginLeft='0.5rem' marginRight='0.5rem'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Register your pet</DialogTitle>
          </DialogHeader>
          <DialogCloseTrigger />
          <DialogBody pb={6}>
            <Field label="Pet name" required>
              <Input placeholder="Enter your pet's name" {...register('petName', { required: true })}/>
            </Field>
            <Field label="Age" required mt={4}>
              <Input placeholder="Enter your pet's age" {...register('age', { required: true })}/>
            </Field>
            <Field label="Gender" required mt={4}>
              <Input placeholder="Enter your pet's gender" {...register('gender', { required: true })}/>
            </Field>
            <Field label="Species" required mt={4}>
              <NativeSelectRoot>
                <NativeSelectField placeholder="Select option" {...register('species', { required: true })}>
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                </NativeSelectField>
              </NativeSelectRoot>
            </Field>
            <Field label="Weight" required mt={4}>
              <Input placeholder="Enter your pet's weight" {...register('weight', { required: true })}/>
            </Field>
            <Field label="Description" required mt={4}>
              <Input placeholder="Enter your pet's description" {...register('description', { required: true })}/>
            </Field>
            <Field label="Pet Image" mt={4}>
              <FileUploadRoot onChange={handleFileChange}>
                <FileUploadTrigger asChild>
                  <Button variant="outline" size="sm">
                    Upload file
                  </Button>
                </FileUploadTrigger>
                <FileUploadList />
              </FileUploadRoot>
            </Field>
          </DialogBody>

          <DialogFooter>
            <Button type="submit">Register</Button>
            <DialogActionTrigger asChild>
              <Button variant="outline" onClick={resetForm}>Cancel</Button>
            </DialogActionTrigger>
          </DialogFooter>
        </form>
      </DialogContent>
    </DialogRoot>
  )
}

export default PetRegisterModalButton