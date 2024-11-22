import React, { useEffect, useState } from 'react';
import './CommunityBoard.scss';
import { HStack, VStack, Stack, Text, Card, Box, Flex, useBreakpointValue, Show, Separator } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../../../components/ui/pagination";
import { Button } from '../../../../components/ui/button';
import PostDeleteModalButton from '../../../../components/postDeleteModalButton/PostDeleteModalButton';
import { SERVER_URL } from '../../../../utils/GlobalConstants';

const pageSize = 10;

const CommunityBoard = () => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const [currentUser, setCurrentUser] = useState(null); 
  const isBelowLg = useBreakpointValue({ base: true, lg: false });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/board`);
        if (response.ok) {
          const data = await response.json();
          setItems(data);
          setCount(data.length);
        } else {
          console.error('Failed to fetch board data:', response.statusText);
        }

        const userResponse = await fetch(`${SERVER_URL}/user`, {
          method: 'GET',
          credentials: 'include'
        });
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setCurrentUser(userData);
        } else {
          console.error('Failed to fetch user data:', userResponse.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleItemClick = (id) => {
    console.log('postID: ' + id);
    sessionStorage.setItem('postID', id);
  };

  const startRange = (page - 1) * pageSize;
  const endRange = startRange + pageSize;

  const visibleItems = items.slice(startRange, endRange);

  return (
    <div className="communityBoard">
      <Stack gap="4" w='100%' h='100%'>
        <Stack h='100%' overflow='auto'>
          {visibleItems.map((item) => (
            <Box>
              <Show when={!isBelowLg}>
                <Card.Root key={item.id} w='100%'>
                  <Link 
                    key={item.id} 
                    to="./view" 
                    style={{ textDecoration: 'none' }}
                    onClick={() => handleItemClick(item.id)}
                  >
                    <Card.Body padding="4">
                      <Box justifyContent='space-between' display='flex'>
                        <HStack>
                          <Text fontFamily='Pretendard Variable' whiteSpace='nowrap'>{item.id}</Text>
                          <Text fontFamily='Pretendard Variable' fontWeight="bold" ml='2rem' whiteSpace='nowrap'>{item.title}</Text>
                        </HStack>
                        <HStack>
                          <Flex>
                            <Text fontFamily='Pretendard Variable' mr='0.5rem' whiteSpace='nowrap'>작성자:</Text>
                            <Text fontFamily='Pretendard Variable'>{item.author.username}</Text>
                          </Flex>
                          <Flex ml='1rem'>
                            <Text fontFamily='Pretendard Variable' mr='0.5rem' whiteSpace='nowrap'>작성일자:</Text>
                            <Text fontFamily='Pretendard Variable'>{new Date(item.createDate).toLocaleString()}</Text>
                          </Flex>
                          {currentUser && item.author.id === currentUser.id && (
                            <HStack ml='1rem'>
                              <Link 
                                key={item.id}
                                to="./edit" 
                                style={{ textDecoration: 'none' }}
                                onClick={() => handleItemClick(item.id)}
                              >
                                <Button margin="0.5rem" fontFamily='LINESeedKR-Bd' fontSize={{ base: '0.75rem', md: '0.75rem', lg: '0.9rem' }}>
                                  편집
                                </Button>
                              </Link>
                              <Link>
                                <PostDeleteModalButton postID={item.id}/>
                              </Link>
                            </HStack>
                          )}
                        </HStack>
                      </Box>
                    </Card.Body>
                  </Link>
                </Card.Root>
              </Show>
              <Show when={isBelowLg}>
                <Card.Root key={item.id} w='100%'>
                  <Link 
                    key={item.id} 
                    to="./view" 
                    style={{ textDecoration: 'none' }}
                    onClick={() => handleItemClick(item.id)}
                  >
                    <Card.Body padding="4" borderBottom="1px solid gray">
                      <VStack align='left'>
                        <HStack>
                          <Text fontFamily='Pretendard Variable' fontWeight="bold" ml='1rem' wordBreak='break-word'>{item.title}</Text>
                        </HStack>
                        <HStack width='100%' justifyContent='right'>
                          <Text fontFamily='Pretendard Variable'>{item.author.username}</Text>
                          <Separator orientation='vertical' height={4} border='0.5px solid lightgray' />
                          <Text fontFamily='Pretendard Variable'>{new Date(item.createDate).toLocaleString()}</Text>
                        </HStack>
                        {currentUser && item.author.id === currentUser.id && (
                          <HStack width='100%' justifyContent='right'>
                            <Link 
                              key={item.id}
                              to="./edit" 
                              style={{ textDecoration: 'none' }}
                              onClick={() => handleItemClick(item.id)}
                            >
                              <Button margin="0.5rem" fontFamily='LINESeedKR-Bd' fontSize={{ base: '0.75rem', md: '0.75rem', lg: '0.9rem' }}>
                                편집
                              </Button>
                            </Link>
                            <Link>
                              <PostDeleteModalButton postID={item.id}/>
                            </Link>
                          </HStack>
                        )}
                      </VStack>
                    </Card.Body>
                  </Link>
                </Card.Root>
              </Show>
            </Box>
          ))}
        </Stack>
        <Box w='100%' display='flex' justifyContent='center'>
          <PaginationRoot
            page={page}
            count={count}
            pageSize={pageSize}
            onPageChange={(e) => setPage(e.page)}
          >
            <HStack>
              <PaginationPrevTrigger />
              <PaginationItems />
              <PaginationNextTrigger />
            </HStack>
          </PaginationRoot>
        </Box>
        <Box w='100%' display='flex' justifyContent='right'>
          <Link to="./post" style={{ textDecoration: "none" }}>
            <Button fontFamily='LINESeedKR-Bd' mr='1rem'>게시글 작성</Button>
          </Link>
        </Box>
      </Stack>
    </div>
  );
};

export default CommunityBoard;