// AdminPage.tsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Navbar from "../components/navbar";
import AdminQCard from "../components/AdminQCard";

interface Post {
  _id: string;
  title: string;
  description: string;
  author: string;
  IsRejected: boolean;
  rejectedfeedback: string;
}

function Admin() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [rejectedPosts, setRejectedPosts] = useState<Post[]>([]);
  // const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    // Fetch approved posts from the backend API (replace 'YOUR_API_ENDPOINT' with the actual endpoint)
    axios
      .get("http://localhost:1100/api/v1/question/adminUnapproved")
      .then((response) => {
        setPosts(response.data);
      });

    axios
      .get("http://localhost:1100/api/v1/question/adminRejected")
      .then((response) => {
        setRejectedPosts(response.data);
      });

    // axios
    //   .get("http://localhost:1100/api/v1/answer/unapprovedAnswers")
    //   .then((response) => {
    //     setAnswers(response.data);
    //   });
  }, []);

  const [value, setValue] = React.useState("post");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    console.log("newValue", newValue);
    console.log("event", event);
    setValue(newValue);
  };
  // Dummy data for number of posts
  const totalPosts = 100; // Replace with the actual total number of posts
  const postsInReview = posts.length; // Replace with the actual number of posts in review
  const answersInReview = rejectedPosts.length; // Replace with the actual number of posts in review

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
            <h3 className="text-xl font-bold mb-2">Rejected Posts</h3>
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
                <Tab label="Posts for Approval" value="post" />
                <Tab label="Rejected Posts" value="rejectsPosts" />
              </TabList>
            </Box>
            <TabPanel value="post">
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {posts.map((post) => (
                  <AdminQCard key={post._id} questionDetails={post} />
                ))}
              </div>
            </TabPanel>
            <TabPanel value="rejectsPosts">
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {rejectedPosts.map((post) => (
                  <AdminQCard key={post._id} questionDetails={post} />
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
