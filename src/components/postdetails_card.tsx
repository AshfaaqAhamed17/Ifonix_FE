import DeleteIcon from "@mui/icons-material/Delete";
import api from "../api";
import Swal from "sweetalert2";

interface Answer {
  _id: string;
  postId: string;
  answer: string;
  author: string;
  authorId: string;
  createdDate: string;
}

interface answerProps {
  answer: Answer;
  isUserProf: boolean;
}

function postdetails({ answer, isUserProf }: answerProps) {
  const handleDeleteAnswer = async (answerId: string) => {
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
        const response = await api.delete(`/answer/${answerId}`);
        if (response) {
          console.log("QUESTION deleted successfully!");
          Swal.fire({
            text: "Your question has been deleted.",
            icon: "warning",
            showConfirmButton: false,
            timer: 3000,
          }).then(() => {
            location.reload();
          });
        }
      }
    });
  };

  return (
    <div
      key={answer._id}
      className="bg-white shadow-md p-4 rounded-lg flex flex-col"
    >
      <p className="text-right text-sm text-gray-400">
        {answer.createdDate.split("T")[0]}
      </p>
      <p className="mb-2">{answer.answer}</p>
      <p className="text-sm text-gray-500">Author: {answer.author}</p>
      <button
        // className="text-red-500 mt-2 flex items-center self-end"
        className={`${
          isUserProf ? "hidden" : ""
        } text-red-500 mt-2 flex items-center self-end 
      
        ${
          localStorage.getItem("role") === "admin" ||
          localStorage.getItem("userId") === answer.authorId
            ? ""
            : "hidden"
        }    `}
        onClick={() => handleDeleteAnswer(answer._id)}
      >
        <span className="material-icons mr-1">
          <DeleteIcon />
        </span>{" "}
      </button>
    </div>
  );
}

export default postdetails;
