import React, { useEffect } from "react";
import RelativeTime from "../HomePage/RelativeTime";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

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
      <ul className="m-auto grid max-w-7xl grid-cols-3 gap-x-24 gap-y-12">
        {props.posts.map((post) => (
          <div key={post.id} className="rounded-xl bg-purple-500/40">
            <li className="p-8 antialiased">
              <div className="inline-flex pb-2">
                <Link to={`/posts/${post.id}`}>
                  <h1 className="pr-4 text-xl font-medium text-white hover:underline">
                    {post.title}
                  </h1>
                </Link>
                <RelativeTime datetime={post.date} />
              </div>
              <p className="truncate text-white">{post.body}</p>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

PostList.propTypes = {
  setList: PropTypes.func,
  posts: PropTypes.array,
}

export default PostList;
