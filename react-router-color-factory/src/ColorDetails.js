import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';

function ColorDetails({ colors }) {
  const { color } = useParams();

  if (!colors.includes(color)) return <Navigate to="/colors" replace />;

  return (
    <div style={{ backgroundColor: color, height: '100vh', color: 'white' }}>
      <h1>This is {color}</h1>
      <Link to="/colors">Go back</Link>
    </div>
  );
}

export default ColorDetails;