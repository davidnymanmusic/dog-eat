import React from 'react';

function Bubble(props) {
  return (
    <span className="bubble">
      <span id="bubbleText" className={'oval-speech'} style={{ top: '-200px' }}>
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
