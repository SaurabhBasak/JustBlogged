import React, { useState } from "react";
import PropTypes from 'prop-types';

const CommentForm = (props) => {
  const [comment, setComment] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    props.createComment({ post_id: props.post_id, comment });
    setComment("");
    props.onCancel();
  };

  return (
    <form onSubmit={submitHandler} className="py-3">
      <div className="pb-2">
        <input
          className="rounded-md pl-1 text-black"
          type="text"
          placeholder="Comment"
          required
          onChange={(event) => {
            setComment(event.target.value);
          }}
        ></input>
      </div>
      <div className="flex gap-4">
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit">Comment</button>
      </div>
    </form>
  );
};

CommentForm.propTypes = {
  createComment: PropTypes.func,
  onCancel: PropTypes.func,
  post_id: PropTypes.number,
}

export default CommentForm;
