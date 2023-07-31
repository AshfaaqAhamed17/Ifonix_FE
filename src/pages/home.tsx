// Home.tsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import Post_card from "../components/Post_card";
import Navbar from "../components/navbar";

interface Post {
  _id: string;
  title: string;
  description: string;
  author: string;
  createdDate: string;
}

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  // State variable for the search query
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [authorSearchQuery, setAuthorSearchQuery] = useState<string>("");
  const [selectedDateRange, setSelectedDateRange] = useState<string>("");

  useEffect(() => {
    // Fetch approved posts from the backend API (replace 'YOUR_API_ENDPOINT' with the actual endpoint)
    axios
      .get("http://localhost:1100/api/v1/question/adminApproved")
      .then((response) => {
        setPosts(response.data);
      });
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

  // DATE FILTERS

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

    if (selectedDateRange === "today") {
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
    } else if (selectedDateRange === "yesterday") {
      startDate.setDate(currentDate.getDate() - 1);
      startDate.setHours(0, 0, 0, 0);
      endDate.setDate(currentDate.getDate() - 1);
      endDate.setHours(23, 59, 59, 999);
    } else if (selectedDateRange === "this_week") {
      startDate.setDate(currentDate.getDate() - currentDate.getDay());
      startDate.setHours(0, 0, 0, 0);
      endDate.setDate(currentDate.getDate() - currentDate.getDay() + 6);
      endDate.setHours(23, 59, 59, 999);
    } else if (selectedDateRange === "this_month") {
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
        <div className="bg-black py-10 w-3/5 mx-auto space-y-4 mb-20">
          <h1 className="font-bold text-white">NEW PRODUCT LAUNCH</h1>
          <div className="flex justify-center items-center">
            <img
              src="src\assets\images\banner2.gif"
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
          // className=""
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
            {posts.map((post) => (
              <option value={post.author} key={post._id}>
                {post.author}
              </option>
              // <Post_card postDetails={post} userProf={false} key={post._id} />
            ))}
          </select>

          {/* <input
            type="text"
            value={authorSearchQuery}
            onChange={handleAuthorSearchInputChange}
            className="border border-gray-300 px-4 py-2 w-full rounded-md"
            placeholder="Search for author..."
          /> */}
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
