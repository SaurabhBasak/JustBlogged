import React, { useEffect } from "react";
import RelativeTime from "./RelativeTime";

function PostList(props) {
  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch("http://127.0.0.1:8000/");
      const posts = await response.json();
      props.setList(posts);
    };

    getPosts();
  }, []);

  return (
    <div>
      <ul>
        {props.posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <RelativeTime datetime={post.date} />
            <p>{post.body}</p>
            <hr></hr>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
