import React, { useEffect, useState } from 'react';
import { Flex, Textarea, Stack, Text } from '@chakra-ui/react';
import { Button } from '../../../../components/ui/button';
import CommentDeleteModalButton from "../../../../components/commentDeleteModalButton/CommentDeleteModalButton";

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
        const response = await fetch(`http://localhost:8080/board/${postID}`, {
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
        const userResponse = await fetch('http://localhost:8080/user', {
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
      const response = await fetch(`http://localhost:8080/board/${postID}/comment`, {
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
      const response = await fetch(`http://localhost:8080/board/${postID}/comment`, {
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
    <div className="communityPostView">
      <h1>Title: {post.title}</h1>
      <h3>Author: {post.author.username}</h3>
      <p>Content: {post.content}</p>
      <p>Date: {new Date(post.createDate).toLocaleString()}</p>
      {post.image_url && <img src={`http://localhost:8080/image/board/${post.image_url}`} alt="Post" />}
      
      <Flex>
        <Textarea
          placeholder="Comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button onClick={handleCommentSubmit}>Comment</Button>
      </Flex>

      <Stack spacing={4} marginTop={4}>
        {comments.map((comment) => (
          <Stack key={comment.id} padding="4" borderBottom="1px solid gray">
            <Text fontWeight="bold">{comment.author.username}</Text>
            <Text>{comment.content}</Text>
            <Text fontSize="sm" color="gray.500">{new Date(comment.createDate).toLocaleString()}</Text>

            {currentUser && comment.author.id === currentUser.id && (
              <CommentDeleteModalButton commentID={comment.id} />
            )}
          </Stack>
        ))}
      </Stack>
    </div>
  );
};

export default CommunityPostView;