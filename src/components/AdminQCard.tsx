import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

interface Question {
  id: number;
  title: string;
  content: string;
  userId: number;
  approved: boolean;
}

interface PostProps {
  questionDetails: Question;
}

function AdminQCard({ questionDetails }: PostProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleCloseModal = () => {
    console.log("Feedback sent.", feedback);
    setShowModal(false);
    setFeedback("");
  };

  const handleApprovePost = (postId: number) => {
    // Logic to handle approving the post
    console.log(`Post with ID ${postId} has been approved.`);
  };

  const handleRejectQuestion = (question: Question) => {
    console.log("Question: ", question);
    setSelectedQuestion(question);
    setShowModal(true);
  };

  return (
    <>
      <div
        key={questionDetails.id}
        className="p-4 border border-gray-300 mb-4 rounded-md shadow-md"
      >
        <h3 className="text-xl font-bold mb-2">{questionDetails.title}</h3>
        <p className="text-lg mb-2">{questionDetails.content}</p>
        <p className="text-sm text-gray-500">
          Author: {questionDetails.userId}
        </p>
        <div className="flex justify-between mt-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md"
            onClick={() => handleApprovePost(questionDetails.id)}
          >
            Approve Post
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={() => handleRejectQuestion(questionDetails)}
          >
            Reject Post
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
            onClick={() => {
              setSelectedQuestion(null);
              handleCloseModal();
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
