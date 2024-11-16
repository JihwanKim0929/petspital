import React, { useEffect, useState } from 'react';
import './Diary.scss';
import { Card } from '@chakra-ui/react';
import PetDiaryPageCreateModalButton from '../../../components/petDiaryPageCreateModalButton/PetDiaryPageCreateModalButton';
import PetDiaryPageDeleteModalButton from '../../../components/petDiaryPageDeleteModalButton/PetDiaryPageDeleteModalButton';
import PetDiaryPageEditModalButton from '../../../components/petDiaryPageEditModalButton/PetDiaryPageEditModalButton';

const Diary = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [diaryID, setDiaryID] = useState(null);

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
      <Card.Root w='96%' h='96%'>
        <Card.Body>
          {pages.length === 0 ? (
            <div>Page is empty</div>
          ) : (
            pages.map(page => (
              <Card.Root key={page.id} w='80%' h='auto' mb='1rem'>
                <Card.Body>
                  <h3>{page.content}</h3>
                  <p>Created on: {new Date(page.createDate).toLocaleString()}</p>
                  {page.image_url && <img src={page.image_url} />}
                </Card.Body>
                <Card.Footer>
                  <PetDiaryPageEditModalButton pageID={page.id} pageContent={page.content}/>
                  <PetDiaryPageDeleteModalButton pageID={page.id} />
                </Card.Footer>
              </Card.Root>
            ))
          )}
          <PetDiaryPageCreateModalButton diaryID={diaryID}/>
        </Card.Body>
      </Card.Root>
    </div>
  );
};

export default Diary;