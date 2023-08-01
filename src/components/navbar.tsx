import React, { useState, useEffect } from "react";
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
import api from "../api";
import Swal from "sweetalert2";
import { NotificationImportant } from "@mui/icons-material"; // Import the bell icon

interface Question {
  _id: string;
  title: string;
  description: string;
  author: string;
  IsRejected: boolean;
  rejectedfeedback: string;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState(""); // State to store the question value
  const [title, setTitle] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<Question[]>([]);

  // const userId = localStorage.getItem("userId");
  useEffect(() => {
    api
      .get(`/question/rejectedfeedback/${localStorage.getItem("userId")}`)
      .then((response) => {
        setNotifications(response.data);
      });
  }, []);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setQuestion("");
    setTitle("");
    setOpen(false);
  };

  const handleUploadQuestion = async () => {
    try {
      const data = {
        title: title,
        description: question,
        author: localStorage.getItem("userId"),
        IsAdminApproved:
          localStorage.getItem("role") === "admin" ? true : false,
      };
      const response = await api.post("/question/create", data);
      console.log("Uploading question:", question); // Log the question value
      if (response) {
        console.log("Question uploaded successfully!");
        handleCloseModal();
        Swal.fire({
          icon: "success",
          title:
            localStorage.getItem("role") === "user"
              ? "Question has been sent for approval!"
              : "Question has been uploaded successfully!",
          showConfirmButton: false,
          timer: 3000,
        }).then(() => {
          location.reload();
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeQuestion = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update the question state when the user types in the TextField
    setQuestion(event.target.value);
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update the question state when the user types in the TextField
    setTitle(event.target.value);
  };

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <nav className="bg-slate-100 flex justify-between backdrop-blur-3xl py-2 w-screen">
        <div className="flex items-center ms-5">
          <NavLink to="/">
            <h1 className="text-4xl font-bold text-slate-700 hover:text-blue-600">
              Apple House
            </h1>
          </NavLink>
          {/* <div className="mx-5"></div> */}
          <ul className="flex items-center">
            {localStorage.getItem("role") === "admin" ? (
              <NavLink to="/admin">
                <li className="mx-5 text-gray-500">Admin Dashboard</li>
              </NavLink>
            ) : null}
            <NavLink to="/">
              <li className="mx-5 text-gray-500">Home</li>
            </NavLink>
          </ul>
        </div>

        {/* <div className="flex items-center">

        </div> */}

        <div className="flex mx-10 items-center space-x-4">
          <div>
            <button
              color="primary"
              onClick={handleOpen}
              className={`${notifications.length > 0 ? "" : "hidden"}    
             `}
            >
              <NotificationImportant className="text-red-500" />{" "}
              {/* Bell icon */}
            </button>
            <Dialog
              open={modalOpen}
              onClose={handleClose}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle textAlign={"center"}>Notifications</DialogTitle>
              {notifications.map((notification) => (
                <DialogContent>
                  <div
                    key={notification._id}
                    className="p-4 border border-gray-300 mb-4"
                  >
                    <strong>
                      <p>Question Title: {notification.title}</p>
                    </strong>
                    <p>Question: {notification.description}</p>
                    <p>
                      Rejected Feedback:{" "}
                      <span style={{ color: "red" }}>
                        {notification.rejectedfeedback}
                      </span>
                    </p>
                  </div>
                </DialogContent>
              ))}
              {/* Add your div content here */}
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </div>
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
                  label="Title"
                  type="text"
                  fullWidth
                  value={title} // Bind the value of the TextField to the question state
                  onChange={handleChangeTitle} // Handle the change event to update the question state
                />
              </DialogContent>
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
                <Button
                  disabled={!question || !title}
                  onClick={handleUploadQuestion}
                  color="primary"
                >
                  Upload
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <div>
            <NavLink
              to={`/user/${localStorage.getItem("userId")}`}
              className="flex items-center"
            >
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
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <strong>
                <p>{localStorage.getItem("userName")}</p>
              </strong>
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
