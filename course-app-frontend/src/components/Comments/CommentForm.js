import React, { useState } from "react";

const CommentForm = (props) => {
  const [comment, setComment] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    props.createComment({ post_id: props.post_id, comment });
    setComment("");
    props.onCancel();
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label>Comment</label>
        <input
          type="text"
          placeholder="Comment"
          required
          onChange={(event) => {
            setComment(event.target.value);
          }}
        ></input>
      </div>
      <div>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit">Comment</button>
      </div>
    </form>
  );
};

export default CommentForm;
