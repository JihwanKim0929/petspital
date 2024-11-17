import React, { useState, useEffect } from 'react';
import './Diagnosis.scss';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Fieldset, Input, Stack, Card, Show, Text, Box } from "@chakra-ui/react";
import { Button } from '../../../components/ui/button';
import {
  NativeSelectField,
  NativeSelectRoot,
} from "../../../components/ui/native-select";
import { Field } from "../../../components/ui/field";
import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from "../../../components/ui/file-button";

const Diagnosis = () => {

  const { register, handleSubmit, errors, reset, setValue } = useForm();

  const [pets, setPets] = useState([]);
  const hasPets = () => { return pets.length > 0; };
  const navigate = useNavigate();

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

  const onSubmit = async (data) => {
    console.log(data);
  
    const formData = new FormData();
  
    const diagnosisDto = {
      species: data.species,
      part: data.part,
    };
  
    const diagnosisJson = JSON.stringify(diagnosisDto);
    const diagnosisBlob = new Blob([diagnosisJson], { type: "application/json" });
    formData.append("diagnosisDto", diagnosisBlob);
  
    const diagnosisImage = data.image;
    if (diagnosisImage) {
      formData.append("image", diagnosisImage);
    }
  
    const url = `http://localhost:8080/pet/${data.petID}/diagnosis`;
  
    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Diagnosis created successfully:", result);
        sessionStorage.setItem("diagnosisID", result.id);
        navigate("/user/petowner/diagnosis/result");
  
      } else {
        throw new Error("Failed to create diagnosis");
      }
    } catch (error) {
      console.error("Error creating diagnosis:", error);
    }
  
    reset();
  };

  const handlePetChange = (event) => {
    const selectedId = event.target.value;
    const pet = pets.find(p => p.id === Number(selectedId));
    if (pet) {
      setValue('species', pet.species);
    }
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    setValue('image', file);
    console.log("Selected file:", file);
  };

  return (
    <div className='diagnosis'>
      <Box w='100%' h='100%' p={3}>
        <Card.Root w='100%' h='100%' overflow='auto'
        data-state="open" 
        _open={{ 
            animationName: "fade-in, slide-from-top",
            animationDuration: "300ms",
            animationTimingFunction: "ease-out"
        }}>
          <Card.Body>
            <Show when={hasPets()}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Fieldset.Root size="lg" maxW="md">
                  <Stack mb={4}>
                    <Fieldset.Legend>Diagnosis</Fieldset.Legend>
                  </Stack>

                  <Fieldset.Content>
                    <Field label="Select your pet to diagnose">
                      <NativeSelectRoot>
                        <NativeSelectField placeholder="Select your pet" {...register('petID', { required: true })}
                        onChange={handlePetChange}>
                          {pets.map(pet => (
                            <option key={pet.id} value={pet.id}>
                              {pet.name}
                            </option>
                          ))}
                        </NativeSelectField>
                      </NativeSelectRoot>
                    </Field>
                    <Field label="Body part">
                      <NativeSelectRoot>
                        <NativeSelectField placeholder="Select the body part to diagnose." {...register('part', { required: true })}>
                        <option value="eye">Eye</option>
                        <option value="skin">Skin</option>
                        </NativeSelectField>
                      </NativeSelectRoot>
                    </Field>
                    <Field label="Image">
                      <FileUploadRoot maxW="xl" alignItems="stretch" maxFiles={1} onChange={handleImageFileChange}>
                        <FileUploadDropzone
                          label="Drag and drop here to upload"
                          description=".png, .jpg up to 5MB"
                        />
                        <FileUploadList />
                      </FileUploadRoot>
                    </Field>
                  </Fieldset.Content>

                  <Button type="submit" alignSelf="flex-start" mt={6}>
                    Submit
                  </Button>
                </Fieldset.Root>
              </form>
            </Show>
            <Show when={!hasPets()}>
              <Text>Pet is empty.</Text>
            </Show>
          </Card.Body>
        </Card.Root>
       </Box>
    </div>
  )
}

export default Diagnosis