// AdminPage.tsx

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Navbar from "../components/navbar";
import AdminQCard from "../components/AdminQCard";
import api from "../api";

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
  const [approvedPosts, setApprovedPosts] = useState<number>(0);

  useEffect(() => {
    api.get("/question/adminUnapproved").then((response) => {
      setPosts(response.data);
    });

    api.get("/question/adminApproved").then((response) => {
      setApprovedPosts(response.data.length);
    });

    api.get("/question/adminRejected").then((response) => {
      setRejectedPosts(response.data);
    });
  }, []);

  const [value, setValue] = React.useState("post");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    console.log("newValue", newValue);
    console.log("event", event);
    setValue(newValue);
  };
  // Dummy data for number of posts
  const totalPosts = posts.length + rejectedPosts.length; // Replace with the actual total number of posts
  const postsInReview = posts.length; // Replace with the actual number of posts in review
  const postsRejected = rejectedPosts.length; // Replace with the actual number of posts in review

  return (
    <>
      <Navbar />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Total Posts</h3>
            <p className="text-4xl font-semibold">{totalPosts}</p>
          </div>
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Approved Posts</h3>
            <p className="text-4xl font-semibold">{approvedPosts}</p>
          </div>
          <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Posts in Review</h3>
            <p className="text-4xl font-semibold">{postsInReview}</p>
          </div>
          <div className="bg-red-500 text-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Rejected Posts</h3>
            <p className="text-4xl font-semibold">{postsRejected}</p>
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
