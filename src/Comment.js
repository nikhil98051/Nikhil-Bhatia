// src/Comment.js
import React from 'react';

const Comment = ({ comment }) => {
  return (
    <div>
      <p>{comment.text}</p>
      <p>Likes: {comment.likes}</p>
      <p>Dislikes: {comment.dislikes}</p>
      {/* Render Like and Dislike buttons and handle onClick events */}
      {/* Render nested comments using recursion if applicable */}
    </div>
  );
};

export default Comment;
