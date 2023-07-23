// AdminPage.tsx

import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: number;
  username: string;
  // Add more user properties as needed
}

interface Question {
  id: number;
  title: string;
  content: string;
  userId: number;
  approved: boolean;
}

interface Answer {
  id: number;
  postId: number;
  content: string;
  author: string;
}

const Admin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);

  // Dummy users
  const dummyUsers: User[] = [
    { id: 1, username: "JohnDoe" },
    { id: 2, username: "JaneSmith" },
    { id: 3, username: "PeterParker" },
    // Add more dummy users here as needed
  ];

  // Dummy questions
  const dummyQuestions: Question[] = [
    {
      id: 1,
      title: "Question 1",
      content: "This is the content of Question 1.",
      userId: 1, // JohnDoe asked this question (user with ID 1)
      approved: false,
    },
    {
      id: 2,
      title: "Question 2",
      content: "This is the content of Question 2.",
      userId: 2, // JaneSmith asked this question (user with ID 2)
      approved: false,
    },
    {
      id: 3,
      title: "Question 3",
      content: "This is the content of Question 3.",
      userId: 1, // JohnDoe asked this question (user with ID 1)
      approved: false,
    },
    // Add more dummy questions here as needed
  ];

  // Dummy answers
  const dummyAnswers: Answer[] = [
    {
      id: 1,
      postId: 1,
      content: "This is the first answer for Question 1.",
      author: "Alice",
    },
    {
      id: 2,
      postId: 1,
      content: "This is the second answer for Question 1.",
      author: "Bob",
    },
    {
      id: 3,
      postId: 2,
      content: "This is the first answer for Question 2.",
      author: "Charlie",
    },
    {
      id: 4,
      postId: 3,
      content: "This is the first answer for Question 3.",
      author: "Charlie",
    },
    // Add more dummy answers here as needed
  ];

  useEffect(() => {
    // Fetch all users, posts, and answers from the backend API
    axios.get("/api/users").then((response) => setUsers(response.data));
    axios.get("/api/posts").then((response) => setPosts(response.data));
    axios.get("/api/answers").then((response) => setAnswers(response.data));
  }, []);

  const handleApprovePost = (postId: number) => {
    // Call the backend API to update the status of the post to approved
    axios.put(`/api/posts/${postId}`, { approved: true }).then((response) => {
      // Assuming the backend returns the updated post object, update the local state
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, approved: true } : post
        )
      );
    });
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <h2>Users</h2>
      <ul>
        {dummyUsers.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
      <h2>Posts</h2>
      <ul>
        {dummyQuestions.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            {/* <p>Author: {post.author}</p> */}
            <p>Approved: {post.approved ? "Yes" : "No"}</p>
            {!post.approved && (
              <button onClick={() => handleApprovePost(post.id)}>
                Approve Post
              </button>
            )}
          </li>
        ))}
      </ul>
      <h2>Answers</h2>
      <ul>
        {dummyAnswers.map((answer) => (
          <li key={answer.id}>
            <p>{answer.content}</p>
            <p>Author: {answer.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
