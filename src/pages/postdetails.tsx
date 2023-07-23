// PostDetails.tsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import DeleteIcon from "@mui/icons-material/Delete";
import PostDetails_Card from "../components/postdetails_card";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
}

interface Answer {
  id: number;
  postId: number;
  content: string;
  author: string;
}

const PostDetails = () => {
  const { id } = useParams<{ id?: string }>(); // Add a '?' to make id optional

  if (!id) {
    // Handle the case where id is undefined or empty
    return <div>Invalid post ID.</div>;
  }

  const postId = parseInt(id, 10);

  // Dummy array of posts
  const dummyPosts: Post[] = [
    {
      id: 1,
      title: "Sample Post 1",
      content: "This is the content of Sample Post 1.",
      author: "John Doe",
    },
    {
      id: 2,
      title: "Sample Post 2",
      content: "This is the content of Sample Post 2.",
      author: "Jane Smith",
    },
    {
      id: 3,
      title: "Sample Post 3",
      content: "This is the content of Sample Post 3.",
      author: "Peter Parker",
    },
    {
      id: 4,
      title: "Sample Post 4",
      content: "This is the content of Sample Post 4.",
      author: "Robert Downey Jr.",
    },

    // Add more dummy posts here as needed
  ];

  // Dummy array of answers related to the posts
  const dummyAnswers: Answer[] = [
    {
      id: 1,
      postId: 1,
      content: "This is the first answer for Sample Post 1.",
      author: "Alice",
    },
    {
      id: 2,
      postId: 1,
      content: "This is the second answer for Sample Post 1.",
      author: "Bob",
    },
    {
      id: 3,
      postId: 2,
      content: "This is the first answer for Sample Post 2.",
      author: "Charlie",
    },
    {
      id: 4,
      postId: 4,
      content: "This is the first answer for Sample Post 4.",
      author: "Charlie",
    },
    {
      id: 5,
      postId: 4,
      content: "This is the first answer for Sample Post 4.",
      author: "Charlie",
    },
    {
      id: 6,
      postId: 2,
      content: "This is the first answer for Sample Post 2.",
      author: "Charlie",
    },
    {
      id: 7,
      postId: 3,
      content: "This is the first answer for Sample Post 3.",
      author: "Charlie",
    },
    // Add more dummy answers here as needed
  ];

  const [post, setPost] = useState<Post | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    // For this example, we're setting the dummy post and answers as the data fetched from the backend API
    setPost(dummyPosts.find((p) => p.id === postId) || null);
    setAnswers(dummyAnswers.filter((answer) => answer.postId === postId));
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const handleDeletePost = (postId: number) => {
    console.log("Deleting post with ID " + postId);
    // ... (handle delete post logic here)
  };

  return (
    <>
      <Navbar />
      <div className="p-4 text-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
          <p>{post.content}</p>
          <p>Author: {post.author}</p>
        </div>
        <div className="flex justify-end">
          <button
            className={`text-red-500 mt-2 flex items-center `}
            onClick={() => handleDeletePost(post.id)}
          >
            {/* <p className={`${showFullPost? 'text-lg': 'text-sm'} mb-2`}>{postDetails.content}</p> */}
            <DeleteIcon />
            <span className="material-icons mr-1">Delete Post</span>{" "}
          </button>
        </div>
        <hr className="my-4" />
        <h3 className="text-xl font-bold mb-2">Answers:</h3>
        {answers.length === 0 ? (
          <p>No answers available.</p>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {answers.map((answer) => (
              <PostDetails_Card
                key={answer.id}
                answer={answer}
                isUserProf={false}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PostDetails;
