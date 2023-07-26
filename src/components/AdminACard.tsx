import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

interface Answer {
  id: number;
  postId: number;
  content: string;
  author: string;
}

interface PostProps {
  answerDetails: Answer;
  // answerDetails: Answer;
}

function AdminACard({ answerDetails }: PostProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleCloseModal = () => {
    console.log("Feedback sent.", feedback);
    setShowModal(false);
    setFeedback("");
  };

  const handleApproveAnswer = (answerId: number) => {
    // Logic to handle approving the answer
    console.log(`Answer with ID ${answerId} has been approved.`);
  };

  const handleRejectAnswer = (answer: Answer) => {
    console.log("Answer: ", answer);
    setSelectedAnswer(answer);
    setShowModal(true);
  };

  return (
    <>
      <div
        key={answerDetails.id}
        className="p-4 border border-gray-300 mb-4 rounded-md shadow-md"
      >
        <p>{answerDetails.content}</p>
        <p>Author: {answerDetails.author}</p>
        <div className="flex justify-between mt-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md"
            onClick={() => handleApproveAnswer(answerDetails.id)}
          >
            Approve Answer
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={() => handleRejectAnswer(answerDetails)}
          >
            Reject Answer
          </button>
        </div>
      </div>

      <Dialog
        open={showModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Feedback for Rejected Answer</DialogTitle>
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
              setSelectedAnswer(null);
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

export default AdminACard;
