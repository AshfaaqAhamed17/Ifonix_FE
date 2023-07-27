// PostDetails.tsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import DeleteIcon from "@mui/icons-material/Delete";
import PostDetails_Card from "../components/postdetails_card";
import axios from "axios";

interface Post {
  _id: string;
  title: string;
  description: string;
  author: string;
}

interface Answer {
  _id: string;
  postId: string;
  description: string;
  author: string;
}

function PostDetails() {
  let { id } = useParams();
  const postId = id;

  console.log("Post ID: >>>> " + id);
  console.log("Post ID: >>>> " + postId);

  if (!id) {
    // Handle the case where id is undefined or empty
    return <div>Invalid post ID.</div>;
  }

  // Dummy array of posts
  // const dummyPosts: Post[] = [
  //   {
  //     id: 1,
  //     title: "Sample Post 1",
  //     content: "This is the content of Sample Post 1.",
  //     author: "John Doe",
  //   },
  //   {
  //     id: 2,
  //     title: "Sample Post 2",
  //     content: "This is the content of Sample Post 2.",
  //     author: "Jane Smith",
  //   },
  //   {
  //     id: 3,
  //     title: "Sample Post 3",
  //     content: "This is the content of Sample Post 3.",
  //     author: "Peter Parker",
  //   },
  //   {
  //     id: 4,
  //     title: "Sample Post 4",
  //     content: "This is the content of Sample Post 4.",
  //     author: "Robert Downey Jr.",
  //   },
  //   // Add more dummy posts here as needed
  // ];

  // Dummy array of answers related to the posts
  // const dummyAnswers: Answer[] = [
  //   {
  //     _id: "1",
  //     postId: "64c219e99471757c7060a93b",
  //     description: "This is the first answer for Sample Post 1.",
  //     author: "Alice",
  //   },
  //   {
  //     _id: "2",
  //     postId: "64c21e959471757c7060a93c",
  //     description: "This is the second answer for Sample Post 1.",
  //     author: "Bob",
  //   },
  //   {
  //     _id: "3",
  //     postId: "64c219e99471757c7060a93b",
  //     description: "This is the first answer for Sample Post 2.",
  //     author: "Charlie",
  //   },
  //   {
  //     _id: "4",
  //     postId: "64c21e959471757c7060a93c",
  //     description: "This is the first answer for Sample Post 4.",
  //     author: "Charlie",
  //   },
  //   {
  //     _id: "5",
  //     postId: "64c219e99471757c7060a93b",
  //     description: "This is the first answer for Sample Post 4.",
  //     author: "Charlie",
  //   },
  //   {
  //     _id: "6",
  //     postId: "64c21e959471757c7060a93c",
  //     description: "This is the first answer for Sample Post 2.",
  //     author: "Charlie",
  //   },
  //   {
  //     _id: "7",
  //     postId: "64c219e99471757c7060a93b",
  //     description: "This is the first answer for Sample Post 3.",
  //     author: "Charlie",
  //   },
  //   // Add more dummy answers here as needed
  // ];

  const [post, setPost] = useState<Post | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);

  // useEffect(() => {
  //   // Fetch approved posts from the backend API (replace 'YOUR_API_ENDPOINT' with the actual endpoint)
  //   axios.get("http://localhost:5000/posts").then((response) => {
  //     console.log(response.data);
  //   }

  //   // For this example, we're setting the dummy post and answers as the data fetched from the backend API
  //   setPost(dummyPosts.find((p) => p.id === postId) || null);
  //   setAnswers(dummyAnswers.filter((answer) => answer.postId === postId));
  // }, [postId]);

  // useEffect(() => {
  //   // Fetch approved posts from the backend API (replace 'YOUR_API_ENDPOINT' with the actual endpoint)
  //   axios
  //     .get("http://localhost:1100/api/v1/question/adminApproved")
  //     .then((response) => {
  //       setPost(
  //         response.data.find((p: { id: string }) => p.id === postId) || null
  //         // find((p: { id) => p.id === postId) || null
  //       );
  //     });
  //   axios
  //     .get(`http://localhost:1100/api/v1/answer/${postId}`)
  //     .then((response) => {
  //       setPost(
  //         response.data.find((p: { _id: string }) => p._id === postId) || null
  //         // find((p: { id) => p.id === postId) || null
  //       );
  //     });
  //   // setAnswers(dummyAnswers.filter((answer) => answer.postId === postId));
  //   // setAnswers(dummyAnswers.filter((answer) => answer.postId === parseInt(postId, 10)));
  // }, [postId]);

  useEffect(() => {
    // Fetch the list of questions from the server
    axios
      .get("http://localhost:1100/api/v1/question/adminApproved")
      .then((response) => {
        // Find the question with the matching postId
        const foundPost = response.data.find(
          (p: { _id: string }) => p._id === postId
        );
        console.log("foundPost", foundPost);
        setPost(foundPost || null);

        // If the post is found, fetch the answers associated with the post
        if (foundPost) {
          axios
            .get(`http://localhost:1100/api/v1/answer/${postId}`)
            .then((answersResponse) => {
              setAnswers(answersResponse.data);
            })
            .catch((error) => {
              console.error("Error fetching answers:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }, [postId]);
  if (!post) {
    return <div>Loading...</div>;
  }

  const handleDeletePost = (postId: string) => {
    console.log("Deleting post with ID " + postId);
    // ... (handle delete post logic here)
  };

  return (
    <>
      <Navbar />
      <div className="p-4 text-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
          <p>{post.description}</p>
          <p>Author: {post.author}</p>
        </div>
        <div className="flex justify-end">
          <button
            className={`text-red-500 mt-2 flex items-center `}
            onClick={() => handleDeletePost(post._id)}
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
                key={answer._id}
                answer={answer}
                isUserProf={false}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default PostDetails;
