import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

interface Answer {
  _id: string;
  postId: string;
  answer: string;
  author: string;
  authorId: string;
}

interface answerProps {
  answer: Answer;
  isUserProf: boolean;
}

function postdetails({ answer, isUserProf }: answerProps) {
  console.log("Answer ID: >>>> " + answer._id);
  console.log("Answer: >>>> " + answer.answer);
  console.log("Answer Author: >>>> " + answer.author);
  console.log("Answer Author ID: >>>> " + answer.authorId);
  console.log("isUserProf: >>>> " + isUserProf);

  const handleDeleteAnswer = async (answerId: string) => {
    const response = await axios.delete(
      `http://localhost:1100/api/v1/answer/${answerId}`
    );
    if (response) {
      console.log("Answer deleted successfully!");
      alert("Answer deleted successfully!");
      location.reload();
    } else {
      console.log("Answer not deleted.");
      alert("Answer not deleted.");
    }
    console.log("Deleting answer with ID " + answerId);
    // ... (handle delete answer logic here)
  };

  return (
    <div
      key={answer._id}
      className="bg-white shadow-md p-4 rounded-lg flex flex-col"
    >
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
