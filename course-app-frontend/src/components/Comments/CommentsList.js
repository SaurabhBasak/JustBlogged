import React from "react";
import RelativeTime from "../HomePage/RelativeTime";
import PropTypes from "prop-types";

const CommentsList = (props) => {
  return (
    <div>
      <ul>
        {props.comments.map((comment) => (
          <li key={comment.id}>
            <div className="flex gap-3 py-3">
              <p>{comment.body}</p>
              <span>|</span>
              <p className="italic"><RelativeTime datetime={comment.date}/></p>
            </div>
            <hr></hr>
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
