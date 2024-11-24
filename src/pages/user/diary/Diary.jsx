import React, { useEffect, useState } from 'react';
import './Diary.scss';
import { Link } from 'react-router-dom';
import { Card, Box, Show, Text, Image, HStack, VStack, Separator, useBreakpointValue, Stack } from '@chakra-ui/react';
import PetDiaryPageCreateModalButton from '../../../components/petDiaryPageCreateModalButton/PetDiaryPageCreateModalButton';
import PetDiaryPageDeleteModalButton from '../../../components/petDiaryPageDeleteModalButton/PetDiaryPageDeleteModalButton';
import PetDiaryPageEditModalButton from '../../../components/petDiaryPageEditModalButton/PetDiaryPageEditModalButton';
import { EmptyState } from '../../../components/ui/empty-state';
import { Button } from '../../../components/ui/button';
import { FaBook } from "react-icons/fa";

const Diary = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [diaryID, setDiaryID] = useState(null);
  const isBelowMd = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const selectedDiaryID = sessionStorage.getItem('selectedDiaryID');

    if (!selectedDiaryID) {
      setError('Diary ID not found in sessionStorage.');
      setLoading(false);
      return;
    }
    setDiaryID(selectedDiaryID);

    const fetchDiaryPages = async () => {
      try {
        const response = await fetch(`/diary/${selectedDiaryID}/page`, {
          method: 'GET',
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch diary pages');
        }

        const data = await response.json();
        setPages(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDiaryPages();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='diary'>
      <Box w='100%' h='100%' p={3}>
        <Card.Root w='100%' h='100%' overflow='auto'
        data-state="open" 
        _open={{ 
            animationName: "fade-in, slide-from-top",
            animationDuration: "300ms",
            animationTimingFunction: "ease-out"
        }}>
          <Card.Body>
            {pages.length === 0 ? (
              <Box w='100%' h='100%' display='flex' alignItems='center' justifyContent='center'>
                <EmptyState 
                title="수첩의 페이지가 없어요."
                description="아래 버튼을 클릭해서 수첩 페이지를 추가하세요." 
                icon={<FaBook />}
                >
                  <HStack>
                    <PetDiaryPageCreateModalButton diaryID={diaryID}/>
                    <Link to='/user/petowner/pets'>
                      <Button fontFamily='LINESeedKR-Bd'>뒤로가기</Button>
                    </Link>
                  </HStack>
                </EmptyState>
              </Box>
            ) : (
              pages.map(page => (
                <Card.Root key={page.id} w='100%' h='auto' mb='1rem'>
                  <Card.Body>
                    <VStack align='left'>
                      <Text fontFamily='LINESeedKR-Bd' fontSize={{ base:'16px', lg:'18px' }}>
                        {new Date(page.createDate).toLocaleString()}
                      </Text>
                      <Separator mt={{ base:'2', md:'4' }} mb={{ base:'2', md:'4' }} />
                      <Stack flexDirection={{ base:'column', md:'row' }} align='center'>
                        {page.image_url && <Image src={page.image_url} boxSize={{ base:'200px', md:'150px', lg:'200px' }} borderRadius={{ base:'0.5rem', lg:'1rem' }}/>}
                        <Show when={isBelowMd}><Separator mt={2} mb={2} /></Show>
                        <Card.Root ml={{ base:'0', md:'6' }} minH={{ base:'150px', lg:'200px' }} height='auto' w='100%'>
                          <Card.Body>
                            <Text h='100%' fontFamily='Pretendard Variable'>{page.content}</Text>
                          </Card.Body>
                        </Card.Root>
                      </Stack>
                    </VStack>                 
                  </Card.Body>
                  <Card.Footer>
                    <PetDiaryPageEditModalButton pageID={page.id} pageContent={page.content} />
                    <PetDiaryPageDeleteModalButton pageID={page.id} />
                  </Card.Footer>
                </Card.Root>
              ))
            )}
            <Show when={pages.length > 0}>
              <HStack>
                <PetDiaryPageCreateModalButton diaryID={diaryID}/>
                <Link to='/user/petowner/pets'>
                  <Button fontFamily='LINESeedKR-Bd'>뒤로가기</Button>
                </Link>
              </HStack>
            </Show>
          </Card.Body>
        </Card.Root>
      </Box>
    </div>
  );
};

export default Diary;