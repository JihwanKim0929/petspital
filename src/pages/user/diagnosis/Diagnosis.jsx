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
                    <Fieldset.Legend fontFamily='LINESeedKR-Bd'>반려동물 AI로 진단해보기</Fieldset.Legend>
                  </Stack>

                  <Fieldset.Content>
                    <Field>
                      <Text fontFamily='Pretendard Variable' fontWeight='500'>반려동물 선택</Text>
                      <NativeSelectRoot>
                        <NativeSelectField placeholder="진단할 반려동물을 선택하세요." {...register('petID', { required: true })}
                        onChange={handlePetChange}
                        fontFamily='Pretendard Variable'
                        >
                          {pets.map(pet => (
                            <option key={pet.id} value={pet.id} style={{fontFamily: 'Pretendard Variable'}}>
                              {pet.name}
                            </option>
                          ))}
                        </NativeSelectField>
                      </NativeSelectRoot>
                    </Field>
                    <Field>
                      <Text fontFamily='Pretendard Variable' fontWeight='500'>신체부위 선택</Text>
                      <NativeSelectRoot>
                        <NativeSelectField placeholder="진단할 신체부위를 선택하세요." {...register('part', { required: true })} 
                        fontFamily='Pretendard Variable'
                        >
                        <option value="eye" style={{fontFamily: 'Pretendard Variable'}}>눈</option>
                        <option value="skin" style={{fontFamily: 'Pretendard Variable'}}>피부</option>
                        </NativeSelectField>
                      </NativeSelectRoot>
                    </Field>
                    <Field>
                      <FileUploadRoot maxW="xl" alignItems="stretch" maxFiles={1} onChange={handleImageFileChange}>
                        <FileUploadDropzone
                          label="파일을 드래그하여 업로드"
                          description="5MB 이하의 이미지 파일을 업로드하세요."
                        />
                        <FileUploadList />
                      </FileUploadRoot>
                    </Field>
                  </Fieldset.Content>

                  <Button type="submit" alignSelf="flex-start" mt={6} fontFamily='LINESeedKR-Bd'>
                    진단하기
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