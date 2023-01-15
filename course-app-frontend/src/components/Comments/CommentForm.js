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

CommentForm.propTypes = {
  createComment: PropTypes.func,
  onCancel: PropTypes.func,
  post_id: PropTypes.number,
}

export default CommentForm;
