import { Link } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
}

interface PostProps {
  postDetails: Post;
  userProf: boolean;
}

function Post({ postDetails, userProf }: PostProps) {
  return (
    <>
      {userProf ? (
        <Link to={`/post/${postDetails.id}`} className="">
          <div
            key={postDetails.id}
            className="bg-slate-50 shadow-md p-4 rounded-lg my-4"
          >
            <p>{postDetails.content}</p>
          </div>
        </Link>
      ) : (
        <div
          key={postDetails.id}
          className="border border-gray-300 p-4 rounded-lg mx-auto max-w-2xl"
        >
          <Link to={`/post/${postDetails.id}`} className="">
            <h3 className="text-xl font-semibold mb-2">{postDetails.title}</h3>
            <p className="text-lg mb-2">{postDetails.content}</p>
            <p className="text-sm text-gray-500">
              Author: {postDetails.author}
            </p>
          </Link>
        </div>
      )}
    </>
  );
}

export default Post;
