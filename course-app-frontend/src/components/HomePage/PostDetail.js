import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostDetail = () => {
  const params = useParams();
  let [post, setPost] = useState({});

  useEffect(() => {
    const getPost = async () => {
      const response = await fetch(
        `http://127.0.0.1:8000/posts/${params.post_id}`
      );
      post = await response.json();
      console.log(post);
      console.log(post.title);
      setPost(post);
    };

    getPost();
  }, []);

  return (
    <section>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </section>
  );
};

export default PostDetail;
