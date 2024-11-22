import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import './Hospital.scss';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { Show, Card, Box, Text, Fieldset, Stack, Flex, useBreakpointValue } from '@chakra-ui/react';
import { NativeSelectRoot, NativeSelectField } from '../../../components/ui/native-select';
import { Field } from "../../../components/ui/field";
import { Button } from '../../../components/ui/button';
import HospitalSelectCard from '../../../components/hospitalSelectCard/HospitalSelectCard';
import DatePicker from 'react-datepicker';
import { addDays } from 'date-fns';
import { ko } from 'date-fns/locale';
import { EmptyState } from '../../../components/ui/empty-state';
import { MdOutlinePets } from "react-icons/md";
import { SERVER_URL } from '../../../utils/GlobalConstants';

const { kakao } = window;

const Hospital = () => {

  const { register, handleSubmit, reset, control } = useForm();

  const [pets, setPets] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospitalID, setSelectedHospitalID] = useState(null);
  const hasPets = () => { return pets.length > 0; };
  const petID = useWatch({ control, name: 'petID' });
  const [hospitalLocations, setHospitalLocations] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: null, lng: null });
  const [userLocation, setUserLocation] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const isBelowMd = useBreakpointValue({ base: true, md: false });

  const navigate = useNavigate();
  
  useEffect(() => {
    fetch(`${SERVER_URL}/user/pet`, {
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
    


    fetch(`${SERVER_URL}/animalHospitalList`, {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            console.error('Hospitals not found 1');
            throw new Error('Failed to fetch Hospitals');
        }
    })
    .then(parsedHospitals => {
      setHospitals(parsedHospitals);
      console.log('- Hospitals Successfully Loaded -');
      console.log("Hospitals:", parsedHospitals);
      convertAddressesToCoordinates(parsedHospitals);
    })
    .catch(error => console.error('Hospitals not found 2', error));

    const user = sessionStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      const geocoder = new kakao.maps.services.Geocoder();
      
      geocoder.addressSearch(parsedUser.address, (result, status) => {
        if (status === kakao.maps.services.Status.OK && result && result.length > 0) {
          const { y, x } = result[0];
          const newUserLocation = { lat: y, lng: x, address: parsedUser.address };
          setUserLocation(newUserLocation);
          setMapCenter(newUserLocation);
        } else {
          console.error('Geocoder failed to find address', status);
        }
      });
    }
  }, []);


  const convertAddressesToCoordinates = (hospitals) => {
    const geocoder = new kakao.maps.services.Geocoder();
    const locations = [];

    hospitals.forEach(hospital => {
      geocoder.addressSearch(hospital.hospitalAddress, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const { y, x } = result[0];
          locations.push({ lat: y, lng: x, address: hospital.hospitalAddress });
          if (locations.length === hospitals.length) {
            setHospitalLocations(locations); 
          }
        }
      });
    });
  };


  const handleHospitalSelect = (hospital) => {
    setSelectedHospitalID(hospital.id);
    const selectedLocation = hospitalLocations.find(loc => loc.address === hospital.hospitalAddress);
    if (selectedLocation) {
      setMapCenter({ lat: selectedLocation.lat, lng: selectedLocation.lng });
    }
  };


  const onSubmit = (data) => {
    console.log(data);
    if (!selectedHospitalID) {
      console.log("You must select hospital.");
      return;
    }

    const url = `${SERVER_URL}/pet/${petID}/${selectedHospitalID}/reservation`;
    const appointmentData = {
      reservationDate: appointmentDate
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
        <Box w='100%' h='100%' p={3}>
          <Card.Root  w='100%' h='100%' overflow='auto'
          data-state="open" 
          _open={{ 
              animationName: "fade-in, slide-from-top",
              animationDuration: "300ms",
              animationTimingFunction: "ease-out"
          }}>
            <Card.Header>
              <Text fontFamily='LINESeedKR-Bd'>병원 예약하기</Text>
            </Card.Header>
            <Card.Body>
              <Show when={hasPets()}>
                <Stack flexDirection={{ base:'column', md:'column', lg:'row' }} align='center'>
                  <Box m={6}>
                    <Box w={{ base:'280px', md:'300px', lg:'400px' }} h={{ base:'280px', md:'300px', lg:'400px' }}>
                      <Map 
                      center={mapCenter}
                      style={{ width: '100%', height: '100%', borderRadius: '0.5rem' }}
                      level={7}>
                        {hospitalLocations.map((location, index) => (
                          <MapMarker 
                            key={index} 
                            position={{ lat: location.lat, lng: location.lng }} 
                            title={location.address} 
                          />
                        ))}
                        {userLocation && (
                          <MapMarker
                            position={{ lat: userLocation.lat, lng: userLocation.lng }} 
                            title={userLocation.address}
                            image={{
                              src: process.env.PUBLIC_URL + "/assets/images/MapMarker.png",
                              size: {
                                width: 32,
                                height: 32,
                              }
                            }}
                          />
                        )}
                      </Map>
                    </Box>
                  </Box>
                  <Box w='100%'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Fieldset.Root>
                        <Fieldset.Content>
                          <Field>
                            <Text fontFamily='LINESeedKR-Bd'>반려동물 선택</Text>
                            <NativeSelectRoot>
                              <NativeSelectField placeholder="반려동물을 선택해주세요." fontFamily='Pretendard Variable' {...register('petID', { required: true })}>
                                {pets.map(pet => (
                                  <option key={pet.id} value={pet.id}>
                                    {pet.name}
                                  </option>
                                ))}
                              </NativeSelectField>
                            </NativeSelectRoot>
                          </Field>
                          
                          <Field>
                            <Text fontFamily='LINESeedKR-Bd'>병원 선택</Text>
                            <Box
                            w='100%'
                            overflowY="auto"
                            border="1px solid #ccc"
                            borderRadius="md"
                            mt={2}>
                              <Stack spacing={2} w='100%'>
                                {hospitals.map(hospital => (
                                  <HospitalSelectCard
                                    key={hospital.id}
                                    hospital={hospital}
                                    isSelected={selectedHospitalID === hospital.id}
                                    onSelect={() => handleHospitalSelect(hospital)}
                                  />
                                ))}
                              </Stack>
                            </Box>
                            {(!selectedHospitalID &&
                            <Text color="red.500" fontFamily='Pretendard Variable'>
                              병원을 선택해주세요.
                            </Text>)}
                          </Field>

                          <Field>
                            <Text fontFamily='LINESeedKR-Bd'>예약일자 선택</Text>
                            <DatePicker
                              showIcon
                              selected={appointmentDate}
                              onChange={(date) => setAppointmentDate(date)}
                              minDate={new Date()}
                              locale={ko}
                            />
                          </Field>
                        </Fieldset.Content>

                        <Button type="submit" alignSelf="flex-start" mt={6} disabled={!selectedHospitalID || !petID}
                        fontFamily='LINESeedKR-Bd'>
                          예약하기
                        </Button>
                      </Fieldset.Root>
                    </form>
                  </Box>
                </Stack>
              </Show>
              <Show when={!hasPets()}>
                <Box w='100%' h='100%' display='flex' justifyContent='center' alignItems='center'>
                  <EmptyState 
                  title="등록되어 있는 반려동물이 없어요."
                  description="아래 버튼을 클릭해서 반려동물을 등록하세요." 
                  icon={<MdOutlinePets/>}
                  >
                    <Link to='/user/petowner/pets'>
                      <Button fontFamily='LINESeedKR-Bd'>반려동물 등록하러 가기</Button>
                    </Link>
                  </EmptyState>
                </Box>
              </Show>
            </Card.Body>
          </Card.Root>
        </Box>
      </div>
    );
};

export default Hospital