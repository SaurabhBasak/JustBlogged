import React, { useState } from "react";
import PropTypes from 'prop-types';

function PostForm(props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    props.createPost({
      title,
      body,
    });

    setTitle("");
    setBody("");
    props.onCancel();
  };

  return (
    <div className="m-auto mb-8 flex max-w-sm justify-center rounded-xl bg-purple-500/50 py-6">
      <form onSubmit={submitHandler}>
        <div className="items-center">
          <div className="flex flex-col pb-4 text-white">
            <input
              className="rounded-md px-2 py-1 text-black"
              type="text"
              placeholder="Title"
              value={title}
              required
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            ></input>
          </div>
          <div className="flex flex-col pb-4 text-white">
            <input
              className="rounded-md px-2 py-1 text-black"
              type="text"
              placeholder="Subject..."
              value={body}
              required
              onChange={(event) => {
                setBody(event.target.value);
              }}
            ></input>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button className="rounded-full bg-purple-900 px-2 py-1 font-mono text-base font-semibold text-white" type="button" onClick={props.onCancel}>
              Cancel
            </button>
            <button className="rounded-full bg-purple-900 px-2 py-1 font-mono text-base font-semibold text-white" type="submit">Create</button>
          </div>
        </div>
      </form>
    </div>
  );
}

PostForm.propTypes = {
  createPost: PropTypes.func,
  onCancel: PropTypes.func,
}

export default PostForm;
