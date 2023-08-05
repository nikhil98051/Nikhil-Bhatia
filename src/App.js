// src/App.js
import React, { useState, useEffect } from 'react';
import { fetchComments } from './api';
import Comment from './Comment';
import CommentForm from './CommentForm';

function App() {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadComments(currentPage);
  }, [currentPage]);

  const loadComments = async (page) => {
    try {
      const commentsData = await fetchComments(page);
      setComments(commentsData);
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  };

  return (
    <div>
      <h1>Commenting System</h1>
      <CommentForm />
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
      <div>
        <button onClick={() => setCurrentPage((prevPage) => prevPage - 1)} disabled={currentPage === 1}>
          Previous Page
        </button>
        <button onClick={() => setCurrentPage((prevPage) => prevPage + 1)}>Next Page</button>
      </div>
    </div>
  );
}

export default App;
