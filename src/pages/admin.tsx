// AdminPage.tsx

import React, { useState } from "react";
// import axios from "axios";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import Navbar from "../components/navbar";

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

const Admin: React.FC = () => {
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

  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [value, setValue] = React.useState("post");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  // Dummy data for number of posts
  const totalPosts = 100; // Replace with the actual total number of posts
  const postsInReview = dummyQuestions.length; // Replace with the actual number of posts in review
  const answersInReview = dummyAnswers.length; // Replace with the actual number of posts in review

  const handleCloseModal = () => {
    console.log("Feedback sent.", feedback);
    setShowModal(false);
    setFeedback("");
  };

  const handleApproveAnswer = (answerId: number) => {
    // Logic to handle approving the answer
    console.log(`Answer with ID ${answerId} has been approved.`);
  };

  const handleApprovePost = (postId: number) => {
    // Logic to handle approving the post
    console.log(`Post with ID ${postId} has been approved.`);
  };

  const handleRejectQuestion = (question: Question) => {
    console.log("Question: ", question);
    setSelectedQuestion(question);
    setShowModal(true);
  };

  const handleRejectAnswer = (answer: Answer) => {
    console.log("Answer: ", answer);
    setSelectedAnswer(answer);
    setShowModal(true);
  };

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
      <div className="p-4">
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
                  <div
                    key={post.id}
                    className="p-4 border border-gray-300 mb-4 rounded-md shadow-md"
                  >
                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                    <p className="text-lg mb-2">{post.content}</p>
                    <p className="text-sm text-gray-500">
                      Author: {post.userId}
                    </p>
                    <div className="flex justify-between mt-4">
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded-md"
                        onClick={() => handleApprovePost(post.id)}
                      >
                        Approve Post
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                        onClick={() => handleRejectQuestion(post)}
                      >
                        Reject Post
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </TabPanel>
            <TabPanel value="answer">
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {dummyAnswers.map((answer) => (
                  <div
                    key={answer.id}
                    className="p-4 border border-gray-300 mb-4 rounded-md shadow-md"
                  >
                    <p>{answer.content}</p>
                    <p>Author: {answer.author}</p>
                    <div className="flex justify-between mt-4">
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded-md"
                        onClick={() => handleApproveAnswer(answer.id)}
                      >
                        Approve Answer
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                        onClick={() => handleRejectAnswer(answer)}
                      >
                        Reject Answer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </div>

      {/* Modal for providing feedback */}
      <Dialog
        open={showModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        {selectedQuestion ? (
          <>
            <DialogTitle>Feedback for Rejected Post</DialogTitle>
            <DialogContent>
              <TextField
                label="Feedback"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal}>Close</Button>
              {/* <Button
                onClick={() => {
                  handleApprovePost(selectedQuestion.id);
                  handleCloseModal();
                }}
                color="primary"
              >
                Approve
              </Button> */}
              <Button
                onClick={() => {
                  setSelectedQuestion(null);
                  handleCloseModal();
                }}
                color="error"
              >
                Send
              </Button>
            </DialogActions>
          </>
        ) : null}

        {selectedAnswer ? (
          <>
            <DialogTitle>Feedback for Rejected Answer</DialogTitle>
            <DialogContent>
              <TextField
                label="Feedback"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal}>Close</Button>
              {/* <Button
                onClick={() => {
                  handleApproveAnswer(selectedAnswer.id);
                  handleCloseModal();
                }}
                color="primary"
              >
                Approve
              </Button> */}
              <Button
                onClick={() => {
                  setSelectedAnswer(null);
                  handleCloseModal();
                }}
                color="error"
              >
                Send
              </Button>
            </DialogActions>
          </>
        ) : null}
      </Dialog>
    </>
  );
};
export default Admin;
