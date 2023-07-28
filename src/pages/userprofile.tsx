// UserProfile.tsx

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Post_card from "../components/Post_card";
import axios from "axios";

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
  let { userId } = useParams();
  // const userId = userId;
  console.log("userId", userId);
  // Dummy array of users
  // const dummyUsers: User[] = [
  //   { _id: "1", username: "JohnDoe" },
  //   { _id: "2", username: "JaneSmith" },
  //   { _id: "3", username: "Peter" },
  //   // Add more dummy users here as needed
  // ];

  // Dummy array of questions
  // const dummyQuestions: Question[] = [
  //   {
  //     _id: "1",
  //     title: "Question 1",
  //     description: "This is the content of Question 1.",
  //     author: "John Doe",
  //     userId: "1", // JohnDoe asked this question (user with ID 1)
  //   },
  //   {
  //     _id: "2",
  //     title: "Question 2",
  //     description: "This is the content of Question 2.",
  //     author: "John Doe",
  //     userId: "2", // JaneSmith asked this question (user with ID 2)
  //   },
  //   {
  //     _id: "3",
  //     title: "Question 3",
  //     description: "This is the content of Question 3.",
  //     author: "John Doe",
  //     userId: "1", // JohnDoe asked this question (user with ID 1)
  //   },
  //   // Add more dummy questions here as needed
  // ];

  const [user, setUser] = useState<User | null>(null);
  const [userQuestions, setUserQuestions] = useState<Question[]>([]);

  const history = useNavigate();
  const userName = localStorage.getItem("userName");
  const handleLogout = () => {
    // Implement your logout logic here, e.g., clearing session data or JWT token
    // After logout, redirect the user to the login page or any other appropriate page
    // For example, if using JWT, you can remove the token from localStorage:
    localStorage.clear();

    // Redirect to the login page
    history("/login");
  };

  useEffect(() => {
    // Fetch approved posts from the backend API (replace 'YOUR_API_ENDPOINT' with the actual endpoint)
    axios.get("http://localhost:1100/api/v1/auth/all").then((response) => {
      setUser(
        response.data.find((user: { _id: string }) => user._id === userId) ||
          null
      );

      axios
        .get("http://localhost:1100/api/v1/question/adminApproved")
        .then((response) => {
          // setPosts(response.data);
          setUserQuestions(
            response.data.filter(
              (question: { author: string }) => question.author === userId
            )
          );
        });
    });
  }, [userId]);

  // useEffect(() => {
  //   // Fetch the user based on the userIdParam from the dummyUsers array
  //   setUser(dummyUsers.find((user) => user._id === userId) || null);

  //   // Fetch the questions asked by the user from the dummyQuestions array
  //   setUserQuestions(
  //     dummyQuestions.filter((question) => question.userId === userId)
  //   );
  // }, [userId]);

  if (!user) {
    return <div>User not found.</div>;
  }

  // const handleDeleteQuestion = (_id: string) => {
  //   console.log(`Deleting question with ID ${_id}...`);
  // };

  return (
    <>
      <Navbar />
      <div className="p-4">
        <div className="p-4 text-center">
          <h2 className="text-2xl font-bold mb-4">
            User Profile: {userName ? userName.toUpperCase() : "ANOYMOUS"}
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
        <div className="text-center mt-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
