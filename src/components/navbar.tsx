import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Upload } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

function Navbar() {
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const [question, setQuestion] = useState(""); // State to store the question value

  const handleUploadQuestion = () => {
    // Handle the upload question logic here
    // For example, you can send the question to the backend or store it in state
    console.log("Uploading question:", question); // Log the question value
    handleCloseModal();
  };

  const handleChangeQuestion = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update the question state when the user types in the TextField
    setQuestion(event.target.value);
  };

  return (
    <>
      <nav className="bg-slate-100 flex justify-between backdrop-blur-3xl py-2 w-screen">
        <div className="flex items-center">
          <div className="mx-10"></div>
          <ul className="flex items-center">
            <NavLink to="/">
              <li className="mx-5 text-gray-500">Home</li>
            </NavLink>
            <NavLink to="/about">
              <li className="mx-5 text-gray-500">About</li>
            </NavLink>
          </ul>
        </div>
        <div className="flex mx-10 items-center space-x-4">
          <div>
            <button
              className="bg-slate-50 text-gray-500 py-2 px-4 rounded-lg shadow-md"
              onClick={handleOpenModal}
            >
              Upload <Upload />
            </button>

            <Dialog
              open={open}
              onClose={handleCloseModal}
              maxWidth="md"
              fullWidth
            >
              <DialogTitle>Upload Question</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Question"
                  type="text"
                  fullWidth
                  value={question} // Bind the value of the TextField to the question state
                  onChange={handleChangeQuestion} // Handle the change event to update the question state
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseModal} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleUploadQuestion} color="primary">
                  Upload
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <div>
            <NavLink to="/user/1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
