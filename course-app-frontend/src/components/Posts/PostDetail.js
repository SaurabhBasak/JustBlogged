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
    <section className="m-8">
      <div className="flex justify-center">
        <Link
          className="rounded-full bg-cyan-600 px-3 py-2 font-mono font-semibold text-white"
          to="/posts"
        >
          Home
        </Link>
      </div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
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
