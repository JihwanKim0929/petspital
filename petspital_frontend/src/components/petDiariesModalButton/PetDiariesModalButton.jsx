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
import PetDiaryDeleteModalButton from '../petDiaryDeleteModalButton/PetDiaryDeleteModalButton';
import PetDiaryEditModalButton from '../petDiaryEditModalButton/PetDiaryEditModalButton';
import { SERVER_URL } from '../../utils/GlobalConstants';
import { Stack } from '@chakra-ui/react';

const PetDiariesModalButton = ({petID, petName}) => {

  const navigate = useNavigate();
  const [diaries, setDiaries] = useState([]);
  const [selectedDiaryID, setSelectedDiaryID] = useState(null);

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/pet/${petID}/diary`, {
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
        <Button fontSize={{ base: '0.75rem', md: '0.75rem', lg: '0.9rem' }} fontFamily='LINESeedKR-Bd'>
          수첩 조회하기
        </Button>
      </DialogTrigger>
      <DialogContent marginLeft='0.5rem' marginRight='0.5rem' minWidth="fit-content" height="fit-content">
        <DialogHeader>
          <DialogTitle>{petName}의 수첩</DialogTitle>
        </DialogHeader>
        <DialogCloseTrigger />
        <DialogBody pb={6}>
          <NativeSelectRoot>
            <NativeSelectField placeholder="조회할 수첩을 선택하세요." onChange={handleSelectChange} fontFamily='Pretendard Variable'>
              {diaries.map(diary => (
                <option key={diary.id} value={diary.id} style={{ fontFamily: 'Pretendard Variable' }}>
                  {diary.title}
                </option>
              ))}
            </NativeSelectField>
          </NativeSelectRoot>
        </DialogBody>
        <DialogFooter>
          <Stack flexDirection={{ base:'column', md:'row' }} w='100%'>
            <Button variant="solid" disabled={!selectedDiaryID} onClick={handleClickViewButton} fontFamily='LINESeedKR-Bd'>선택한 수첩 조회하기</Button>
            <PetDiaryEditModalButton whenDisable={!selectedDiaryID} diaryID={selectedDiaryID} petName={petName} />
            <PetDiaryDeleteModalButton whenDisable={!selectedDiaryID} diaryID={selectedDiaryID} />
            <PetDiaryCreateModalButton petID={petID} petName={petName} />
            <DialogActionTrigger asChild>
              <Button variant="solid" fontFamily='LINESeedKR-Bd'>닫기</Button>
            </DialogActionTrigger>
          </Stack>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}

export default PetDiariesModalButton