import React, { useState } from "react";

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
    <div className="flex justify-center">
      <form onSubmit={submitHandler}>
        <div>
          <div>
            <label>Title</label>
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
          <div>
            <label>Subject</label>
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
          <div>
            <button type="button" onClick={props.onCancel}>
              Cancel
            </button>
            <button type="submit">Create</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
