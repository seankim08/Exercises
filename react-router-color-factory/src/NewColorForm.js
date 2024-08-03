import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewColorForm({ addColor }) {
  const [color, setColor] = useState('#000000');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addColor(color);
    navigate('/colors');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="color">Choose a color:</label>
      <input
        type="color"
        id="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <button type="submit">Add Color</button>
    </form>
  );
}

export default NewColorForm;