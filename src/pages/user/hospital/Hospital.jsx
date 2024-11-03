import React, { useState, useEffect } from 'react'
import './Hospital.scss';
import { Map } from 'react-kakao-maps-sdk';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Show, Card, Box, Text, Input, Fieldset, Stack } from '@chakra-ui/react';
import { NativeSelectRoot, NativeSelectField } from '../../../components/ui/native-select';
import { Field } from "../../../components/ui/field";
import { Button } from '../../../components/ui/button';


const Hospital = () => {

  const [pets, setPets] = useState([]);
  const hasPets = () => { return pets.length > 0; };
  
  const { register, handleSubmit, errors, reset, setValue } = useForm();
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

  const onSubmit = (data) => {
    console.log(data);
    
    const url = `http://localhost:8080/pet/${data.petID}/reservation`;
    const currentDate = new Date().toISOString();
    console.log("Current Date: " + currentDate);
    const appointmentData = {
      reservationDate: currentDate,
      hospitalAddress: data.hospitalAddress
    }
    console.log('Sending appointment data:', appointmentData);
    fetch(url,{
      method: 'POST',
      body: JSON.stringify(appointmentData),
      headers: {'Content-Type': 'application/json' },
      credentials: 'include'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to make reservation');
      }
      return response.json();
    })
    .then(data => {
      console.log('Reservation successful:', data);
      reset();
      navigate("/user/petowner/appointments");
    })
    .catch(error => console.error('Reservation failed:', error));
  };

  return (
      <div className="hospital">
        <Card.Root  w='96%' h='96%'>
          <Card.Body>
            <Show when={hasPets()}>
              <Box>
                <Map 
                center={{ lat: 33.5563, lng: 126.79581 }}
                style={{ width: '300px', height: '300px' }}
                level={3}
                />
              </Box>
              <Box mt={6}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Fieldset.Root size="lg" maxW="md">
                    <Stack mb={4}>
                      <Fieldset.Legend>Diagnosis</Fieldset.Legend>
                    </Stack>

                    <Fieldset.Content>
                      <Field label="Pet">
                        <NativeSelectRoot>
                          <NativeSelectField placeholder="Select your pet" {...register('petID', { required: true })}>
                            {pets.map(pet => (
                              <option key={pet.id} value={pet.id}>
                                {pet.name}
                              </option>
                            ))}
                          </NativeSelectField>
                        </NativeSelectRoot>
                      </Field>
                      <Field label="Hospital">
                        <Input placeholder="Enter hospital address" {...register('hospitalAddress', { required: true })} />
                      </Field>
                    </Fieldset.Content>

                    <Button type="submit" alignSelf="flex-start" mt={6}>
                      Submit
                    </Button>
                  </Fieldset.Root>
                </form>
              </Box>
            </Show>
            <Show when={!hasPets()}>
              <Text>There is no pet.</Text>
            </Show>
          </Card.Body>
        </Card.Root>
        
      </div>
    );
};

export default Hospital