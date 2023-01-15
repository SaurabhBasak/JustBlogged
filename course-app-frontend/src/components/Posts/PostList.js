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
      <ul className="mx-14 grid grid-cols-2">
        {props.posts.map((post) => (
          <div key={post.id} className="mx-24">
            <li className="py-8 antialiased">
              <div className="inline-flex pb-2">
                <Link to={`/posts/${post.id}`}>
                  <h1 className="pr-4 text-xl font-medium hover:underline">
                    {post.title}
                  </h1>
                </Link>
                <RelativeTime datetime={post.date} />
              </div>
              <p className="overflow-hidden text-ellipsis">{post.body}</p>
            </li>
            <hr></hr>
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
