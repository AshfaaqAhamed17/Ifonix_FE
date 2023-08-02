// Card to show the question details

import { Link } from "react-router-dom";

interface Post {
  _id: string;
  title: string;
  description: string;
  author: string;
  createdDate: string;
}

interface PostProps {
  postDetails: Post;
  userProf: boolean;
}

function Post({ postDetails, userProf }: PostProps) {
  return (
    <>
      {userProf ? (
        <Link to={`/post/${postDetails._id}`} className="">
          <div
            key={postDetails._id}
            className="bg-slate-50 shadow-md p-4 rounded-lg my-4"
          >
            <p>{postDetails.description}</p>
          </div>
        </Link>
      ) : (
        <div
          key={postDetails._id}
          className="border border-gray-300 p-4 rounded-lg mx-auto max-w-2xl"
        >
          <Link to={`/post/${postDetails._id}`} className="">
            <p className="text-right text-sm text-gray-400">
              {postDetails.createdDate.split("T")[0]}
            </p>
            <h3 className="text-xl font-semibold mb-2">{postDetails.title}</h3>
            <p className="text-lg mb-2">{postDetails.description}</p>
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
