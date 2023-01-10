import React, { useEffect } from "react";
import RelativeTime from "./RelativeTime";
import { Link } from "react-router-dom";

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
            <Link
              to={`/posts/${post.id}`}
              postTitle={post.title}
              postBody={post.body}
            >
              <h1>{post.title}</h1>
            </Link>
            <div>
              <RelativeTime datetime={post.date} />
              <p>{post.body}</p>
            </div>
            <hr></hr>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
