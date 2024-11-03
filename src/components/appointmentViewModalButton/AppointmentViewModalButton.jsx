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
import { Text, Image } from '@chakra-ui/react';
import { Field } from "../ui/field";
import { Button } from "../ui/button";


const AppointmentViewModalButton = ({appointmentID}) => {

    const [appointment, setAppointment] = useState({ pet: {} });

    useEffect(() => {

        const petUrl = `http://localhost:8080/reservation/${appointmentID}`;

        fetch(petUrl, {
            method: 'GET',
            credentials: 'include'
          })
          .then(response => {
              if (response.ok) {
                  return response.json();
              } else {
                  console.error('Cannot find appointment 1');
                  throw new Error('Failed to fetch appointment');
              }
          })
          .then(parsedAppointment => {
              setAppointment(parsedAppointment);
              console.log('- Appointment Successfully Loaded -');
              console.log("Appointment:", parsedAppointment);
          })
          .catch(error => console.error('Cannot find appointment 2', error));
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
                    <DialogTitle>APPOINTMENT</DialogTitle>
                </DialogHeader>
                <DialogCloseTrigger />
                <DialogBody pb={6}>
                    <Field label="Pet Name">
                        <Text>{appointment.pet.name}</Text>
                    </Field>
                    <Field label="Age" mt={4}>
                        <Text>{appointment.pet.age}</Text>
                    </Field>
                    <Field label="Gender" mt={4}>
                        <Text>{appointment.pet.gender}</Text>
                    </Field>
                    <Field label="Weight" mt={4}>
                        <Text>{appointment.pet.weight}</Text>
                    </Field>
                    <Field label="Species" mt={4}>
                        <Text>{appointment.pet.species}</Text>
                    </Field>
                    <Field label="Description" mt={4}>
                        <Text>{appointment.pet.description}</Text>
                    </Field>
                    <Field label="Pet Image" mt={4}>
                        <Image src={`http://localhost:8080/image/pet/${appointment.pet.image_url}`} boxSize="100px" objectFit="cover" />
                    </Field>
                    <Field label="Appointment Date" mt={4}>
                        <Text>{appointment.reservationDate}</Text>
                    </Field>
                    <Field label="Hospital Address" mt={4}>
                        <Text>{appointment.hospitalAddress}</Text>
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

export default AppointmentViewModalButton