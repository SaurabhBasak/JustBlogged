import React, { useState } from "react";
import PostForm from "./PostForm";
import PostList from "./PostList";

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
    <div>
      {!isPosting && <button  onClick={startPostingHandler}>Create</button>}
      {isPosting && <PostForm createPost={createPostHandler} onCancel={stopPostingHandler} />}
      <PostList setList={setPostList} posts={postList} />
    </div>
  );
}

export default Homepage;
