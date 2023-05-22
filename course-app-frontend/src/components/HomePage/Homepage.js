import React, { useState } from "react";
import PostForm from "../Posts/PostForm";
import PostList from "../Posts/PostList";
import { getAuthToken } from "../Authentication/AuthToken";
import { Link, useRouteLoaderData } from "react-router-dom";

function Homepage() {
  const token = useRouteLoaderData("root");
  const [isPosting, setIsPosting] = useState(false);
  const [postList, setPostList] = useState([]);

  const addPostToList = (postInfo) => {
    setPostList((prevPostList) => {
      const updatedList = [...prevPostList];
      updatedList.unshift(postInfo);
      return updatedList;
    });
  };

  async function createPostHandler(postInfo) {
    const token = getAuthToken();
    const response = await fetch("http://127.0.0.1:8000/post", {
      method: "POST",
      body: JSON.stringify(postInfo),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = await response.json();
    addPostToList(data);
  }

  const startPostingHandler = () => {
    setIsPosting(true);
  };

  const stopPostingHandler = () => {
    setIsPosting(false);
  };

  return (
    <div className="m-8 bg-neutral-800">
      {!isPosting && (
        <div className="flex justify-center pb-6">
          {token ? (
            <button
              className="rounded-full bg-purple-600 px-3 py-2 font-mono font-semibold text-white"
              onClick={startPostingHandler}
            >
              Create
            </button>
          ) : (
            <Link
              to="/auth?mode=login"
              className="rounded-full bg-purple-600 px-3 py-2 font-mono font-semibold text-white"
            >
              Create
            </Link>
          )}
        </div>
      )}

      {isPosting && (
        <PostForm
          createPost={createPostHandler}
          onCancel={stopPostingHandler}
        />
      )}
      <PostList setList={setPostList} posts={postList} />
    </div>
  );
}

export default Homepage;
