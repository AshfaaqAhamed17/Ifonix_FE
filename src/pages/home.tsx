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
}

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  // const dummyPosts: Post[] = [
  //   {
  //     id: 1,
  //     title: "Frontend",
  //     content: "Why is Front end development easy?",
  //     author: "John Doe",
  //   },
  //   {
  //     id: 2,
  //     title: "Backend",
  //     content: "Why is Back end development easy?",
  //     author: "Jane Smith",
  //   },
  //   {
  //     id: 3,
  //     title: "Cyber",
  //     content: "Cyber security is important?",
  //     author: "Peter Parker",
  //   },
  //   {
  //     id: 4,
  //     title: "Deployment",
  //     content: "How to deploy a website?",
  //     author: "Robert Downey Jr.",
  //   },
  //   // Add more dummy posts here as needed
  // ];

  // State variable for the search query
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  // Filter the posts based on the search query
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 space-y-5 text-center">
        <h1 className="text-3xl font-bold">
          Welcome to the Question and Answer Forum!
        </h1>
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
