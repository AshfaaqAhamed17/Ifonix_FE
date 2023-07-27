// UserProfile.tsx

import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Post_card from "../components/Post_card";

interface User {
  _id: string;
  username: string;
}

interface Question {
  _id: string;
  title: string;
  description: string;
  author: string;
  userId: string; // The ID of the user who asked the question
}

function UserProfile() {
  // const { userId } = useParams<{ userId?: string }>();

  // Handle the case where userId is undefined or null
  const userIdParam = "";
  // parseInt(userId ?? "0", 10);

  // Dummy array of users
  const dummyUsers: User[] = [
    { _id: "1", username: "JohnDoe" },
    { _id: "2", username: "JaneSmith" },
    { _id: "3", username: "Peter" },
    // Add more dummy users here as needed
  ];

  // Dummy array of questions
  const dummyQuestions: Question[] = [
    {
      _id: "1",
      title: "Question 1",
      description: "This is the content of Question 1.",
      author: "John Doe",
      userId: "1", // JohnDoe asked this question (user with ID 1)
    },
    {
      _id: "2",
      title: "Question 2",
      description: "This is the content of Question 2.",
      author: "John Doe",
      userId: "2", // JaneSmith asked this question (user with ID 2)
    },
    {
      _id: "3",
      title: "Question 3",
      description: "This is the content of Question 3.",
      author: "John Doe",
      userId: "1", // JohnDoe asked this question (user with ID 1)
    },
    // Add more dummy questions here as needed
  ];

  const [user, setUser] = useState<User | null>(null);
  const [userQuestions, setUserQuestions] = useState<Question[]>([]);

  useEffect(() => {
    // Fetch the user based on the userIdParam from the dummyUsers array
    setUser(dummyUsers.find((user) => user._id === userIdParam) || null);

    // Fetch the questions asked by the user from the dummyQuestions array
    setUserQuestions(
      dummyQuestions.filter((question) => question.userId === userIdParam)
    );
  }, [userIdParam]);

  if (!user) {
    return <div>User not found.</div>;
  }

  // const handleDeleteQuestion = (_id: string) => {
  //   console.log(`Deleting question with ID ${_id}...`);
  // };

  return (
    <>
      <Navbar />
      <div className="p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">
          User Profile: {user.username}
        </h2>
        <h3 className="text-xl font-bold mb-2">
          Total Number of Posts: {userQuestions.length}
        </h3>
        <div className="flex flex-col mx-auto max-w-xl">
          {userQuestions.length === 0 ? (
            <p>No questions available.</p>
          ) : (
            <div className="">
              {userQuestions.map((question) => (
                <Post_card
                  key={question._id}
                  postDetails={question}
                  userProf={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserProfile;
