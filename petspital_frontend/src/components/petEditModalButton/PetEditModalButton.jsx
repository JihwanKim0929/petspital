import React from 'react';
import { useNavigate } from "react-router-dom";
import { Input, Text, Flex } from "@chakra-ui/react";
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
} from "../ui/native-select";
import { SERVER_URL } from '../../utils/GlobalConstants';


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
        const url = `${SERVER_URL}/updatePet/${petID}`;
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
                <Button fontSize={{ base: '0.75rem', md: '0.75rem', lg: '0.9rem' }} fontFamily='LINESeedKR-Bd'>
                    편집
                </Button>
            </DialogTrigger>
            <DialogContent marginLeft='0.5rem' marginRight='0.5rem'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle fontFamily='LINESeedKR-Bd'>반려동물 정보 편집</DialogTitle>
                    </DialogHeader>
                    <DialogCloseTrigger />
                    <DialogBody pb={6}>
                        <Field required>
                            <Flex>
                                <Text fontFamily='LINESeedKR-Bd'>이름</Text>
                                <Text color='red.500' ml='0.25rem'>*</Text>
                            </Flex>
                            <Input placeholder="반려동물의 이름을 입력하세요." defaultValue={petName} {...register('petName', { required: true })}
                            fontFamily='Pretendard Variable'
                            />
                        </Field>
                        <Field required mt={4}>
                            <Flex>
                                <Text fontFamily='LINESeedKR-Bd'>나이</Text>
                                <Text color='red.500' ml='0.25rem'>*</Text>
                            </Flex>
                            <Input placeholder="반려동물의 나이를 입력하세요." defaultValue={age} {...register('age', { required: true })}
                            fontFamily='Pretendard Variable'
                            />
                        </Field>
                        <Field required mt={4}>
                            <Flex>
                                <Text fontFamily='LINESeedKR-Bd'>성별</Text>
                                <Text color='red.500' ml='0.25rem'>*</Text>
                            </Flex>
                            <NativeSelectRoot>
                                <NativeSelectField placeholder="반려동물의 성별을 선택하세요." defaultValue={gender} {...register('gender', { required: true })}
                                fontFamily='Pretendard Variable'
                                >
                                    <option value="male" style={{ fontFamily: 'Pretendard Variable' }}>수컷</option>
                                    <option value="female" style={{ fontFamily: 'Pretendard Variable' }}>암컷</option>
                                </NativeSelectField>
                            </NativeSelectRoot>
                        </Field>
                        <Field required mt={4}>
                            <Flex>
                                <Text fontFamily='LINESeedKR-Bd'>종</Text>
                                <Text color='red.500' ml='0.25rem'>*</Text>
                            </Flex>
                            <NativeSelectRoot>
                                <NativeSelectField placeholder="반려동물의 종을 선택하세요." defaultValue={species} {...register('species', { required: true })} 
                                fontFamily='Pretendard Variable'
                                >
                                    <option value="dog" style={{ fontFamily: 'Pretendard Variable' }}>개</option>
                                    <option value="cat" style={{ fontFamily: 'Pretendard Variable' }}>고양이</option>
                                </NativeSelectField>
                            </NativeSelectRoot>
                        </Field>
                        <Field required mt={4}>
                            <Flex>
                                <Text fontFamily='LINESeedKR-Bd'>무게(kg)</Text>
                                <Text color='red.500' ml='0.25rem'>*</Text>
                            </Flex>
                            <Input placeholder="반려동물의 무게를 입력하세요." defaultValue={weight} {...register('weight', { required: true })}
                            fontFamily='Pretendard Variable'
                            />
                        </Field>
                        <Field required mt={4}>
                            <Flex>
                                <Text fontFamily='LINESeedKR-Bd'>설명</Text>
                                <Text color='red.500' ml='0.25rem'>*</Text>
                            </Flex>
                            <Input placeholder="반려동물에 대한 설명을 입력하세요." defaultValue={description} {...register('description', { required: true })}
                            fontFamily='Pretendard Variable'
                            />
                        </Field>
                    </DialogBody>

                    <DialogFooter>
                        <Button type="submit" fontFamily='LINESeedKR-Bd'>편집</Button>
                        <DialogActionTrigger asChild>
                            <Button variant="outline" onClick={resetForm} fontFamily='LINESeedKR-Bd'>취소</Button>
                        </DialogActionTrigger>
                    </DialogFooter>
                </form>
            </DialogContent>
        </DialogRoot>
    );
};

export default PetEditModalButton