import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Button } from "../ui/button";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "../ui/native-select"
import PetDiaryCreateModalButton from '../petDiaryCreateModalButton/PetDiaryCreateModalButton';


const PetDiariesModalButton = ({petID, petName}) => {

  const navigate = useNavigate();
  const [diaries, setDiaries] = useState([]);
  const [selectedDiaryID, setSelectedDiaryID] = useState(null);

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await fetch(`/pet/${petID}/diary`, {
          method: 'GET',
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch diaries');
        }

        const data = await response.json();
        setDiaries(data);
      } catch (error) {
        console.error('Error fetching diaries:', error);
      }
    };
    fetchDiaries();
  }, [petID]);

  const handleSelectChange = (event) => {
    setSelectedDiaryID(event.target.value);
  };

  const handleClickViewButton = () => {
    sessionStorage.setItem("selectedDiaryID", selectedDiaryID);
    navigate("./diary");
  };

  return (
    <DialogRoot minH='1000px'>
      <DialogTrigger>
        <Button margin="0.5rem" fontSize={{ base: '0.75rem', md: '0.75rem', lg: '0.9rem' }}>
          View Diaries
        </Button>
      </DialogTrigger>
      <DialogContent marginLeft='0.5rem' marginRight='0.5rem'>
        <DialogHeader>
          <DialogTitle>{petName}'s Diaries</DialogTitle>
        </DialogHeader>
        <DialogCloseTrigger />
        <DialogBody pb={6}>
          <NativeSelectRoot>
            <NativeSelectField placeholder="Select diary" onChange={handleSelectChange}>
              {diaries.map(diary => (
                <option key={diary.id} value={diary.id}>
                  {diary.title} - {diary.createDate}
                </option>
              ))}
            </NativeSelectField>
          </NativeSelectRoot>
        </DialogBody>
        <DialogFooter>
          <Button variant="solid" disabled={!selectedDiaryID} onClick={handleClickViewButton}>View Diary</Button>
          <PetDiaryCreateModalButton petID={petID} petName={petName} />
          <DialogActionTrigger asChild>
            <Button variant="solid">Close</Button>
          </DialogActionTrigger>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}

export default PetDiariesModalButton