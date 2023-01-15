import React from "react";
import PropTypes from 'prop-types';

function getRelativeTime(datetime) {
  const seconds = Math.floor((new Date().getTime() - datetime) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return `${interval} years ago`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return `${interval} months ago`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return `${interval} days ago`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return `${interval} hours ago`;
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `${interval} minutes ago`;
  }
  if (interval === 1) {
    return `${interval} minute ago`;
  }
  if (seconds < 5) {
    return "just now";
  }
  return `${seconds} seconds ago`;
}

function RelativeTime({ datetime }) {
  const timestamp = new Date(datetime).getTime();
  const relativeTime = getRelativeTime(timestamp);

  return <span className="mb-0 pb-0">{relativeTime}</span>;
}

RelativeTime.propTypes = {
  datetime: PropTypes.instanceOf(Date),
}

export default RelativeTime;
