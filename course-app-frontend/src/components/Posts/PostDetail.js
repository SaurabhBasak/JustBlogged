import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CommentsList from "../Comments/CommentsList";
import CommentForm from "../Comments/CommentForm";

const PostDetail = () => {
  const [isCommenting, setIsCommenting] = useState(false);
  const params = useParams();
  let [post, setPost] = useState({});
  const [commentsList, setCommentsList] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      const response = await fetch(
        `http://127.0.0.1:8000/posts/${params.post_id}`
      );
      post = await response.json();
      setPost(post);
      setCommentsList(post.comments);
    };

    getPost();
  }, []);

  const addCommentToList = (commentBody) => {
    setCommentsList((prevCommentList) => {
      const updatedList = [...prevCommentList];
      updatedList.unshift(commentBody);
      return updatedList;
    });
  };

  const createCommentHandler = async (commentBody) => {
    const response = await fetch(
      `http://127.0.0.1:8000/posts/${params.post_id}`,
      {
        method: "POST",
        body: JSON.stringify(commentBody),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const comment = await response.json();
    addCommentToList(comment);
  };

  const startCommentingHandler = () => {
    setIsCommenting(true);
  };

  const stopCommentingHandler = () => {
    setIsCommenting(false);
  };

  return (
    <section className="m-8 text-white">
      <div className="mb-6 flex justify-center">
        <Link
          className="rounded-full bg-purple-600 px-3 py-2 font-mono font-semibold text-white"
          to="/posts"
        >
          Home
        </Link>
      </div>
      <div className="m-auto min-w-min max-w-xl rounded-xl bg-purple-500/40">
        <div className="flex justify-center pt-8">
          <h2 className="rounded-xl bg-purple-700/70 py-4 px-20 text-2xl font-bold">
            {post.title}
          </h2>
        </div>
        <div className="flex justify-center">
          <p>{post.body}</p>
        </div>
      </div>
      {!isCommenting && (
        <button onClick={startCommentingHandler}>Comment</button>
      )}
      {isCommenting && (
        <CommentForm
          post_id={params.post_id}
          createComment={createCommentHandler}
          onCancel={stopCommentingHandler}
        />
      )}
      <CommentsList post_id={params.post_id} comments={commentsList} />
    </section>
  );
};

export default PostDetail;
