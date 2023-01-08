import React from "react";
import RelativeTime from "./RelativeTime";

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

export default CommentsList;
