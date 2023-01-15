import React, { useState } from "react";
import PostForm from "../Posts/PostForm";
import PostList from "../Posts/PostList";

function Homepage() {
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
    const response = await fetch("http://127.0.0.1:8000/post", {
      method: "POST",
      body: JSON.stringify(postInfo),
      headers: {
        "Content-Type": "application/json",
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
    <div className="m-8">
      {!isPosting && (
        <div className="flex justify-center">
          <button
            className="px-3 py-2 bg-cyan-600 text-white font-semibold font-mono rounded-full"
            onClick={startPostingHandler}
          >
            Create
          </button>
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
