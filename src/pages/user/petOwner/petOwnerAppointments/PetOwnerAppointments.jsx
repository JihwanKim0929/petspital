import React, { useState, useEffect } from 'react';
import './PetOwnerAppointments.scss';
import { Card, Show, Text, Box, Image } from '@chakra-ui/react';
import { NativeSelectField, NativeSelectRoot } from '../../../../components/ui/native-select';
import AppointmentViewModalButton from '../../../../components/appointmentViewModalButton/AppointmentViewModalButton';
import AppointmentDeleteModalButton from '../../../../components/appointmentDeleteModalButton/AppointmentDeleteModalButton';

const PetOwnerAppointments = () => {
    
    const [pets, setPets] = useState([]);
    const hasPets = () => { return pets.length > 0; };
    const [appointments, setAppointments] = useState([]);

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
    
    const handlePetChange = (event) => {
        const selectedPetID = event.target.value;
        if (selectedPetID) {
            const url = `http://localhost:8080/pet/${selectedPetID}/reservation`;
            console.log("Appointments URL: " + url);
            fetch(url, {
                method: 'GET',
                credentials: 'include'
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.error('Error fetching appointments:', response.statusText);
                    throw new Error('Failed to fetch appointments');
                }
            })
            .then(parsedAppointmentsData => {
                setAppointments(parsedAppointmentsData);
            })
            .catch(error => {
                console.error('Error loading appointments:', error);
            });
        }
    };

    return (
        <div className="petOwnerAppointments">
            <Card.Root  w='96%' h='96%'>
                <Card.Body>
                    <Show when={hasPets()}>
                        <NativeSelectRoot>
                            <NativeSelectField placeholder="Select your pet" onChange={handlePetChange}>
                                {pets.map(pet => (
                                <option key={pet.id} value={pet.id}>
                                    {pet.name}
                                </option>
                                ))}
                            </NativeSelectField>
                        </NativeSelectRoot>
                        <Box mt={4}>
                            {appointments.length > 0 ? (
                                appointments.map(appointment => (
                                    <Box key={appointment.id} p={4} borderWidth="1px" borderRadius="md" mb={4}>
                                        <Text fontWeight="bold">Appointment ID: {appointment.id}</Text>
                                        <Text>Pet: {appointment.pet.name} (Age: {appointment.pet.age}, Gender: {appointment.pet.gender})</Text>
                                        <Image src={appointment.pet.image_url} boxSize="100px" objectFit="cover" />
                                        
                                        <Text mt={1}>Reservation Date: {new Date(appointment.reservationDate).toLocaleString()}</Text>
                                        <Text>Create Date: {new Date(appointment.createDate).toLocaleString()}</Text>
                                        <Text>Hospital: {appointment.hospitalAddress}</Text>
                                        <AppointmentViewModalButton appointmentID={appointment.id}/>
                                        <AppointmentDeleteModalButton appointmentID={appointment.id} />
                                    </Box>
                                ))
                            ) : (
                                <Text>No appointments found.</Text>
                            )}
                        </Box>
                    </Show>
                    <Show when={!hasPets()}>
                        <Text>There is no pet.</Text>
                    </Show>
                </Card.Body>
            </Card.Root>
        </div>
    )
}

export default PetOwnerAppointments