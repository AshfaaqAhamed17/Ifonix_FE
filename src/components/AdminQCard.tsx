import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

interface Question {
  _id: string;
  title: string;
  description: string;
  author: string;
  IsRejected: boolean;
  rejectedfeedback: string;
}

interface PostProps {
  questionDetails: Question;
}

function AdminQCard({ questionDetails }: PostProps) {
  const [_selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleCloseModal = () => {
    setShowModal(false);
    setFeedback("");
  };

  const handleRejectAndCloseModal = async (postId: string) => {
    const response = await axios.put(
      `http://13.127.206.58:1100/api/v1/question/reject/${postId}`,
      { rejectedfeedback: feedback, IsRejected: true }
    );
    if (response) {
      console.log("Feedback sent.", feedback);
      setShowModal(false);
      setFeedback("");
      Swal.fire({
        icon: "success",
        title: "Feedback sent successfully!",
        showConfirmButton: false,
        timer: 3000,
      }).then(() => {
        location.reload();
      });
    }
  };

  const handleApprovePost = async (postId: string) => {
    // Logic to handle approving the post
    const response = await axios.put(
      `http://13.127.206.58:1100/api/v1/question/approve/${postId}`
    );
    if (response) {
      console.log(`Post with ID ${postId} has been approved.`);
      Swal.fire({
        icon: "success",
        title: "Post has been approved!",
        showConfirmButton: false,
        timer: 3000,
      }).then(() => {
        location.reload();
      });
    }
  };

  const handleRejectQuestion = (question: Question) => {
    console.log("Question: ", question);
    setSelectedQuestion(question);
    setShowModal(true);
  };

  const handleDeletePost = async (postId: string) => {
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
            timer: 5000,
          }).then(() => {
            location.reload();
          });
        }
      }
    });
  };

  return (
    <>
      <div
        key={questionDetails._id}
        className="p-4 border border-gray-300 mb-4 rounded-md shadow-md"
      >
        <p className="text-lg mb-2">Question Title: {questionDetails.title}</p>
        <p className="text-lg mb-2">Question: {questionDetails.description}</p>

        {questionDetails.rejectedfeedback ? (
          <p className="text-lg mb-2">
            Rejected feedback: {questionDetails.rejectedfeedback}
          </p>
        ) : (
          ""
        )}

        <p className="text-sm text-gray-500">
          Author: {questionDetails.author}
        </p>
        <div className="flex justify-between mt-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md"
            onClick={() => handleApprovePost(questionDetails._id)}
          >
            Approve Post
          </button>
          <button
            className={`bg-red-500 text-white px-4 py-2 rounded-md ${
              questionDetails.IsRejected ? "hidden" : ""
            }    
            `}
            onClick={() => handleRejectQuestion(questionDetails)}
          >
            Reject Post
          </button>
          <button
            // className="text-red-500 mt-2 flex items-center self-end"
            className={`text-center text-red-500 hover:text-white hover:bg-red-500 `}
            onClick={() => handleDeletePost(questionDetails._id)}
          >
            <span className="material-icons">
              <DeleteIcon />
            </span>{" "}
          </button>
        </div>
      </div>
      <Dialog
        open={showModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Feedback for Rejected Post</DialogTitle>
        <DialogContent>
          <TextField
            style={{ marginTop: "0.5rem" }}
            autoFocus
            label="Feedback"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
          <Button
            disabled={feedback === "" ? true : false}
            onClick={() => {
              setSelectedQuestion(null);
              handleRejectAndCloseModal(questionDetails._id);
            }}
            color="error"
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AdminQCard;
