import DeleteIcon from "@mui/icons-material/Delete";

interface Answer {
  _id: string;
  postId: string;
  description: string;
  author: string;
}

interface answerProps {
  answer: Answer;
  isUserProf: boolean;
}

function postdetails({ answer, isUserProf }: answerProps) {
  const handleDeleteAnswer = (answerId: string) => {
    console.log("Deleting answer with ID " + answerId);
    // ... (handle delete answer logic here)
  };

  return (
    <div
      key={answer._id}
      className="bg-white shadow-md p-4 rounded-lg flex flex-col"
    >
      <p className="mb-2">{answer.description}</p>
      <p className="text-sm text-gray-500">Author: {answer.author}</p>
      <button
        // className="text-red-500 mt-2 flex items-center self-end"
        className={`${
          isUserProf ? "hidden" : ""
        } text-red-500 mt-2 flex items-center self-end `}
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
