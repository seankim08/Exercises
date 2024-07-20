import React from 'react';

function Box({ id, width, height, backgroundColor, removeBox }) {
  const handleRemove = () => removeBox(id);

  return (
    <div>
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor,
          display: 'inline-block',
          margin: '5px'
        }}
      />
      <button onClick={handleRemove}>X</button>
    </div>
  );
}

export default Box;