import React, { useEffect, useState } from 'react';
import './CommunityBoard.scss';
import { HStack, Stack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../../../components/ui/pagination";
import { Button } from '../../../../components/ui/button';

const pageSize = 10;

const Community = () => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/board');
        if (response.ok) {
          const data = await response.json();
          setItems(data);
          setCount(data.length);
        } else {
          console.error('Failed to fetch data:', response.statusText);
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
      <Stack gap="4">
        <Stack backgroundColor='lightgray'>
          {visibleItems.map((item) => (
           <Link 
              key={item.id} 
              to="./view" 
              style={{ textDecoration: 'none' }}
              onClick={() => handleItemClick(item.id)}
            >
              <Stack key={item.id} padding="4" borderBottom="1px solid gray">
                <Text>ID: {item.id}</Text>
                <Text fontWeight="bold">{item.title}</Text>
                <Text>Author: {item.author.username}</Text>
                <Text>Date: {new Date(item.createDate).toLocaleString()}</Text>
              </Stack>
            </Link>
          ))}
        </Stack>
        <PaginationRoot
          page={page}
          count={Math.ceil(count / pageSize)}
          pageSize={pageSize}
          onPageChange={(e) => setPage(e.page)}
        >
          <HStack>
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </HStack>
        </PaginationRoot>
        <Link to="./post" style={{ textDecoration: "none" }}>
          <Button>Post</Button>
        </Link>
      </Stack>
    </div>
  );
};

export default Community;