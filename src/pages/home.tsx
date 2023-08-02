// Home page component
// Home page where user lands ince logged in
// It displays all the questions posted by the users
// Search bar is used to search for questions. Admins can filter by date and author too

import React, { useEffect, useState } from "react";
import api from "../api";
import Post_card from "../components/Post_card";
import Navbar from "../components/navbar";

interface Post {
  _id: string;
  title: string;
  description: string;
  author: string;
  createdDate: string;
}

interface User {
  _id: string;
  userName: string;
  email: string;
  role: string;
}

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [authors, setAuthors] = useState<User[]>([]);

  // State variable for the search query
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [authorSearchQuery, setAuthorSearchQuery] = useState<string>("");
  const [selectedDateRange, setSelectedDateRange] = useState<string>("");

  // Fetch all approved posts to display in home page
  useEffect(() => {
    api.get("/question/adminApproved").then((response) => {
      setPosts(response.data);
    });

    localStorage.getItem("role") === "admin"
      ? api.get("/auth/all").then((response) => {
          setAuthors(response.data);
        })
      : null;
  }, []);

  // Function to handle the search bar input change
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleAuthorSearchInputChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log(event.target.value);
    setAuthorSearchQuery(event.target.value);
  };

  // Filter posts by date for Admin use
  const handleDateRangeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDateRange(event.target.value);
  };

  const filteredPosts = posts.filter((post) => {
    const isTitleMatch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const isDescriptionMatch = post.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const isAuthorMatch = post.author
      .toLowerCase()
      .includes(authorSearchQuery.toLowerCase());

    // Check if the post's created date is within the selected date range
    const createdDate = new Date(post.createdDate);
    const currentDate = new Date();

    let startDate = new Date();
    let endDate = new Date();

    // For the posts posted today
    if (selectedDateRange === "today") {
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
    }
    // For the posts posted yesterday
    else if (selectedDateRange === "yesterday") {
      startDate.setDate(currentDate.getDate() - 1);
      startDate.setHours(0, 0, 0, 0);
      endDate.setDate(currentDate.getDate() - 1);
      endDate.setHours(23, 59, 59, 999);
    }
    // For the posts posted this week
    else if (selectedDateRange === "this_week") {
      startDate.setDate(currentDate.getDate() - currentDate.getDay());
      startDate.setHours(0, 0, 0, 0);
      endDate.setDate(currentDate.getDate() - currentDate.getDay() + 6);
      endDate.setHours(23, 59, 59, 999);
    }
    // For the posts posted this month
    else if (selectedDateRange === "this_month") {
      startDate.setDate(1);
      startDate.setHours(0, 0, 0, 0);
      endDate.setMonth(currentDate.getMonth() + 1, 0);
      endDate.setHours(23, 59, 59, 999);
    }

    const isDateInRange =
      selectedDateRange === "" ||
      (createdDate >= startDate && createdDate <= endDate);

    // Apply both filters together (search and date range)
    return (
      (isTitleMatch || isDescriptionMatch) && isDateInRange && isAuthorMatch
    );
  });

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 space-y-5 text-center">
        <div className="bg-slate-500 py-10 w-3/5 mx-auto space-y-4 mb-20">
          <h1 className="font-bold text-white">NEW PRODUCT LAUNCH</h1>
          <div className="flex justify-center items-center">
            <img
              src="https://media.tenor.com/6oZXKmRstsMAAAAC/apple-apple-iphone.gif"
              alt="image?"
              className="rounded"
            />
          </div>
        </div>
        <h1 className="text-4xl font-bold">Welcome to the Q & A Forum!</h1>
        <div
          className={`${
            localStorage.getItem("role") === "admin" ? "" : "hidden"
          } flex relative mx-auto max-w-md space-x-4`}
        >
          <select
            id="date-range"
            value={selectedDateRange}
            onChange={handleDateRangeChange}
            className="border border-gray-300 px-4 py-2 w-full rounded-md"
          >
            <option value="">Select Date Range</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="this_week">This Week</option>
            <option value="this_month">This Month</option>
          </select>

          <select
            id="date-range"
            value={authorSearchQuery}
            onChange={handleAuthorSearchInputChange}
            className="border border-gray-300 px-4 py-2 w-full rounded-md"
          >
            <option value="">Select Author</option>
            {authors.map((author) => (
              <option value={author.userName} key={author._id}>
                {author.userName}
              </option>
            ))}
          </select>
        </div>
        <div className="relative mx-auto max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="border border-gray-300 px-4 py-2 w-full rounded-md"
            placeholder="Search for questions..."
          />
        </div>
        <h2 className="text-2xl font-semibold">Approved Posts:</h2>
        {filteredPosts.length === 0 ? (
          <p>No matching posts found.</p>
        ) : (
          <ul className="space-y-5">
            {filteredPosts.map((post) => (
              <Post_card postDetails={post} userProf={false} key={post._id} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Home;
