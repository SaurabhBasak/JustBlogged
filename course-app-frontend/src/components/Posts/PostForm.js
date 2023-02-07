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
    <div className="m-auto mb-8 flex max-w-sm justify-center rounded-xl bg-purple-500/40 py-6">
      <form onSubmit={submitHandler}>
        <div className="items-center">
          <div className="flex flex-col">
            <label className="font-semibold">Title</label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              required
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            ></input>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Subject</label>
            <input
              type="text"
              placeholder="Subject"
              value={body}
              required
              onChange={(event) => {
                setBody(event.target.value);
              }}
            ></input>
          </div>
          <div className="grid grid-cols-2">
            <button className="rounded-full bg-purple-600 px-3 py-2 font-mono font-semibold text-white" type="button" onClick={props.onCancel}>
              Cancel
            </button>
            <button className="rounded-full bg-purple-600 px-3 py-2 font-mono font-semibold text-white" type="submit">Create</button>
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
