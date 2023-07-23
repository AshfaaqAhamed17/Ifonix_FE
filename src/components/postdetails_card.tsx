import DeleteIcon from "@mui/icons-material/Delete";

interface Answer {
  id: number;
  postId: number;
  content: string;
  author: string;
}

interface answerProps {
  answer: Answer;
  isUserProf: boolean;
}

const postdetails = ({ answer, isUserProf }: answerProps) => {
  const handleDeleteAnswer = (answerId: number) => {
    console.log("Deleting answer with ID " + answerId);
    // ... (handle delete answer logic here)
  };

  return (
    <div
      key={answer.id}
      className="bg-white shadow-md p-4 rounded-lg flex flex-col"
    >
      <p className="mb-2">{answer.content}</p>
      <p className="text-sm text-gray-500">Author: {answer.author}</p>
      <button
        // className="text-red-500 mt-2 flex items-center self-end"
        className={`${isUserProf? 'hidden': ''} text-red-500 mt-2 flex items-center self-end `}

        onClick={() => handleDeleteAnswer(answer.id)}
      >
        <span className="material-icons mr-1">
          <DeleteIcon />
        </span>{" "}
      </button>
    </div>
  );
};

export default postdetails;
