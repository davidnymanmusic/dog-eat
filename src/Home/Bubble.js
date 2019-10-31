import React from 'react';

function Bubble(props) {
  const colorize = edible => {
    if (edible) {
      return 'yes';
    } else {
      return 'no';
    }
  };
  return (
    <span className="bubble">
      <span
        id="bubbleText"
        className={`oval-speech ${colorize(props.edible)}`}
        style={{ top: '-200px' }}
      >
        {props.typing ? (
          <span class="dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        ) : props.edible ? (
          'Yes'
        ) : (
          'No'
        )}
      </span>
    </span>
  );
}

export default Bubble;
