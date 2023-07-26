// AdminPage.tsx

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Navbar from "../components/navbar";
import AdminQCard from "../components/AdminQCard";
import AdminACard from "../components/AdminACard";

// interface User {
//   id: number;
//   username: string;
//   // Add more user properties as needed
// }

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

function Admin() {
  // Dummy users
  // const dummyUsers: User[] = [
  //   { id: 1, username: "JohnDoe" },
  //   { id: 2, username: "JaneSmith" },
  //   { id: 3, username: "PeterParker" },
  //   // Add more dummy users here as needed
  // ];
  // Dummy questions
  const dummyQuestions: Question[] = [
    {
      id: 1,
      title: "Question 1",
      content: "This is the content of Question 1.",
      userId: 1,
      approved: false,
    },
    {
      id: 2,
      title: "Question 2",
      content: "This is the content of Question 2.",
      userId: 2,
      approved: false,
    },
    {
      id: 3,
      title: "Question 3",
      content: "This is the content of Question 3.",
      userId: 1,
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

  const [value, setValue] = React.useState("post");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    console.log("newValue", newValue);
    console.log("event", event);
    setValue(newValue);
  };
  // Dummy data for number of posts
  const totalPosts = 100; // Replace with the actual total number of posts
  const postsInReview = dummyQuestions.length; // Replace with the actual number of posts in review
  const answersInReview = dummyAnswers.length; // Replace with the actual number of posts in review

  return (
    <>
      <Navbar />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Total Posts</h3>
            <p className="text-4xl font-semibold">{totalPosts}</p>
          </div>
          <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Posts in Review</h3>
            <p className="text-4xl font-semibold">{postsInReview}</p>
          </div>
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Comments in Review</h3>
            <p className="text-4xl font-semibold">{answersInReview}</p>
          </div>
        </div>
      </div>
      <div className="">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                centered
              >
                <Tab label="Post Approval" value="post" />
                <Tab label="Answer Approval" value="answer" />
              </TabList>
            </Box>
            <TabPanel value="post">
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {dummyQuestions.map((post) => (
                  <AdminQCard key={post.id} questionDetails={post} />
                ))}
              </div>
            </TabPanel>
            <TabPanel value="answer">
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {dummyAnswers.map((answer) => (
                  <AdminACard key={answer.id} answerDetails={answer} />
                ))}
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </>
  );
}
export default Admin;
