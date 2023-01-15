import React, { useEffect } from "react";
import RelativeTime from "../HomePage/RelativeTime";
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
      <ul className="grid grid-cols-2 mr-14 ml-14">
        {props.posts.map((post) => (
          <div className="mr-24 ml-24">
            <li key={post.id} className="py-8 antialiased">
              <div className="inline-flex pb-2">
                <Link to={`/posts/${post.id}`}>
                  <h1 className="pr-4 text-xl font-medium hover:underline">
                    {post.title}
                  </h1>
                </Link>
                <RelativeTime datetime={post.date} />
              </div>
              <p className="text-ellipsis overflow-hidden ...">{post.body}</p>
            </li>
            <hr></hr>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
