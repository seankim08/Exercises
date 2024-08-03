import React from 'react';
import { Link } from 'react-router-dom';

function VendingMachine() {
  return (
    <div>
      <h1>Vending Machine</h1>
      <ul>
        <li><Link to="/snack1">Snack 1</Link></li>
        <li><Link to="/snack2">Snack 2</Link></li>
        <li><Link to="/snack3">Snack 3</Link></li>
      </ul>
    </div>
  );
}

export default VendingMachine;