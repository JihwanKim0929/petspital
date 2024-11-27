import React, { useEffect, useState } from 'react';
import { Flex, Textarea, Stack, Text, VStack, HStack, Image, Box, Separator } from '@chakra-ui/react';
import { Button } from '../../../../components/ui/button';
import CommentBox from '../../../../components/commentBox/CommentBox';
import { SERVER_URL } from '../../../../utils/GlobalConstants';

const CommunityPostView = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const postID = sessionStorage.getItem('postID');

    const fetchPost = async () => {
      if (!postID) {
        setError('No post found.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${SERVER_URL}/board/${postID}`, {
          method: 'GET',
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setPost(data);
          fetchComments(postID);
        } else {
          setError('Failed to load post.');
        }
      } catch (error) {
        setError('Network error.');
      } finally {
        setLoading(false);
      }
    };

    const fetchUser = async () => {
      try {
        const userResponse = await fetch(`${SERVER_URL}/user`, {
          method: 'GET',
          credentials: 'include'
        });
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setCurrentUser(userData);
        } else {
          console.error('Failed to fetch user data.');
        }
      } catch (error) {
        console.error('Network error while fetching user data.');
      }
    };

    fetchPost();
    fetchUser();
  }, []);

  const fetchComments = async (postID) => {
    try {
      const response = await fetch(`${SERVER_URL}/board/${postID}/comment`, {
        method: 'GET',
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setComments(data);
      } else {
        setError('Failed to load comments.');
      }
    } catch (error) {
      setError('Network error while fetching comments.');
    }
  };

  const handleCommentSubmit = async () => {
    const postID = sessionStorage.getItem('postID');

    if (!postID) {
      setError('No post found.');
      return;
    }

    const commentData = {
      content: comment,
    };

    try {
      const response = await fetch(`${SERVER_URL}/board/${postID}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(commentData),
      });

      if (response.ok) {
        setComment('');
        fetchComments(postID);
      } else {
        setError('Failed to add comment.');
      }
    } catch (error) {
      setError('Network error while submitting comment.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="communityPostView" style={{ width: '100%' }}>
      <Box w='100%'>
        <VStack align='left'>
          <Text fontFamily='LINESeedKR-Bd' fontSize='20px'>{post.title}</Text>
          <HStack>
            <Text fontFamily='Pretendard Variable'>{post.author.username}</Text>
            <Separator orientation="vertical" height="4" />
            <Text fontFamily='Pretendard Variable'>
              {new Date(new Date(post.createDate).getTime() + 9 * 60 * 60 * 1000).toLocaleString('ko-KR', {
                  timeZone: 'Asia/Seoul',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
              })}
            </Text>
          </HStack>
        </VStack>
        <Separator border='1px solid lightgray' mt={3} mb={3} />
        <VStack>
          <Text textAlign='left' width='100%' fontFamily='Pretendard Variable'>{post.content}</Text>
          {post.image_url && <Image src={post.image_url} borderRadius='1rem' mt={6} boxSize={{ base:'200px', md:'250px', lg:'300px' }} />}
        </VStack>
      </Box>
      
      <Flex w='100%' mt={6} alignItems='center'>
        <Textarea
          placeholder="댓글 내용을 입력하세요."
          fontFamily='Pretendard Variable'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button onClick={handleCommentSubmit} fontFamily='LINESeedKR-Bd' ml={5}>작성</Button>
      </Flex>

      <Stack spacing={4} marginTop={4}>
        {comments.map((comment) => (
          <CommentBox comment={comment} currentUser={currentUser} postID={post.id} fetchComments={fetchComments}/>
        ))}
      </Stack>
    </div>
  );
};

export default CommunityPostView;