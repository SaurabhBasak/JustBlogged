import React from "react";
import RelativeTime from "../HomePage/RelativeTime";
import PropTypes from "prop-types";

const CommentsList = (props) => {
  return (
    <div>
      <ul>
        {props.comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.body}</p>
            <RelativeTime datetime={comment.date} />
          </li>
        ))}
      </ul>
    </div>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.array,
};

export default CommentsList;
