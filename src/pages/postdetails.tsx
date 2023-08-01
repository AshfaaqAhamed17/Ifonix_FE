// PostDetails.tsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import DeleteIcon from "@mui/icons-material/Delete";
import { Send } from "@mui/icons-material";
import PostDetails_Card from "../components/postdetails_card";
import axios from "axios";
import { Button, TextField, Box } from "@mui/material";
import Swal from "sweetalert2";

interface Post {
  _id: string;
  title: string;
  description: string;
  author: string;
  authorId: string;
  createdDate: string;
}

interface Answer {
  _id: string;
  postId: string;
  answer: string;
  author: string;
  authorId: string;
  createdDate: string;
}

function PostDetails() {
  let { id } = useParams();
  const postId = id;
  const history = useNavigate();
  console.log("Post ID: >>>> " + id);
  console.log("Post ID: >>>> " + postId);

  if (!id) {
    // Handle the case where id is undefined or empty
    return <div>Invalid post ID.</div>;
  }

  const [post, setPost] = useState<Post | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [answerText, setAnswerText] = useState("");

  useEffect(() => {
    // Fetch the list of questions from the server
    axios
      .get("http://13.127.206.58:1100/api/v1/question/adminApproved")
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
            .get(`http://13.127.206.58:1100/api/v1/answer/approved/${postId}`)
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
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delte this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.delete(
          `http://13.127.206.58:1100/api/v1/question/${postId}`
        );
        if (response) {
          console.log("QUESTION deleted successfully!");
          Swal.fire({
            text: "Your question has been deleted.",
            icon: "warning",
            showConfirmButton: false,
            timer: 3000,
          }).then(() => {
            history("/home");
          });
        }
      }
    });
  };

  const handleSubmitAnswer = async () => {
    console.log("post select for answer:", postId);
    console.log("Answer submitted:", answerText);
    try {
      const answerData = {
        questionId: postId,
        answer: answerText,
        author: localStorage.getItem("userId"),
      };
      const response = await axios.post(
        "http://13.127.206.58:1100/api/v1/answer/create",
        answerData
      );
      console.log("Uploading question:", answerText); // Log the question value
      if (response) {
        console.log("Comment uploaded successfully!");
        Swal.fire({
          icon: "success",
          title: "Comment has been uploaded successfully!",
          showConfirmButton: false,
          timer: 3000,
        }).then(() => {
          setAnswerText("");
          setAnswers([...answers, response.data]);
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update the question state when the user types in the TextField
    setAnswerText(event.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="p-4 text-center min-h-screen">
        <div>
          {/* <h1 className="mb-4">{post.title}</h1> */}
          <p className="text-right text-sm text-gray-400">
            {post.createdDate.split("T")[0]}
          </p>
          <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
          <p>{post.description}</p>
          <p>Author: {post.author}</p>
        </div>
        <div className="flex justify-end">
          <button
            className={`text-red-500 mt-2 flex items-center ${
              localStorage.getItem("role") === "admin" ||
              localStorage.getItem("userId") === post.authorId
                ? ""
                : "hidden"
            }    
            `}
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
      <Box className="sticky bottom-0 py-4 bg-white box w-full shadow-lg shadow-black">
        <Box display="flex" alignItems="center" justifyContent="center">
          <TextField
            multiline // Set multiline to true to enable the expanding behavior
            minRows={1} // Adjust the number of rows displayed
            maxRows={4} // Adjust the number of rows displayed
            className="border border-gray-300 rounded-md flex-grow-1 w-1/2"
            placeholder="Type your answer here..."
            value={answerText}
            onChange={handleChangeAnswer}
          />
          <Button
            variant="contained"
            disabled={!answerText}
            className={`ml-2 py-4 bg-blue-500 text-white rounded-full hover:bg-blue-600`}
            onClick={handleSubmitAnswer}
            style={{ minWidth: "48px" }} // Set a minimum width for the circular button
          >
            <Send />
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default PostDetails;
