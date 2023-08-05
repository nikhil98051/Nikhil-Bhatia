import React, { useState, useEffect } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import axios from 'axios';

const CommentsList = () => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchComments();
  }, [currentPage]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/comments?page=${currentPage}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleCommentSubmit = async (commentText) => {
    // Implement the logic to post a new comment here
    // Call the API to add a new comment
    // Update the comments state to show the new comment
  };

  return (
    <div>
      <CommentForm onSubmit={handleCommentSubmit} />
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
      {/* Implement pagination with Next and Previous buttons */}
    </div>
  );
};

export default CommentsList;
