import React, { useState } from 'react';
import './CommunityPost.scss';
import { Link } from 'react-router-dom';
import { Text, VStack } from '@chakra-ui/react';
import { Editable } from "@chakra-ui/react"
import { Button } from '../../../../components/ui/button';



const CommunityPost = () => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <div className="communityPost">
        <VStack>
          <Editable.Root defaultValue="Input title">
              <Editable.Preview minH="48px" alignItems="flex-start" width="full" />
              <Editable.Textarea onChange={(e) => setTitle(e.target.value)}/>
          </Editable.Root>
          <Editable.Root defaultValue="Input content">
              <Editable.Preview minH="48px" alignItems="flex-start" width="full" />
              <Editable.Textarea onChange={(e) => setContent(e.target.value)}/>
          </Editable.Root>
        </VStack>
        <Button>Post</Button>
        <Link to="../" style={{ textDecoration: "none" }}>
            <Button>Back</Button>
        </Link>
    </div>
  )
}

export default CommunityPost