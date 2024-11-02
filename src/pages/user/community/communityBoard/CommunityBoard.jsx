import React, { useState } from 'react';
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

const pageSize = 10
const count = 20
const items = new Array(count)
  .fill(0)
  .map((_, index) => `Lorem ipsum dolor sit amet ${index + 1}`)

const Community = () => {
  const [page, setPage] = useState(1)

  const startRange = (page - 1) * pageSize
  const endRange = startRange + pageSize

  const visibleItems = items.slice(startRange, endRange)

  return (
    <div className="community">
      <Stack gap="4">
        <Stack backgroundColor='lightgray'>
            {visibleItems.map((item) => (
            <Text key={item}>{item}</Text>
            ))}
        </Stack>
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
        </Stack>
        <Link to="./post" style={{ textDecoration: "none" }}>
            <Button>Post</Button>
        </Link>
    </div>
  )
}

export default Community